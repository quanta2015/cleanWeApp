import { Component } from 'react'
import { Provider, inject, observer } from 'mobx-react'
import Taro from '@tarojs/taro'
import mainStore from './store'
import 'taro-ui/dist/style/index.scss'
import './app.less'
import dayjs from 'dayjs'


const json2Form=(json)=> {
  let str = [];
  for (let p in json) {
    str.push(`${encodeURIComponent(p)}=${encodeURIComponent(json[p])}`)
  }
  return str.join("&");
}

const WeLogin =(cb)=>{
  Taro.login({
    success: res => {
     cb(res)
    }
  })
}
const WeSession=(res)=>{
  let url = 'https://mooc.hznu.edu.cn/jscode2session'
  let data = {code: res.code}
  console.log(`code: ${res.code}`)
  Taro.request({
    method: 'post',
    url: url,
    data: data,
    header:{ 'Content-Type': 'application/json'},
    success: res => {
      console.log('openid: ' + res.data.openid)
      store.mainStore.pay()
      WxApi(res.data.openid)
    }
  })
}

const WxApi=(openid)=>{
  let data = {
    openid:     openid,
    orderCode:  dayjs().format('YYYYMMDDhhmmssSSS'), //"10200909125346",
    money:      "0.01",
    orderID:    "34318",
  }
  let url = "https://mooc.hznu.edu.cn/wxpay"; 
  Taro.request({
    method: 'post',
    url: url,
    data: json2Form(data),
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

const store = {
  mainStore
}

class App extends Component {
  componentDidMount () {
    // WeLogin(WeSession)

    // Taro.login({
    //   success: res => {
    //    console.log(res.code)
    //    let url = 'https://mooc.hznu.edu.cn/code2session'
    //    let data = {}
    //    data.code = res.code
    //    Taro.request({
    //       method: 'POST',
    //       url: url,
    //       data: json2Form(data),
    //       header: {
    //         'Content-Type': 'application/x-www-form-urlencoded', 
    //       },
    //       success: res => {
    //         console.log('openid: '+res.data.openid)
    //         // this.wxapi(res.data.openid);
    //       }
    //     })
    //   }
    // })
  }

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  // this.props.children 就是要渲染的页面
  render () {
    return (
      <Provider store={store}>
        {this.props.children}
      </Provider>
    )
  }
}

export default App
