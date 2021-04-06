import { Component } from 'react'
import { View, Text ,Image } from '@tarojs/components'
// import { observer, inject } from 'mobx-react'
import Taro from '@tarojs/taro'
import './index.less'
import {API_SERVER} from '../../constant/apis'


class Intro extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      user: '',
      logo: '',
      city: '',
      prov: '',
    }
  }

  componentDidShow() {
    let u = Taro.getStorageSync('user')
    let user = (u)?JSON.parse(u):null
    if (user!==null) {
      this.setState({ user:user.name, logo: user.img, prov:user.prov,city:user.city})
    }
    console.log(u)
  }

  render () {
    let {user,logo,prov,city} = this.state
    return (
      <View className='g-code'>
        <View className="m-code">
          <View className="m-usr">
            <Image src={logo}></Image>
            <View className="m-info">
              <View className="m-name">{user}</View>
              <View className="m-prov">{prov} {city}</View>
            </View> 
          </View>
          <View className="m-logo">
            <Image src={`${API_SERVER}/cdn/wecode.png`}></Image>
          </View> 
          <View className="m-ft">
            扫一扫上面的二维码图案，加微信小程序
          </View> 
        </View>
      </View>
    )
  }
}

export default Intro
