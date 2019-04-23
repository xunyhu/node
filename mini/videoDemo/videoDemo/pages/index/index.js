//index.js
Page({
  data: {
    curr_id: '',
    items: [
      {
        id: 1, src: 'https://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400', poster: 'http://img1.cache.netease.com/catchpic/7/7F/7F5DBC511721334DFAE7970E284FC421.jpg'
      }, {
        id: 2, src: 'https://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400', poster: 'http://img1.cache.netease.com/catchpic/7/7F/7F5DBC511721334DFAE7970E284FC421.jpg'
      },
      {
        id: 3, src: 'https://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400', poster: 'http://img1.cache.netease.com/catchpic/7/7F/7F5DBC511721334DFAE7970E284FC421.jpg'
      },
      {
        id: 4, src: 'https://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400', poster: 'http://img1.cache.netease.com/catchpic/7/7F/7F5DBC511721334DFAE7970E284FC421.jpg'
      },
    ],
  },
  onReady: function () {
    this.videoContext = wx.createVideoContext('myVideo')
  },
  videoPlay(e) {
    this.setData({
      curr_id: e.currentTarget.dataset.id,
    })
    this.videoContext.play()
  }
})
