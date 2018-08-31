var script = document.createElement("script");  
    script.type = "text/javascript";                
    script.src = 'https://res.wx.qq.com/open/js/jweixin-1.2.0.js';                               
    document.body.appendChild(script);   

var wxconfig = {
    config: function(options) {
        var data = options.data;
        wx.config({
            debug: false,
            appId: data.appId,
            timestamp: data.timestamp,
            nonceStr: data.noncestr,
            signature: data.signature,
            jsApiList: ["onMenuShareTimeline", "onMenuShareAppMessage", "onMenuShareQQ", "onMenuShareWeibo", "onMenuShareQZone"]
        });

        if(options.callback) options.callback();
    },
    share: function(n) {
        wx.ready(function() {
            wx.onMenuShareTimeline({//朋友圈分享
                title: n.title,
                link: n.$url,
                imgUrl: n.img
            }),
            wx.onMenuShareAppMessage({//私聊分享
                title: n.title,
                desc: n.content,
                link: n.$url,
                imgUrl: n.img,
                success: function() {}
            }),
            wx.onMenuShareQQ({
                title: n.title,
                desc: n.content,
                link: n.$url,
                imgUrl: n.img
            }),
            wx.onMenuShareWeibo({
                title: n.title,
                desc: n.content,
                link: n.$url,
                imgUrl: n.img
            })
        }),
        wx.error(function(e) {
            console.log("config失败")
        })
    }
}