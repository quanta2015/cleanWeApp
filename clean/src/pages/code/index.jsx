import { Component } from 'react'
import { View, Text ,Image } from '@tarojs/components'
// import { observer, inject } from 'mobx-react'
import Taro from '@tarojs/taro'
import './index.less'
import {API_SERVER} from '../../constant/apis'


class Intro extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      user: '',
      logo: '',
      city: '',
      prov: '',
    }
  }

  onShareAppMessage (res) {
    return { title: '艾尔森净化', imageUrl:`${urls.API_SERVER}/cdn/welogos.png`,path: '/pages/order/index' }
  }
  onShareTimeline () {
    return {}
  }

  componentDidShow() {
    let u = Taro.getStorageSync('user')
    let user = (u)?JSON.parse(u):null
    if (user!==null) {
      this.setState({ user:user.name, logo: user.img, prov:user.prov,city:user.city})
    }
    console.log(u)
  }

  // doSave =(e)=>{
    
  //   let _this = this
  //   let qrPath = `${API_SERVER}/cdn/wecode.png`
  //   e.stopPropagation();

  //   Taro.getSetting({
  //     success (res) {
  //       if (!res.authSetting['scope.writePhotosAlbum']) {
  //         Taro.authorize({
  //           scope:'scope.writePhotosAlbum',
  //             success: () => {
  //               _this.downloadImgToAlbum(qrPath);
  //             },
  //             fail: () => {
  //               _this.setState({
  //                   openSetting:true
  //               })
  //             }
  //         })
  //       } else { 
  //           _this.downloadImgToAlbum(qrPath);
  //       }
  //     }
  //   })
  // }

  downloadImgToAlbum (prPath) {
    this.showMsg('正在保存，请稍等')
    this.downloadHttpImg(prPath).then((res)=>{
        this.saveImgInner(res)
    })
  }

  downloadHttpImg =(file) =>{
    let _this=this
    return new Promise(((resolve) => {
      Taro.downloadFile({
        url: file,
        success: (res) => {
          if (res.statusCode ===200) {
            resolve(res.tempFilePath)
          } else {
            _this.showMsg('图片下载失败！')
          }
        },
        fail: () => {
          _this.showMsg('图片下载失败！')
        }
      })
    }))
  }

  // sharePosteCanvas =(imgUrl)=> {
  //   let _this=this
  //   Taro.saveImageToPhotosAlbum({
  //     filePath: imgUrl,
  //     success () { _this.showMsg('图片已保存到相册') },
  //     fail ()    { _this.showMsg('图片保存失败') },
  //   })
  // }

  showMsg=(msg)=> {
    Taro.showToast({ title:msg, icon:'none', duration:1000 })
  }

  doSave =(e)=>{
    
    let _this = this
    let url = `${API_SERVER}/cdn/wecode.png`
    e.stopPropagation();

    wx.showActionSheet({
      itemList: ['保存到相册'],
      success(res) {
        wx.getSetting({
          success: (res) => {
            if (!res.authSetting['scope.writePhotosAlbum']) {
              wx.authorize({
                scope: 'scope.writePhotosAlbum',
                success: () => { _this.downloadImgToAlbum(url) },
                fail: (res) => {
                  wx.showModal({
                    title: '保存失败',
                    content: '请开启访问手机相册权限',
                    success(res) {
                      wx.openSetting()
                    }
                  })
                }
              })
            } else {
              _this.downloadImgToAlbum(url)
            }
          }
        })   
      },
      fail(res) {
        console.log(res.errMsg)
      }
    })
  }

  saveImgInner =(url)=> {
    console.log(url)
    wx.getImageInfo({
      src: url,
      success: (res) => {
        let path = res.path;



        wx.saveImageToPhotosAlbum({
          filePath: path,
          success: (res) => {
            console.log(res);
            wx.showToast({
                title: '已保存到相册',
            })
          },
          fail: (res) => {
            console.log(res);
          }
        })
      },
      fail: (res) => {
        console.log(res);
      }
  })
}

  render () {
    let {user,logo,prov,city} = this.state
    return (
      <View className='g-code'>
        <View className="m-code">
          <View className="m-usr">
            <Image src={logo}></Image>
            <View className="m-info">
              <View className="m-name">{user}</View>
              <View className="m-prov">{prov} {city}</View>
            </View> 
          </View>
          <View className="m-logo" >
            <Image src={`${API_SERVER}/cdn/wecode.png`} onLongPress={this.doSave.bind(this)}></Image>
          </View> 
          <View className="m-ft">
            扫一扫上面的二维码图案，加微信小程序
          </View> 
        </View>
      </View>
    )
  }
}

export default Intro
