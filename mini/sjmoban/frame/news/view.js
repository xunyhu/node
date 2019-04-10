var lsk=require("../../static/js/lsk.js");
var WxParse = require('../../wxParse/wxParse.js');
var me;
Page({
    /**
     * 页面的初始数据
     */
    data: {
        row:{},pdata:{id:1,cid:0},nodata_show:false,busy:false,imglist:[]
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var scene = options.scene;
        me=this;
        if(scene!=undefined && scene!==""){
            me.setData({
                "pdata.id":scene,"pdata.tbid":scene
            });
            wx.showToast({
                title:scene
            });
        }else{
            me.setData({
                "pdata.id":options.id,"pdata.tbid":options.id,"pdata.cid":options.cid
            });
        }
        me.getinfo();
    },
    getinfo: function () {
        lsk.dopost("news/getinfo",me.data.pdata, function (ret) {
            if(ret.data.status=="success"){
                me.setData({
                    row:ret.data.row,
                    imglist:ret.data.imglist
                });
                WxParse.wxParse('article', 'html', ret.data.row.content, me, 5);
                wx.setNavigationBarTitle({
                    title:ret.data.row.title
                });
            }
        });
    },

    goindex: function () {
        wx.navigateBack({});
    },



    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        //me.getlylist();
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
        return {
            title:me.data.row.title,
            path:"/frame/news/view?id="+me.data.pdata.id
        };
    },

    preview_img: function (e) {
        wx.previewImage({
            current: e.currentTarget.dataset.src,
            urls:me.data.imglist
        });
    }
})