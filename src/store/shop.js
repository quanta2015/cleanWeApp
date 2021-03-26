import { observable,action } from 'mobx'
import Taro from '@tarojs/taro'

class shopStore {
  @observable cartList= []
  @observable sumCount=0
  @observable sumPrice=0

  @action addGoods(count,goods) {
    let index=this.cartList.findIndex(item => item.id == goods.id)
    if(index>=0){
      //购物车存在该商品，直接增加该商品count
      this.cartList[index].count+=count
    }else{
      //购物车不存在该商品，push新商品，加一个count属性
      this.cartList.push(goods)
      this.cartList[this.cartList.length-1].count=count
    }
    this.calculateSum()
    this.saveCart()
  }

  @action calculateSum(){
    //计算商品总数、总价
    this.sumCount = this.cartList.reduce((sum, e) => sum + e.count, 0)
    this.sumPrice = this.cartList.reduce((sum, e) => sum + e.count*e.price, 0)
  }

  @action changeCount(index,value){
    if(value==0){
      this.cartList.splice(index,1)
    }else{
      this.cartList[index].count=value
    }
    this.calculateSum()
    this.saveCart()
  }

  @action saveCart(){
    Taro.setStorage({
      key:"cartList",
      data:this.cartList
    })
  }
  @action getCart(){
    const that=this;
    Taro.getStorage({
      key: 'cartList',
      success: function (res) {
        that.cartList=res.data
        that.calculateSum()
      }})
  }

  @action clearCart() {
    this.cartList=[]
    this.saveCart()
  }
  
}

export default new shopStore()