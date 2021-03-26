import { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { observer, inject } from 'mobx-react'
import { AtButton,AtInputNumber } from 'taro-ui'

import './index.less'


@inject('store')
@observer
class Shop_cart extends Component {

  constructor(props) {
    super(props)
    this.state = {

    }
  }
  changeCount(index,value){
    const { shopStore } = this.props.store
    shopStore.changeCount(index,value)
  }

  render() {
    const { shopStore: { cartList,sumPrice } } = this.props.store
    return (
      <View className='cart'>
        {
          cartList.length ? cartList.map((item,index) => {
            return <View className="cart_list">
              <View className="cart_item">
                <View className="cart_item_left">
                  <Image src={item.img} />
                </View>
                <View className="cart_item_right">
                  <Text className="cart_item_right_title" numberOfLines={1}>{item.title}</Text>
                  <Text className="cart_item_right_spe">{item.desc}</Text>
                  <Text className="cart_item_right_price">单价 : ¥ {item.price} x {item.count}</Text>
                  <View className="cart_item_right_buy-quantity">
                    <AtInputNumber
                      size="normal"
                      min={0}
                      max={99}
                      width={200}
                      value={item.count}
                      type="number"
                      onChange={this.changeCount.bind(this,index)}
                    />
                  </View>
                </View>
              </View>
            </View>
          }) : null
        }
        {
          cartList.length ?
            <View className="cart_footer">
              <View className="left">
                <Text className="await-pay">合计： </Text>
                <Text className="amount-money">¥ {sumPrice}</Text>
              </View>
              <View className="right">
                <AtButton className="button" type="primary" onClick={()=>Taro.navigateTo({url: '/pages/shop_buy/index'})}>去结算</AtButton>
              </View>
            </View>
            :
            null
        }
      </View>
    )
  }
}

export default Shop_cart
