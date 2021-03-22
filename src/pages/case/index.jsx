import { Component } from 'react'
import { View, Button, Text, Image } from '@tarojs/components'
import { observer, inject } from 'mobx-react'

import './index.less'

var API_SERVER = "https://mooc.hznu.edu.cn/cdn/"


@inject('store')
@observer
class Case extends Component {
  constructor(props) {
    super(props)

    this.state = {
      db: this.props.store.mainStore.db.case,
    }
  }

  componentDidMount () { 
    

  }


  render () {
    let {db} = this.state

    console.log(db)
    return (
      <View className='g-case'>
        <View className="m-title">
          <Text className="m-li">艾尔森环保</Text>
          <Text className="m-li">专业除醛品牌</Text>
          <Text className="m-li">百万家庭的共同选择</Text>
        </View> 
        <View className="m-tl">艾尔森服务案例</View>
        <View className="m-case">
          {db.map((item,i)=>
            <View className="m-item">
              <View className="m-head">
                <View className="m-name">{item.name}</View>
              </View>
              
              <View className="m-pic"><Image src={`${API_SERVER}${item.img}?${Math.random()/9999}`}></Image></View>
              
            </View>
          )}
        </View> 
      </View>
    )
  }
}

export default Case
