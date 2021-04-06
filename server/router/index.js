const fs = require("fs")
var express = require('express')
var router = express.Router()
var request = require('request')
var urllib = require('urllib')
var db = require("../db/db")

var d = require("../data/data")
var wxpay  = require('../utils/wepay')

const appid           = 'wxf121d862d28158fd'
const appsecret       = '6eabc7171775b5b3870b7215ccee8571'
const mchid           = '1487384612'
const mchkey          = 'hCU9nk2O7JwELi4gq0cWB4HmocJdh3qI'

// const notify_url      = 'https://mooc.hznu.edu.cn/'
const notify_url      = 'https://qmca.xyz/'
const URL_UNIFIDORDER = 'https://api.mch.weixin.qq.com/pay/unifiedorder';
const URL_SESSION     = (code)=>{ return `https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${appsecret}&js_code=${code}&grant_type=authorization_code` }


const clone =(e)=>{ return JSON.parse(JSON.stringify(e))} 

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
















// -- business logic -----------------


router.post('/login',async (req, res, next) =>{
  let params = req.body
  let sql = `CALL PROC_USER_LOGIN(?)`
  let r = await callP(sql, params, res)

  if (r.length > 0) {
    let token = jwt.sign(clone(r[0]), SECRET_KEY)
    res.status(200).json({code: 200, data: r[0], token: token, msg: '登录成功'})
  } else {
    res.status(200).json({code: 301, data: null, msg: '用户名或密码错误'})
  }
  
})



router.post('/getCount', async function (req, res) {
  let sql  = `CALL PROC_CL_COUNT(?)`
  let r = await callP(sql, null, res)
  let count = clone(r[0]).count
  res.status(200).json({ code: 200, data: count})
})

router.post('/getAppDB', async (req, res) =>{
  let sql1  = `CALL PROC_CL_LIST_CASE(?)`
  let sql2  = `CALL PROC_CL_LIST_PARAMS(?)`
  let r = clone(await callP(sql1, null, res))
  let q = clone(await callP(sql2, null, res))
  q.forEach((item,i)=>{
    for(var attr in item) {
      q[i][attr] = ((attr!=='type')&&(attr!=='id'))?parseFloat(q[i][attr]):q[i][attr]
    }
  })
  const DATA = { g:q[0],m:q[1],s:q[2],c:q[3],case:r,city: d.CITY,fn:d.FN }
  res.end(JSON.stringify(DATA))
})


router.post('/saveParams', async (req, res) =>{
  let params = req.body 
  let sql1  = `CALL PROC_CL_SAVE_PARAMS_G(?)`
  let sql2  = `CALL PROC_CL_SAVE_PARAMS_M(?)`
  let sql3  = `CALL PROC_CL_SAVE_PARAMS_S(?)`
  let sql4  = `CALL PROC_CL_SAVE_PARAMS_C(?)`
  let r = await callP(sql1, params.g, res)
  let p = await callP(sql2, params.m, res)
  let q = await callP(sql3, params.s, res)
  let t = clone(await callP(sql4, params.c, res))
  let ret = { g: t[0],m: t[1],s: t[2],c: t[3] }
  res.end(JSON.stringify(ret))
})

router.post('/delCase', async function (req, res) {
  let params = { id: req.body.id }
  let sql  = `CALL PROC_CL_DEL_CASE(?)`
  let r = await callP(sql, params, res)
  res.status(200).json({ code: 200, data: r})
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

// function toBase64(arr) {
//    return btoa(
//       arr.reduce((data, byte) => data + String.fromCharCode(byte), '')
//    );
// }

// router.get('/aaa', function (req, res) {
//   let _res    = res;
//   let url = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appid}&secret=${appsecret}`

//   request({ url: url, method: 'GET' },  async (err, r, body) => {
//     let ak = JSON.parse(body).access_token
//     let url_code = `https://api.weixin.qq.com/wxa/getwxacode?access_token=${ak}`
//     let params = { method: 'POST', data: { access_token: ak, scene: 'abc&cde' } }
//     let {status, data} = await urllib.request(url_code, params)
//     if (status !== 200) throw new Error('request fail')
//     // let img = `data:image/png;base64,${data}`
//     console.log(data)

//     // const buffer = fs.readFileSync("image.jpg");
//     fs.writeFileSync("image.jpg", data);

//     res.status(200).json({ code: 200, img:data})
    
//   })
// })





module.exports = router;
