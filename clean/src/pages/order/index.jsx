import { Component } from 'react'
import { View, Text } from '@tarojs/components'
import { observer, inject } from 'mobx-react'
import Taro from '@tarojs/taro'
import req from '../../utils/request'
import * as urls from '../../constant/apis'
import {randomTime, delay} from '../../utils/fn'

import './index.less'


var _HD_TIME,_AD_TIME
const [MIN_FT,MAX_FT] =[3000,6000]

@inject('store')
@observer
class Index extends Component {
  constructor(props) {
    super(props)
    this.store = this.props.store.mainStore
    this.state = {
      count: 10128,
      adv:   null,
      opacity:0,
    }
  }

  async componentDidMount () {
    Taro.showLoading({ title:'loading', mask:true })
    const res = await req.post(urls.GET_APP_DB)
    this.store.setDb(res.data)
    this.doTimer()
    Taro.hideLoading()
  }

  componentWillUnmount() {
    clearTimeout(_HD_TIME)
    clearTimeout(_AD_TIME)
  }

  doHide =async ()=>{
    _AD_TIME = await delay(30)
    if (this.state.opacity<=0) {
      clearTimeout(_AD_TIME)
      this.setState({opacity: 0})
    }else{
      let op = this.state.opacity - 0.1
      this.setState({opacity: op})
      this.doHide()
    }
  }

  doShow = async ()=>{
    _AD_TIME = await delay(60)
    if (this.state.opacity>=1) {
      clearTimeout(_AD_TIME)
      _AD_TIME = await delay(800)
      this.doHide()
    }else{
      let op = this.state.opacity + 0.1
      this.setState({opacity: op})
      this.doShow()
    }
  }

  doTimer = () => {
    let CITY = this.store.db.city
    let FN   = this.store.db.fn

    _HD_TIME = setTimeout(() => {
      let hour = randomTime(1,10)
      let city = CITY[randomTime(0,CITY.length)]
      let fn   = FN[randomTime(0,FN.length)]
      let adv = `${hour}小时前${city}${fn}**已经下单`

      this.doShow()
      this.setState({adv:adv, count: ++this.state.count})
      this.doTimer()
    }, randomTime(MIN_FT,MAX_FT))
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
        <View className="m-ft">
          <View className="m-ft-info">已有 <Text className="m-c">{this.state.count}</Text> 位预约了服务</View>
          <View className="m-ft-info">服务热线: <Text className="m-p">4000-253-123</Text></View>
        </View> 
        {(this.state.adv!==null) &&
        <View className="m-pop" style={`opacity: ${this.state.opacity}`}>
          {this.state.adv}
        </View> }
      </View>
    )
  }
}

export default Index
