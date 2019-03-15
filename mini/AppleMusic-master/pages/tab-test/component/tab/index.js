Component({
  relations: {
    '../tab-panel/index': {
      type: 'child',
      linked(target) { },
      linkChanged(target) { },
      unlinked(target) { }
    }
  },
  properties: {
    Style: {
      type: String,
      value: ''
    },
    value: {
      type: String,
      value: ''
    },
    tab: {
      type: Array,
      value: []
    }
  },
  data: {
    isLower: false,
    scrollLeft: 0,
    borderWidth: 0,
    borderMargin: 0,
    lastLeft: 0,
    lastWidth: 0,
    initLeft: 0,
    wrapWidth: 0,
    panelNodes: [],
    selectIndex: 0,
    tabIndex: 0
  },
  ready() {
    this.getAllPanel();
    this.initCal();
  },
  methods: {
    getAllPanel() {
      const {value} = this.data;
      let tabs = [];
      const panelNodes = this.getRelationNodes("../tab-panel/index");
      this.setData({
        panelNodes: panelNodes
      });
      panelNodes.map((item, idx) => {
        const { data: {label, name} } = item;
        if (value == name) this.setData({
          selectIndex: idx
        });
        tabs.push({text: label});
      });
      this.setData({
        tab: tabs
      });
    },
    initCal() {
      wx.createSelectorQuery().in(this).selectAll('.tab-item').boundingClientRect(rects => {
        const {tab} = this.data;
        tab.map((item, idx) => {
          item.left = rects[idx].left;
          if (idx === tab.length - 1) {
            this.setData({
              lastLeft: rects[idx].left,
              lastWidth: rects[idx].width
            })
          }
        });

        this.setData({
          tab: tab
        })
      }).select('.first').boundingClientRect(rect => {
        this.setData({
          initLeft: rect.left
        })
      }).select('.scroll-view').boundingClientRect(rect => {
        this.setData({
          wrapWidth: rect.width
        })
        const { selectIndex, tab } = this.data;
        this.changeTabFun(selectIndex, tab[selectIndex].left);
      }).exec();
    },
    changeTabFun(idx, left) {
      const { tab, initLeft, wrapWidth, panelNodes } = this.data;
      tab.map((item, index) => (item.active = index === idx));
      this.setData({
        tab: tab,
        tabIndex: idx
      });
      wx.createSelectorQuery().in(this).select('.active').boundingClientRect(rect => {
        const sc = left - initLeft - (wrapWidth - rect.width) / 2;
        this.setData({
          borderWidth: rect.width / 2,
          scrollLeft: sc
        });
        setTimeout(() => { //底部高亮边框延迟移动
          this.setData({
            borderMargin: Math.abs(left - initLeft + rect.width / 4)
          })
        }, 80)
      }).exec();

      panelNodes.map((item, index) => {
        item.setData({
          isShow: index === idx
        })
      });

      this.triggerEvent('changeTab', {
        name: panelNodes[idx].data.name
      })
    },
    changeTab(e) {
      const {index, left} = e.currentTarget.dataset;
      if (this.data.tabIndex === index) return;
      this.changeTabFun(index, left);
    },
    bindscroll(e) {
      const scrollLeft = e.detail.scrollLeft;
      const {wrapWidth, initLeft, lastLeft, lastWidth} = this.data;
      const l = Math.floor(lastLeft - initLeft - wrapWidth + lastWidth);
      if (scrollLeft >= l - 1) {
        this.setData({
          isLower: true
        })
      } else {
        this.setData({
          isLower: false
        })
      }
    }
  }
})