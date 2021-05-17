import React from 'react'
import dayjs from 'dayjs'
import { inject } from 'mobx-react'
import { Drawer, Pagination, Input, Button, Spin, message } from 'antd'
import { API_SERVER } from '@constant/apis'
import {getListByPage, fileToBlob} from '../../util/fn'


import style     from './style.less';
import icon_add  from '../../icon/icon_add.svg'
import icon_save from '../../icon/icon_save.svg'
import icon_expo from '../../icon/icon_export.svg'
import { tmpl,head } from '../../constant/tmpl'
const PAGE_SIZE = 10


@inject('mainStore')
class Sell extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      cur: 1,
      sell: [],
    }
  }

  async componentDidMount() {
    let currUser = this.props.mainStore.currUser
    if ((typeof(currUser) === 'undefined')||(currUser === null)) {
      this.props.history.push("/login")
    }else{
      let {cur} = this.state
      this.setState({ loading: true })
      let r = await this.props.mainStore.listSpGoodsAll()
      console.log(r.data)
      this.setState({loading: false, sell: r.data })
    }
  }

  exportExcel =async() => {
    this.setState({ loading: true })
    let r = await this.props.mainStore.listSPGoodsAllToExcel()
    window.open(`${API_SERVER}/${r.xls}`)
    this.setState({loading: false})
  }

  exportPdf =async() => {
    this.setState({ loading: true })
    let r = await this.props.mainStore.listSPGoodsAllToPdf()
    window.open(`${API_SERVER}/${r.pdf}`)
    this.setState({loading: false})
  }

  doShowList=(e)=>{
    let {sell} = this.state
    sell[e].show = (sell[e].show||false)?false:true
    this.setState({sell:sell})
  }

  render() {
    let {sell} = this.state

    return (
      <Spin spinning={this.state.loading}>
        <div className="g-sell">
          <div className="m-tl" >
            <span>服务记录</span>
          </div>
          <div className="m-menu">
            <div className="m-btn" onClick={this.exportExcel}>
              <img src={icon_expo}/>
              <span>导出Excel</span>
            </div>
            <div className="m-btn" onClick={this.exportPdf}>
              <img src={icon_expo}/>
              <span>导出Pdf</span>
            </div>
          </div>
          <div className="m-tab">
            <div className="m-item">
              <div className="m-id">序号</div>
              <div className="m-date">购买日期</div>
              <div className="m-name">客户名</div>
              <div className="m-phone">联系方式</div>
              <div className="m-addr">送货地址</div>
              <div className="m-price">总金额</div>
            </div>  
          {sell.map((item,i)=>
            <>
              <div className="m-item" key={i} onClick={this.doShowList.bind(this,i)}>
                <div className="m-id">{i+1}</div>
                <div className="m-date">{item.date}</div>
                <div className="m-name">{item.name}</div>
                <div className="m-phone">{item.phone}</div>
                <div className="m-addr">{item.addr}</div>
                <div className="m-price">￥ {parseFloat(item.sumPrice).toFixed(2)}</div>
              </div>  
              {item.buyList.map((o,j)=>
                <div className={(item.show)?"m-buy-item show":"m-buy-item"} key={j}>
                  <div className="m-s-bk"></div>
                  <div className="m-s-id">{j+1}</div>
                  <div className="m-s-na">{o.na}</div>
                  <div className="m-s-ct">{o.ct}个</div>
                  <div className="m-s-pr">￥ {parseFloat(o.pr).toFixed(2)}</div>
                </div>
              )}
              <div className="m-detail">

              </div>
            </>
            )}
          </div>
        </div>
      </Spin>
    )
  }
}

export default Sell