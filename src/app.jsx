import { Component } from 'react'
import { Provider, inject, observer } from 'mobx-react'
import { View, Button} from '@tarojs/components'
import Taro from '@tarojs/taro'
import mainStore from './store'
import shopStore from './store/shop'
import 'taro-ui/dist/style/index.scss'
import './app.less'
import dayjs from 'dayjs'
import req from './utils/request'
import * as urls from './constant/apis'


const store = {
  mainStore,shopStore
}

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      showLaunch: true,
    }
  }

  async componentDidMount () {
    Taro.showLoading({ title:'loading', mask:true })
    const res = await req.post(urls.GET_APP_DB)
    // console.log(res.data)
    mainStore.setDb(res.data)
    Taro.hideLoading()
  }


  render () {
    return (
      <Provider store={store}>
        {this.props.children}
      </Provider>
    )
  }
}

export default App
