import { colors } from '@/utils/public.js'

// 定界框样式参数
const BORDER = {
  hasControls: true,              // 是否有控制点
  hasRotatingPoint: false,        // 是否有旋转点
  transparentCorners: false,      // 控制点是否透明
  padding: 0,                     // 内边距
  hasBorders: true,               // 是否有边框
  borderOpacityWhenMoving: 0.5,   // 移动时边框透明度
  borderColor: colors.primary,    // 边框颜色
  cornerSize: 8,                  // 控制点大小
  cornerStyle: 'rect',            // 控制点样式 'circle', 'rect'
  cornerColor: 'white',           // 控制点颜色
  cornerStrokeColor: '#dcdfe6',   // 控制点边框颜色
  centeredScaling: false,         // 中心缩放
  // centeredRotation: false,     // 中心旋转
}

const BORDER_TYPE = {
  image: BORDER,
  textbox: BORDER,
  rect: { ...BORDER, hasBorders: false, },
  circle: { ...BORDER, hasBorders: false, },
  path: { ...BORDER, hasBorders: false, },
  group: BORDER,
}

const CONTROL_VISIBLE_TYPE = {
  image: {
    tl: true,     // 左上角
    tr: true,     // 右上角
    bl: true,     // 左下角
    br: true,     // 右下角
    mt: false,    // 上中
    mr: false,    // 右中
    mb: false,    // 下中
    ml: false,    // 左中
    mtr: true,    // 旋转控制点
  },
  textbox: {
    tl: false, tr: false, bl: false, br: true,
    mt: false, mr: false, mb: false, ml: false, mtr: true,
  },
  rect: {
    tl: false, tr: false, bl: false, br: false,
    mt: true, mr: true, mb: true, ml: true, mtr: false,
  },
  circle: {
    tl: false, tr: false, bl: false, br: false,
    mt: true, mr: true, mb: true, ml: true, mtr: false,
  },
  path: {
    tl: false, tr: false, bl: false, br: false,
    mt: true, mr: true, mb: true, ml: true, mtr: false,
  },
  group: {
    tl: false, tr: false, bl: false, br: true,
    mt: false, mr: false, mb: false, ml: false, mtr: false,
  },
}

/**
 * 设置定界框样式
 * @param {Object} obj fabric 对象
 */
const setBorder = (obj) => {
  const type = obj.type || ''
  const border = BORDER_TYPE[type] || BORDER
  const controlVisible = CONTROL_VISIBLE_TYPE[type] || {}
  obj.set(border)
  Object.keys(controlVisible).forEach(k => (obj.setControlVisible(k, controlVisible[k])))
}

export const initBorder = (fabric) => {
  // 设置定界框默认样式
  fabric.Object.prototype.hasControls = false
  fabric.Object.prototype.hasBorders = true
  fabric.Object.prototype.borderColor = 'white'

  // 扩展对象的边框样式
  setBorder(fabric.Image.prototype)
  setBorder(fabric.Textbox.prototype)
  setBorder(fabric.Rect.prototype)
  setBorder(fabric.Circle.prototype)
  setBorder(fabric.Path.prototype)
  setBorder(fabric.Group.prototype)
}