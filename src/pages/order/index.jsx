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
        <View className="m-head">立即预约</View>
        <View className="m-wrap">
          <View className="m-main m-main-up">
            <Text className="m-res">国标</Text>
            <Text className="m-res">治理</Text>
          </View>  
          <View className="m-main m-main-l">
            <Text className="m-res">母婴</Text>
            <Text className="m-res">治理</Text>
          </View>  
          <View className="m-main m-main-r">
            <Text className="m-res">环境</Text>
            <Text className="m-res">检测</Text>
          </View>  
        </View>
        <View className="m-info">每平方服务价低至<Text className="u-rmb">20</Text>元！</View>
        
      </View>
    )
  }
}

export default Index
