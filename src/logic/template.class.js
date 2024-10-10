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
  static async loadFromJSON({ canvas, json }) {
    return new Promise((resolve) => {
      canvas.loadFromJSON(json, () => resolve(canvas))
    })
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
   * 限制尺寸并返回中点
   * @param {Number} w 长
   * @param {Number} h 宽
   * @param {Number} w_max 限制最大长度
   * @param {Number} h_max 限制最大宽度
   * @param {String} type = 'cover'   保持比例，保证完全覆盖的最小尺寸
   * @param {String} type = 'contain' 保持比例，保证不超出的最大尺寸
   */
  limitSize({ w, h, w_max, h_max, type = 'cover' }) {
    w_max = w_max || this.width / 2
    h_max = h_max || this.height / 2
    let scale = w_max / w
    if ((type === 'cover' && h * scale < h_max) || (type === 'contain' && h * scale > h_max)) {
      scale = h_max / h
    }
    return { left: w_max, top: h_max, scaleX: scale, scaleY: scale }
  }

  /**
   * 创建图片对象
   * @param {String} url 只支持远程图片链接 || base64
   * @param {Object} data 图片对象参数
   */
  static createImage({ url, data = {} }) {
    return new Promise((resolve) => {
      fabric.Image.fromURL(url, (image) => {
        image.set(data)
        resolve(image)
      })
    })
  }

  async addImage({ url, data = {} }) {
    const { width, height } = await imgWH(url)
    const obj = this.limitSize({ w: width, h: height, type: 'contain' })
    const _data = {
      originX: 'center',
      originY: 'center',
      crossOrigin: 'Anonymous',
      ...obj,
      ...data
    }
    const image = await Template.createImage({ url, data: _data })
    this.afterCreateObj({ obj: image })
    return image
  }

  replaceImage({ url }) {
    console.log('[LOG] url: ', url)
  }

  tailorImage() {

  }

  afterCreateObj({ obj, active = true }) {
    this.canvas.add(obj)
    if (!active) return
    this.canvas.setActiveObject(obj)
    this.hasActive = true
  }

  async download() {
    const json = this.canvas.toJSON()
    const objects = fabricJsonFlat(json)
    objects.filter((obj) => obj.type === 'image').forEach((obj) => (obj.crossOrigin = 'Anonymous'))

    const data = { width: this.width, height: this.height, zoom: 1 }
    this.realCanvas = new fabric.Canvas()
    await Template.loadFromJSON({ canvas: this.realCanvas, json })
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
    // this.canvas.forEachObject(layer => (console.log('[LOG] layer.type: ', layer.type)))
  }
}
