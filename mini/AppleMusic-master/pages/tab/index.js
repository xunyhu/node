Page({
  data: {},
  onLoad() { },
  // 子组件事件触发
  onChangeTab({ detail: { name } }) {
    console.log('name :', name);
  },
  // 跳转到制定panel
  toPanel({
    currentTarget: {
      dataset: { panelName }
    }
  }) {
    this.selectComponent('#tab').toPanel(panelName);
  }
});