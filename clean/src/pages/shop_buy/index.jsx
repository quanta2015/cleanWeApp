import { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Image, Text, Input, Textarea } from '@tarojs/components'
import { observer, inject } from 'mobx-react'
import { getCurrentInstance } from '@tarojs/taro'
import { AtButton, AtInputNumber } from 'taro-ui'
import req from '../../utils/request'
import * as urls from '../../constant/apis'
import './index.less'


@inject('store')
@observer
class Shop_buy extends Component {
  constructor(props) {
    super(props)
    this.state = {
      buyList: [],
      sumPrice: 0,
      name: null,
      phone: null,
      addr: null,
    }
  }
  async componentDidMount() {
    const params = getCurrentInstance().router.params
    const { shopStore: { cartList, sumPrice } } = this.props.store
    if (params.id) {  //从商品页直接下单
      const r = await req.post(urls.URL_LIST_GOODS)
      // console.log(params.id, r.data.data)
      const data = r.data.data[params.id - 1]

      this.setState({
        buyList: [{ ...data, count: params.count }],
        sumPrice: params.count * data.price
      })
    } else {//从购物车下单
      await this.setState({
        buyList: [...cartList],
        sumPrice: sumPrice
      })
    }
  }

  async pay  ()  {
    const p = getCurrentInstance().router.params
    let { mainStore, shopStore } = this.props.store
    let data=this.state
    let string=[]
    if (this.state.name && this.state.phone && this.state.addr) {
      // 格式化buyList
      this.state.buyList.map((item)=>{
        string.push(item.id+"*"+item.count)
      })
      string=string.join("|")
      data.buyList=string
      console.log(data);//传参

      await mainStore.payGoods(data)
      p.id || shopStore.clearCart()
    } else {
      Taro.showToast({
        title: '请填写完整收货人信息',
        icon: "none",
        duration: 1500
      })
    }
  }

  

  doInput = (params, e) => {
    let data = {}
    data[params] = e.detail.value
    this.setState(data)
  }
  render() {
    const { buyList, sumPrice } = this.state
    return (
      <View className='buy'>
        <View className="m-form">
          <View className="m-row">
            <Input type="text" name="姓名" className="m-ipt" placeholderStyle='color:#eee' placeholder="请输入姓名..." onInput={this.doInput.bind(this, 'name')} />
          </View>
          <View className="m-row">
            <Input type="number" name="联系方式" className="m-ipt" placeholderStyle='color:#eee' placeholder="请输入联系方式..." onInput={this.doInput.bind(this, 'phone')} />
          </View>
          <View className="m-row">
            <Textarea name="收货地址" className="m-ipt m-textarea" style='textAlign:left;height:50rpx;padding:30rpx;' placeholderStyle='color:#eee' placeholder="请输入收货地址..." onInput={this.doInput.bind(this, 'addr')} />
          </View>
        </View>
        {
          buyList.length ? buyList.map((item, index) => {
            return <View className="buy_list">
              <View className="buy_item">
                <View className="buy_item_left">
                  <Image src={`${urls.API_SERVER}/${item.img_h1}`} />
                </View>
                <View className="buy_item_right">
                  <Text className="buy_item_right_title" numberOfLines={1}>{item.name}</Text>
                  <Text className="buy_item_right_spe">{item.spec}/{item.unit}</Text>
                  <Text className="buy_item_right_price">单价 : ¥ {item.price} x {item.count}</Text>
                </View>
              </View>
            </View>
          }) : null
        }
        {
          buyList.length ?
            <View className="buy_footer">
              <View className="left">
                <Text className="await-pay">合计： </Text>
                <Text className="amount-money">¥ {sumPrice}</Text>
              </View>
              <View className="right">
                <AtButton className="button" type="primary" onClick={this.pay.bind(this)}>立即支付</AtButton>
              </View>
            </View>
            :
            null
        }
      </View>
    )
  }
}

export default Shop_buy
