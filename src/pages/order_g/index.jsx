import { Component } from 'react'
import { View, Button, Text } from '@tarojs/components'
import { observer, inject } from 'mobx-react'
import Taro from '@tarojs/taro'
import api from '../../constant/apis'
import req from '../../utils/request'
import { AtTag } from 'taro-ui'
import './index.less'


@inject('store')
@observer
class Index extends Component {
  constructor() {
    super(...arguments)
    this.state = {
      areaList: [
        { area: '50-70', choose: false, dosage: 2 }, { area: '70-90', choose: false, dosage: 3 }, { area: '90-110', choose: false, dosage: 3.5 }, { area: '110-130', choose: false, dosage: 4 }, { area: '130-150', choose: false, dosage: 5 },
      ],
      dosage:0,
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
    console.log(index, value);
    const list = this.state.areaList
    for (let i = 0; i < 5; i++) {
      list[i].choose = false
    }
    list[index].choose = true
    this.setState({
      areaList: list,
      dosage:list[index].dosage
    })
  }

  render() {
    // const { counterStore: { counter } } = this.props.store
    return (
      <View className='g-index'>
        <View className='area'>
          <View>面积</View>
          <View className='area-tags'>
            {
              this.state.areaList.map((item, index) => {
                return <AtTag name={item.area} size='small' type='primary' active={item.choose} onClick={this.chooseArea.bind(this, index)}
                >
                  {item.area}
                </AtTag>
              })
            }
          </View>
          <View className='use'>
            用量图片{this.state.dosage}
          </View>
        </View>
        <View className='serve'>

        </View>
        <View className='insurance'>

        </View>
        <View className='sum'>

        </View>
      </View>
    )
  }
}

export default Index
