import React from 'react'
import dayjs from 'dayjs'
import { inject } from 'mobx-react'
import { Pagination, Spin, DatePicker,Input,Button, message } from 'antd'
import { API_SERVER } from '@constant/apis'
import {getListByPage, fileToBlob} from '../../util/fn'
import moment from 'moment';

import style     from './style.less';
import icon_add  from '../../icon/icon_add.svg'
import icon_save from '../../icon/icon_save.svg'
import icon_expo from '../../icon/icon_export.svg'
import { tmpl,head } from '../../constant/tmpl'
const PAGE_SIZE = 10
const { RangePicker } = DatePicker
const { Search } = Input

@inject('mainStore')
class Serv extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      cur: 1,
      list: [],
      listpage: [],
      key: '',
      from:null,
      to:null,
      datekey:null,
    }
  }

  async componentDidMount() {
    let currUser = this.props.mainStore.currUser
    if ((typeof(currUser) === 'undefined')||(currUser === null)) {
      this.props.history.push("/login")
    }else{
      let {cur} = this.state
      this.setState({ loading: true })
      let r = await this.props.mainStore.listOrderAll()
      this.setState({loading: false, list: r.data, listpage:getListByPage(r.data,cur) })
    }
  }

  doSearch =async()=>{
    let params = { key:this.state.key, from:this.state.from||'', to:this.state.to||'' }
    this.setState({ loading: true, cur:1 })
    let r = await this.props.mainStore.listOrderQuery(params)
    this.setState({loading: false, list: r.data, listpage:getListByPage(r.data,1) })
  }

  exportExcel = async() => {
    let params = { key:this.state.key, from:this.state.from||'', to:this.state.to||'' }
    this.setState({ loading: true })
    let r = await this.props.mainStore.listOrderAllToExcel(params)
    window.open(`${API_SERVER}/${r.xls}`)
    this.setState({loading: false})
  }

  exportPdf = async() => {
    let params = { key:this.state.key, from:this.state.from||'', to:this.state.to||'' }
    this.setState({ loading: true })
    let r = await this.props.mainStore.listOrderAllToPdf(params)
    window.open(`${API_SERVER}/${r.pdf}`)
    this.setState({loading: false})
  }

  doReset = async()=>{
    this.setState({ loading: true })
    let r = await this.props.mainStore.listOrderAll()
    this.setState({
      loading: false, 
      from:null,
      to:null,
      key:'',
      datekey:new Date(), 
      list: r.data, 
      listpage:getListByPage(r.data,1) 
    })
  }

  doPage=(page)=>{
    this.setState({cur:page, listpage:getListByPage(this.state.list,page)})
  }

  doInput =(e)=>{
    this.setState({key:e.target.value})
  }

  doSelDate=(dates, dateStrings)=> {
    this.setState({from:dateStrings[0], to:dateStrings[1] })
  }

  

  render() {
    let {list,listpage} = this.state
    return (
      <Spin spinning={this.state.loading}>
        <div className="g-serv">
          <div className="m-tl" >
            <span>????????????</span>
          </div>
          <div className="m-menu">
            <RangePicker className="m-daterage" 
              key={this.state.datekey}
              onChange={this.doSelDate}  
              ranges={{
              '??????': [moment().subtract(1,'day'), moment().subtract(1,'day')],
              '??????': [moment(), moment()], 
              '?????????': [moment().subtract(1,'months').startOf('month'), moment().subtract(1,'months').endOf('month')], 
              '??????': [moment().subtract(1,'week').startOf('week'), moment().subtract(1,'week').endOf('week')], 
              '??????': [moment().startOf('month'), moment().endOf('month')], 
              '??????': [moment().startOf('year'), moment()]
            }}/>

            <Search className="m-search" 
                    style={{flex:1}}
                    enterButton="??????" 
                    placeholder="?????????????????????" 
                    value={this.state.key} 
                    allowClear 
                    onSearch={this.doSearch} 
                    onChange={this.doInput} 
            />
            
            <div className="m-btn m-btn-ret" onClick={this.doReset}>
              <img src={icon_expo} />
              <span>????????????</span>
            </div>

            <div className="m-btn" onClick={this.exportExcel}>
              <img src={icon_expo} />
              <span>??????Excel</span>
            </div>
            <div className="m-btn" onClick={this.exportPdf}>
              <img src={icon_expo} />
              <span>??????Pdf</span>
            </div>
          </div>
          <div className="m-tab">
            <div className="m-item">
              <div className="m-id">??????</div>
              <div className="m-date">????????????</div>
              <div className="m-name">?????????</div>
              <div className="m-phone">????????????</div>
              <div className="m-addr">????????????</div>
              <div className="m-type">????????????</div>
              <div className="m-area">??????/??????</div>
              <div className="m-adv">??????</div>
              <div className="m-safe">??????</div>
              <div className="m-money">????????????</div>
            </div>  
            {listpage.map((item,i)=>
              <div className="m-item" key={i}>
                <div className="m-id">{item.oid}</div>
                <div className="m-date">{item.seldate}</div>
                <div className="m-name">{item.name}</div>
                <div className="m-phone">{item.phone}</div>
                <div className="m-addr">{item.addr}</div>
                <div className="m-type">{item.tp}</div>
                <div className="m-area">{item.area.replace('?????????','???')}</div>
                <div className="m-adv">{item.seltech}</div>
                <div className="m-safe">{item.selsafe}</div>
                <div className="m-money">??? {item.money}</div>
              </div>  
              )}
          </div>

          <div className="m-page">
            <Pagination defaultCurrent={1} pageSize={PAGE_SIZE} total={list.length} onChange={this.doPage}/>
          </div>
          
        </div>
      </Spin>
    )
  }
}

export default Serv