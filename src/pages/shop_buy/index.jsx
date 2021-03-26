import { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Image, Text,Input,Textarea } from '@tarojs/components'
import { observer, inject } from 'mobx-react'
import { getCurrentInstance } from '@tarojs/taro'
import { AtButton, AtInputNumber } from 'taro-ui'
import './index.less'


@inject('store')
@observer
class Shop_buy extends Component {
  constructor(props) {
    super(props)
    this.state = {
      buyList: [],
      sumPrice: 0,
      name:null,
      phone:null,
      addr:null,
    }
  }
  componentDidMount() {
    const params = getCurrentInstance().router.params
    const { shopStore: { cartList, sumPrice } } = this.props.store
    if (params.id) {  //从商品页直接下单
      //id查询商品信息替换下面这个data
      const data = {
        id: 2,
        img: 'http://lc-zJqDdcsx.cn-e1.lcfile.com/1854d11cec1b763115ea.jpg',
        img2: 'http://lc-zJqDdcsx.cn-e1.lcfile.com/3e7494d00f825828a155.png',
        title: '除味净',
        des: '500ml/瓶',
        price: '158',
        detail: 'http://lc-zJqDdcsx.cn-e1.lcfile.com/dc7bd8839f55ff1c59c6.jpg'
      }
      this.setState({
        buyList: [{ ...data, count: params.count }],
        sumPrice: params.count * data.price
      })
    } else {//从购物车下单
      this.setState({
        buyList: [...cartList],
        sumPrice: sumPrice
      })
    }
  }

  pay = () => {
    let { mainStore,shopStore } = this.props.store
    if(this.state.name&&this.state.phone&&this.state.addr){
      mainStore.pay(this.sumPrice)
    }else{
      Taro.showToast({
        title: '请填写完整收货人信息',
        icon: "none",
        duration: 1500
      })
    }
    
    const params = getCurrentInstance().router.params
    if (!params.id) { shopStore.clearCart() }
  }

  doInput=(params,e)=>{
    let data = {}
    data[params]=e.detail.value
    this.setState(data)
  }
  render() {
    const { buyList, sumPrice } = this.state
    return (
      <View className='buy'>
                <View className="m-form">
          <View className="m-row">
            <Input type="text" name="姓名" className="m-ipt" placeholderStyle='color:#eee' placeholder="请输入姓名..." onInput={this.doInput.bind(this,'name')}/>
          </View> 
          <View className="m-row">
            <Input type="number" name="联系方式" className="m-ipt"  placeholderStyle='color:#eee' placeholder="请输入联系方式..."  onInput={this.doInput.bind(this,'phone')}/>
          </View> 
          <View className="m-row">
            <Textarea name="收货地址" className="m-ipt m-textarea" style='textAlign:left;height:50rpx;padding:30rpx;'  placeholderStyle='color:#eee' placeholder="请输入收货地址..."  onInput={this.doInput.bind(this,'addr')} />
          </View> 
        </View> 
        {
          buyList.length ? buyList.map((item, index) => {
            return <View className="buy_list">
              <View className="buy_item">
                <View className="buy_item_left">
                  <Image src={item.img} />
                </View>
                <View className="buy_item_right">
                  <Text className="buy_item_right_title" numberOfLines={1}>{item.title}</Text>
                  <Text className="buy_item_right_spe">{item.desc}</Text>
                  <Text className="buy_item_right_price">单价 : ¥ {item.price} x {item.count}</Text>
                  {/* <View className="buy_item_right_buy-quantity">
                    <AtInputNumber
                      size="normal"
                      min={0}
                      max={99}
                      width={200}
                      value={item.count}
                      type="number"
                      disabled
                    />
                  </View> */}
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
                <AtButton className="button" type="primary" onClick={this.pay}>立即支付</AtButton>
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
