import React from 'react'
import dayjs from 'dayjs'
import { inject } from 'mobx-react'
import { Drawer, Pagination, Input, Button, Spin, message } from 'antd'
import { API_SERVER } from '@constant/apis'
import {getListByPage, fileToBlob} from '../../util/fn'
import style from './style.less';

import icon_add  from '../../icon/icon_add.svg'
import icon_save from '../../icon/icon_save.svg'

const PAGE_SIZE = 10

@inject('mainStore')
class Good extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      cur: 1,
      list: [],
      listpage: [],
      visible: false,
      cimg: null,
      cname:null,
    }
  }

  async componentDidMount() {
    let currUser = this.props.mainStore.currUser
    if ((typeof(currUser) === 'undefined')||(currUser === null)) {
      this.props.history.push("/login")
    }else{
      let {cur} = this.state
      this.setState({ loading: true })
      let r = await this.props.mainStore.getAppDB()
      this.setState({loading: false, list: r.goods, listpage:getListByPage(r.goods,cur) })
    }
  }

  doPage=(page)=>{
    this.setState({cur:page, listpage:getListByPage(this.state.list,page)})
  }

  doDel=async (id)=>{
    let {cur} = this.state
    let params = { id:id}
    this.setState({ loading: true })
    let r = await this.props.mainStore.delCase(params)
    this.setState({loading: false, list: r.data, listpage:getListByPage(r.data,cur) })
    message.info('删除案例成功！')
  }

  doAdd=async ()=>{
    let {cur,cname,cimg} = this.state
    if ((cname.trim()!=='')&&(cname!==null)&&(cimg!==null)) {
      let parmas = { name:cname, img:cimg }
      this.setState({ loading: true })
      let r = await this.props.mainStore.addCase(parmas)
      this.setState({loading: false, visible:false, list: r.data, listpage:getListByPage(r.data,cur) })
      message.info('添加案例成功！')
    }else{
      message.info('请输入案例名称并且上传图片！')
    }
  }

  onClose = () => {
    this.setState({visible:false})
  }
  onShow = () => {
    this.setState({visible:true})
  }
  doName = (e) => {
    this.setState({cname: e.currentTarget.value})
  }

  importPhoto = async (e)=>{
    if (e.target.files.length > 0) {
      let file = e.target.files[0]
      let blob = await fileToBlob(file,400,300)
      let formData = new FormData()
      formData.append('file', blob, 'case')

      this.setState({ loading: true })
      let r = await this.props.mainStore.upload(formData)
      if (r.code === 200) {
        this.setState({ loading: false, cimg: r.data.path })
        message.info('上传图片成功')
      } else {
        message.error(r.msg)
      }
      
    }
  }

  
  render() {
    let {listpage,list,visible,cimg,cname} = this.state
    return (
      <Spin spinning={this.state.loading}>
        <div className="g-home">
          <div className="m-tl" >
            <span>除醛服务</span>
          </div>
          <div className="m-menu">
            <div className="m-btn" onClick={this.onShow}>
              <img src={icon_add}/>
              <span>新增</span>
            </div>
          </div>
          <div className="m-list">
            {listpage.map((item,i)=>
              <div className="m-item" key={i}>
                <div className="m-del" onClick={this.doDel.bind(this,item.id)}></div>
                <div className="m-img"><img src={`${API_SERVER}/${item.img_h1}`} /></div>
                <div className="m-txt">{item.name}</div>
              </div>
            )}
            <Pagination className="m-page" defaultCurrent={1} pageSize={PAGE_SIZE} total={list.length} onChange={this.doPage}/>
          </div>
        </div>
        <Drawer
          title="添加产品"
          placement="right"
          width={300}
          closable={false}
          onClose={this.onClose}
          visible={visible}
          className="m-form"
        >
          <div className="m-ipt">
            <Input placeholder="请输入名称" onChange={this.doName}></Input>
          </div>
          <div className="m-ipt">
            <Input placeholder="请输入单位(unit)" onChange={this.doName}></Input>
          </div>
          <div className="m-ipt">
            <Input placeholder="请输入属性(spec)" onChange={this.doName}></Input>
          </div>
          <div className="m-ipt">
            <Input placeholder="请输入价格(price)" onChange={this.doName}></Input>
          </div>
          
          {(cimg===null) &&
          <div className="m-ipt">
            <div className="m-up">+</div>
            <input type="file" accept="image/*;"  onChange={this.importPhoto} />
          </div>}
          {(cimg!==null) &&
          <div className="m-ipt">
            <img src={`${API_SERVER}/${cimg}`} alt=""/>
          </div>}
          

          <div className="m-ipt">
            <div className="m-btn" onClick={this.doAdd}>
              <img src={icon_save}/>
              <span>保存</span>
            </div> 
          </div>  
        </Drawer>
      </Spin>
    )
  }
}

export default Good