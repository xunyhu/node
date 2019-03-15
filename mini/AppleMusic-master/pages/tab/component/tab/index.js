Component({
  // 关联子组件
  relations: {
    '../tab-panel/index': {
      type: 'child',
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
    // 默认显示第几个元素
    value: {
      type: String,
      value: ''
    },
    // tab标签标题内容数组
    tab: {
      type: Array,
      value: []
    }
  },

  data: {
    selectIndex: 0,
    tabIndex: 0,
    scrollLeft: 0,
    width: 0,
    ml: 0,
    initMl: 0,
    svWidth: 0,
    panelNodes: [],
    isLower: false,
    lastLeft: 0,
    lastWidth: 0
  },
  ready() {
    this.getAllPanel();
    this.initCal();
  },
  methods: {
    /**
     * @desc 获取子组件tab-panel,用来生成tab
     */
    getAllPanel() {
      const {
        value
      } = this.data;

      const ttab = [];
      const panelNodes = this.getRelationNodes('../tab-panel/index');
      this.setData({ //每一个元素节点所有信息
        panelNodes: panelNodes
      });
      panelNodes.map((item, i) => {
        const {
          data: {
            label,
            name
          }
        } = item;
        if (value === name) this.setData({ //设置高亮的元素
          selectIndex: i
        });
        ttab.push({
          text: label
        });
      });
      this.setData({ //将元素节点里面的标题存到tab数组
        tab: ttab
      });
    },
    /**
     * @desc 初始化tab及一些元素的计算
     */
    initCal() {
      wx.createSelectorQuery()
        .in(this)
        .selectAll('.tab__item')
        .boundingClientRect(rects => { //该方法能获取到每一个元素节点与界面边界的距离信息 单位为px
          const {
            tab
          } = this.data;
          tab.map((item, i) => {
            if (i === tab.length - 1) {
              this.setData({ //lastLeft是最后一个元素距离页面最左边的距离， lastWidth是最后一个元素的宽度
                lastLeft: rects[i].left,
                lastWidth: rects[i].width
              });
            }
            item.left = rects[i].left;
          });

          this.setData({ //给tab数组每一个子元素添加一个距离左边框的距离的left字段
            tab: tab
          });
        })
        .select('.first')
        .boundingClientRect(rect => { 
          this.setData({ //设置initMl 为第一个子元素的距离左边框的距离, 也就是起点位置
            initMl: rect.left
          });
        })
        .select('.scroll-view')
        .boundingClientRect(rect => {
          this.setData({ //设置外层元素的总宽度，也就是整个滑动范围
            svWidth: rect.width
          });
          const {
            selectIndex,
            tab
          } = this.data;
          this.changeTabFun(selectIndex, tab[selectIndex].left);
        })
        .exec();
    },
    /**
     * @desc 切换tab事件
     */
    changeTab({
      currentTarget: {
        dataset: {
          index,
          left
        }
      }
    }) {
      if (this.data.tabIndex === index) return;
      this.changeTabFun(index, left);
    },
    /**
     * @desc 切换tab事件，计算scroll-view显示位置
     */
    changeTabFun(index, left) { //index参数为需要高亮元素的下标， left参数为需要高亮元素距离左边界的距离
      const {
        tab,
        initMl,
        svWidth,
        panelNodes
      } = this.data;
      tab.map((item, i) => (item.active = i === index)); 

      this.setData({ //给tab数组每一个元素增加一个acitve字段， 增加tabIndex记录当前高亮元素
        tab: tab,
        tabIndex: index
      });
      wx.createSelectorQuery()
        .in(this)
        .select('.active')
        .boundingClientRect(rect => {
          //计算滑动终点位置： 从起点位置开始,滑动到总距离减去高亮元素一半的距离（也就是让高亮元素始终居中）
          const sc = left - initMl - (svWidth - rect.width) / 2;
          this.setData({ //设置width字段为当前高亮元素的宽度，设置滑动距离
            width: rect.width,
            scrollLeft: sc
          });
          // 延迟底部横线切换效果
          setTimeout(() => {
            this.setData({
              ml: left - initMl
            });
          }, 80);
        })
        .exec();

      panelNodes.map((item, i) => {
        item.setData({ //isShow 代表当前高亮元素
          isShow: index === i
        });
      });

      this.triggerEvent('changeTab', {
        name: panelNodes[index].data.name
      });
    },
    /**
     * @desc 绑定滚动，判断是否滚动到最右侧来显示渐变蒙版
     */
    bindscroll({
      detail: {
        scrollLeft
      }
    }) {
      const {
        svWidth,
        initMl,
        lastLeft,
        lastWidth
      } = this.data;
      const l = Math.floor(lastLeft - svWidth + lastWidth - initMl);
      if (scrollLeft >= l - 1) {
        this.setData({
          isLower: true
        });
      } else {
        this.setData({
          isLower: false
        });
      }
    },
    /**
     * @desc 切换到某个面板
     */
    toPanel(panelName) {
      const {
        panelNodes
      } = this.data;
      this.setData({
        selectIndex: 0
      });
      panelNodes.map((item, i) => {
        const {
          data: {
            name
          }
        } = item;
        if (panelName === name) this.setData({
          selectIndex: i
        });
      });
      this.initCal();
    }
  }
});