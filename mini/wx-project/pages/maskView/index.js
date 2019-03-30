Page({
  data: {
    tabs: ["路由列表", "当前页面"],
    activeIndex: 0,
    grids: [0, 1, 2, 3, 4, 5],
    ds: [0, 1, 2, 3],
    showView: false,
    downAni: false,
    urls: [{
      title: 'index',
      url: '/pages/index/index'
    }, {
      title: 'tab',
      url: '/pages/tab/index'
    }, {
      title: 'scrollTabView',
      url: '/pages/scrollTabView/index'
    }, {
      title: 'leftSlide',
      url: '/pages/leftSlide/index'
    }, {
      title: 'maskView',
      url: '/pages/maskView/index'
    }, {
      title: 'maskView2',
      url: '/pages/maskView2/index'
    }]
  },
  onLoad: function(options) {

  },
  tabClick: function(e) {
    this.setData({
      activeIndex: e.currentTarget.id
    });
  },
  handleLink(e) {
    var url = e.currentTarget.dataset.url;
    if (e.currentTarget.dataset.url === '/pages/maskView/index') {
      this.setData({
        activeIndex: 1
      });
      return;
    }
    wx.navigateTo({
      url: url,
    })
  },
  tabClickQxup: function(e) {
    console.log(e);
    var types = e.currentTarget.dataset.hef;
    if (types) {
      var states = false;
      var downAni = true;
    } else {
      var states = true;
      var downAni = false;
    }
    this.setData({
      showView: states,
      downAni: downAni
    });
  },
  tabClickQxdown: function(e) {
    console.log(e);

    var types = e.currentTarget.dataset.hef;
    if (types) {
      var states = false;
      var downAni = true;
    } else {
      var states = true;
      var downAni = false;
    }
    this.setData({
      downAni: downAni
    });
    var qthis = this;
    setTimeout(function() {
      qthis.setData({
        showView: states,
      });
    }, 250);
  }
})