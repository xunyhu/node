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
var livenum = getUrlParam('live');
var vm = new Vue({
    el: '.contianer',
    data: {
        liveroom: livenum,
        activetab: livenum ? 0 : 1,
        dialog: 0, // 1 抽奖规则，2 活动规则
    },
    mounted: function() {
        this.$nextTick(function(){
            // $('.dialog')[0].addEventListener('touchmove', function(event){
            //     event.preventDefault();
            // })
        })
    },
    methods: {
        showRule: function() {
            this.dialog = 2;
        },
        showPrize: function() {
            console.log('我的奖品')
        },
        lotterRule: function() {
            this.dialog = 1;
        },
        changeTab: function(id) {
            this.activetab = id;
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
        backLive: function() {
            if (window.bridge) {
                bridge.callHandler('closewebView', {}, function (response) {});
            } else {
                console.log('faild');
            }
        }
    }
})