import { Component } from 'react'
import { View, Button, Text } from '@tarojs/components'
import { observer, inject } from 'mobx-react'
import Taro from '@tarojs/taro'
import api from '../../constant/apis'

import './index.less'



var _CITY = ['河北省邯郸市','河北省保定市','河北省张家口市','山西省大同市','内蒙呼和浩特市','辽宁省本溪市','辽宁省丹东市','辽宁省锦州市','辽宁省阜新市','辽宁省辽阳市','黑龙江省鸡西市','黑龙江省鹤岗市','黑龙江省大庆市','黑龙江省伊春市','黑龙江省佳木斯市','黑龙江省牡丹江市','江苏省无锡市','江苏省常州市','江苏省苏州市','浙江省宁波市','安徽省合肥市','安徽省淮南市','安徽省淮北市','福建省厦门市','山东省枣庄市','山东省烟台市','山东省潍坊市','山东省泰安市','山东省临沂市','河南省开封市','河南省洛阳市','河南省平顶山市','河南省安阳市','河南省新乡市','河南省焦作市','湖北省黄石市','湖北省襄樊市','湖北省荆州市','湖南省株洲市','湖南省湘潭市','湖南省衡阳市','广东省深圳市','广东省汕头市','广东省湛江市','广西南宁市','广西柳州市','青海省西宁市','河北省秦皇岛市','河北省邢台市','河北省承德市','河北省沧州市','河北省廊坊市','河北省衡水市','山西省阳泉市','山西省长治市','内蒙乌海市','内蒙赤峰市','辽宁省营口市','辽宁省盘锦市','辽宁省铁岭市','辽宁省朝阳市','辽宁省葫芦岛市','吉林省四平市','吉林省辽源市','吉林省通化市','吉林省白山市','吉林省松原市','吉林省白城市','黑龙江省双鸭山市','黑龙江省七台河市','江苏省南通市','江苏省连云港市','江苏省淮阴市','江苏省盐城市','江苏省扬州市','江苏省镇江市','江苏省泰州市','浙江省温州市','浙江省嘉兴市','浙江省湖州市','浙江省绍兴市','浙江省台州市','安徽省芜湖市','安徽省蚌埠市','安徽省马鞍山市','安徽省铜陵市','安徽省安庆市','安徽省阜阳市','福建省泉州市','福建省漳州市','福建省南平市','福建省龙岩市','江西省景德镇市','江西省萍乡市','江西省九江市','江西省新余市','山东省东营市','山东省济宁市','山东省威海市','山东省日照市','山东省莱芜市','山东省德州市','河南省鹤壁市','河南省濮阳市','河南省许昌市','河南省漯河市','河南省南阳市','河南省商丘市','湖北省十堰市','湖北省宜昌市','湖北省鄂州市','湖北省荆门市','湖北省孝感市','湖北省黄冈市','湖南省邵阳市','湖南省岳阳市','湖南省常德市','湖南省益阳市','湖南省郴州市','湖南省永州市','湖南省怀化市','广东省韶关市','广东省珠海市','广东省佛山市','广东省江门市','广东省茂名市','广东省肇庆市','广东省惠州市','广东省梅州市','广东省阳江市','广东省东莞市','广东省中山市','广东省潮州市','广西桂林市','广西梧州市','广西贵港市','海南省海口市','四川省自贡市','四川省攀枝花市','四川省泸州市','四川省德阳市','四川省绵阳市','四川省广元市','四川省遂宁市','四川省内江市','四川省乐山市','四川省南充市','四川省宜宾市','贵州省六盘水市','贵州省遵义市','云南省曲靖市','陕西省铜川市','陕西省宝鸡市','陕西省咸阳市','陕西省汉中市','甘肃省白银市','甘肃省天水市','宁夏银川市','宁夏石嘴山市','新疆克拉玛依市'];
var _FN = ['赵','钱','孙','李','周','吴','郑','王','冯','陈','褚','卫','蒋','沈','韩','杨','朱','秦','尤','许','何','吕','施','张','孔','曹','严','华','金','魏','陶','姜','戚','谢','邹','喻','柏','水','窦','章','云','苏','潘','葛','奚','范','彭','郎','鲁','韦','昌','马','苗','凤','花','方','俞','任','袁','柳','酆','鲍','史','唐','费','廉','岑','薛','雷','贺','倪','汤','滕','殷','罗','毕','郝','邬','安','常','乐','于','时','傅','皮','卞','齐','康','伍','余','元','卜','顾','孟','平','黄','和','穆','萧','尹','姚','邵','湛','汪','祁','毛','禹','狄','米','贝','明','臧','计','伏','成','戴','谈','宋','茅','庞','熊','纪','舒','屈','项','祝','董','粱','杜','阮','蓝','闵','席','季','麻','强','贾','路','娄','危','江','童','颜','郭','梅','盛','林','刁','钟','徐','邱','骆','高','夏','蔡','田','樊','胡','凌','霍','虞','万','支','柯','昝','管','卢','莫','经','房','裘','缪','干','解','应','宗','丁','宣','贲','邓','郁','单','杭','洪','包','诸','左','石','崔','吉','钮','龚','程','嵇','邢','滑','裴','陆','荣','翁','荀','羊','於','惠','甄','麴','家','封','芮','羿','储','靳','汲','邴','糜','松','井','段','富','巫','乌','焦','巴','弓','牧','隗','山','谷','车','侯','宓','蓬','全','郗','班','仰','秋','仲','伊','宫','宁','仇','栾','暴','甘','钭','厉','戎','祖','武','符','刘','景','詹','束','龙','叶','幸','司','韶','郜','黎','蓟','薄','印','宿','白','怀','蒲','邰','从','鄂','索','咸','籍','赖','卓','蔺','屠','蒙','池','乔','阴','欎','胥','能','苍','双','闻','莘','党','翟','谭','贡','劳','逄','姬','申','扶','堵','冉','宰','郦','雍','舄','璩','桑','桂','濮','牛','寿','通','边','扈','燕','冀','郏','浦','尚','农','温','别','庄','晏','柴','瞿','阎','充','慕','连','茹','习','宦','艾','鱼','容','向','古','易','慎','戈','廖','庾','终','暨','居','衡','步','都','耿','满','弘','匡','国','文','寇','广','禄','阙','东','殴','殳','沃','利','蔚','越','夔','隆','师','巩','厍','聂','晁','勾','敖','融','冷','訾','辛','阚']
var _HD_TIME,_AD_TIME;


