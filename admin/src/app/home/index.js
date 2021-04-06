import React from 'react'
import dayjs from 'dayjs'
import { inject } from 'mobx-react'
import style from './style.less';
import calendar from 'icon/svg_calendar.svg'
import icon_save from 'icon/icon_save.svg'
import { Icon, Form, Input, Button, Spin, message } from 'antd'

var $ = (o) =>{ return document.querySelector(o) }

@inject('mainStore')
class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      params:{g: { LM:0,GP:0,BASE_AR:0,BASE_PR:0,SP:0, SP_F:0, ST:0,ST_F:0,INS:0 },
              m: { LM:0,GP:0,BASE_AR:0,BASE_PR:0,SP:0,SP_F:0,ST:0,ST_F:0,INS:0 },
              s: { LM:0 },
              c: { LM:0 }},
    }
  }

  async componentDidMount() {
    this.setState({ loading: true })
    let r = await this.props.mainStore.getAppDB()
    let {city,fn, ...params} = r
    this.setState({loading: false, params: params})
  }

  doMenu = (i)=>{
    this.setState({cur:i})
  }

  doToggleCal= ()=>{
    this.setState({showCal:!this.state.showCal})
  }

  doInput=(pa, attr, e)=>{
    let {params} = this.state
    console.log('cur: '+e.currentTarget.value)
    let val = (e.currentTarget.value==='')?0:e.currentTarget.value
    params[pa][attr] = val
    this.setState({params:params})
  }

  doSave=async ()=>{
    let {params} = this.state
    this.setState({ loading:true })
    let r = await this.props.mainStore.saveParams(params)
    this.setState({ loading:false, params:r})
    message.info('保存数据成功！')
  }
  
	render() {
    let {params} = this.state
    
		return (
      <Spin spinning={this.state.loading}>
  			<div className="g-home">
          <div className="m-tl" >
            <span>除醛服务</span>
          </div>

          <div className="m-menu">
            <div className="m-btn" onClick={this.doSave}>
              <img src={icon_save}/>
              <span>保存</span>
            </div>
          </div>

          <div className="m-form">
            <div className="m-group">
              <div className="m-tl">国标治理</div>
              <div className="m-pr">
                <span>产品价格</span>
                <span className="m-mark">=</span>
                <span>面积</span>
                <span className="m-mark">×</span>
                <input type="text" className="m-lm" value={params.g.LM} onChange={this.doInput.bind(this,'g','LM')}/>
                <span className="m-mark">×</span>
                <input type="text" className="m-gp m-rmb" value={params.g.GP} onChange={this.doInput.bind(this,'g','GP')}/>
                <span>元</span>
              </div>
              <div className="m-pr">
                <div className="m-tl">高级+中级</div>
                <span>治理价格</span>
                <span className="m-mark">=</span>
                <span>( 面积</span>
                <span className="m-mark">-</span>
                <span>50平米 )</span>
                <span className="m-mark">×</span>
                <input type="text"
                       className="m-lm" 
                       value={params.g.BASE_PR} 
                       onChange={this.doInput.bind(this,'g','BASE_PR')}/>
                <span>元</span>
                <span className="m-mark">+</span>
                <input type="text" className="m-gp" value={params.g.SP} onChange={this.doInput.bind(this,'g','SP')}/>
                <span>元</span>
              </div>
              <div className="m-pr">
                <span>治理时长</span>
                <span className="m-mark">=</span>
                <span>治理价格</span>
                <span className="m-mark">/</span>
                <input type="text" className="m-gp" value={params.g.ST} onChange={this.doInput.bind(this,'g','ST')}/>
                <span>元</span>
              </div>
              <div className="m-pr">
                <div className="m-tl">高级+高级</div>
                <span>治理价格</span>
                <span className="m-mark">=</span>
                <span>( 面积</span>
                <span className="m-mark">-</span>
                <span>50平米 )</span>
                <span className="m-mark">×</span>
                <input type="text" className="m-lm" disabled value={params.g.BASE_PR} />
                <span>元</span>
                <span className="m-mark">+</span>

                <span className="m-mark">( {params.g.SP} + </span>
                <input type="text" className="m-gp" value={params.g.SP_F} onChange={this.doInput.bind(this,'g','SP_F')}/>
                <span className="m-mark">) 元</span>
              </div>
              <div className="m-pr">
                <span>治理时长</span>
                <span className="m-mark">=</span>
                <span>治理价格</span>
                <span className="m-mark">/ ( {params.g.ST} + </span>
                <input type="text" className="m-gp" value={params.g.ST_F} onChange={this.doInput.bind(this,'g','ST_F')}/>
                <span>) 元</span>
              </div>
            </div>  
            <div className="m-group">
              <div className="m-tl">母婴治理</div>
              <div className="m-pr">
                <span>产品价格</span>
                <span className="m-mark">=</span>
                <span>面积</span>
                <span className="m-mark">×</span>
                <input type="text" className="m-lm" value={params.m.LM} onChange={this.doInput.bind(this,'m','LM')}/>
                <span className="m-mark">×</span>
                <input type="text" className="m-gp" value={params.m.GP} onChange={this.doInput.bind(this,'m','GP')}/>
              </div>
              <div className="m-pr">
                <div className="m-tl">高级+中级</div>
                <span>治理价格</span>
                <span className="m-mark">=</span>
                <span>(面积</span>
                <span className="m-mark">-</span>
                <span>50平米)</span>
                <span className="m-mark">×</span>
                <input type="text"
                       className="m-lm" 
                       value={params.m.BASE_PR} 
                       onChange={this.doInput.bind(this,'m','BASE_PR')}/>
                <span>元</span>
                <span className="m-mark">+</span>
                <input type="text" className="m-gp" value={params.m.SP} onChange={this.doInput.bind(this,'m','SP')}/>
                <span>元</span>
              </div>
              <div className="m-pr">
                <span>治理时长</span>
                <span className="m-mark">=</span>
                <span>治理价格</span>
                <span className="m-mark">/</span>
                <input type="text" className="m-gp" value={params.m.ST} onChange={this.doInput.bind(this,'m','ST')}/>
                <span>元</span>
              </div>
              <div className="m-pr">
                <div className="m-tl">高级+高级</div>
                <span>治理价格</span>
                <span className="m-mark">=</span>
                <span>(面积</span>
                <span className="m-mark">-</span>
                <span>50平米)</span>
                <span className="m-mark">×</span>
                <input type="text" className="m-lm" value={params.m.BASE_PR} disabled />
                <span>元</span>
                <span className="m-mark">+</span>

                <span className="m-mark">( {params.m.SP} + </span>
                <input type="text" className="m-gp" value={params.m.SP_F} onChange={this.doInput.bind(this,'m','SP_F')}/>
                <span className="m-mark">) 元</span>
              </div>
              <div className="m-pr">
                <span>治理时长</span>
                <span className="m-mark">=</span>
                <span>治理价格</span>
                <span className="m-mark">/ ( {params.m.ST} + </span>
                <input type="text" className="m-gp" value={params.m.ST_F} onChange={this.doInput.bind(this,'m','ST_F')}/>
                <span>) 元</span>
              </div>
            </div>  


            <div className="m-group">
              <div className="m-tl">溯源检测</div>
              <div className="m-pr">
                <span>检测价格</span>
                <span className="m-mark">=</span>
                <span>点位数</span>
                <span className="m-mark">×</span>
                <input type="text" className="m-lm" value={params.s.LM} onChange={this.doInput.bind(this,'s','LM')}/>
                <span>元</span>
              </div>
            </div>  

            <div className="m-group">
              <div className="m-tl">CMA检测</div>
              <div className="m-pr">
                <span>检测价格</span>
                <span className="m-mark">=</span>
                <span>点位数</span>
                <span className="m-mark">×</span>
                <input type="text" className="m-lm" value={params.c.LM} onChange={this.doInput.bind(this,'c','LM')}/>
                <span>元</span>
              </div>
            </div>  
          </div>
          
        </div>
      </Spin>
		)
	}
}

export default Home