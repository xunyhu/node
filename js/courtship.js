var zcom = location.hostname == "h5.tudouni.doubozhibo.com" ? 'https://h5.tudouni.doubozhibo.com/tudouni/html/' : 'http://dev-sbzhibo-h5.oss-cn-hangzhou.aliyuncs.com/tudouni/html/';
var domain = location.hostname == 'h5.tudouni.doubozhibo.com' ? 'https://wap.tudouni.doubozhibo.com' : 'http://waptest.tudouni.doubozhibo.com';
var n = {
    $url: zcom + 'courtship_ivt.html?code=' + getUrlParam('tdid') + '&uid=' + getUrlParam('uid'),
    title: '912示爱节',
    content: '测试测试',
    img: 'https://image.tudouni.doubozhibo.com/common/h5/carnival/0907_mini.png'
}
connectWebViewJavascriptBridge(function(bridge) {
    window.bridge=bridge
    bridge.init(function(message, responseCallback) {
        if (responseCallback) {
        responseCallback("Right back atcha")
        }
    })
});
var livenum = getUrlParam('anchorid');
//抽奖
$(function(){
    //获取抽奖选项
    $.ajax({
        type: 'post',
        url: domain + '/h5/livelotty/getLottyDetail',
        data: {
            id: 71
        },
        success: function(res) {
            if (res.code == 0 && res.data.objectList) {
                var data = res.data.objectList;
                var obj = {
                    id: 0,
                    imageUrl: '../img/912/6.png',
                    name: "thanks",
                    objectId: 0
                }
                data.splice(4, 0, obj);
                data.splice(5, 0, obj);
                $('.gift').each(function(index, element){
                    $(this).css("background-image", "url("+ data[index].imageUrl +")");
                });
            }
        }
    });

    var runT,
        step = -1,
        stopStep = 8,
        runing = 0,
        during = 2;
    
    $('#lottery_btn').click(function(){
        // stopStep = Math.floor(Math.random()*8+1);
        if (runing) return;
        $('.gift').css("opacity", .6);
        runT = setTimeout(runF, 100);
    });

    function runF() {
        if (step >= (stopStep + 32)) {
            step = stopStep;
            $(".gift"+(step%8)).css("opacity", 1);
            // $(".gift"+(step%8)).css("background-color","#F00");
            clearTimeout(runT);
            runing = 0;
            return;
        }
        if (step >= (stopStep + 24)) {
            during += 1;  
        } else {
            if (during <=2) {
                during = 2;
            }
            during--;
        }
        step++;
        $('.gift').each(function(index, element){
            $(this).css("opacity", 0.6);
        });
        // $(".gift"+(step%8)).css("background-color","#FF0");
        $(".gift"+(step%8)).css("opacity", 1);
        runT = setTimeout(runF, during*50);
    }
});
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
                bridge.callHandler('closeWebView', {}, function (response) {});
            } else {
                console.log('faild');
            }
        }
    }
})