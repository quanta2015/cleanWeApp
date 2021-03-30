var express = require('express')
var router = express.Router()
var request = require('request')
var urllib = require('urllib')
var xmlreader = require("xmlreader")
var db = require("../db/db")
var wxpay  = require('../utils/wepay')
var d = require("../data/data")


const appid           = 'wxf121d862d28158fd'
const appsecret       = '6eabc7171775b5b3870b7215ccee8571'
const mchid           = '1487384612'
const mchkey          = 'hCU9nk2O7JwELi4gq0cWB4HmocJdh3qI'

// const notify_url      = 'https://mooc.hznu.edu.cn/'
const notify_url      = 'https://qmca.xyz/'
const URL_UNIFIDORDER = 'https://api.mch.weixin.qq.com/pay/unifiedorder';
const URL_SESSION     = (code)=>{ return `https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${appsecret}&js_code=${code}&grant_type=authorization_code` }



const DATA = { 
                g: { LM:0.07,GP:189,BASE_AR:50,BASE_PR:5,SP:870, SP_F:90, ST:290,ST_F:30,INS:0.03 },
                m: { LM:0.09,GP:189,BASE_AR:50,BASE_PR:6,SP:1120,SP_F:250,ST:290,ST_F:30,INS:0.03 },
                s: { LM:99 },
                c: { LM:299 },
                case: d.CASE,
                city: d.CITY,
                fn:   d.FN,
             }

const callSQLProc = (sql, params, res)=>{
  return new Promise (resolve => {
    db.procedureSQL(sql,JSON.stringify(params),(err,ret)=>{
      if (err) {
        res.status(500).json({ code: -1, msg: '提交请求失败，请联系管理员！', data: null})
      }else{
        resolve(ret)
      }
    })
  })
}

const callP = async (sql, params, res) => {
  return  await callSQLProc(sql, params, res)
}



router.post('/getAppDB', function (req, res) {
  res.end( JSON.stringify(DATA) )
})


router.post('/jscode2session', function (req, res) {
  let _res    = res;
  let url = URL_SESSION(req.body.code)

  request({ url: url, method: 'GET' }, function (err, res, body) {
    body = JSON.parse(body)

    console.log('\n\n------------------------------------------') 
    console.log('code:    ' + req.body.code)
    console.log('openid:  ' + body.openid)
    console.log('session: ' + body.session_key)
    _res.end( JSON.stringify({ "openid": body.openid, "session_key": body.session_key }) )
  })
  
})


router.post('/wxpay', async function (req, res) {
  let trade_type        = 'JSAPI'
  let body              = '微信测试代码'
  let money             = req.body.money
  let orderID           = req.body.orderID
  let openid            = req.body.openid
  let out_trade_no      = req.body.orderCode
  let spbill_create_ip  = req.connection.remoteAddress
  let nonce_str         = wxpay.createNonceStr()
  let total_fee         = wxpay.getmoney(money)
  let sign              = wxpay.paysignjsapi(appid, body, mchid, nonce_str, notify_url, openid, out_trade_no, spbill_create_ip, total_fee, trade_type, mchkey)
  
  console.log('sign:   ', sign)

  let params = {
    appid: appid,
    body: body,
    mch_id: mchid,
    nonce_str: nonce_str,
    notify_url:notify_url,
    openid: openid,
    out_trade_no: out_trade_no,
    spbill_create_ip: req.connection.remoteAddress,
    total_fee: wxpay.getmoney(money),
    trade_type: 'JSAPI',
    sign: sign,
  }

  let pkg = {
    method: 'POST',
    dataType: 'text',
    data: wxpay.buildXML(params),
  }

  console.log('post data:  %s \r\n', pkg.data)

  let {status, data} = await urllib.request(URL_UNIFIDORDER, pkg);
  if (status !== 200) throw new Error('request fail');
  let json = await wxpay.parseXML(data);

  console.log('receive data:  %s\r\n', json);

  let prepay_id = json.prepay_id
  let package = `prepay_id=${prepay_id}`
  let timestamp = wxpay.createTimeStamp();
  let minisign = wxpay.paysignjsapimini(appid, nonce_str, package, 'MD5', timestamp, mchkey);
  res.end( JSON.stringify({ status: '200', data: { 'appId': appid, 'partnerId': mchid, 'prepayId': prepay_id, 'nonceStr': nonce_str, 'timeStamp': timestamp, 'package': package,'paySign': minisign } }));
})

router.post('/saveOrder', async function (req, res) {
  let params = {
    uid:      req.body.uid,
    money:    req.body.money,
    type:     req.body.type,
    orderid:  req.body.date,
    area:     req.body.area,  
    poi:      req.body.poi, 
    selTech:  req.body.selTech,
    selSafe:  (req.body.selSafe)?1:0,
  }
  let sql  = `CALL PROC_CL_SAVE_ORDER(?)`
  let r = await callP(sql, params, res)
  res.status(200).json({ code: 200, data: r})
})

router.post('/listOrder', async function (req, res) {
  let params = { uid:req.body.uid }
  let sql  = `CALL PROC_CL_LIST_ORDER(?)`
  let r = await callP(sql, params, res)
  res.status(200).json({ code: 200, data: r})
})

router.post('/listGoods', async function (req, res) {
  let sql  = `CALL PROC_CL_LIST_GOODS(?)`
  let r = await callP(sql, null, res)
  res.status(200).json({ code: 200, data: r})
})

const toList = (d)=>{
  d = d.split('|')
  d.forEach((o,i,arr)=>{ arr[i] = { id:o.split('*')[0], ct:o.split('*')[1]} })
  return d
}
const toListN = (d,l)=>{
  d = d.split('|')
  d.forEach((o,i,arr)=>{ arr[i] = { id:o.split('*')[0], ct:o.split('*')[1], na:l[i+1].na, pr:l[i+1].pr} })
  return d
}

router.post('/saveShoppingGoods', async function (req, res) {
  let params = {
    uid:      req.body.uid,
    buyList:  req.body.buyList,
    sumPrice: req.body.sumPrice,
    name:     req.body.name,
    phone:    req.body.phone,
    addr:     req.body.addr,
    date:     dayjs().format('YYYY-MM-DD hh:mm:ss'),
  }
  let sql  = `CALL PROC_CL_SAVE_SP_GOODS(?)`
  let r = await callP(sql, params, res)
  let ret = clone(r[0])
  ret.buyList = toList(ret.buyList)
  res.status(200).json({ code: 200, data: ret})
})

router.post('/listShoppingGoods', async function (req, res) {
  let params = {
    uid: req.body.uid,
  }
  let sql1  = `CALL PROC_CL_LIST_SP_GOODS(?)`
  let sql2  = `CALL PROC_CL_LIST_GOODS(?)`
  let r = await callP(sql1, params, res)
  let q = await callP(sql2, params, res)
  q.map((item,i,arr)=>{ arr[i]= {na:item.name,pr:item.price} })
  r.forEach((item,i,arr)=>{ arr[i].buyList = toListN(item.buyList,q) })
  res.status(200).json({ code: 200, data: r})
})









module.exports = router;
