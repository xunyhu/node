Page({
  data: {
    tabs: ["班级", "团队"],
    activeIndex: 0,
    grids: [0, 1, 2, 3, 4, 5],
    ds: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
    showView: false,
    downAni: false,
  },
  onLoad: function (options) {

  },
  tabClick: function (e) {
    this.setData({
      activeIndex: e.currentTarget.id
    });
  },

  tabClickQxup: function (e) {
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
  tabClickQxdown: function (e) {
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
    setTimeout(function () {
      qthis.setData({
        showView: states,
      });
    }, 250);
  }
})