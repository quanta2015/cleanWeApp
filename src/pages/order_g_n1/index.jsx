import { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { View, Button, Text, Textarea, Input, Picker } from '@tarojs/components'
import api from '../../constant/apis'
import req from '../../utils/request'
import './index.less'
import icon_del from '../../assets/icon_del.png'
import { $ } from '@tarojs/extend'
import Taro from '@tarojs/taro'
import { getCurrentInstance } from '@tarojs/taro'

const eof = (data)=> (data!==null)&&(data!=='')

@inject('store')
@observer
class Index extends Component {
  constructor(props) {
    super(props)

    this.state = {
      type: getCurrentInstance().router.params.type,
      name:null,
      phone:null,
      addr:null,
      dateSel: null,
      showNext: false,
    }
  }

  async componentDidMount() {
    switch(this.state.type) {
      case 'g':Taro.setNavigationBarTitle({title:'国标治理'});break;
      case 'm':Taro.setNavigationBarTitle({title:'母婴治理'});break;
    }
    
  }

  onDateChange = e => {
    this.setState({
      dateSel: e.detail.value
    })
  }

  doNext =()=>{
    Taro.navigateTo({ url: `/pages/order_g_n2/index?type=${this.state.type}` })
  }

  doInput=(params,e)=>{
    let data = {}
    data[params]=e.detail.value
    this.setState(data)
  }
  
  render() {
    let { name, addr, phone, dateSel} = this.state
    let showNext = eof(name)&&eof(phone)&&eof(addr)&&eof(dateSel)

    return (
      <View className='g-bd g-orderg_n1'>
        <View className="m-form">
          <View className="m-row">
            <Input type="text" name="姓名" className="m-ipt" placeholderStyle='color:#eee' placeholder="请输入姓名..." onInput={this.doInput.bind(this,'name')}/>
          </View> 
          <View className="m-row">
            <Input type="number" name="联系方式" className="m-ipt"  placeholderStyle='color:#eee' placeholder="请输入联系方式..."  onInput={this.doInput.bind(this,'phone')}/>
          </View> 
          <View className="m-row">
            <Textarea name="服务地址" className="m-ipt m-textarea" style='textAlign:left;height:50rpx;padding:30rpx;'  placeholderStyle='color:#eee' placeholder="请输入服务地址..."  onInput={this.doInput.bind(this,'addr')} />
          </View> 
        </View> 
        <View className="m-form">
          <View className="m-row">
            <Text className="m-tl">预约时间</Text>
            <Picker className='m-ipt m-data-picker' mode='date' onChange={this.onDateChange}>
              <View className='m-picker-pld'>
                <Text className="m-pld"> </Text> {this.state.dateSel}
              </View>
            </Picker>
          </View>
          <View className="m-row m-row-c">
            <Text className="m-info">
              说明：预约甲醛检测治理至少须提前一天
            </Text>
            <Text className="m-info">
              服务热线：4000-253-123
            </Text>
            <Text className="m-info">
              治理客户10年质保，每年一次上门复检。
            </Text>
          </View>
        </View> 
        
        {(showNext)&&
        <View className="fn-btn-sb" onClick={this.doNext}>下一步</View>}
        
      </View>
     
    )
  }
}

export default Index
