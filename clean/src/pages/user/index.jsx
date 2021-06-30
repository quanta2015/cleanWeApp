import { Component } from 'react'
import { View, Button, Text, Image } from '@tarojs/components'
import { observer, inject } from 'mobx-react'
import Taro from '@tarojs/taro'
import './index.less'
import icon_arrow from '../../static/ico_right.png' 
import icon_goods from '../../static/ico_goods.png' 
import icon_order from '../../static/ico_order.png' 
import icon_we from '../../static/ico_we.png' 


var USER_NAME = '请登录'
var USER_LOGO = '../../static/ico_user.png'

@inject('store')
@observer
class User extends Component {

  constructor(props) {
    super(props)
    
    this.store = this.props.store.mainStore
    this.state = {
      user: USER_NAME,
      logo: USER_LOGO,
    }
  }

  onShareAppMessage (res) {
    return { title: '艾尔森进化', imageUrl:`${urls.API_SERVER}/cdn/welogos.png`,path: '/pages/order/index' }
  }
  onShareTimeline () {
    return {}
  }
  

  componentDidShow() {
    let u = Taro.getStorageSync('user')
    let user = (u)?JSON.parse(u):null
    if (user!==null) {
      console.log(user)
      this.setState({ user:user.name, logo: user.img})
    }
  }

  doLogin =() =>{
    Taro.navigateTo({ url: `/pages/launch/index` })
  }

  doLogout =()=> {
    this.setState({user:USER_NAME, logo: USER_LOGO})
    Taro.setStorageSync('user',null)
    Taro.switchTab({ url: `/pages/order/index` })
  } 

  doShowOrder=()=>{
    Taro.navigateTo({ url: `/pages/his_order/index` })
  }
  doShowGoods=()=>{
    Taro.navigateTo({ url: `/pages/his_shopping/index` })
  }
  doShowCode=()=>{
    Taro.navigateTo({ url: `/pages/code/index` })
  }


  render () {
    // console.log('user'+this.state.user)

    return (
      <View className='g-user'>
        <View className="m-row" onClick={this.doLogin}>
          <View className="m-logo">
            <Image src={this.state.logo}></Image>
          </View>
          <View className="m-login">{this.state.user}</View>
          { (this.state.user===USER_NAME) &&
          <View className="m-arrow">
            <Image src={icon_arrow}></Image>
          </View>}
        </View>
        <View className="m-sect">
          { (this.state.user!==USER_NAME) &&
          <View className="m-row" onClick={this.doShowOrder}>
            <View className="m-icon">
              <Image src={icon_order}></Image>
            </View>
            <Text className="m-txt">历史订单</Text>
            <View className="m-arrow">
              <Image src={icon_arrow}></Image>
            </View>
          </View> }

          { (this.state.user!==USER_NAME) &&
          <View className="m-row" onClick={this.doShowGoods}>
            <View className="m-icon">
              <Image src={icon_goods}></Image>
            </View>
            <Text className="m-txt">历史购物</Text>
            <View className="m-arrow">
              <Image src={icon_arrow}></Image>
            </View>
          </View> }

          <View className="m-row" onClick={this.doShowCode}>
            <View className="m-icon">
              <Image src={icon_we}></Image>
            </View>
            <Text className="m-txt">分享好友</Text>
            <View className="m-arrow">
              <Image src={icon_arrow}></Image>
            </View>
          </View> 
        </View>
        { (this.state.user!==null)&&(this.state.user!="请登录") &&
        <View className="fn-btn-sb" onClick={this.doLogout}>退出登录</View> }
        
      </View>
    )
  }
}

export default User
