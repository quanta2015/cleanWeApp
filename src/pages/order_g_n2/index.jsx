import { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { View, Button, Text, Image, Input, Picker } from '@tarojs/components'
import api from '../../constant/apis'
import req from '../../utils/request'
import './index.less'
import icon_del from '../../assets/icon_del.png'
import { $ } from '@tarojs/extend'




@inject('store')
@observer
class Index extends Component {
  constructor(props) {
    super(props)
  }

  async componentDidMount() {

  }

  doPay=()=>{
    let { mainStore } = this.props.store
    let money = (mainStore.getAllPrice()/100000).toFixed(2)
    mainStore.pay(money)
  }

  
  render() {
    let allprice = this.props.store.mainStore.getAllPrice()
 
    return (
      <View className='g-bd g-orderg_n2'>
        <View className="m-head">合同</View>
        <View className="m-bd">
          <Text className="m-list">1. xxx</Text>
          <Text className="m-list">2. xxx</Text>
          <Text className="m-list">3. xxx</Text>
          <Text className="m-list">4. xxx</Text>
          <Text className="m-list">5. xxx</Text>
          <Text className="m-list">6. xxx</Text>
        </View> 
        <View className="fn-btn-sb" onClick={this.doPay}>支付订单 {allprice}</View>
      </View>
     
    )
  }
}

export default Index
