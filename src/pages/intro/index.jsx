import { Component } from 'react'
import { View, Button, Text ,Image,Icon } from '@tarojs/components'
import { observer, inject } from 'mobx-react'
import './index.less'


@inject('store')
@observer
class Intro extends Component {

  componentDidMount () { }

  render () {
    return (
      <View className='g-intro'>
        <View className="m-logo">
          <Image src="https://mooc.hznu.edu.cn/cdn/intro_main01.jpg"></Image>
        </View> 
        <View className='m-sect'>
          <View className="m-title">
            <Text className="m-txt">艾尔森简介</Text>
            <View className="m-tle">
              <Text className="m-l">SINCE</Text>
              <Text className="m-r">2016</Text>
            </View>   
            <View className="m-tlc">用呼吸，传递爱！</View>
          </View>
          
          <View className="m-intro">
            <Text className="m-p">浙江艾尔森环保科技有限公司采用国际领先专利技术，研发生产甲醛治理液、新风系统设备及车用、家用、商用、大型中央空调相配套的<Text className="b">含酶空气净化过滤网</Text>等空气净化产品，厂区位于浙江上虞曹娥开发区，占地面积 <Text className="r">6000</Text> 多平米，集研发设计、生产、销售、安装调试、维修保养的一体化专业服务公司。</Text>
            <Text className="m-p">艾尔森拥有空气净化方面的多项自主知识产权产品，而且属于<Text className="r">浙江省室内环境净化行业协会会长单位</Text>、具有<Text className="r">室内环境污染治理甲级资质</Text>、<Text className="r">G20杭州峰会空气治理服务商</Text>、已通过<Text className="b">ISO9001管理体系认证</Text>。</Text>
            <Text className="m-p">2019年艾尔森携手<Text className="b">世界500强企业霍尼韦尔</Text>在杭州成立浙江营销中心,共享核心技术,世界先进的<Text className="r">空气实验室AIR LAB</Text>,国际一流的博士研发团队，时刻保证了技术前瞻性和新产品的持续导入。我们重新定义美好生活，致力于健康环保产业，改善空气环境，提高生活质量、让每个人在室内都能够无负担的呼吸。</Text>
          </View> 
        </View>

        <View className='m-sect'>
          <View className="m-title">
            <Text className="m-txt">品牌由来</Text>
            <View className="m-tle">
              <Text className="m-l">BRAND ORIGIN</Text>
            </View>   
          </View>
          
          <View className="m-intro">
            <Text className="m-p">浙江艾尔森研发团队早在<Text className="r">2015</Text>年就致力于空气净化领域的研究探索，经过不断的测试改良，在2016年7月首次推出<Text className="b">含酶空气净化网</Text>，通过溶菌酶破坏细菌、病毒、微生物的细胞结构，达到杀菌净化，可以与中央空调的完美结合，便用采用集中处理方式净化室内空气。这种全方位、高效率、全领域的空气净化技术，被业内及媒体广泛关注报道。</Text>
            <Text className="m-p">艾尔森创始人<Text className="r">章鑫淼</Text>系浙江民进省直属会员、省民进企联会副秘书长、杭州下城区政协委员，公司成立初心就抱着为中国生态环境健康、改善人们工作家庭环境贡献绵薄之力，形成<Text className="r">人人重视环保、人人参与环保</Text>的社会氛围，共建美丽中国。所以公司LOGO主体为字母<Text className="b">FSAR</Text> 是Fresh Air(新鲜空气)的缩写, 中心的叶子寓意空气净化，契合产品的行业特色; 整体采用圆形如太极图，象征着企业永续发展，不断壮大、福泽社会的愿景</Text>
          </View> 
        </View>

        <View className="m-footer">
          <View className="m-mark">
            <Image src="https://mooc.hznu.edu.cn/cdn/intro_01.png"></Image>
            <Text className="m-t">浙江省科技型企业</Text>
            <Text className="m-c">国际一流的博士研发团队</Text>
          </View>
          <View className="m-mark">
            <Image src="https://mooc.hznu.edu.cn/cdn/intro_02.png"></Image>
            <Text className="m-t">G20杭州峰会空净服务商</Text>
            <Text className="m-c">官方认证实力</Text>
          </View>
          <View className="m-mark">
            <Image src="https://mooc.hznu.edu.cn/cdn/intro_03.png"></Image>
            <Text className="m-t">省净化行业协会会长单位</Text>
            <Text className="m-c">国际一流的博士研发团队</Text>
          </View>
          <View className="m-mark">
            <Image src="https://mooc.hznu.edu.cn/cdn/intro_04.png"></Image>
            <Text className="m-t">实力除醛品牌</Text>
            <Text className="m-c">实力看的见</Text>
          </View>
        </View> 
        
      </View>
    )
  }
}

export default Intro
