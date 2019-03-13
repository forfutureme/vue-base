/* global HOST */
import io from 'socket.io-client'
import store from 'store/index'
import * as types from 'store/mutation-types'
const socket = io(`wss://${HOST}`)
export default socket
// socket.on('connect', function () {
//   // console.log('连接成功')
//   socket.emit('echo', 'getShowInfo')
// })
// socket.on('cityPosition_20190305', data => {
//   console.log('接收成功')
// })

// socket.emit('board_20190305', 'getShowInfo')
// socket.on('board_20190305', data => {
//   // console.log(data)
//   // let infoIP = []
//   // if (data) {
//   //   infoIP.push(data)
//   // }
//   // let { tempIpShow } = this.state
//   // tempIpShow = tempIpShow.concat(infoIP)
//   // this.setState({
//   //   tempIpShow: tempIpShow
//   // })
//   // console.log('接收成功')
// })
// socket.on('disconnect', function () {
//   console.log('断开连接')
// })
