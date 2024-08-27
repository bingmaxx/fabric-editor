export const colors = {
  primary: '#00d878',
  success: '#2880d9',
  info: '#909399',
  warning: '#fa9d3f',
  danger: '#ff3c3c'
}

export const fabricPub = {
  /**
   * 功能列表
   * immediate: 为 true，点击 tool 时不设置 tool_key
   * draw: 是否有绘制模式, 为 true，点击空白出不退出 tool
   * position: 为 true，图层选中时画布允许浮动
   */
  toolList: [
    {
      key: 'tool_img',
      value: '加图',
      immediate: true,
      draw: false,
      position: false
    },
    {
      key: 'tool_text',
      value: '文字',
      immediate: true,
      draw: false,
      position: true
    }
  ]
}
