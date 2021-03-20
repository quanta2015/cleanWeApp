import { observable } from 'mobx'
import Taro from '@tarojs/taro'
import dayjs from 'dayjs'

var URL_JSCODE2SESSION  = 'https://mooc.hznu.edu.cn/jscode2session'
var URL_WXPAY           = "https://mooc.hznu.edu.cn/wxpay"; 

class mainStore {
  openid = null;
  area = 0;
  poi = 0;
  selTech = null;
  selSafe = null;
  allPrice = 0;
  db = {
    LM:   0.07,
    GP:   189,
    BASE_AREA: 50,
    BASE_PRICE: 5,
    SP:   870,
    SP_F: 90,
    ST:   290,
    ST_F: 30,
    INS:  0.03,
  }

  setArea(area) { this.area = area }
  getArea()     { return this.area }
  setPoi(poi)  { this.poi = poi }
  getPoi()     { return this.poi }
  setSelTech(selTech) { this.selTech = selTech }
  getSelTech()  { return this.selTech }
  setSelSafe(selSafe) { this.selSafe = selSafe }
  getSelSafe()  { return this.selSafe }
  setAllPrice(allPrice) { this.allPrice = allPrice }
  getAllPrice()  { return this.allPrice }
  
  pay(money) {
    Taro.login({ success: res => {this.WeSession(res.code,money)} })
  }

  WeSession(code,money) {
    console.log(`code: ${code}`)
    Taro.request({
      method: 'POST',
      url:    URL_JSCODE2SESSION,
      data:   {code: code},
      header: { 'Content-Type': 'application/json'},
      success: res => {
        console.log(`openid: ${res.data.openid}`)
        this.openid = res.data.openid
        this.WxApi(res.data.openid,money)
      }
    })
  }

  WxApi(openid,money) {
    let data = {
      openid:     openid,
      money:      money,
      orderID:    "34318",
      orderCode:  dayjs().format('YYYYMMDDhhmmssSSS'),
    }
    Taro.request({
      method: 'post',
      url: URL_WXPAY,
      data: this.json2Form(data),
      header: {'Content-Type': 'application/x-www-form-urlencoded'},
      success: res => {
        let data = res.data.data;
        console.log(data);

        Taro.requestPayment({
          timeStamp: data.timeStamp+'',
          nonceStr:  data.nonceStr,
          package:   data.package,
          signType:  'MD5',
          paySign:   data.paySign,
          success(res){
            console.log(res,'微信支付成功！！！')
            Taro.navigateTo({ url: `/pages/info_ret/index` })
          },
          fail (res) { 
            console.log(res,'失败')
          }
        })
      }
    })
  }

  json2Form(json, str=[])  {
    for (let p in json) {
      str.push(`${encodeURIComponent(p)}=${encodeURIComponent(json[p])}`)
    }
    return str.join("&");
  }

}


export default new mainStore()