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

const caluPoi=(n,count=0)=>{
  if (n==0) return 1;
  while(n>1) { n=n/10; count++; }
  return count
}


@inject('store')
@observer
class Index extends Component {
  constructor(props) {
    super(props)

    this.state = {
      type: getCurrentInstance().router.params.type,
      area: 0,
      poi: 0,
      goodsPrice: 0,
      techPrice: 0,
      insPrice: 0,
      techTime: 0,
      showArea: false,
      selArea: null,
      selTech: null,
      selSafe: false,
      selPoint: false,
    }
  }


  async componentDidMount() {
    switch(this.state.type) {
      case 'g':Taro.setNavigationBarTitle({title:'国标治理'});break;
      case 'm':Taro.setNavigationBarTitle({title:'母婴治理'});break;
    }
  }

  doShowArea=()=>{
    this.setState({showArea: true})
  }
  doCloseArea=()=>{
    this.setState({showArea: false})
  }

  caluPrint=(area, poi, selPoint,selTech)=>{
    let { selSafe } = this.state
    let db=this.props.store.mainStore.db[this.state.type]

    let ap = parseFloat(`${area}.${poi}`)
    ap = (ap<50)?50:ap

    // console.log('db'+this.props.store.mainStore.db)
    let goodsPrice = (ap*db.LM*db.GP).toFixed(2)
    let techPrice = (selTech!==null)?((ap-db.BASE_AR)*db.BASE_PR+db.SP+selTech*db.SP_F).toFixed(2):0
    let techTime  = (selTech!==null)?(techPrice/(db.ST+selTech*db.ST_F)).toFixed(2):0
    let insPrice  = (selSafe)?(parseInt(goodsPrice)+parseInt(techPrice))*db.INS.toFixed(2):0
    this.setState({
      area: area,
      poi:poi,
      selPoint:selPoint,
      selTech:selTech,
      goodsPrice:goodsPrice, 
      techPrice:techPrice, 
      techTime:techTime, 
      insPrice:insPrice,
    })
  }


  doInputArea=(n)=>{
    let {area, poi, selPoint, selTech } =this.state
    // 小数点部分
    if (selPoint) {
      if (caluPoi(poi)<2) {
        poi = poi*10+n
        this.caluPrint(area,poi,selPoint,selTech)
      }else{
        this.showMsg('error','只能输入二位小数')
      }
    }else{ //整数部分
      if (area<100) {
        area = area*10 + n
        this.caluPrint(area,poi,selPoint,selTech)
      }else{
        this.showMsg('error','输入面积不能超过三位数')
      }
    }
  }

  doDelArea=()=>{
    let {area, poi, selPoint,selTech } =this.state
    if (selPoint) {
      if (poi/10>1) {
        poi = parseInt(poi/10)
      }else{
        poi = 0
        selPoint = false
      }
    }else{
      area = (area/10>1)?parseInt(area/10):0
    }
    this.caluPrint(area,poi,selPoint,selTech)
  }

  showMsg=(status,msg)=>{
    $('.g-bd').append(`<g-msg class="is-show is-${status}">${msg}</g-msg>`)
  }

  doSelTech = (selTech)=>{
    let {selPoint, area, poi} = this.state
    this.caluPrint(area,poi,selPoint,selTech)
  }

  doSelSafe =()=>{
    let {insPrice, techPrice, goodsPrice} = this.state
    insPrice = (!this.state.selSafe)?(parseFloat(goodsPrice)+parseFloat(techPrice))*0.03.toFixed(2):0
    this.setState({selSafe:!this.state.selSafe, insPrice:insPrice})
  }
  doInputPoint=()=>{
    this.setState({selPoint: true})
  }
  doNext=()=>{
    let {goodsPrice, techPrice, insPrice} = this.state
    let { mainStore } = this.props.store
    let allPrice = (parseFloat(goodsPrice)+parseFloat(techPrice)+parseFloat(insPrice)).toFixed(2)
    mainStore.setArea(this.state.area)
    mainStore.setPoi(this.state.poi)
    mainStore.setSelTech(this.state.selTech)
    mainStore.setSelSafe(this.state.selSafe)
    mainStore.setAllPrice(allPrice)
    Taro.navigateTo({ url: `/pages/order_g_n1/index?type=${this.state.type}` })
  }

