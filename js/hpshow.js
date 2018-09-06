var userString = window.navigator.userAgent;
var inApp = false;
if (userString.indexOf("tudouni") > -1 || userString.indexOf("tuoduni") > -1 || userString.indexOf("sa-sdk-ios") > -1 || getUrlParam('token')) {
    inApp = true;
    $('.share').show();
}
var zcom = location.hostname == "h5.tudouni.doubozhibo.com" ? 'https://h5.tudouni.doubozhibo.com/tudouni/html/' : 'http://dev-sbzhibo-h5.oss-cn-hangzhou.aliyuncs.com/tudouni/html/';
var domain = location.hostname == 'h5.tudouni.doubozhibo.com' ? 'https://wap.tudouni.doubozhibo.com' : 'https://waptest.tudouni.doubozhibo.com';
var n = {
    $url: zcom + 'hpshow.html',
    title: '2018土豆泥星秀主播大战',
    content: '贺音声卡独家赞助，一起来瓜分星秀主播100万大奖...',
    img: 'https://image.tudouni.doubozhibo.com/common/h5/carnival/0381_x_share_mini.png'
}
connectWebViewJavascriptBridge(function(bridge) {
    window.bridge=bridge
    bridge.init(function(message, responseCallback) {
        if (responseCallback) {
        responseCallback("Right back atcha")
        }
    })
});

var vm = new Vue({
    el: '.container',
    data: {
        navActive: 0,
        navHeight: 0,
        days: [27, 28, 29, 30, 31],
        nowdays: new Date().getDate(),
        uid: getUrlParam('uid'),
        list: [],
        myInfo: {
            photo: 'https://h5.tudouni.doubozhibo.com/m/img/userHeader.png',
            ranking: '',
            score: ''
        },
        showDays: false,
        startTime: 0,
        endTime: new Date().getTime(),
        daylist: [],
        isApp: inApp
    },
    mounted: function(){
        this.getList();
        // this.getDays();
        this.$nextTick(function(){
            var a = [];
            for (var i=0; i<30; i++) {
                a[i] = i + 1;
            }
            this.days = this.days.concat(a);
            // var $h = $('.center_tab').offset().top + 20;     
            // this.navHeight = $h;   
            // $(window).scroll(function() {
            //     var $scroll = $(document).scrollTop();
            //     if ($scroll > $h) {
            //         $('.center_tab').addClass('fixedele');
            //     } else {
            //         $('.center_tab').removeClass('fixedele');
            //     }
            // });

            $('.tanC')[0].addEventListener('touchmove', function(event){
                if (event.target.className == 'tanC') {
                    event.preventDefault();
                } else {
                    // document.body.style.overflow = "hidden";
                }
            }, false);
        })
    },
    methods: {
        changeTab: function(id) {
            this.navActive = id;
            // this.fixedEle();
        },
        fixedEle: function() {
            var $h = this.navHeight;
            var $s = $(document).scrollTop();
            if ($s > $h) {
                $('.center_tab').removeClass('fixedele');
                $(document).scrollTop($h - 300);
            }
        },
        choice: function(id, idx) {
            if (idx < 10) return;
            if (id > this.nowdays) return;
            this.showDays = 1;
            id < 10 ? id = '0' + id : id = id;
            // console.log(id);
            //当天的时间戳
            this.startTime = new Date("2018/09/" + id + " 00:00:00").getTime();
            this.endTime = new Date("2018/09/" + id + " 23:59:59").getTime();
            self.daylist = [];
            this.getDays();
        },
        getList: function() {
            var self = this;
            $.ajax({
                type: "post",
                url: domain + "/h5/shortTermActivity/starShow/scoreRanking",
                data: {
                    uid: self.uid || 1601
                },
                success: function (res) {
                    if (res.code == 0 && res.data) {
                        self.list = res.data.items;
                        if (res.data.myInfo && inApp && JSON.stringify(res.data.myInfo) != '{}') {
                            self.myInfo = res.data.myInfo;
                        } else if (inApp) {
                            self.getInfo();
                        }
                    }
                }
            });
        },
        getDays: function() {
            var self = this;
            $.ajax({
                type: "get",
                url: domain + "/h5/shortTermActivity/starShow/hotsRanking",
                data: {
                    startTime: self.startTime,
                    endTime: self.endTime
                },
                success: function (res) {
                    if (res.code == 0 && res.data) {
                        self.daylist = res.data.items;
                        setTimeout(function(){
                            var wrap2 = document.getElementById('wrapper');
                            var myScroll = new IScroll(wrap2, {
                                scrollX: false,
                                scrollY: true,
                                scrollbars: false,
                                resizeScrollbars: false,
                                click: true,
                                checkDOMChanges: true
                            });
                            wrap2.addEventListener('touchmove', function (e) { e.preventDefault(); },{
                                capture: false,
                                passive: false
                            });
                        }, 1000);
                    }
                }
            });
        },
        getInfo: function() {
            var self = this;
            $.ajax({
                type: 'get',
                url: domain + "/h5/user/info",
                data: {
                    sid: self.uid || 1601
                },
                success: function (res) {
                    if (res.code == 0 && res.data) {
                        self.myInfo.photo = res.data.photo;
                        self.myInfo.ranking = 0;
                        self.myInfo.score = 0;
                    }
                }
            })
        },
        godetail: function(id) {
            window.location.href = 'tudouni://tudouni/userSpace?uid=' + id;
        },
        imgUrl: function(url) {
            if (url) {
                return url + '?x-oss-process=image/resize,m_fixed,w_100,image/crop,w_100,h_100,g_center';
            } else {
                return 'https://h5.tudouni.doubozhibo.com/m/img/userHeader.png';
            }
        },
        share: function() {
            if (window.bridge) {
                bridge.callHandler('share', {
                    'url': n.$url,
                    'title': n.title,
                    'content': n.content,
                    'img': n.img
                }, function (response) {});
            } else {
                console.log('faild');
            }
        },
        closeTab: function() {
            this.showDays = 0;
            // document.body.style.overflow = "";
        }
    }
});

if (userString.indexOf("MicroMessenger") > -1) {
    $.getScript('../js/wxshare.js', function() {
        $.ajax({
         type: 'get',
         url: domain + '/h5/shareConfig/weixin',
         data: {
             url: window.location.href
         },
         success: function(res) {
             if (res.code == 0) {
                 wxconfig.config({
                     data: res.data,
                     callback: function(){
                         wxconfig.share(n);
                     }
                 })
             }
         }
        })
    })
}