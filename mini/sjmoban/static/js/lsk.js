/**
 * Created with 快兔科技 老李.
 * User: 手机模板网
 * Date: 2017/5/13
 * Time: 22:21
 * sjmoban.com
 *  QQ： 79089679
 */
function dopost(api,params,callback){
    //var webhost="http://ecms.com/e/extend/miniapp/api.php?a=";//线上正式环境，必须用https，配置ssl
    var webhost="https://www.amicm.com/api.php/lskes/?app=sjmoban&action=";//线上正式环境，必须用https，配置ssl
    //var webhost="http://de.com/miniapp/api.php/lskes/?a=";//线上正式环境，必须用https，配置ssl
    params.lskfrom="mini";
    params.mini_sk="mini_skvalue";
    params.lsktoken=wx.getStorageSync("lsktoken");//得到lsktoken登录屏证
    wx.showLoading({title:"小艾米奋力加载中"});
    wx.request({
        url: webhost+api,
        method: "POST",
        header:{
            'content-type': 'application/x-www-form-urlencoded'
        },
        data:params,
        success: function (data) {
            wx.hideLoading();
            callback(data);

        },fail:function(ret){
            //console.info(ret.errMsg);
            wx.showToast({title:ret.errMsg});
        },complete:function(ret){
            //console.info(ret);
        }
    });
}
module.exports.dopost=dopost;
