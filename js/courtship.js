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
var lotteryList;
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
                var arr = [{
                    id: 8,
                    imageUrl: '../img/912/6.png',
                    name: "thanks",
                    objectId: 0
                },{
                    id: 9,
                    imageUrl: '../img/912/6.png',
                    name: "thanks",
                    objectId: 0
                }]
                data.splice(4, 0, arr[0]);
                data.splice(5, 0, arr[1]);
                lotteryList = data;
                $('.gift').each(function(index, element){
                    $(this).css("background-image", "url("+ data[index].imageUrl +")")
                           .attr("id", data[index].id);
                });
            }
        }
    });

    var runT,
        step = -1,
        stopStep = 1,//中奖停止位置
        runing = 0,
        during = 2;
    
    $('#lottery_btn').click(function(){
        var idx = Math.floor(Math.random()*7+1);
        var endId = lotteryList[idx].id;
        var str = $("#" + endId).attr("class").split(' ')[1];
            str = str.substr(str.length-1, 1);
            stopStep = Number(str);
        if (runing) return;
        runing = 1;
        $('.gift').css("opacity", .4).removeClass('twinkle');
        runT = setTimeout(runF, 100);
    });

    function runF() {
        if (step >= (stopStep + 32)) {
            step = stopStep;
            $(".gift"+(step%8)).css("opacity", 1).addClass('twinkle');
            showResult($(".gift"+(step%8)).attr('id'));
            clearTimeout(runT);
            step = -1;
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
        $(".gift"+(step%8)).css("opacity", 1);
        runT = setTimeout(runF, during*50);
    }

    function showResult(id) {
        for (var i=0; i<lotteryList.length; i++) {
            if (lotteryList[i].id == id) {
                alert(lotteryList[i].name);
                $('#' + id).removeClass('twinkle');
                $(".gift").css("opacity", 1);
                return;
            }
        }
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