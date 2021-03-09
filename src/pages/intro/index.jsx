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
        
      </View>
    )
  }
}

export default Intro
