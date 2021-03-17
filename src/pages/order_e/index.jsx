import { Component } from 'react'
import { View, Button, Text, Image } from '@tarojs/components'
import { observer, inject } from 'mobx-react'
import Taro from '@tarojs/taro'
import api from '../../constant/apis'
import req from '../../utils/request'
import './index.less'

@inject('store')
@observer
class Index extends Component {

  constructor(props) {
    super(props)

    this.state = {
      data: { area:{ price: 189, amount: [2,3,3.5,4,5]},
              tech:{ hprice:200, lprice: 150, amount:[2.5,3,3.5,4,5], price:[350,400], info:['初级+高级','高级+高级']}
            },
      selArea:null,
      selTech:null,
      selSafe:false,
    }
  }

  async componentDidMount () {
    // try {
    //   const res = await req.post('/getDataList',{aa:'b'})
    //   console.log(res.data)
    //   this.setState({
    //     data: res.data,
    //     loading: false
    //   })
    // } catch (error) {
    //   Taro.showToast({
    //     title: '载入远程数据错误'
    //   })
    // }
  }

  doSelArea = (e)=>{
    this.setState({selArea: e})
  }

  doSelTech = (e)=>{
    this.setState({selTech: e})
  }

  doSelSafe =()=>{
    this.setState({selSafe:!this.state.selSafe})
  }

  render () {
    let {selArea, data, selTech, selSafe}= this.state
    let areaPrice = (selArea!==null)?data.area.amount[selArea]*2*data.area.price:0

    console.log(data.area.amount[selArea])
    // const { counterStore: { counter } } = this.props.store
    return (
      <View className='g-orderg'>
         <View className="m-step">
            <Text className="m-tl">1. 请选择面积</Text>
            <View className="m-sel">
              <View className={(selArea==0)?"m-area sel":"m-area"} onClick={this.doSelArea.bind(this,0)}>
                <Text className="u-nb">50</Text>
                <Text className="u-nb">70</Text>
              </View>
              <View className={(selArea==1)?"m-area sel":"m-area"} onClick={this.doSelArea.bind(this,1)}>
                <Text className="u-nb">70</Text>
                <Text className="u-nb">90</Text>
              </View>
              <View className={(selArea==2)?"m-area sel":"m-area"} onClick={this.doSelArea.bind(this,2)}>
                <Text className="u-nb">90</Text>
                <Text className="u-nb">100</Text>
              </View>
              <View className={(selArea==3)?"m-area sel":"m-area"} onClick={this.doSelArea.bind(this,3)}>
                <Text className="u-nb">100</Text>
                <Text className="u-nb">130</Text>
              </View>
              <View className={(selArea==4)?"m-area sel":"m-area"} onClick={this.doSelArea.bind(this,4)}>
                <Text className="u-nb">130</Text>
                <Text className="u-nb">150</Text>
              </View>
            </View> 
         </View>

         {(selArea!==null) &&
          <View className="m-step m-step2">
            <Text className="m-tl">2. 请选择技术服务人员</Text>
            <View className="m-sel">
              <View className={(selTech==0)?"m-group sel":"m-group"} onClick={this.doSelTech.bind(this,0)}>
                <View className="m-item">
                  <Text className="m-h">初级</Text>
                  <Text className="m-p">150元/小时</Text>
                </View>
                 + 
                <View className="m-item">
                  <Text className="m-h">高级</Text>
                  <Text className="m-p">200元/小时</Text>
                </View>
              </View>
              <View className={(selTech==1)?"m-group sel":"m-group"} onClick={this.doSelTech.bind(this,1)}>
                <View className="m-item">
                  <Text className="m-h">高级</Text>
                  <Text className="m-p">200元/小时</Text>
                </View>
                 + 
                <View className="m-item">
                  <Text className="m-h">高级</Text>
                  <Text className="m-p">200元/小时</Text>
                </View>
              </View>
            </View> 
          </View>}

         {(selTech!==null) &&
          <View className="m-step m-step3">
            <Text className="m-tl">3. 是否需要保险 <Text className=" m-red">(3%)</Text></Text>

            <View className={(selSafe)?"m-chk sel":"m-chk"} onClick={this.doSelSafe}>
              是
            </View> 
          </View>}

         <View className="m-sep"></View>

         {(selArea!==null) && 
          <View className="m-ret">
            <View className="m-wrap">
              <View className="m-q">
                <Text>除醛 {data.area.amount[selArea]}L</Text>
              </View>
              <View className="m-q">
                <Text>除味 {data.area.amount[selArea]}L</Text>
              </View>
            </View>
            <View className="m-calu">
              <Text className="m-c1">
                {data.area.amount[selArea]*2} × {data.area.price}
              </Text>
              <Text className="m-c2">
                {areaPrice}
              </Text>
            </View>
         </View>
         }

         {(selTech!==null) && 
          <View className="m-ret">
              <View className="m-wrap">
                <View className="m-q">
                  <Text>{data.tech.info[selTech]} {data.area.amount[selTech]}小时</Text>
                </View>
              </View>
              <View className="m-calu">
                <Text className="m-c1">
                  {data.tech.amount[selTech]} × {data.tech.price[selTech]}
                </Text>
                <Text className="m-c2">
                  {data.tech.amount[selTech]*data.tech.price[selTech]}
                </Text>
              </View>
         </View>
         }

         {(selSafe) && 
          <View className="m-ret">
              <View className="m-wrap">
                <View className="m-q">
                  <Text>保险 3%</Text>
                </View>
              </View>
              <View className="m-calu">
                <Text className="m-c1">
                {data.tech.amount[selTech]*data.tech.price[selTech] + data.area.amount[selArea]*2*data.area.price} × 3%
                </Text>
                <Text className="m-c2">
                  {parseInt((data.tech.amount[selTech]*data.tech.price[selTech] + data.area.amount[selArea]*2*data.area.price)*0.03)}
                </Text>
              </View>
         </View>}

         {(selTech!==null) && 
          <View className="m-total">
              <View className="m-head">
                总计
              </View>
              <View className="m-tail">
                2190
              </View>
         </View>}



        {(selTech!==null) &&
         <View className="m-btn">
            下一步
         </View>}

      </View>
    )
  }
}

export default Index
