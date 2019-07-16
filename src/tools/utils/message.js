/**
 * @Author: Firmiana
 * @Date: 2019-05-06 18:49:44
 * @Last Modified by: Firmiana
 * @Last Modified time: 2019-05-06 19:13:16
 * @Desc: message
 */

import Vue from 'vue'
import AppIcon from '@/components/commons/AppIcon.vue'

export default function messageLayer() {
  // console.log('Root', Root)
  Vue.prototype.$message.open({
    icon: (h) => h(<AppIcon class='message-icon-danger' icon-name='icon_shortcut' />),
    content: '111',
    duration: 3
  })
}