  render() {
    let {area, poi, showArea, goodsPrice, selTech, selSafe, techPrice, techTime, insPrice} = this.state
    
    return (
      <View className='g-bd g-orderg'>
        <View className="m-step m-step1">
          <View className="m-tl">1. 室内面积</View>
          <View className="m-bd">
            <View className="m-val" onClick={this.doShowArea}>{area}.{poi}</View>
            <Text>m</Text>
            <Text className="m-up">2</Text>
          </View> 
        </View>

        {(area!==0) &&
        <View className="m-result">
          <View className="m-wrap">
            <View className="m-tl" onClick={this.showMsg.bind(this,'error','ok')}>产品价格</View>
            <View className="m-bd">
              <View className="m-price" >{goodsPrice}</View>
              <Text className="m-unit">元</Text>
            </View>
          </View>
          <View className="m-wrap">
            <Text className="m-info">(预计使用甲醛净、除味剂产品的价格)</Text>
          </View>
        </View>}


        {(area!==0) &&
        <View className="m-step m-step2">
            <Text className="m-tl">2. 技术服务人员</Text>
            <View className="m-sel">
              <View className={(selTech==0)?"m-group sel":"m-group"} onClick={this.doSelTech.bind(this,0)}>
                <View className="m-item">中级</View>
                 + 
                <View className="m-item">高级</View>
              </View>
              <View className={(selTech==1)?"m-group sel":"m-group"} onClick={this.doSelTech.bind(this,1)}>
                <View className="m-item">高级</View>
                 + 
                <View className="m-item">高级</View>
              </View>
            </View> 
            <View className="m-wrap">
              <View className="m-tl">治理价格：</View>
              <View className="m-bd">{techPrice}</View>
              <Text className="m-unit">元</Text>
            </View> 
            <View className="m-wrap">
              <View className="m-tl">治理时长：</View>
              <View className="m-bd">{techTime}</View>
              <Text className="m-unit">小时</Text>
            </View> 
            <Text className="m-info">此价格包含2次检测及保质期内的多次复检</Text>
        </View>}

        {(selTech!==null)&&(area!==0) &&
        <View className="m-step m-step3">
          <View className="m-main">
            <Text className="m-tl">3. 是否需要保险 <Text className=" m-red">(3%)</Text></Text>
            <View className={(selSafe)?"m-chk sel":"m-chk"} onClick={this.doSelSafe}>
              是
            </View> 
          </View>
          <Text className="m-info">华泰保险承保，合同金额的3%，损坏家具照价赔偿</Text>
          <View className="m-wrap">
            <View className="m-tl">保险价格：</View>
            <View className="m-bd">{insPrice.toFixed(2)}</View>
            <Text className="m-unit">元</Text>
          </View> 
        </View>}

        {(selTech!==null)&&(area!==0) &&
        <View className="m-result">
          <View className="m-wrap">
            <Text className="m-tl">总计金额</Text>
            <View className="m-bd">
              <Text className="m-price">
                {(parseFloat(goodsPrice)+parseFloat(techPrice)+parseFloat(insPrice)).toFixed(2)}
              </Text>
              
              <Text className="m-unit">元</Text>
            </View>
          </View>
        </View>}

        {(selTech!==null)&&(area!==0) &&
        <View className="fn-btn-sb" onClick={this.doNext}>下一步</View>}

        

        { (showArea) &&
        <View className="g-area">
          <View className="m-wrap">
            {[...Array(9)].map((item,i)=>
              <View className="m-ipt" onClick={this.doInputArea.bind(this,i+1)}>{i+1}</View>
            )}
            <View className="m-ipt" onClick={this.doInputPoint}>.</View>
            <View className="m-ipt" onClick={this.doInputArea.bind(this,0)}>0</View>
            <View className="m-ipt m-ipt-del" onClick={this.doDelArea}><Image src={icon_del}></Image></View>
            <View className="m-ipt m-ipt-save" onClick={this.doCloseArea}>确认</View>
            
          </View>
        </View>}
        
      </View>
    )
  }
}

export default Index
