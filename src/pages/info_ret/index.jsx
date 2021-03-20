import { Component } from 'react'
import { View, Button, Text } from '@tarojs/components'
import { observer, inject } from 'mobx-react'

import './index.less'


@inject('store')
@observer
class Case extends Component {

  componentDidMount () { }


  render () {
    return (
      <View className='index'>
        支付成功
      </View>
    )
  }
}

export default Case
