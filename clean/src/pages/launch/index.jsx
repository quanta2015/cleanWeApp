import { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Button, Image, Text} from '@tarojs/components'
import { observer, inject } from 'mobx-react'
import * as urls from '../../constant/apis'
import './index.less'


@inject('store')
@observer
class Case extends Component {
  constructor(props) {
    super(props)
    this.store = this.props.store.mainStore
  }

  bindUserInfo =() =>{
    this.store.bindUserInfo()
  }

  render () {
    return (
      <View className='g-launch'>
        <View className="m-launch">
          <View className="m-sect">
            <View className="m-logo">
              <Image src={`${urls.API_SERVER}/cdn/logo5.png`}></Image>
            </View>
            
          </View> 
          <Button className="m-btn m-login"  onClick={()=>this.bindUserInfo()} >微信帐号快捷登录</Button>
          <Button className="m-btn">暂不登录</Button>
        </View> 
        <View className="m-ft">
          <View className="m-info">登录即表示您已阅读、理解并同意</View>
          <View className="m-info">《艾尔森用户服务协议》</View>
        </View> 
      </View>
    )
  }
}

export default Case
