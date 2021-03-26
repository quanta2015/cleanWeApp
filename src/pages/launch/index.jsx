import { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Button,Image, Text, Icon} from '@tarojs/components'
import { observer, inject } from 'mobx-react'

import './index.less'


@inject('store')
@observer
class Case extends Component {

  componentDidMount () { 
    
  }

  
  

  bindUserInfo (e) {
      // console.log(e)
    Taro.login({ success: r => {

      Taro.getUserInfo({
        success: function(res) {
          let user = {
            code: r.code,
            name: res.userInfo.nickName,
            city: res.userInfo.city,
            prov: res.userInfo.province,
            img: res.userInfo.avatarUrl
          }

          Taro.setStorageSync('user',JSON.stringify(user))
          Taro.switchTab({ url: `/pages/user/index` })
        }
      })
    }})
    
      
      // Taro.getUserInfo({
      //   success: function(res) {
      //       console.log('获取用户信息成功');
      //   },
      //   fail: function(e) {
      //       console.log("获取用户信息失败 + " + JSON.stringify(e));
      //   }
      // )}

      // this.setState({ canIUse: false })
      // Taro.switchTab({ url: `/pages/order/index` })
    }


  render () {
    return (
      <View className='g-launch'>
        <View className="m-launch">
          <View className="m-sect">
            <View className="m-logo">
              <Image src="https://mooc.hznu.edu.cn/cdn/logo5.png"></Image>
            </View>
            
          </View> 
          <Button className="m-btn m-login" open-type='getUserInfo' onGetUserInfo={this.bindUserInfo} >微信帐号快捷登录</Button>
          <Button className="m-btn">暂不登录</Button>
        </View> 
         
      </View>
    )
  }
}

export default Case
