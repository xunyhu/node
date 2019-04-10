// index.js
var touchDot = 0;//触摸时的原点
var touchMove = 0;
var touchStart=0;
var touchEnd=0;
var lsk = require("../../static/js/lsk.js");
var time = 0;
var interval;
var stime = 0;
var etime = 0;
var moving = false;
var me;
Page({
    data: {
        itemlist: [],
        pdata: {cid: 1},
        catlist: [
            {id: 1, title: "推荐", page: 0},
            {id: 2, title: "小程序", page: 0},
            {id: 3, title: "前端", page: 0},
            {id: 4, title: "帝国cms", page: 0},
            {id: 5, title: "织梦cms", page: 0},
            {id: 6, title: "vuejs", page: 0},
            {id: 7, title: "jquery", page: 0}
        ],
        winHeight: 200,
        winWidth: 0,
        sc_left: 0,
        cindex: 0,
        sc_total_width: 0,
        direction: 0,
        busy: false,
        scrolling: false,
        vw_into: "",
        width_container: 0,
        point_start: {},
        point_end: {}
    },
    /**
     * 生命周期函数--监听页面加载
     */
    et_sc_start: function (e) {
        touchDot = e.touches[0].pageX; // 获取触摸时的原点
        touchStart = e.touches[0].pageX; // 获取触摸时的原点
        time = 0;
        stime = new Date();//点击的时间
        // 使用js计时器记录时间
    },
    et_sc_move: function (e) {
        touchMove = e.touches[0].pageX;
        touchEnd = e.touches[0].pageX;
        //console.log("touchMove:"+touchMove+" touchDot:"+touchDot+" diff:"+(touchMove - touchDot));
        // 向左滑动
        moving = true;//在没去
        if (touchMove - touchDot < 0) {
            if (me.data.sc_left > me.data.winWidth * (me.data.catlist.length - 1)) {
                return false;
            }
            me.setData({
                sc_left: me.data.sc_left - (touchMove - touchDot)
            });
        }
        // 向右滑动
        if (touchMove - touchDot > 0) {
            if (me.data.sc_left <= 0) {
                return false;
            }
            me.setData({
                sc_left: me.data.sc_left - (touchMove - touchDot)
            });
        }
        touchDot = touchMove; //每移动一次把上一次的点作为原点（好像没啥用）
    },
    et_sc_end: function (e) {
        if (moving) {
            console.info(e);
            //touchEnd = e..pageX;
            //touchEnd = e.changedTouches[0].pageX;
            console.info("start==>"+touchDot);
            console.info("end==>"+touchEnd);
            etime = new Date();//如果在滑动
            if (parseInt(etime - stime)>60 && parseInt(etime-stime)<=550) {
                if (touchEnd - touchStart < 0) {//向左
                    if(me.data.cindex<me.data.catlist.length-1){
                        me.data.cindex=me.data.cindex+1;
                        me.setData({cindex:me.data.cindex});
                    }
                } else {//向右
                    if(me.data.cindex>0){
                        me.data.cindex=me.data.cindex-1;
                        me.setData({cindex:me.data.cindex});
                    }
                }
            }else{
                me.data.cindex = me.getIndex();
            }
            moving = false;
            me.scrollToIndex(me.data.cindex);
        }

    },
    getIndex: function () {
        me.data.cindex = parseInt((me.data.sc_left + me.data.winWidth / 2) / me.data.winWidth);
        me.setData({
            cindex: me.data.cindex
        });
        return me.data.cindex;
    },
    onLoad: function (options) {
        me = this;
        wx.getSystemInfo({
            success: function (res) {
                me.data.winWidth = res.windowWidth;
                me.setData({
                    winHeight: res.windowHeight - 46,
                    winWidth: res.windowWidth
                });
                console.log(res.windowHeight);
            }
        });
        me.cat_getlist();
    },

    /**
     * 用户点击右上角分享
     */
    bottom_fresh: function () {
        me.getlist();
    },
    onShareAppMessage: function () {
    },
    newsview: function (e) {
        wx.navigateTo({
            url: "/frame/news/view?id=" + e.currentTarget.dataset.id + "&cid=" + e.currentTarget.dataset.cid
        });
    },
    getlist: function (ee) {
        if (me.data.busy) {
            return false;//正在请求中
        }
        me.data.busy = true;//设置忙碌中
        me.data.pdata.page = me.data.catlist[me.data.cindex].page;
        lsk.dopost("news/getlist", me.data.pdata, function (ret) {
            me.data.busy = false;
            if (ret.data.status == "failed") {
                wx.showToast({title: ret.data.msg});
                return false;
            }
            var param = {};
            var string = "itemlist[" + me.data.pdata.cid + "]";
            console.info(param[string]);
            if (me.data.itemlist[me.data.pdata.cid] == undefined) {
                me.data.itemlist[me.data.pdata.cid] = ret.data.rows;
            } else {
                for (var i = 0; i < ret.data.rows.length; i++) {
                    me.data.itemlist[me.data.pdata.cid].push(ret.data.rows[i]);
                }
            }
            param[string] = me.data.itemlist[me.data.pdata.cid];
            me.data.catlist[me.data.cindex].page = parseInt(ret.data.page) + 1;
            //me.setData({itemlist:me.data.itemlist});
            me.setData(param);
        });
    },
    change_cat: function (ev) {
        me.setData({
            "pdata.cid": ev.currentTarget.dataset.cid,
            "cindex": ev.currentTarget.dataset.cindex
        });
        me.scrollToIndex(me.data.cindex);
    },
    scrollToIndex: function (index) {//滚动到指定索引位置
        me.setData({
            "sc_left": index * me.data.winWidth,
            "vw_into": "catnav_" + me.data.catlist[index].id
        });
        me.setData({
            "pdata.cid": me.data.catlist[index].id
        });
        if (me.data.itemlist[me.data.catlist[index].id] == undefined) {
            me.getlist();//为空的时候才会加载。不为空则不加载
        }

    },
    cat_getlist: function () {
        lsk.dopost("cat/getlist", {}, function (ret) {
            if (ret.data.status == "success") {
                me.data.pdata.cid = ret.data.rows[0].id;
                me.data.catlist = ret.data.rows;
                me.setData({
                    catlist: ret.data.rows,
                    width_container: me.data.winWidth * ret.data.rows.length
                });
                me.scrollToIndex(me.data.cindex);
            }
        });
    }
})