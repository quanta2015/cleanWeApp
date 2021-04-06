import { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { View, Button, Text, Image } from '@tarojs/components'
import api from '../../constant/apis'
import req from '../../utils/request'
import Taro from '@tarojs/taro'
import './index.less'
import icon_del from '../../static/ico_del.png'
import { $ } from '@tarojs/extend'
import { getCurrentInstance } from '@tarojs/taro'


@inject('store')
@observer
class Index extends Component {
  constructor(props) {
    super(props)

    this.state = {
      type: getCurrentInstance().router.params.type,
      area: 0,
      goodsPrice: 0,
      showIpt: false,
      selArea: null,
    }
  }


  async componentDidMount() {
    switch(this.state.type) {
      case 's':Taro.setNavigationBarTitle({title:'溯源检测'});break;
      case 'c':Taro.setNavigationBarTitle({title:'CMA检测'});break;
    }
  }

  doShowIpt=()=>{
    this.setState({showIpt: true})
  }
  doCloseArea=()=>{
    this.setState({showIpt: false})
  }

  caluPrint=(area)=>{
    let db=this.props.store.mainStore.db[this.state.type]
    
    let goodsPrice = (((area<2)?2:area)*db.LM).toFixed(2)
    this.setState({
      area: area,
      goodsPrice:goodsPrice, 
    })
  }


  doInput=(n)=>{
    let {area} =this.state
    
    if (area<100) {
      area = area*10 + n
      this.caluPrint(area)
    }else{
      this.showMsg('error','输入点数不能超过三位数')
    }
    
  }

  doDelArea=()=>{
    let { area } =this.state
    area = (area/10>1)?parseInt(area/10):0
    this.caluPrint(area)
  }

  showMsg=(status,msg)=>{
    $('.g-bd').append(`<g-msg class="is-show is-${status}">${msg}</g-msg>`)
  }



  doNext=()=>{
    let {goodsPrice} = this.state
    let { mainStore } = this.props.store
    mainStore.setArea(this.state.area)
    mainStore.setAllPrice(goodsPrice)
    Taro.navigateTo({ url: `/pages/order_g_n1/index?type=${this.state.type}` })
  }

  render() {
    let {area, showIpt, goodsPrice} = this.state
    
    return (
      <View className='g-bd g-ordere'>
        <View className="m-step">
          <View className="m-head">
            <View className="m-tl">点位数量</View>
            <View className="m-bd">
              <View className="m-val" onClick={this.doShowIpt}>{area}</View>
              <Text>个</Text>
            </View> 
          </View>
          
          <View className="m-tail">
            <Text className="m-info">(最低2个点起测)</Text>
          </View>

        </View>
        <View className="m-help">
          <View className="m-tl"> HELP: 如何计算点位数量</View>
          <View className="m-main">
            <View className="m-li" >1. 全部选点: 即按房间数量设置检测点，比如一室一厅就是2个点，三室一厅90平方左右就是4个点。</View>
            <View className="m-li" >2. 部分选点: 即按几个重点房间来设置检测点，比如选择小孩房和主卧就是2个点。</View>
            <View className="m-li" >3. 选择特例: 厨房和厕所不属于检测设点的对象。</View>
          
          </View>
        </View>

        {(area!==0) &&
        <View className="m-result">
          <View className="m-wrap">
            <View className="m-tl" onClick={this.showMsg.bind(this,'error','ok')}>检测价格</View>
            <View className="m-bd">
              <View className="m-price" >{goodsPrice}</View>
              <Text className="m-unit">元</Text>
            </View>
          </View>
          
        </View>}

        {(area!==0) &&
        <View className="fn-btn-sb" onClick={this.doNext}>下一步</View>}

        { (showIpt) &&
        <View className="g-ipt">
          <View className="m-wrap">
            {[...Array(9)].map((item,i)=>
              <View className="m-ipt" onClick={this.doInput.bind(this,i+1)}>{i+1}</View>
            )}
            <View className="m-ipt m-ipt-del" onClick={this.doDelArea}><Image src={icon_del}></Image></View>
            <View className="m-ipt" onClick={this.doInput.bind(this,0)}>0</View>
            <View className="m-ipt m-ipt-save" onClick={this.doCloseArea}>确认</View>
          </View>
        </View>}
        
      </View>
    )
  }
}

export default Index
