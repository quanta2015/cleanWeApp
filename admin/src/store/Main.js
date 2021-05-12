import { observable, action, runInAction } from 'mobx'
import BaseActions from 'component/BaseActions'
import axios from 'axios'
import { message } from 'antd'
import * as urls from 'constant/apis'
import jwt from 'util/token.js'

class Main extends BaseActions {
  @observable
  currUser = undefined

  @action
  async getAppDB() {
    return await this.post(urls.API_GET_APP_DB)
  }

  @action
  async saveParams(params) {
    return await this.post(urls.API_SAVE_PARAMS,params)
  }

  @action
  async delCase(params) {
    return await this.post(urls.API_DEL_CASE,params)
  }

  @action
  async addCase(params) {
    return await this.post(urls.API_ADD_CASE,params)
  }

  @action
  async delGood(params) {
    return await this.post(urls.API_DEL_GOOD,params)
  }

  @action
  async addGood(params) {
    return await this.post(urls.API_ADD_GOOD,params)
  }

  @action
  async upload(params) {
    return await this.post(urls.API_UPLOAD,params)
  }
  

  @action
  async login(params) {
    const r = await this.post(urls.API_USER_LOGIN, params)
    if (r.code=== 200) {
      jwt.saveToken(r.token)
      this.currUser = r.data
    }
    return r
  }

  @action
  logout() {
    jwt.removeToken()
    this.currUser = null
  }



}

export default new Main()