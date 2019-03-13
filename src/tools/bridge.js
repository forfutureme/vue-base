/**
 * Created by huweijian on 2018/5/22.
 * @title
 */
class Bridge {
  constructor () {
    this.todos = {}
  }

  /**
   * 空函数
   */
  emptyFun () {}

  /**
   * 注册回调函数
   * @param success
   * @param error
   */
  register (success, error) {
    let callbackId = `hm_${+new Date()}`
    this.todos[callbackId] = {
      success: success || this.emptyFun,
      error: error || this.emptyFun
    }
    return callbackId
  }
  run (method, params, success, error) {
    // console.log(method, params)
    let callbackId = this.register(success, error)
    let msg
    try {
      msg = window.javaScriptInterface.setRunResult(method, JSON.stringify(params), callbackId)
    } catch (e) {
      console.error('调用原生方法失败' + JSON.stringify(e))
    }
    // 如果不是Android
    if (!msg) {
    }
  }
}
window.JTBridge = new Bridge()

window.JTCallback = function (callbackId, status, json) {
  let fn = function () {}
  let todos = window.JTBridge.todos || {}
  if (todos[callbackId]) {
    fn = todos[callbackId][status] || function () {}
  }
  fn.call(window.JTBridge, json)
  delete window.JTBridge.todos[callbackId]
}
