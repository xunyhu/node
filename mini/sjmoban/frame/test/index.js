var app = getApp();
Page({
  data: {
    winHeight: "", //窗口高度
    currentTab: 0, //预设默认选中的栏目
    scrollLeft: 0, //tab滚动条距离左侧距离
    newsTab: ["健康", "情感", "职场", "育儿", "文学", "青葱", "科技", "达人"],
    authorList: {
      img: "https://tvax1.sinaimg.cn/crop.0.0.996.996.180/63885668ly8fjf57kfmgfj20ro0ro0u7.jpg",
      name: "欢顔",
      tag: "知名情感博主",
      answer: 134,
      listen: 2234
    }
  },
  // 滚动切换标签样式
  switchTab: function(e) {
    this.getHeight(e.detail.current + 2);
    this.setData({
      currentTab: e.detail.current
    });
    this.checkCor();
  },
  // 点击tab切换当前页时改变样式
  swichNav: function(e) {
    var cur = e.target.dataset.current;
    if (this.data.currentTab == cur) {
      return false;
    } else {
      this.setData({
        currentTab: cur
      })
    }
  },
  //判断当前滚动超过一屏时，设置tab向左滚动。
  checkCor: function() {
    if (this.data.currentTab > 4) {
      this.setData({
        scrollLeft: 300
      })
    } else {
      this.setData({
        scrollLeft: 0
      })
    }
  },
  onLoad: function() {
    var that = this;

    wx.getSystemInfo({
      success: function (res) {
        var clientHeight = res.windowHeight,
          clientWidth = res.windowWidth,
          rpxR = 750 / clientWidth;
        var calc = clientHeight * rpxR - 180;
        that.setData({
          winHeight: calc
        });
      }
    });
  },
  getHeight: function(idx) { //  高度自适应
    this.setData({
      winHeight: idx*150
    });
  }
})