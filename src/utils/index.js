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
 * @return {String} then data: URL
 */
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
 * <input type="file" /> 选择文件
 * @param {String} accept file 类型
 * @param {Boolean} multiple 是否允许一个以上 file
 * @return {Array} files File 对象数组
 */
export const inputFile = ({ accept, multiple }) =>
  new Promise((resolve, reject) => {
    const change = function () {
      document.body.removeChild(elem)
      if ([...this.files].length) {
        const files = multiple ? [...this.files] : [this.files[0]]
        resolve(files)
      } else {
        reject()
      }
    }

    const elem = document.createElement('input')
    elem.type = 'file'
    elem.accept = accept || 'image/*'
    elem.multiple = multiple || false
    elem.style.display = 'none'
    elem.addEventListener('change', change)
    document.body.appendChild(elem)
    elem.focus()
    elem.click()
  })

/**
 * 上传图片并获得图片 data: URL - 单图
 * @return {Promise} result data: URL
 */
export const inputImageToDataURL = async () => {
  try {
    const res = await inputFile({ accept: 'image/*', multiple: false })
    const result = await fileToDataURL({ file: res[0] })
    return result
  } catch (err) {
    console.error(err)
  }
}

/**
 * 获取图片宽、高
 * @param {String || Object} img
 * @return {Object} res
 * @return {Number} res.width 图片宽
 * @return {Number} res.height 图片高
 * @return {Object} res.data_url 图片数据
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
