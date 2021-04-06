import { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { View, Button, Text, Image, Checkbox } from '@tarojs/components'
import api from '../../constant/apis'
import req from '../../utils/request'
import './index.less'
import { $ } from '@tarojs/extend'
import { getCurrentInstance } from '@tarojs/taro'
import Taro from '@tarojs/taro'



@inject('store')
@observer
class Index extends Component {
  constructor(props) {
    super(props)

    this.state = {
      type: getCurrentInstance().router.params.type,
      chk: { txt: '我已经阅读完毕，同意协议内容中的条款。', checked: false }
    }
  }

  async componentDidMount() {
    switch(this.state.type) {
      case 'g':Taro.setNavigationBarTitle({title:'国标治理'});break;
      case 'm':Taro.setNavigationBarTitle({title:'母婴治理'});break;
      case 's':Taro.setNavigationBarTitle({title:'溯源检测'});break;
      case 'c':Taro.setNavigationBarTitle({title:'CMA检测'});break;
    }
  }

  doCheck=(e)=>{
    let {chk} = this.state
    chk.checked = !chk.checked
    this.setState({chk:chk})
  }

  doPay=()=>{
    let { mainStore } = this.props.store
    let money = parseFloat(mainStore.getAllPrice()).toFixed(2)
    // let money = (mainStore.getAllPrice()/100000).toFixed(2)
    mainStore.pay(money, this.state.type)
  }

  
  render() {
    let area = this.props.store.mainStore.getArea()
    let poi = this.props.store.mainStore.getPoi() 
    let allprice = this.props.store.mainStore.getAllPrice()
    let {chk} = this.state
    let {type} = this.state
 
    return (
      

      <View className='g-bd g-orderg_n2'>
        { ((type==='g')||(type==='m')) &&
        <View className="m-head">民用建筑室内空气污染治理协议</View>}

        { ((type==='s')||(type==='c')) &&
        <View className="m-head">民用建筑室内空气环境检测协议</View>}

        { ((type==='g')||(type==='m')) &&
        <View className="m-bd">
          <View className="m-list m-hd">
            <View className="m-tl">浙江艾尔森环保科技有限公司</View>
            <View className="m-phone">电话: 4000-253-123</View>
          </View>
          <View className="m-list m-ind">
            根据《中华人民共和国室内空气质量标准》(GB/T18883-2002)中有关室内空气质量的要求，甲、乙双方本着平等、自愿的原则拟订以下室内空气污染优化治理协议条款:
          </View>
          <View className="m-p">一、治理目标</View>
          <View className="m-list">1、室内空气中甲醛、苯系物含量小于《中华人民共和国室内空气质量标准》（GB/18883-2002）规定以下的数值。国标甲醛≤0.10mg/m³、母婴级甲醛≤0.08mg/m³。
          </View>
          <View className="m-list">
            2、治理面积：<Text className="m-red">{parseFloat(`${area}.${poi}`)}</Text>㎡（根据用户自选面积计算）。
          </View>
          <View className="m-list">
            3、产品及治理价格：<Text className="m-red">{allprice}</Text>元（总合计款根据用户自选面积和治理员计算的总价）。
          </View>
          <View className="m-list">
            4、治理地址:根据用户自填地址，乙方提供上门服务。
          </View>
          <View className="m-p">二、乙方责任</View>
          <View className="m-list">
            1、乙方保证对甲方场地进行室内空气污染治理后，室内空气中甲醛、苯、甲苯、二甲苯的含量小于《中华人民共和国室内空气质量标准》（GB/T18883-2002）规定的标准值以下。
          </View>
          <View className="m-list">
            2、乙方保证在治理过程中所使用的产品无毒、无副作用、不产生二次污染。
          </View>
          <View className="m-list">
            3、乙方在治理过程中，因乙方因素造成甲方财产损失，应照价赔偿。
              ① 因乙方所使用产品原因，对甲方室内的装饰器材、家具、摆设物、灯饰、办公设备等室内物品造成腐蚀或者损伤，乙方应照价赔偿。
              ② 因乙方施工不当等人为因素造成甲方财产损失，乙方应照价赔偿。
          </View>
          <View className="m-list">
            4、乙方对所负责的工程质量保质期十年（甲方在不新添加污染源的情况下）。在工程质量保证期内，甲方对工程质量有异议。甲方自行可委托“官方”具有CMA资质的第三方检测部门进行室内空气质量复检。检测时甲乙双方均需在场，若复检结果不符合同约定，乙方进行二次治理，若二次治理数据仍然达不到合同约定标准，乙方全额退款并承担甲方委托“官方”第三方检测费用。
          </View>
          <View className="m-list">
            5、乙方对治理的工程验收合同后提供五年售后跟踪服务，每年可根据甲方要求上门复检一次。
          </View>
          <View className="m-list">
            6、为确保工程质量，乙方保证文明施工、安全施工，在施工时间内，乙方须安排管理人员到现场监督。
          </View>
          <View className="m-p">三、甲方责任</View>
          <View className="m-list">1、甲方应无偿提供治理施工必备的水、电、梯子。</View>
          <View className="m-list">2、治理前后室内的移动和固定设备的名称数量须保持一致，不增加新的污染源。</View>
          <View className="m-list">3、甲方需进行室内空气污染治理时,应提前一个工作日网上预约通知乙方, 乙方服务电话：4000-253-123。</View>
          <View className="m-list">4、治理完密闭两小时，两小时后协助开窗通风至下一次复测前。（雨雪天气就情况而定） 流程：治理-房屋密闭两小时-开窗通风-复测前再次密闭12小时。</View>
          <View className="m-list">5、浙江艾尔森环保提醒业主须知室内的木板，皮革，布艺等材料原味非甲醛。</View>

          <View className="m-p">四、验收方式</View>

          <View className="m-list">1、验收时间：治理服务结束后7日内。协商复测日期为。</View>
          <View className="m-list">2、验收标准：根据用户自选择治理标准。</View>
          <View className="m-list">3、验收要求：验收前需对治理后检测的区域密闭12个小时的结果。</View>
          <View className="m-p">五、付款方式</View>

          <View className="m-list">1、甲方预约前需一次性全额支付治理费用。</View>
          <View className="m-list">2、治理服务结束后7日内，甲、乙双方须进行验收检测，检测时甲、乙双方均须在场，依据本合同指定的检测（验收）标准，如乙方没有达到双方制定目标的，乙方必须免费再治理一次，如还未合格，双方可协商处理或全额退款。</View>
          <View className="m-p">六、争议处理</View>
          <View className="m-list">合同履行过程中，如发生争议，双方应友好协商解决。如协商未果，应向乙方所在地法院提起诉讼。</View>
        </View> }

        { ((type==='s')||(type==='c')) &&
        <View className="m-bd">
          <View className="m-list m-hd">
            <View className="m-tl">浙江艾尔森环保科技有限公司</View>
            <View className="m-phone">电话: 4000-253-123</View>
          </View>
          <View className="m-list m-ind">
            根据《中华人民共和国室内空气质量标准》(GB/T18883-2002)中有关室内空气质量的要求，甲、乙双方本着平等、自愿的原则拟订以下室内空气环境检测协议条款:
          </View>
          <View className="m-p">一、治理目标</View>
          <View className="m-list">1、根据《中华人民共和国室内空气质量标准》（GB/18883-2002）规定室内空气检测条件为门窗密闭12小时，冬季室内温度16-24度，夏季室内温度22-28度。
          </View>
          <View className="m-list">
            2、检测数量：<Text className="m-red">{parseFloat(`${area}.${poi}`)}</Text>点位（根据您选择的点位数量CMA检测/溯源检测）。
          </View>
          <View className="m-list">
            3、检测价格：<Text className="m-red">{allprice}</Text>元（根据您选择点位乘以单价）。
          </View>
          <View className="m-list">
            4、检测地址:根据用户自填地址，乙方提供上门服务。
          </View>
          <View className="m-list">
            5、溯源检测/CMA检测项目：甲醛、苯、甲苯、二甲苯、TVOC。
          </View>
          <View className="m-p">二、服务流程</View>
          <View className="m-list">
            1、预约时间：在线预约好上门检测时间及地点，客服联系并确认告知注意事项。
          </View>
          <View className="m-list">
            2、密闭门窗：预约好检测时间及地址后，采样前提前关闭门窗12个小时，室内温度达到冬季16-24度，夏季22-28度。
          </View>
          <View className="m-list">
            3、上门检测：艾尔森专业技术人员携带专业大气采样仪/甲醛分析仪如期上门，了解现场装修和家具情况按检测标准流程开始检测。
          </View>
          <View className="m-list">
            4、分析样本：艾尔森专业溯源检测，实验室分析数据评定等级并出具检测报告或CMA检测报告。
          </View>
          <View className="m-list">
            5、提交报告：专业技术人员提交检测报告，告知分析结果。
          </View>
          <View className="m-list">
            6、制定方案：针对超标环境，给予您治理建议，制定空气治理方案。
          </View>
          <View className="m-p">三、客户须知</View>
          <View className="m-list">1、封闭及检测过程中，关闭门窗12小时，每个房间的门需要单独关闭，不要保持通风，便于更好查找污染源。</View>
          <View className="m-list">2、初检应提前打开空调，房间温度达到22-24度。</View>
          <View className="m-list">3、检测现场需清理干净，不能堆放残余的油漆涂料、板材等。</View>
          <View className="m-list">4、不要使用化工产品，如空气清新剂，香水等。</View>
          <View className="m-list">5、不要进行影响测试结果的活动，如吸烟和用燃气灶等。</View>
          <View className="m-list">6、溯源检测/CMA检测2个点起测。</View>
          <View className="m-list">7、您需进行室内空气环境检测时,应提前一个工作日网上预约通知 乙方，服务电话：4000-253-123。</View>
          <View className="m-list">8、浙江艾尔森环保温馨提醒，室内的木板，皮革，布艺等材料原味非甲醛。</View>
          <View className="m-p">五、付款方式</View>

          <View className="m-list">1、甲方预约前需一次性全额支付检测费用。</View>
          <View className="m-list">2、检测服务结束后，选择溯源检测乙方出具专业资质公司检测报告，出具报告时间3个工作日，不作为法律纠纷凭证。
          </View>
          <View className="m-list">3、检测服务结束后，选择CMA检测乙方出具CMA检测报告，出具报告时间7个工作日，对检测结果承担相应法律责任。
          </View>
          <View className="m-p">六、争议处理</View>
          <View className="m-list">合同履行过程中，如发生争议，双方应友好协商解决。如协商未果，应向乙方所在地法院提起诉讼。</View>
        </View>}

        <View className="m-ft">
          <View className="m-tl">浙江艾尔森环保科技有限公司</View>
          <View className="m-phone">电话: 4000-253-123</View>
        </View>

        <View className="m-form">
          <Checkbox className='m-check' onClick={this.doCheck.bind(this,chk.checked)} value={chk.checked} checked={chk.checked}>{chk.txt}</Checkbox>
        </View>

        {(chk.checked) &&
        <View className="fn-btn-sb" onClick={this.doPay}>支付订单 {allprice}</View>}
      </View>
     
    )
  }
}

export default Index
