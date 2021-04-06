import { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { View, Button, Text, Image, Checkbox } from '@tarojs/components'
import api from '../../constant/apis'
import req from '../../utils/request'
import './index.less'
import { $ } from '@tarojs/extend'
import { getCurrentInstance } from '@tarojs/taro'
import Taro from '@tarojs/taro'

const fract=(n)=>{ return (n - Math.trunc(n))*100 }
const formatServ=(e)=>{
  switch(e) {
    case 'g': return '国标治理';break;
    case 'm': return '母婴治理';break;
    case 's': return '溯源检测';break;
    case 'c': return 'CMA检测';break;
  }
}

@inject('store')
@observer
class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      list:[],
    }
  }

  async componentDidMount() {
    Taro.showLoading({ title:'loading', mask:true })
    let r = await this.props.store.mainStore.listOrder()
    console.log(r)
    this.setState({ list: r})
    Taro.hideLoading()
  }

  formatDate=(d)=>{
    return `${d.substring(0,4)}-${d.substring(4,6)}-${d.substring(6,8)}`
  }


  
  render() {
    let {list} =this.state
 
    return (

      <View className='g-order_his'>
        <View className="m-tl">您的订购记录</View>
        <View className="m-bd">
          {list.map((item,i)=>
            <View className="m-row">
              <View className="m-hd">
                <View className="m-item m-id">{i+1}.</View>
                <View className="m-item m-date">{this.formatDate(item.oid)}</View>
                <View className="m-item m-tp">{formatServ(item.tp)}</View>
                <View className="m-item m-money">
                  <Text className="m-i">{parseInt(item.money)}</Text>.
                  <Text className="m-f">{fract(item.money).toString().padEnd(2,'0')}</Text>
                </View>
              </View>
              { ((item.tp === 'g')||(item.tp === 'm')) &&
              <View className="m-detail">
                <View className="m-info">
                  <Text className="m-info-tl">房屋面积</Text>
                  <Text className="m-info-vl m-area">
                    125.60
                    <Text className="m-d-u">m</Text>
                    <Text className="m-d-t">2</Text></Text>
                </View>
                <View className="m-info">
                  <Text className="m-info-tl">服务人员</Text>
                  <Text className="m-info-vl m-svr">高级+高级</Text>
                </View>
                <View className="m-info">
                  <Text className="m-info-tl">是否保险</Text>
                  <Text className="m-info-vl m-safe">是</Text>
                </View>
              </View> }

              { ((item.tp === 's')||(item.tp === 'c')) &&
              <View className="m-detail">
                <View className="m-info">
                  <Text className="m-info-tl">检测选点</Text>
                  <Text className="m-info-vl m-point">5</Text>
                </View>
              </View> }
            </View>
          )}
        </View> 
      </View>
     
    )
  }
}

export default Index
