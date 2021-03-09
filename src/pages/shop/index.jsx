import { Component } from 'react'
import { View, Button, Text } from '@tarojs/components'
import { observer, inject } from 'mobx-react'

import './index.less'


@inject('store')
@observer
class Order extends Component {

  componentDidMount () { }


  render () {
    return (
      <View className='index'>
        
      </View>
    )
  }
}

export default Order
