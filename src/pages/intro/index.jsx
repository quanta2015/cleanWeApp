import { Component } from 'react'
import { View, Button, Text } from '@tarojs/components'
import { observer, inject } from 'mobx-react'
import './index.less'


@inject('store')
@observer
class Intro extends Component {

  componentDidMount () { }

  render () {
    return (
      <View className='index'>
        <View className='top' ></View>
          <View className='middle'>
            <Text claaName='title'>公司简介</Text>
            <Text className='intro'>艾尔森环保采用国际领先专利技术，主要研发和生产甲醛治理液、新风系统设备及车用、家用、商用、大型中央空调相配套的含酶空气净化网等空气净化产品。</Text>
          </View>
          <View className='bottom'>
            <View className='imgbox'></View>
            <View className='introbox'>
              <Text claaName='title'>服务理念</Text>
              <Text className='intro'>我们重新定义美好生活，致力于给用户提供健康环保的产品，提高生活质量，共享呼吸之美！</Text>
            </View>
          </View>
      </View>
    )
  }
}

export default Intro
