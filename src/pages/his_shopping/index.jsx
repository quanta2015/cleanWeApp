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
    let r = await this.props.store.mainStore.listShopping()
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

      <View className='g-order_shop'>
        <View className="m-tl">您的订购记录</View>
        <View className="m-bd">
          {list.map((item,i)=>
            <View className="m-row">
              <View className="m-hd">
                <View className="m-item m-id">{i+1}.</View>
                <View className="m-item m-date">{item.date}</View>
                <View className="m-item m-money">
                  <Text className="m-i">{parseInt(item.sumPrice)}</Text>.
                  <Text className="m-f">{fract(item.sumPrice).toString().padEnd(2,'0')}</Text>
                </View>
              </View>
              <View className="m-goods">
                {item.buyList.map((o,j)=>
                  <View className="m-good">
                    <View className="m-id">{j+1}.</View>
                    <View className="m-name">{o.na}*{o.ct}</View>
                    <View className="m-pr">
                      <Text className="m-i">{parseInt(o.pr)}</Text>.
                      <Text className="m-f">{fract(o.pr).toString().padEnd(2,'0')}</Text>
                    </View>
                  </View> 
                )}
              </View> 
              <View className="m-detail">
                <View className="m-item">
                  <Text className="m-item-tl">客户姓名</Text>
                  <Text className="m-item-ct">{item.name}</Text>
                </View>
                <View className="m-item">
                  <Text className="m-item-tl">联系方式</Text>
                  <Text className="m-item-ct">{item.phone}</Text>
                </View>
                <View className="m-item">
                  <Text className="m-item-tl">收货地址</Text>
                  <Text className="m-item-ct">{item.addr}</Text>
                </View>
              </View> 
              
              

            </View>
          )}
        </View> 
      </View>
     
    )
  }
}

export default Index
