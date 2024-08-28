/**
 * a 标签下载功能
 * @param {String} URL 下载内容，URL || blob: URL || data: URL(base64)
 * @param {String} name 下载后的文件名称
 */
export const downloadTagA = ({ URL, name }) => {
  const elem = document.createElement('a')
  elem.download = name || new Date().getTime()
  elem.style.display = 'none'
  elem.href = URL
  document.body.appendChild(elem)
  elem.click()
  document.body.removeChild(elem)
}

/**
 * 读取 Blob 中的内容，返回 data: URL
 * @param {File|Blob} file 使用 File 或 Blob 对象指定要读取的文件或数据
 * @return {String} then(result) data: URL
 * @return {-} catch
 * */
export const fileToDataURL = ({ file }) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = function () {
      resolve(this.result)
    }
    reader.onerror = function () {
      reject()
    }
  })

/**
 * <input type="file"/>
 * @param {Boolean} accept file 类型
 * @param {Boolean} multiple 是否允许一个以上 file
 * @return {Array} files
 *   @return {File} file File 对象
 * */
export const inputFile = ({ accept, multiple }) =>
  new Promise((resolve, reject) => {
    const elem = document.createElement('input')
    elem.type = 'file'
    elem.accept = accept || 'image/*'
    elem.multiple = multiple || false
    elem.style.display = 'none'

    // change 事件
    const change = function () {
      console.log('打印 input change 事件: ', this.files)
      document.body.removeChild(elem)
      if ([...this.files].length > 0) {
        const files = multiple ? [...this.files] : [this.files[0]]
        resolve(files)
      } else {
        reject()
      }
    }
    elem.addEventListener('change', change)
    document.body.appendChild(elem)
    elem.focus()
    elem.click()
    // console.log('打印 elem para: ', elem.accept, elem.multiple);
  })

/**
 * 上传图片并获得图片 data: URL - 单图
 * */
export const inputImageToDataURL = () =>
  new Promise((resolve, reject) => {
    inputFile({ accept: 'image/*', multiple: false })
      .then((res) => {
        fileToDataURL({ file: res[0] })
          .then((result) => {
            resolve(result)
          })
          .catch(() => {
            reject()
          })
      })
      .catch(() => {
        reject()
      })
  })

/**
 * 获取图片长，宽
 * @param {String || Object} img
 * @return {Number} width 图片宽
 * @return {Number} height 图片高
 * @return {String || Object} data_url 图片数据
 */
export const imgWH = (img) =>
  new Promise((resolve) => {
    if (typeof img !== 'string') {
      resolve({
        width: img.width,
        height: img.height,
        data_url: img
      })
    } else {
      const image = new Image()
      image.crossOrigin = ''
      image.onload = () => {
        resolve({
          width: image.width,
          height: image.height,
          data_url: image
        })
      }
      image.src = img
    }
  })