const sleep = async (fn,time)=> {
  return new Promise(resolve=>{
    setTimeout(()=>{
      resolve()
    },time)
  })
}

@inject('store')
@observer
class Index extends Component {

  constructor(props) {
    super(props)

    this.state = {
      count: 10128,
      adv: '已经下单',
      opacity:0,
    }
  }

  async componentDidMount () {
    let a= Taro.createSelectorQuery()
    

    this.doTimer()
    Taro.setNavigationBarTitle({title:'预约服务'})
  }

  componentWillUnmount() {
    clearTimeout(_HD_TIME)
    clearTimeout(_AD_TIME)
  }

  randomTime =(min,max)=>{
    let time = Math.floor(Math.random()*(max-min+1)+min)
    return time
  }

  doWait =()=>{
    _AD_TIME = setTimeout(()=>{ this.doHide() },800) 
  }

  doHide =()=>{
    _AD_TIME = setTimeout(()=>{
      if (this.state.opacity<=0) {
        clearTimeout(_AD_TIME)
        this.setState({opacity: 0})
      }else{
        let op = this.state.opacity - 0.1
        this.setState({opacity: op})
        this.doHide()
      }
    },30) 
  }

  doShow = ()=>{
    _AD_TIME = setTimeout(()=>{
      if (this.state.opacity>=1) {
        clearTimeout(_AD_TIME)
        this.doWait()
      }else{
        let op = this.state.opacity + 0.1
        this.setState({opacity: op})
        this.doShow()
      }
    },60) 
  }

  doTimer = () => {
    _HD_TIME = setTimeout(() => {
      let adv = `${this.randomTime(1,10)}小时前${_CITY[this.randomTime(0,_CITY.length)]}${_FN[this.randomTime(0,_FN.length)]}**已经下单`

      this.doShow()

      this.setState({adv:adv, count: ++this.state.count})
      this.doTimer()
    }, this.randomTime(3000,6000))
  }

  doOrder = (params) =>{
    switch(params) {
      case 'g':
        Taro.navigateTo({ url: `/pages/order_g/index?type=${params}` });break;
      case 'm':
        Taro.navigateTo({ url: `/pages/order_g/index?type=${params}` });break;
      case 's':
        Taro.navigateTo({ url: `/pages/order_e/index?type=${params}` });break;
      case 'c':
        Taro.navigateTo({ url: `/pages/order_e/index?type=${params}` });break;
    }
    
  }

  render () {
    return (
      <View className='g-index'>
        <View className="m-head">立即预约</View>
        <View className="m-wrap">
          <View className="m-main m-main-up">
            <View className="m-main-c m-main-cl" onClick={this.doOrder.bind(this,'s')}>
              <Text className="m-res">溯源</Text>
              <Text className="m-res">检测</Text>
            </View>
            <View className="m-main-c m-main-cr" onClick={this.doOrder.bind(this,'c')}>
              <Text className="m-res">CMA</Text>
              <Text className="m-res">检测</Text>
            </View>
          </View>  
          <View className="m-main m-main-l" onClick={this.doOrder.bind(this,'g')}>
            <Text className="m-res">国标</Text>
            <Text className="m-res">治理</Text>
          </View>  
          <View className="m-main m-main-r" onClick={this.doOrder.bind(this,'m')}>
            <Text className="m-res">母婴</Text>
            <Text className="m-res">治理</Text>
          </View>  
        </View>
        <View className="m-info">每平方服务价低至<Text className="u-rmb">20</Text>元！</View>
        <View className="m-ft">
          <View className="m-ft-info">已有 <Text className="m-c">{this.state.count}</Text> 位预约了服务</View>
          <View className="m-ft-info">服务热线: <Text className="m-p">4000-253-123</Text></View>
        </View> 
        {(this.state.adv!==null) &&
        <View className="m-pop" style={`opacity: ${this.state.opacity}`}>
          {this.state.adv}
        </View> }
      </View>
    )
  }
}

export default Index
