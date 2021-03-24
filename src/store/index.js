import { observable } from 'mobx'
import Taro from '@tarojs/taro'
import dayjs from 'dayjs'

var URL_JSCODE2SESSION  = 'https://mooc.hznu.edu.cn/jscode2session'
var URL_WXPAY           = "https://mooc.hznu.edu.cn/wxpay"; 

const DATA = { 
                g: { LM:0.07,GP:189,BASE_AR:50,BASE_PR:5,SP:870, SP_F:90, ST:290,ST_F:30,INS:0.03 },
                m: { LM:0.09,GP:189,BASE_AR:50,BASE_PR:6,SP:1120,SP_F:250,ST:290,ST_F:30,INS:0.03 },
                s: { LM:99 },
                c: { LM:299 },
                case: [ { name:'20峰会西子宾馆', img:'case/01.jpg' },
                        { name:'上城区社保局', img:'case/02.jpg' },
                        { name:'上海万怡酒店', img:'case/03.jpg' },
                        { name:'上虞政协办公楼', img:'case/04.jpg' },
                        { name:'下城观成幼儿园', img:'case/05.jpg' },
                        { name:'中意文化交流中心', img:'case/06.jpg' },
                        { name:'云呼企业管理集团', img:'case/07.jpg' },
                        { name:'仙化传媒公司', img:'case/08.jpg' },
                        { name:'周易研究所', img:'case/09.jpg' },
                        { name:'宁波银行湖州分行', img:'case/10.jpg' },
                        { name:'工商银行嵊州支行', img:'case/11.jpg' },
                        { name:'悦悦满月子会所', img:'case/12.jpg' },
                        { name:'新浪琴湾别墅', img:'case/13.jpg' },
                        { name:'春晖上源府别墅', img:'case/14.jpg' },
                        { name:'杭州下城党群服务中心', img:'case/15.jpg' },
                        { name:'杭州市工商业联合会', img:'case/16.jpg' },
                        { name:'杭州行知小学学院校区', img:'case/17.jpg' },
                        { name:'果然控股集团', img:'case/18.jpg' },
                        { name:'桐乡农业创新中心', img:'case/19.jpg' },
                        { name:'浙大网新银湖科技园', img:'case/20.jpg' },
                        { name:'浙江省国资委', img:'case/21.jpg' },
                        { name:'湖州市民中心', img:'case/22.jpg' },
                        { name:'爱弥儿幼儿园', img:'case/23.jpg' },
                        { name:'瑞莱克斯酒店', img:'case/24.jpg' },
                        { name:'维也纳酒店', img:'case/25.jpg' },
                        { name:'绿城房产', img:'case/26.jpg' },
                        { name:'融创房产', img:'case/27.jpg' },
                        { name:'长兴县行政服务中心', img:'case/28.jpg' },
                        { name:'靖美华庭', img:'case/29.jpg' },
                        { name:'龙湖地产', img:'case/30.jpg' }]
             }

class mainStore {
  openid = null;
  area = 0;
  poi = 0;
  selTech = null;
  selSafe = null;
  allPrice = 0;
  db = null;
  // db = DATA;

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
            console.log(res)
            Taro.showToast({ title:'支付成功', mask:true })
            Taro.navigateTo({ url: `/pages/info_ret/index` })
          },
          fail (res) { 
            console.log(res)
            Taro.showToast({ title:'支付失败', mask:true })
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