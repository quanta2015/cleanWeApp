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
      cimg_h1: null,
      cimg_h2: null,
      cimg_bd: null,
      cname:'',
      cunit:'',
      cspec:'',
      cprice:'',
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
    let r = await this.props.mainStore.delGood(params)
    this.setState({loading: false, list: r.data, listpage:getListByPage(r.data,cur) })
    message.info('删除案例成功！')
  }

  doAdd=async ()=>{
    let {cur,cname,cunit,cspec,cprice,cimg_h1,cimg_h2,cimg_bd} = this.state
    if ((cname.trim()!=='')&&(cunit.trim()!=='')&&(cspec.trim()!=='')&&(cprice.trim()!=='')&&(cimg_h1!==null)&&(cimg_h2!==null)&&(cimg_bd!==null)) {
      let parmas = { name:cname, unit:cunit, spec:cspec, price:cprice, img_h1:cimg_h1, img_h2:cimg_h2, img_bd:cimg_bd }
      this.setState({ loading: true })
      let r = await this.props.mainStore.addGood(parmas)
      this.setState({
        loading: false, 
        visible:false, 
        list: r.data, 
        listpage:getListByPage(r.data,cur),
        cimg_h1: null,
        cimg_h2: null,
        cimg_bd: null,
        cname:'',
        cunit:'',
        cspec:'',
        cprice:'',
      })
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
  doInput = (i,e) => {
    switch(i) {
      case 1: this.setState({cname: e.currentTarget.value});break;
      case 2: this.setState({cunit: e.currentTarget.value});break;
      case 3: this.setState({cspec: e.currentTarget.value});break;
      case 4: this.setState({cprice: e.currentTarget.value});break;
    }
  }

  importPhoto = async (i,e)=>{
    if (e.target.files.length > 0) {
      let file = e.target.files[0]
      let blob = await fileToBlob(file,400,300)
      let formData = new FormData()
      formData.append('file', blob, 'case')

      this.setState({ loading: true })
      let r = await this.props.mainStore.upload(formData)
      if (r.code === 200) {
        switch(i) {
          case 1:this.setState({ loading: false, cimg_h1: r.data.path });break;
          case 2:this.setState({ loading: false, cimg_h2: r.data.path });break;
          case 3:this.setState({ loading: false, cimg_bd: r.data.path });break;
        }
        message.info('上传图片成功')
      } else {
        message.error(r.msg)
      }
      
    }
  }

  doDelImg=(i)=>{
    switch(i) {
      case 1:this.setState({cimg_h1:null});break;
      case 2:this.setState({cimg_h2:null});break;
      case 3:this.setState({cimg_bd:null});break;
    }
  }

  
  render() {
    // console.log(this.state)
    let {listpage,list,visible,cimg_h1,cimg_h2,cimg_bd,cname} = this.state
    return (
      <Spin spinning={this.state.loading}>
        <div className="g-good">
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
          width={320}
          closable={false}
          onClose={this.onClose}
          visible={visible}
          className="m-form-good"
        >
          <div className="m-ipt">

            <span>产品名称</span>
            <Input placeholder="请输入名称" onChange={this.doInput.bind(this,1)}></Input>
          </div>
          <div className="m-ipt">
            <span>产品单位</span>
            <Input placeholder="请输入单位(unit)" onChange={this.doInput.bind(this,2)}></Input>
          </div>
          <div className="m-ipt">
            <span>产品属性</span>
            <Input placeholder="请输入属性(spec)" onChange={this.doInput.bind(this,3)}></Input>
          </div>
          <div className="m-ipt">
            <span>产品价格</span>
            <Input placeholder="请输入价格(price)" onChange={this.doInput.bind(this,4)}></Input>
          </div>

          <div className="m-wrap">
            {(cimg_h1===null) &&
            <div className="m-ipt m-ipti">
              <span>产品主图</span>
              <div className="m-up">+</div>
              <input type="file" accept="image/*;"  onChange={this.importPhoto.bind(this,1)} />
            </div>}
            {(cimg_h1!==null) &&
            <div className="m-ipt m-ipti">
              <div className="m-del" onClick={this.doDelImg.bind(this,1)}></div>
              <span>产品主图</span>
              <img src={`${API_SERVER}/${cimg_h1}`} alt=""/>
            </div>}

            {(cimg_h2===null) &&
            <div className="m-ipt m-ipti">
              <span>产品副图</span>
              <div className="m-up">+</div>
              <input type="file" accept="image/*;"  onChange={this.importPhoto.bind(this,2)} />
            </div>}
            {(cimg_h2!==null) &&
            <div className="m-ipt m-ipti">
              <div className="m-del" onClick={this.doDelImg.bind(this,2)}></div>
              <span>产品副图</span>
              <img src={`${API_SERVER}/${cimg_h2}`} alt=""/>
            </div>}
          </div>
          
          {(cimg_bd===null) &&
          <div className="m-ipt m-ipti">
            <span>产品描述图</span>
            <div className="m-up">+</div>
            <input type="file" accept="image/*;"  onChange={this.importPhoto.bind(this,3)} />
          </div>}
          {(cimg_bd!==null) &&
          <div className="m-ipt m-ipti">
            <div className="m-del" onClick={this.doDelImg.bind(this,3)}></div>
            <span>产品描述图</span>
            <img src={`${API_SERVER}/${cimg_bd}`} alt=""/>
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