import { fabric } from 'fabric'
import { downloadTagA, imgWH } from '@/utils/index.js'
/**
 * 将 fabric 打平
 * @param {Object} data
 */
export const fabricJsonFlat = (data) => {
  let res = []
  if (!data.objects || !Array.isArray(data.objects)) return []
  data.objects.forEach(
    (obj) => (res = obj.type === 'group' ? [...res, ...fabricJsonFlat(obj)] : [...res, obj])
  )
  return res
}

export class Template {
  constructor(options) {
    const { id, width = 720, height = 1280 } = options
    this.id = id
    this.width = width
    this.height = height
    this.zoom = 1
    this.canvas = {} // 全局 canvas
    this.realCanvas = {} // 原始尺寸 canvas
    this.hasActive = false // 是否有对象被选中
    this.init(options)
  }

  /**
   * 从 JSON 加载模版
   * @param {Object} canvas
   * @param {Object} json
   */
  static async loadFromJSON(canvas, json) {
    return new Promise((resolve) => {
      canvas.loadFromJSON(json, () => resolve(canvas))
    })
  }

  /**
   * 限制尺寸并返回中点
   * @param {Number} w 长
   * @param {Number} h 宽
   * @param {String} type
   *   'cover' 保持比例，保证完全覆盖的最小尺寸
   *   'contain' 保持比例，保证不超出的最大尺寸
   * @param {Number} W 限制长度最大值
   * @param {Number} H 限制宽度最大值
   */
  limitSize(w, h, type = 'cover', W, H) {
    const zoom = this.canvas.getZoom()
    W = W || this.canvas.getWidth() / zoom / 2
    H = H || this.canvas.getHeight() / zoom / 2
    // w * scale = W;
    let scale = W / w
    if (type === 'cover' && h * scale < H) {
      scale = H / h
    } else if (type === 'contain' && h * scale > H) {
      scale = H / h
    }
    return {
      left: W,
      top: H,
      scaleX: scale,
      scaleY: scale
    }
  }

  init(options) {
    const { backgroundColor } = options
    const obj = this.getStyleSize()
    this.zoom = obj.width / this.width
    obj.backgroundColor = backgroundColor
    this.canvas = new fabric.Canvas(this.id, obj)
    this.canvas.setZoom(this.zoom)
    this.canvas.preserveObjectStacking = true // 当选择画布中的对象时，该对象不出现在顶层
  }

  /**
   * 根据画布实际尺寸, 获取界面上的展示尺寸
   */
  getStyleSize() {
    const ratio = this.width / this.height
    let w_max = window.innerWidth - 20 // 左右边距共计：20px
    let h_max = window.innerHeight - 32 - 100 - 40 // $image-navbar-h_max, $image-action-h_max, $image-footer-h_max

    let width = w_max
    let height = w_max / ratio
    if (height > h_max) {
      height = h_max
      width = h_max * ratio
    }
    return { width, height }
  }

  /**
   * 创建图片对象
   * @param {String} img 只支持远程图片链接 && base64
   * @param {Object} data 图片对象参数
   */
  static createImage(img, data) {
    return new Promise((resolve) => {
      // const image = new fabric.Image(img, data);
      fabric.Image.fromURL(img, (image) => {
        image.set(data)
        resolve(image)
      })
    })
  }

  /**
   * 添加 Image 对象
   * @param {Boolean} realSize 是否保持原始尺寸
   */
  async addImage(img, data = {}, realSize = false) {
    const { width, height } = await imgWH(img)
    const { left, top, scaleX, scaleY } = this.limitSize(width, height, 'contain')
    const DATA = {
      left,
      top,
      originX: 'center', // left 的起点
      originY: 'center', // top 的起点
      crossOrigin: 'Anonymous',
      scaleX: realSize ? 1 : scaleX,
      scaleY: realSize ? 1 : scaleY
      // selectable: false,
    }
    const image = await Template.createImage(img, { ...DATA, ...data })
    this.afterCreateObj(image)
    return image
  }

  /**
   * 创建对象之后的操作
   */
  afterCreateObj(obj, active = true) {
    this.canvas.add(obj)
    if (!active) return
    this.canvas.setActiveObject(obj)
    this.hasActive = true
  }

  /**
   * 画布保存为图片
   */
  async download() {
    const json = this.canvas.toJSON()
    const objects = fabricJsonFlat(json)
    objects.filter((obj) => obj.type === 'image').forEach((obj) => (obj.crossOrigin = 'Anonymous'))

    const data = { width: this.width, height: this.height, zoom: 1 }
    this.realCanvas = new fabric.Canvas()
    await Template.loadFromJSON(this.realCanvas, json)
    this.realCanvas.set(data)
    const URL = this.realCanvas.toDataURL()
    downloadTagA({ URL })
  }

  finish() {
    this.hasActive = false
    this.canvas.discardActiveObject()
    this.canvas.requestRenderAll()
  }

  test() {
    // console.log('[LOG] getObjects: ', this.canvas.getObjects())
    // this.canvas.forEachObject(layer => (console.log('[LOG] layer.type: ', layer.type)));
  }
}
