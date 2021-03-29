import { observable } from 'mobx'
import Taro from '@tarojs/taro'
import dayjs from 'dayjs'
import req from '../utils/request'
import * as urls from '../constant/apis'

const json2Form = (json, str=[]) => {
    for (let p in json) {
      str.push(`${encodeURIComponent(p)}=${encodeURIComponent(json[p])}`)
    }
    return str.join("&");
}

class mainStore {
  openid = null;
  area = 0;
  poi = 0;
  selTech = null;
  selSafe = null;
  allPrice = 0;
  db = null;

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
  setDb(db) {this.db = db}

  
  // 微信用户登录取 code
  weLogin = async () => {
    return new Promise ( resolve => {
      Taro.login({ 
        success: res => { resolve(res.code) },
        fail:    err => { console.log(err) }
      })
    })
  }
  
  // 微信取用户信息
  userInfo = async () => {
    return new Promise ( resolve => {
      Taro.getUserInfo({
        success: res => { resolve(res.userInfo) },
        fail:    err => { console.log(err) }
      })
    })
  }
  
  // 获取预支付码
  wxApi = async (openid,money) => {
    let data = {
      openid:     openid,
      money:      0.01, //money,
      orderID:    "181818",
      orderCode:  dayjs().format('YYYYMMDDhhmmssSSS'),
    }
    let ret = await req.post(urls.URL_WXPAY, json2Form(data))
    return ret.data.data
  }

  // 微信支付
  payment = async (data)=>{
    return new Promise ( resolve => {
      Taro.requestPayment({
        signType:  'MD5',
        timeStamp: data.timeStamp+'',
        nonceStr:  data.nonceStr,
        package:   data.package,
        paySign:   data.paySign,
        success(res){ resolve(res) },
        fail (res) { 
          console.log(res)
          Taro.showToast({ title:'支付失败', icon: 'none', mask:true })
        }
      })
    })
  }

  // 保存订单数据
  saveOrder = async (data)=>{
    return new Promise ( resolve => {
      Taro.request({
        method: 'post',
        url: urls.URL_SAVE_ORDER,
        data: data,
        success: res => { resolve(res) },
        fail:    res => { Taro.showToast({ title:'支付数据保存失败', icon:'none', mask:true }) }
      })
    })
  }


  // 支付入口
  pay = async (money,type) => {
    let code = await this.weLogin()
    console.log(`code: ${code}`)
    let r2 = await req.post(urls.URL_JSCODE2SESSION, {code:code})
    let openid = r2.data.openid
    console.log(`openid: ${openid}`)
    let r3 = await this.wxApi(openid, money)
    console.log(r3)
    let r4 = await this.payment(r3)
    console.log(r4)
    let data = { 
      type:    type, 
      money:   money, 
      uid:     openid,
      area:    this.area,
      poi:     this.poi,
      selTech: this.selTech,
      selSafe: this.selSafe,
      date: dayjs().format('YYYYMMDDhhmmssSSS'),
    }
    let r5 = await this.saveOrder(data)
    Taro.showToast({ title:'支付成功', icon: 'success', mask:true })
    Taro.navigateTo({ url: `/pages/info_ret/index` })
  }

    // 购物支付入口
    payGoods = async (params) => {
      let code = await this.weLogin()
      console.log(`code: ${code}`)
      let r2 = await req.post(urls.URL_JSCODE2SESSION, { code: code })
      let openid = r2.data.openid
      console.log(`openid: ${openid}`)
      let r3 = await this.wxApi(openid, params.sumPrice)
      console.log(r3)
      let r4 = await this.payment(r3)
      console.log(r4)
      let data={...params, uid:openid,}
       return await new Promise((resolve, reject) => {
        Taro.request({
          method: 'post',
          url: urls.URL_SAVE_SP_GOODS,
          data:  data ,
          success: res => {
            console.log(res);
            resolve(res),
            Taro.showToast({ title: '支付成功', icon: 'success', mask: true }),
            Taro.navigateTo({ url: `/pages/info_ret/index` })
          },
          fail: err => {
            reject(err)
            console.log(err);
            Taro.showToast({ title: '支付数据保存失败', icon: 'none', mask: true })
          }
        })
      })
    }


  // 用微信帐号登录并保存到缓存
  bindUserInfo = async () => {
    let r1 = await this.weLogin()
    console.log(`code: ${r1}`)
    let r2 = await req.post(urls.URL_JSCODE2SESSION, {code:r1})
    console.log(`openid: ${r2.data.openid}`)
    let r3 = await this.userInfo()
    let user = {
      code:   r1,
      openid: r2.data.openid,
      name:   r3.nickName,
      city:   r3.city,
      prov:   r3.province,
      img:    r3.avatarUrl
    }
    Taro.setStorageSync('user',JSON.stringify(user))
    Taro.switchTab({ url: `/pages/user/index` })
  }

  // 用户历史订单
  async listOrder(cb) {
    let uid = JSON.parse(Taro.getStorageSync('user')).openid
    let r = await req.post(urls.URL_LIST_ORDER, {uid:uid})
    return r.data.data
  }

}


export default new mainStore()