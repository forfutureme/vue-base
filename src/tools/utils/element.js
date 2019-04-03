/*
 * @Author: Firmiana 
 * @Date: 2019-04-03 11:29:45 
 * @Last Modified by: Firmiana
 * @Last Modified time: 2019-04-03 17:44:20
 * @Desc: 元素属性操作相关方放 
 */
import store from 'store/index'
import * as types from 'store/mutation-types'


/**
* 设置元素属性 暂时只支持 class 和 id
* @param name
* @param attr
* @param val
*/
export function setAttr(name, attr, val) {
  let dom = name.indexOf('#') > -1
    ? document.getElementById(name.replace('#', ''))
    : document.getElementsByClassName(name.replace('.', ''))
  dom.setAttribute(attr, val)
}

/**
 * 修改页面标题
 * @param title
 */
export function changeTitle(title) {
  if (this.$_JTRunApp()) {
    document.title = title
  } else {
    document.setTitle = function (t) {
      document.title = t
      var i = document.createElement('iframe')
      i.src = '//m.baidu.com/favicon.ico'
      i.style.display = 'none'
      i.onload = function () {
        setTimeout(function () {
          i.remove()
        }, 9)
      }
      document.body.appendChild(i)
    }

    setTimeout(function () {
      document.setTitle(title)
    }, 1)
  }
}

/**
 * 弹层封装
 * @param {*} show 
 * @param {*} text 
 */
export function autoHideLayer(show = false, text = '') {
  store.commit(types.LAYER_AUTO_HIDE_CTRL, {
    show,
    text
  })
}

/**
 * 简单封装loading弹层控制
 * @param o
 */
export function loading(o) {
  store.commit(types.THE_LOADING_CTRL, {
    show: false,
    text: '',
    ...o
  })
}

/**
 * 简单分装提示弹层
 * @param title
 * @param text
 * @param delay
 */
export function layerHide({ title = '', text = '', delay = 2 }) {
  store.commit(types.LAYER_HIDE_AUTO_CTRL, {
    show: true,
    title,
    text,
    delay
  })
}

/**
 * 简单封装通知弹层
 * @param o
 */
export function layerNotice(o = {}) {
  store.commit(types.LAYER_NOTICE_CTRL, {
    show: false,
    text: '',
    ...o
  })
}

/**
 * html --> text
 * @param {*} val 
 */
export function html2Text(val) {
  const div = document.createElement('div')
  div.innerHTML = val
  return div.textContent || div.innerText
}
