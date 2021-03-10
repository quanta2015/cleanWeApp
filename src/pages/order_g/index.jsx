import { Component } from 'react'
import { View, Button, Text } from '@tarojs/components'
import { observer, inject } from 'mobx-react'
import Taro from '@tarojs/taro'
import api from '../../constant/apis'
import req from '../../utils/request'
import './index.less'


@inject('store')
@observer
class Index extends Component {

  async componentDidMount () {
    // try {
    //   const res = await req.post('/getDataList',{aa:'b'})
    //   console.log(res.data)
    //   this.setState({
    //     data: res.data,
    //     loading: false
    //   })
    // } catch (error) {
    //   Taro.showToast({
    //     title: '载入远程数据错误'
    //   })
    // }
  }

  

  render () {
    // const { counterStore: { counter } } = this.props.store
    return (
      <View className='g-index'>
         环境 
      </View>
    )
  }
}

export default Index
