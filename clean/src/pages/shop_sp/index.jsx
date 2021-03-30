import { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Button, Text, Image, ScrollView } from '@tarojs/components'
import { observer, inject } from 'mobx-react'
import { getCurrentInstance } from '@tarojs/taro'
import { Swiper, SwiperItem } from '@tarojs/components'
import { AtBadge, AtFloatLayout, AtInputNumber } from 'taro-ui'
import req from '../../utils/request'
import * as urls from '../../constant/apis'
import './index.less'


@inject('store')
@observer
class Shop_sp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      count: 1,//初始购买数量
      isOpend: false,
      isCart: false,
      data:
      {
        id: 2,
        img: 'http://lc-zJqDdcsx.cn-e1.lcfile.com/1854d11cec1b763115ea.jpg',
        img2: 'http://lc-zJqDdcsx.cn-e1.lcfile.com/3e7494d00f825828a155.png',
        title: '除味净',
        des: '500ml/瓶',
        price: '158',
        detail: 'http://lc-zJqDdcsx.cn-e1.lcfile.com/dc7bd8839f55ff1c59c6.jpg'
      },
    }
  }
 
  componentDidMount() {
    const { shopStore } = this.props.store
    shopStore.getCart()
    this.getGoodsInfo()
  }
  
  async getGoodsInfo() {
    const id = getCurrentInstance().router.params.id

    Taro.showLoading({ title:'loading', mask:true })
    const r = await req.post(urls.URL_LIST_GOODS)
    console.log(id,r.data.data)
    this.setState({ data: r.data.data[id-1]})
    Taro.hideLoading()
  }
  
  //关闭浮动弹窗
  closeFloat() {
    this.setState({
      isOpend: false
    })
  }
  //购买数量
  changeCount(count) {
    this.setState({
      count
    })
  }
  //点击购买按钮
  handleBuy() {
    this.setState({
      isOpend: true, isCart: false
    })
  }
  //点击加入购物车
  handelCart() {
    this.setState({
      isOpend: true, isCart: true
    })
  }

  confirmBuyOrAddCart() {
    const { shopStore } = this.props.store
    const { count, data } = this.state
    const id = Taro.getCurrentInstance().router.params.id
    if (!this.state.isCart) {//直接下单
      Taro.navigateTo({
        url: `/pages/shop_buy/index?id=${id}&count=${count}`,//支付页面
      })
      this.closeFloat()
    } else {//加购物车
      shopStore.addGoods(count, data)
      this.closeFloat()
    }
    this.setState({ count: 1 })
  }

  render() {

    // const height = Taro.getSystemInfoSync().windowHeight
    const { id, img_h1, img_h2,img_bd, name, spec, price, unit } = this.state.data
    const { shopStore: { cartList,sumCount } } = this.props.store
    return (
      <View className='goods'>
        <ScrollView
          scrollY
        // style={{ height }}
        >
          {/* <!-- 轮播图 --> */}
          <Swiper
            className='goods-swiper'
            indicatorColor='#999'
            indicatorActiveColor='#333'
            circular
            indicatorDots
          >
            <SwiperItem>
              <Image className='img' src={`${urls.API_SERVER}/${img_h1}`} />
            </SwiperItem>
            <SwiperItem>
              <Image className='img' src={`${urls.API_SERVER}/${img_h2}`} />
            </SwiperItem>
          </Swiper>
          {/* <!-- 商品详情 --> */}
          <View className='goods_top'>
            <View class='goods_name'>{name}</View>
            <View class='goods_desc'>{spec}/{unit}</View>
          </View>
          <View className='goods_price'>￥ {price}</View>
          <Image mode='widthFix' className='detail' src={`${urls.API_SERVER}/${img_bd}`} />
        </ScrollView>

        <View className='footer'>
          <View className='item-footer'>
            <View className='item-footer__nav' onClick={()=>Taro.switchTab({url: '/pages/order/index'})}>
              <Image className='item-footer__nav-img' src={require('../../static/icon_home.png')} />
            </View>
            <View className='item-footer__nav' onClick={()=>Taro.navigateTo({url: '/pages/shop_cart/index'})}>
              {cartList.length ? <AtBadge value={sumCount} maxValue={99}>
                <Image className='item-footer__nav-img' src={require('../../static/icon_cart.png')} />
              </AtBadge> : <Image className='item-footer__nav-img' src={require('../../static/icon_cart.png')} />}
            </View>
            {/* 底部弹窗 */}
            <AtFloatLayout  isOpened={this.state.isOpend} title="请选择购买数量" onClose={this.closeFloat.bind(this)}>
              <View className="buy-tags">
                <View>
                  <AtInputNumber
                    min={1}
                    max={99}
                    step={1}
                    size='large'
                    value={this.state.count}
                    onChange={this.changeCount.bind(this)}
                  />
                </View>
              </View>
              <View className="change-button">
                <Button onClick={this.confirmBuyOrAddCart.bind(this)}>选好了,{this.state.isCart ? '加入购物车' : '去付款'}</Button>
              </View>
            </AtFloatLayout>

            <View className='item-footer__buy' onClick={this.handleBuy.bind(this)}>
              <Text className='item-footer__buy-txt'>立即购买</Text>
            </View>
            <Button className="comp-button comp-button--primary" onClick={this.handelCart.bind(this)}>
              <Text className="comp-button__txt comp-button__txt--primary">
                加入购物车
              </Text>
            </Button>
          </View>
        </View>
      </View>
    )
  }
}

export default Shop_sp
