import { fabric } from 'fabric'

export class Template {
  constructor(options) {
    this.canvas = {} // 全局 canvas
    this.realCanvas = {} // 原始尺寸 canvas
    this.hasActive = false // 是否有对象被选中
    this.init(options)
  }

  init(options) {
    const { id, width = 720, height = 1280 } = options
    const obj = this.getStyleSize(width, height)
    const zoom = obj.width / width
    this.canvas = new fabric.Canvas(id, obj)
    this.canvas.setZoom(zoom)
    this.canvas.preserveObjectStacking = true // 当选择画布中的对象时，该对象不出现在顶层
  }

  /**
   * 根据画布实际尺寸, 获取界面上的展示尺寸
   * @param {Number} width
   * @param {Number} height
   */
  getStyleSize(width, height) {
    const ratio = width / height
    let w_max = window.innerWidth - 20 // 左右边距共计：20px
    let h_max = window.innerHeight - 32 - 100 - 40 // $image-navbar-h_max, $image-action-h_max, $image-footer-h_max

    let w = w_max
    let h = w_max / ratio
    if (h > h_max) {
      h = h_max
      w = h_max * ratio
    }
    return { width: w, height: h }
  }
}
