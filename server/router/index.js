var fs = require("fs")
var path = require('path')
var dayjs = require('dayjs')
var urllib = require('urllib')
var express = require('express')
var request = require('request')
var jwt = require('jsonwebtoken')
var PdfPrinter = require('pdfmake')
var formidable = require('formidable')
var router = express.Router()
var tmplOrder   = require("../utils/tmplOrder")
var tmplOrderHead   = require("../utils/tmplOrderHead")
var tmplShopping= require("../utils/tmplShopping")
var tmplShoppingHead   = require("../utils/tmplShoppingHead")

var d  = require("../data/data")
var db = require("../db/db")
var wxpay  = require('../utils/wepay')


var __dirproj = path.resolve(__dirname,'../')
var fonts = { 
  fzlt: { 
    normal:__dirproj+'/cdn/fonts/fzlt.ttf', 
    bold:__dirproj+'/cdn/fonts/fzlt.ttf' 
  }
}
var printer = new PdfPrinter(fonts)


const appid           = 'wxf121d862d28158fd'
const appsecret       = '6eabc7171775b5b3870b7215ccee8571'
const mchid           = '1487384612'
const mchkey          = 'hCU9nk2O7JwELi4gq0cWB4HmocJdh3qI'
const notify_url      = 'https://zjairsen.top/'
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

const SECRET_KEY = 'CLEAN_TOKEN'

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
  let sql3  = `CALL PROC_CL_LIST_GOODS(?)`
  let r = clone(await callP(sql1, null, res))
  let q = clone(await callP(sql2, null, res))
  let p = clone(await callP(sql3, null, res))
  q.forEach((item,i)=>{
    for(var attr in item) {
      q[i][attr] = ((attr!=='type')&&(attr!=='id'))?parseFloat(q[i][attr]):q[i][attr]
    }
  })
  const DATA = { g:q[0],m:q[1],s:q[2],c:q[3],case:r,goods:p,city: d.CITY,fn:d.FN }
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
  let sql  = `CALL PROC_CL_CASE_DEL(?)`
  let r = await callP(sql, params, res)
  res.status(200).json({ code: 200, data: r})
})


router.post('/addCase', async function (req, res) {
  let params = { name: req.body.name, img: req.body.img }
  let sql  = `CALL PROC_CL_CASE_ADD(?)`
  let r = await callP(sql, params, res)
  res.status(200).json({ code: 200, data: r})
})

router.post('/delGood', async function (req, res) {
  let params = { id: req.body.id }
  let sql  = `CALL PROC_CL_GOOD_DEL(?)`
  let r = await callP(sql, params, res)
  res.status(200).json({ code: 200, data: r})
})


router.post('/addGood', async function (req, res) {
  let params = { name:  req.body.name, 
                 unit:  req.body.unit,
                 spec:  req.body.spec,
                 price: req.body.price,
                 img_h1:req.body.img_h1,
                 img_h2:req.body.img_h2,
                 img_bd:req.body.img_bd }
  let sql  = `CALL PROC_CL_GOOD_ADD(?)`
  let r = await callP(sql, params, res)
  res.status(200).json({ code: 200, data: r})
})


router.post('/upload', function (req, res) {
  const form = new formidable.IncomingForm()
  form.parse(req)
  form.on('fileBegin', function (name, file) {
    let type = file.name
    file.path = `cdn/${type}/${type}_${dayjs().format('YYYYMMDDhhmmssSSS')}.jpeg`
  })

  form.on('file', (name, file) => {
    res.status(200).json({
      code: 200,
      msg: '上传照片成功',
      data: {path: file.path}
    })
  })
})


