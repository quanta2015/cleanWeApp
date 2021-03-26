import { Component } from 'react'
import { Provider, inject, observer } from 'mobx-react'
import { View, Button} from '@tarojs/components'
import Taro from '@tarojs/taro'
import mainStore from './store'
import shopStore from './store/shop'
import 'taro-ui/dist/style/index.scss'
import './app.less'
import dayjs from 'dayjs'
import req from './utils/request'

// const json2Form=(json)=> {
//   let str = [];
//   for (let p in json) {
//     str.push(`${encodeURIComponent(p)}=${encodeURIComponent(json[p])}`)
//   }
//   return str.join("&");
// }

// const WeLogin =(cb)=>{
//   Taro.login({
//     success: res => {
//      cb(res)
//     }
//   })
// }
// const WeSession=(res)=>{
//   let url = 'https://mooc.hznu.edu.cn/jscode2session'
//   let data = {code: res.code}
//   console.log(`code: ${res.code}`)
//   Taro.request({
//     method: 'post',
//     url: url,
//     data: data,
//     header:{ 'Content-Type': 'application/json'},
//     success: res => {
//       console.log('openid: ' + res.data.openid)
//       store.mainStore.pay()
//       WxApi(res.data.openid)
//     }
//   })
// }

// const WxApi=(openid)=>{
//   let data = {
//     openid:     openid,
//     orderCode:  dayjs().format('YYYYMMDDhhmmssSSS'), //"10200909125346",
//     money:      "0.01",
//     orderID:    "34318",
//   }
//   let url = "https://mooc.hznu.edu.cn/wxpay"; 
//   Taro.request({
//     method: 'post',
//     url: url,
//     data: json2Form(data),
//     header: {'Content-Type': 'application/x-www-form-urlencoded'},
//     success: res => {
//       let data = res.data.data;
//       console.log(data);

//       Taro.requestPayment({
//         timeStamp: data.timeStamp+'',
//         nonceStr:  data.nonceStr,
//         package:   data.package,
//         signType:  'MD5',
//         paySign:   data.paySign,
//         success(res){
//           console.log(res,'微信支付成功！！！')
//         }
//       })
//     }
//   })
// }

const store = {
  mainStore,shopStore
}

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      showLaunch: true,
    }
  }

  async componentDidMount () {
    Taro.showLoading({ title:'loading', mask:true })
    const res = await req.post('/getAppDB')
    console.log(res.data)
    mainStore.setDb(res.data)
    Taro.hideLoading()
    
    // Taro.login({ success: res => {
    //   Taro.getSetting({
    //     success: function (res) {
    //       console.log(res)
    //       // this.setState({showLaunch:false})
    //       // if (!res.authSetting['scope.userInfo']) {
    //       //   Taro.authorize({
    //       //     scope: 'scope.userInfo',
    //       //     success: function () {
    //       //         Taro.getUserInfo()
    //       //     }
    //       //   })
    //       // }
    //     }
    //   })

    // }})
  }



  render () {
    return (
      <Provider store={store}>
        {this.props.children}
      </Provider>
    )
  }
}

export default App
