/*
 * @Author: Firmiana 
 * @Date: 2019-04-03 11:22:18 
 * @Last Modified by: Firmiana
 * @Last Modified time: 2019-04-03 17:28:24
 * @Desc: 图像处理相关方法 
 */

/**
 * 设置图片尺寸
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
 * 写文字
 * **/
export function drawText({ context, color, size, bold = false, family = 'PingFangSC-Regular', text, left, top }) {
  context.font = `${bold ? 'bold ' : ' '}${size} ${family}`
  context.fillStyle = color
  // context.textAlign = 'center'
  context.textBaseline = 'hanging'
  context.fillText(text, left, top)
}

/**
 * 单个文字换行
 * @param context
 * @param color
 * @param size
 * @param bold
 * @param family
 * @param text
 * @param left
 * @param top
 * @param lineHeight
 * @param leftFunc
 * @param topFunc
 */
export function singleWordWrap({ context, color, size, bold, family, text, left, top, lineHeight, leftFunc, topFunc }) {
  let arr = text.split('')
  for (let i = 0; i < arr.length; i++) {
    drawText({
      context, color, size: `${leftFunc(size)}px`, bold, family, text: text[i], left: leftFunc(left), top: topFunc(top + lineHeight * size * i)
    })
  }
}

/**
 * 绘制图形
 * **/
export function drawSquare({ context, color, width, height, left, top }) {
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
 * **/
export function drawLine({ context, color, width, moveL, moveT, toL, toT }) {
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
 * @param ctx
 * @param img
 * @param x
 * @param y
 * @param r
 */
export function circleImg({ context, img, x, y, r }) {
  context.save()
  context.beginPath()
  let d = 2 * r
  let cx = x + r
  let cy = y + r
  context.arc(cx, cy, r, 0, 2 * Math.PI)
  context.clip()
  context.drawImage(img, x, y, d, d)
  context.restore()
  context.closePath()
}

/**
 * 画带描边的圆
 * @param context
 * @param color
 * @param bWidth
 * @param bColor
 * @param left
 * @param top
 * @param r
 */
export function circArc({ context, color = '#fff', bWidth = 2, bColor = '#000', left, top, r }) {
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
 * @param width
 * @returns {function(*): number}
 */
export function getLeft(width) {
  return (val) => { return val / 750 * width }
}

/**
 * 计算顶部位移
 * @param height
 * @returns {function(*): number}
 */
export function getTop(height) {
  return (val) => { return val / 1344 * height }
}

