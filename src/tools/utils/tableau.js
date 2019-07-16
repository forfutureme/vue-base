/**
 * @Author: Firmiana
 * @Date: 2019-04-03 11:22:18
 * @Last Modified by: huweijian
 * @Last Modified time: 2019-04-27 16:57:26
 * @Desc: 图像处理相关方法
 */

/**
 * 获取微信图片剪切大小
 * @param str {string} 图片url
 * @param size {number} 目标值 0/32/64/132/默认132
 * @return {string}
 */
export function imgTozSize(str = '', size = 132) {
  return str ? str.replace(/0$/, '132').replace(/0\.jpg(\?t=\d+)/, '132.jpg$1') : ''
}

/**
 * 获取设备物理高宽
 * @returns {{width: number, height: number}}
 */
export function getDeviceWidthHeight() {
  return {
    width: window.screen.width * window.devicePixelRatio,
    height: window.screen.height * window.devicePixelRatio
  }
}

/**
 * 计算在实际设备上的相对值
 * @param real
 * @param base
 * @param deviceVal
 * @returns {number}
 */
export function calcRelativeVal(real, base, deviceVal) {
  return real / base * deviceVal
}

/**
 * 在画布手上写文字
 * @param context {Object} canvas画布对象 canvas.context
 * @param color {string} 字体颜色rgb rgba(0, 0, 0, 1)
 * @param size {string} 字体大小 20px
 * @param bold {boolean} 是否加粗 false/true 默认值false
 * @param family {string} 字体 字体样式 默认值PingFangSC-Regular
 * @param text {string} 文字内容
 * @param left {number} 左偏移值
 * @param top {number} 上偏移值
 */
export function drawText({
  context,
  color,
  size,
  bold = false,
  family = 'PingFangSC-Regular',
  text,
  left,
  top
}) {
  context.font = `${bold ? 'bold ' : ' '}${size} ${family}`
  context.fillStyle = color
  // context.textAlign = 'center'
  context.textBaseline = 'hanging'
  context.fillText(text, left, top)
}

/**
 * 单个文字换行
 * @param context {Object} canvas画布对象 canvas.context
 * @param color {string} 字体颜色rgb rgba(0, 0, 0, 1)
 * @param size {string} 字体大小 20px
 * @param bold {boolean} 是否加粗 false/true 默认值false
 * @param family {string} 字体 字体样式 默认值PingFangSC-Regular
 * @param text {string} 文字内容
 * @param left {number} 左偏移值
 * @param top {number} 上偏移值
 * @param lineHeight {number} 行高
 * @param leftFunc {function} 左偏移计算方法
 * @param topFunc {function} 上偏移计算方法
 */
export function singleWordWrap({
  context,
  color,
  size,
  bold = false,
  family = 'PingFangSC-Regular',
  text,
  left,
  top,
  lineHeight,
  leftFunc,
  topFunc
}) {
  const arr = text.split('')
  for (let i = 0; i < arr.length; i++) {
    drawText({
      context,
      color,
      size: `${leftFunc(size)}px`,
      bold,
      family,
      text: text[i],
      left: leftFunc(left),
      top: topFunc(top + lineHeight * size * i)
    })
  }
}

/**
 * 绘制矩形
 * @param context {Object} canvas画布对象 canvas.context
 * @param color {string} 图形填充色 '#fff'
 * @param width {number} 宽
 * @param height {number} 高
 * @param left {number} 左偏移值
 * @param top 上偏移值
 */
export function drawSquare({
  context,
  color,
  width,
  height,
  left,
  top
}) {
  // 绘制图形
  context.beginPath()
  // 设定图形边框的样式
  context.fillStyle = color
  // 指定线宽
  // context.lineWidth = width
  context.fillRect(left, top, width, height)
  context.closePath()
  // context.stroke()
}

/**
 * 划线
 * @param context {Object} canvas画布对象 canvas.context
 * @param color  {string} 线颜色 '#fff'
 * @param width {number} 线宽
 * @param moveL {number} 起始左坐标
 * @param moveT number} 起始上坐标
 * @param toL {number} 结束左坐标
 * @param toT {number} 结束上坐标
 */
export function drawLine({
  context,
  color,
  width,
  moveL,
  moveT,
  toL,
  toT
}) {
  context.beginPath()
  context.strokeStyle = color
  context.lineWidth = width
  context.moveTo(moveL, moveT)
  context.lineTo(toL, toT)
  context.stroke()
  context.closePath()
}

/**
 * 圆角头像
 * @param context {Object} canvas画布对象 canvas.context
 * @param img {object} 图片实体内容
 * @param x {number} 左偏移
 * @param y {number} 右偏移
 * @param r {number} 圆角半径
 */
export function circleImg({
  context,
  img,
  x,
  y,
  r
}) {
  context.save()
  context.beginPath()
  const d = 2 * r
  const cx = x + r
  const cy = y + r
  context.arc(cx, cy, r, 0, 2 * Math.PI)
  context.clip()
  context.drawImage(img, x, y, d, d)
  context.restore()
  context.closePath()
}

/**
 * 画带描边的圆
 * @param context {Object} canvas画布对象 canvas.context
 * @param color 填充颜色 '#fff'
 * @param bWidth {number} 描边宽度
 * @param bColor {number} 描边颜色
 * @param left {number} 左偏移
 * @param top {number} 右偏移
 * @param r {number} 半径
 */
export function circArc({
  context,
  color = '#fff',
  bWidth = 2,
  bColor = '#000',
  left,
  top,
  r
}) {
  context.save()
  context.beginPath()
  context.strokeStyle = bColor
  context.lineWidth = bWidth
  context.arc(left + r, top + r, r, 0, 2 * Math.PI)
  context.fillStyle = color
  context.fill()
  context.stroke()
  context.closePath()
}

/**
 * 计算左位移
 * @param width 实际宽
 * @returns {function(*): number}
 */
export function getLeft(width) {
  return (val) => {
    return val / 750 * width
  }
}

/**
 * 计算顶部位移
 * @param height 实际高
 * @returns {function(*): number}
 */
export function getTop(height) {
  return (val) => {
    return val / 1344 * height
  }
}
