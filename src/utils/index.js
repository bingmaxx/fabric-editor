/**
 * desc: a 标签下载功能
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
