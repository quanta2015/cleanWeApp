import { Component } from 'react'
import { View, Button, Text } from '@tarojs/components'
import { observer, inject } from 'mobx-react'
import Taro from '@tarojs/taro'
import api from '../../constant/apis'

import './index.less'

@inject('store')
@observer
class Index extends Component {

  async componentDidMount () {
    Taro.setNavigationBarTitle({title:'预约服务'})
  }

  doOrder = (params) =>{
    switch(params) {
      case 'g':
        Taro.navigateTo({ url: `/pages/order_g/index?type=${params}` });break;
      case 'm':
        Taro.navigateTo({ url: `/pages/order_g/index?type=${params}` });break;
      case 's':
        Taro.navigateTo({ url: `/pages/order_e/index?type=${params}` });break;
      case 'c':
        Taro.navigateTo({ url: `/pages/order_e/index?type=${params}` });break;
    }
    
  }

  render () {
    return (
      <View className='g-index'>
        <View className="m-head">立即预约</View>
        <View className="m-wrap">
          <View className="m-main m-main-up">
            <View className="m-main-c m-main-cl" onClick={this.doOrder.bind(this,'s')}>
              <Text className="m-res">溯源</Text>
              <Text className="m-res">检测</Text>
            </View>
            <View className="m-main-c m-main-cr" onClick={this.doOrder.bind(this,'c')}>
              <Text className="m-res">CMA</Text>
              <Text className="m-res">检测</Text>
            </View>
          </View>  
          <View className="m-main m-main-l" onClick={this.doOrder.bind(this,'g')}>
            <Text className="m-res">国标</Text>
            <Text className="m-res">治理</Text>
          </View>  
          <View className="m-main m-main-r" onClick={this.doOrder.bind(this,'m')}>
            <Text className="m-res">母婴</Text>
            <Text className="m-res">治理</Text>
          </View>  
        </View>
        <View className="m-info">每平方服务价低至<Text className="u-rmb">20</Text>元！</View>
        
      </View>
    )
  }
}

export default Index
