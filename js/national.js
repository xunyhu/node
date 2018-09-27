function connectWebViewJavascriptBridge(callback) {
    if (window.WebViewJavascriptBridge) {
        callback(WebViewJavascriptBridge)
    } else { 
        document.addEventListener('WebViewJavascriptBridgeReady', function() { 
            callback(WebViewJavascriptBridge)
        }, false)
    }
} 
connectWebViewJavascriptBridge(function(bridge) {
    window.bridge=bridge
    bridge.init(function(message, responseCallback) { 
        if (responseCallback) { 
            responseCallback("Right back atcha")
        } 
    })
});
var userAgent =  window.navigator.userAgent;
var isApp = userAgent.indexOf('tudouni') > -1 || userAgent.indexOf('tuoduni') > -1 || userAgent.indexOf("sa-sdk-ios") > -1;
var isPro = window.location.href.indexOf('h5.tudouni.doubozhibo.com') > -1 ? true : false;
var server = isPro ? 'http://h5.mall.doubozhibo.com' : 'http://h5.mall.doubozhibo.com';
var domain = isPro ? 'https://mall.tudouni.doubozhibo.com' : 'http://rc.doubozhibo.com';

//首页
var vm = new Vue({
    el: ".container",
    data: {
        category: [],
        list: [],
        maskTitle: ''
    },
    mounted: function(){
        $.ajax({
            type: "get",
            // url: "http://rc.doubozhibo.com/buyer/shop/listCategory?id=9697",
            url: "../data/national.json",
            data: {},
            success: function(res) {
                if (res.errorCode == 0) {
                    for (var i=0; i<res.result.length; i++) {
                        if (res.result[i].id != '0' && res.result[i].id != '-1') {
                            vm.category.push(res.result[i]);
                        }
                    }
                    // console.log(vm.category)
                }
            }
        })
    },
    methods: {
        shareFun: function(){

        },
        clickFun: function(id, name){
            if (isApp) {
                window.bridge.callHandler('jumpPage', {"url": domain + '/#/shop/detail/'+ id +'/9697?closeWebView=1'}, function(){});
            } else {
                window.location.href = "national_goods.html" + "?itmeId=" + id + "&name=" + name;
            }
        }
    }
});

//列表页
var vm_2 = new Vue({
    el: '.container_2',
    data: {
        category: [],
        list: [],
        showMask: 0,
        maskTitle: ''
    },
    mounted: function(){
        // $.ajax({
        //     type: "get",
        //     // url: "http://rc.doubozhibo.com/buyer/goods/pager",
        //     url: "../data/goodslist.json",
        //     data: {
        //         'page.pageSize': 20,
        //         'page.currentPage': 1, 
        //         'shopId': 9697,
        //         'categoryId': id
        //     },
        //     success: function(res) {
        //         if (res.errorCode == 0) {
        //             vm.list = res.result.data;
        //         }
        //     }
        // });
    },
    methods: {
        shareFun: function(){

        },
        clickFun: function(id, name){

        }
    }
})