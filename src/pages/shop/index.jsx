
import { Component } from 'react'
import { View, Button, Text, Image } from '@tarojs/components'
import { observer, inject } from 'mobx-react'
import { Swiper, SwiperItem } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { AtFab } from 'taro-ui'
import './index.less'


@inject('store')
@observer
class Shop extends Component {
  constructor(props) {
    super(props)
    this.state = {
      list: [
        {
          id: 1,
          img: 'http://lc-zJqDdcsx.cn-e1.lcfile.com/1854d11cec1b763115ea.jpg',
          img2: 'http://lc-zJqDdcsx.cn-e1.lcfile.com/3e7494d00f825828a155.png',
          title: '甲醛净',
          des: '500ml/瓶',
          price: '168',
        },
        {
          id: 2,
          img: 'http://lc-zJqDdcsx.cn-e1.lcfile.com/dc4dca518418d9c556e0.jpg',
          title: '除味剂',
          des: '500ml/瓶',
          price: '158',
        },
        {
          id: 3,
          img: 'https://jdc.jd.com/img/200',
          title: 'xxxx',
          des: 'dddd',
          price: '22',
        },
        {
          id: 4,
          img: 'https://jdc.jd.com/img/200',
          title: 'xx',
          des: 'ddd',
          price: '22',
        },
      ],
    }
  }
  componentDidMount() {
    const { shopStore } = this.props.store
    shopStore.getCart()
    //获取商品列表
  }
  handleClick(id) {
    Taro.navigateTo({
      url: `/pages/shop_sp/index?id=${id}`
    })
  }

  render() {
    return <View className='shop'>
      <View className='shop__title'>
        <Text className='shop__title-txt'>推荐商品</Text>
      </View>
      <View className='shop__list'>
        {this.state.list.map((item) => {
          const { id, img, img2, title, des, price } = item
          return (
            <View
              key={id}
              className='shop__list-item'
              onClick={this.handleClick.bind(this, id)}
            >
              <View className='shop__list-item-info'>
                <Swiper circular autoplay>
                  <SwiperItem>
                    <Image className='shop__list-item-img' src={img} />
                  </SwiperItem>
                  {
                    img2 ? <SwiperItem><Image className='shop__list-item-img' src={img2} /></SwiperItem> : null
                  }
                </Swiper>
                <Text className='shop__list-item-desc' numberOfLines={1}>
                  {des}
                </Text>
                <Text className='shop__list-item-name' numberOfLines={1}>
                  {title}
                </Text>
                <View className='shop__list-item-price-wrap'>
                  <Text className='shop__list-item-price'>
                    ¥{price}
                  </Text>

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
