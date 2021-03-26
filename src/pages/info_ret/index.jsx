import { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Button, Text, Icon} from '@tarojs/components'
import { observer, inject } from 'mobx-react'

import './index.less'


@inject('store')
@observer
class Case extends Component {

  componentDidMount () { }

  doReturn=()=>{
    wx.switchTab({ url: `/pages/order/index` })
  }

  render () {
    return (
      <View className='g-info-ret'>
        <View className="m-info">
          <Icon size='60' type='success' />
          <Text className="m-txt">支付成功</Text>
        </View>
        <View className="m-btn" onClick={this.doReturn}>点击返回</View>
      </View>
    )
  }
}

export default Case
