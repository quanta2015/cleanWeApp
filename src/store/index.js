import { observable } from 'mobx'
import Taro from '@tarojs/taro'
import dayjs from 'dayjs'

var URL_JSCODE2SESSION  = 'https://mooc.hznu.edu.cn/jscode2session'
var URL_WXPAY           = "https://mooc.hznu.edu.cn/wxpay"; 

class mainStore {

  @observable  openid = null;

  pay(money) {
    Taro.login({ success: res => {this.WeSession(res.code,money)} })
  }


  WeSession(code,money) {
    console.log(`code: ${code}`)
    Taro.request({
      method: 'post',
      url: URL_JSCODE2SESSION,
      data: {code: code},
      header:{ 'Content-Type': 'application/json'},
      success: res => {
        console.log('openid: ' + res.data.openid)
        this.openid = res.data.openid
        this.WxApi(res.data.openid,money)
      }
    })
  }

  WxApi(openid,money) {
    let data = {
      openid:     openid,
      orderCode:  dayjs().format('YYYYMMDDhhmmssSSS'), //"10200909125346",
      money:      money,
      orderID:    "34318",
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
          }
        })
      }
    })
  }

  json2Form(json, str=[])  {
    // let str = []
    for (let p in json) {
      str.push(`${encodeURIComponent(p)}=${encodeURIComponent(json[p])}`)
    }
    return str.join("&");
  }

}


export default new mainStore()