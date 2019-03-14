Component({
  relations: {
    '../tab/index': {
      type: 'parent',
      linked(target) {},
      linkChanged(target) {},
      unlinked(target) {}
    }
  },
  properties: {
    // 内联样式
    iStyle: {
      type: String,
      value: ''
    },
    // label用来显示tab的标签名
    label: {
      type: String,
      value: ''
    },
    // name为panel的唯一标识，用来确定要显示哪个panel
    name: {
      type: String,
      value: ''
    }
  },
  data: {
    // 是否显示当前panel
    isShow: false
  }
});