import { Component } from 'react'
import { View, Button, Text, Checkbox, CheckboxGroup } from '@tarojs/components'
import { observer, inject } from 'mobx-react'
import Taro from '@tarojs/taro'
import api from '../../constant/apis'
import req from '../../utils/request'
import { AtTag, AtIcon } from 'taro-ui'
import './index.less'


@inject('store')
@observer
class Index extends Component {
  constructor() {
    super(...arguments)
    this.state = {
      area: 0,

      areaList: [
        { area: '50-70', choose: false, dosage: 2 }, { area: '70-90', choose: false, dosage: 3 }, { area: '90-110', choose: false, dosage: 3.5 }, { area: '110-130', choose: false, dosage: 4 }, { area: '130-150', choose: false, dosage: 5 },
      ],
      dosage: 0,
      insurance: false
    }
  }

  async componentDidMount() {
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

  chooseArea(index, value) {
    console.log(index, value);//value.name
    const list = this.state.areaList
    for (let i = 0; i < 5; i++) {
      list[i].choose = false
    }
    list[index].choose = true
    this.setState({
      area: value.name,
      areaList: list,
      dosage: list[index].dosage
    })
  }
  check(e) {
    console.log(e.detail.value.length);
    if (e.detail.value.length) {
      this.setState({
        insurance: true
      })
    } else {
      this.setState({
        insurance: false
      })
    }
  }
  render() {
    // const { counterStore: { counter } } = this.props.store
    const { area, areaList, dosage, insurance } = this.state
    let arr = Array.from({ length: dosage }, (v, k) => k);//生成dosage长度的数组
    return (
      <View className='g-index'>
        <View className='area'>
          <View className="title">面积（m²）</View>
          <View className='area-tags'>
            {
              areaList.map((item, index) => {
                return <AtTag name={item.area} size='small' type='primary' active={item.choose} onClick={this.chooseArea.bind(this, index)}
                >
                  {item.area}
                </AtTag>
              })
            }
          </View>
          {area ? <View className='use'>
            {arr.map(() => {
              return <AtIcon value='star' ></AtIcon>
            })}
            {dosage == 3.5 ?
              <AtIcon value='loading' ></AtIcon>
              : null}
            {arr.map(() => {
              return <AtIcon value='star-2' ></AtIcon>
            })}
            {dosage == 3.5 ?
              <AtIcon value='loading' ></AtIcon>
              : null}
          </View> : null}
          {area ? <View className='area-price'>
            {2 * dosage} × {189} = <View className=''>{2 * dosage * 189}</View>
          </View> : null}
        </View>
        <View className='serve'>
          <View className="title">技术服务</View>
        </View>
        <View className='insurance'>
          <View className="title">保险</View>
          <CheckboxGroup onChange={this.check.bind(this)}>
            <Checkbox value={3} checked={false}>3%</Checkbox>
          </CheckboxGroup>
          <View className="insurance-price">{insurance ? 70 : 0}</View>
        </View>
        <View className='sum'>

        </View>
      </View>
    )
  }
}

export default Index