router.post('/saveOrder', async function (req, res) {
  let params = {
    uid:      req.body.uid,
    money:    req.body.money,
    type:     req.body.type,
    orderid:  req.body.date,
    area:     req.body.area,  
    poi:      req.body.poi, 
    selTech:  req.body.selTech||0,
    name:     req.body.name,
    phone:    req.body.phone,
    addr:     req.body.addr,
    seldate:  req.body.seldate,
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

router.post('/listOrderAll', async function (req, res) {
  let sql  = `CALL PROC_CL_LIST_ORDER_ALL()`
  let r = await callP(sql, null, res)
  res.status(200).json({ code: 200, data: r})
})


router.post('/listOrderQry', async function (req, res) {
  let params = req.body
  let sql  = `CALL PROC_CL_LIST_ORDER_QUERY(?)`
  let r = await callP(sql, params, res)
  res.status(200).json({ code: 200, data: r})
})


router.post('/listOrderAlltoPdf', async function (req, res) {
  let params = req.body
  let sql  = `CALL PROC_CL_LIST_ORDER_QUERY(?)`
  let r = await callP(sql, params, res)
  tmplOrder.content[2].table.body = []
  tmplOrder.content[2].table.body.push(tmplOrderHead)
  r.map((item,i)=>{
    let row = []
    row.push(item.oid)
    row.push(item.seldate)
    row.push(item.name   )
    row.push(item.phone  )
    row.push(item.addr   )
    row.push(item.tp     )
    row.push(item.area   )
    row.push(item.seltech)
    row.push(item.selsafe)
    row.push(item.money  )
    tmplOrder.content[2].table.body.push(row)
  })

  let pdfDoc = printer.createPdfKitDocument(tmplOrder);
  let pdfPath = `export/order_${dayjs().format('YYYYMMDDhhmmssSSS')}.pdf`
  pdfDoc.pipe(fs.createWriteStream(pdfPath));
  pdfDoc.end();
  res.status(200).json({ code: 200, pdf: pdfPath})
})


router.post('/listOrderAllToXls', async function (req, res) {
  let params = req.body
  let sql  = `CALL PROC_CL_LIST_ORDER_QUERY(?)`
  let r = await callP(sql, params, res)

  let filePath = `export/order_${dayjs().format('YYYYMMDDhhmmssSSS')}.xls`
  var writeStream = fs.createWriteStream(filePath)

  var header=`${['单号','预约日期','客户名称','联系方式','服务地址','服务类型','房屋面积','工程师类型','是否保险','服务费用'].join('\t')}\n`
  writeStream.write(header)
  r.map((item,i)=>{
    let row = []
    row.push(item.oid)
    row.push(item.seldate)
    row.push(item.name   )
    row.push(item.phone  )
    row.push(item.addr   )
    row.push(item.tp     )
    row.push(item.area   )
    row.push(item.seltech)
    row.push(item.selsafe)
    row.push(item.money  )
    row = `${row.join('\t')}\n`
    writeStream.write(row)
  })
  writeStream.close()
  res.status(200).json({ code: 200, xls: filePath})
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


router.post('/listShoppingGoodsAll', async function (req, res) {
  let sql1  = `CALL PROC_CL_LIST_SP_GOODS_ALL()`
  let sql2  = `CALL PROC_CL_LIST_GOODS(?)`
  let r = await callP(sql1, null, res)
  let q = await callP(sql2, {}, res)
  q.map((item,i,arr)=>{ arr[i]= {na:item.name,pr:item.price} })
  r.forEach((item,i,arr)=>{ arr[i].buyList = toListN(item.buyList,q) })
  res.status(200).json({ code: 200, data: r})
})

var listShoppingGoodsAllToQry = async(params,res) => {
  let sql1  = `CALL PROC_CL_LIST_SP_GOODS_QUERY(?)`
  let sql2  = `CALL PROC_CL_LIST_GOODS(?)`
  let r = await callP(sql1, params, res)
  let q = await callP(sql2, {}, res)
  q.map((item,i,arr)=>{ arr[i]= {na:item.name,pr:item.price} })
  r.forEach((item,i,arr)=>{ arr[i].buyList = toListN(item.buyList,q) })
  return r
}

router.post('/listShoppingGoodsAllToQry',  async (req, res) => {
  let r = await listShoppingGoodsAllToQry(req.body,res)
  res.status(200).json({ code: 200, data: r})
})

var handleData = (ret, cb) => {
  ret.map((item,i)=>{
    let row = []
    row.push(i+1)
    row.push(item.date   )
    row.push(item.name   )
    row.push(item.phone  )
    row.push(item.addr   )
    row.push(parseFloat(item.sumPrice).toFixed(2))
    cb(row)

    item.buyList.map((o,j)=>{
      let srow = []
      srow.push('        ')
      srow.push('        ')
      srow.push(j+1)
      srow.push(o.na)
      srow.push(o.ct)
      srow.push(o.pr)
      cb(srow)
    })
  })
}

router.post('/listShoppingGoodsAlltoPdf', async (req, res) => {
  let r = await listShoppingGoodsAllToQry(req.body,res)
  tmplShopping.content[2].table.body = []
  tmplShopping.content[2].table.body.push(tmplShoppingHead)
  handleData(r, (e)=>{ tmplShopping.content[2].table.body.push(e) })
  let pdfDoc = printer.createPdfKitDocument(tmplShopping);
  let pdfPath = `export/shopping_${dayjs().format('YYYYMMDDhhmmssSSS')}.pdf`
  pdfDoc.pipe(fs.createWriteStream(pdfPath));
  pdfDoc.end();
  res.status(200).json({ code: 200, pdf: pdfPath})
})


router.post('/listShoppingGoodsAllToXls', async (req, res) => {
  let filePath = `export/shopping_${dayjs().format('YYYYMMDDhhmmssSSS')}.xls`
  let r = await listShoppingGoodsAllToQry(req.body,res)
  var writeStream = fs.createWriteStream(filePath)
  writeStream.write(`${['序号','购买日期','客户名称','联系方式','地址','总金额'].join('\t')}\n`)
  handleData(r, (e)=>{ writeStream.write(`${e.join('\t')}\n`) })
  writeStream.close()
  res.status(200).json({ code: 200, xls: filePath})
})



module.exports = router;
