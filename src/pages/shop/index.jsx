
import { Component } from 'react'
import { View, Button, Text, Image } from '@tarojs/components'
import { observer, inject } from 'mobx-react'
import { Swiper, SwiperItem } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { AtFab } from 'taro-ui'
import './index.less'
import req from '../../utils/request'
import * as urls from '../../constant/apis'

const fract=(n)=>{ return (n - Math.trunc(n))*100 }

@inject('store')
@observer
class Shop extends Component {
  constructor(props) {
    super(props)
    this.state = {
      list: [],
    }
  }
  async componentDidMount () {
    Taro.showLoading({ title:'loading', mask:true })
    const r = await req.post(urls.URL_LIST_GOODS)
    console.log(r.data.data)
    this.setState({ list: r.data.data})
    Taro.hideLoading()
  }
  
  handleClick(id) {
    Taro.navigateTo({
      url: `/pages/shop_sp/index?id=${id}`
    })
  }

  render() {
    let {list} = this.state


    return <View className='shop'>
      <View className='shop__title'>
        <Text className='shop__title-txt'>推荐商品</Text>
      </View>
      <View className='shop__list'>
        { list.map((item) => {
          const { id, img_h1, img_h2, name, spec, price, unit } = item
          return (
            <View className='shop__list-item'  onClick={this.handleClick.bind(this, id)} >
              <View className='shop__list-item-info'>
                <Swiper circular autoplay   className='m-swiper'>
                  <SwiperItem><Image className='shop__list-item-img' src={`${urls.API_SERVER}/${img_h1}`} /></SwiperItem>
                  <SwiperItem><Image className='shop__list-item-img' src={`${urls.API_SERVER}/${img_h2}`} /></SwiperItem>
                </Swiper>
                <Text className='shop__list-item-desc' numberOfLines={1}>
                  {name}
                </Text>
                <Text className='shop__list-item-name' numberOfLines={1}>
                  {spec}/{unit}
                </Text>
                <View className='shop__list-item-price-wrap'>
                  <View className='shop__list-item-price'>
                    <Text className="m-i">{parseInt(price)}</Text>.
                    <Text className="m-f">{fract(price).toString().padEnd(2,'0')}</Text>
                  </View>

                </View>
              </View>
            </View>
          )
        })}
      </View>
      <View className='more'>
        <Text className='more-txt'>更多商品，敬请期待</Text>
      </View>
      <View className='fab'>
        <AtFab onClick={()=>Taro.navigateTo({url: '/pages/shop_cart/index'})}>
          <Text className='at-fab__icon at-icon at-icon-shopping-cart'></Text>
        </AtFab>
      </View>
    </View>
  }
}

export default Shop
