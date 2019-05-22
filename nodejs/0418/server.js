var http = require("http");
var url = require('url');
var querystring = require('querystring');
var request = require('request');

http.createServer(function (req, res) {
    //设置请求头 允许所有域名访问 解决跨域
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , token');
    res.setHeader("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.setHeader("X-Powered-By",' 3.2.1')
    res.setHeader("Content-Type", "application/json;charset=utf-8");
    if (req.url == '/') {
        // console.log('headers: ', req.headers.token);
        // res.end("cors demo")
        var options = {
            headers: {
                "token": 'bBtuYG2Pps*Uf1EnK4v37bWUqi6uaUlfmLn8h3NAUTz8o51CbsrzMCClvzSy*AJIoFGYmJwfty6VjGoY9wB6GAFiyBvrvik7baL7GO9qeGEP2eThWzXnW*4lncX50fYP1C5SU*clWa7MZRvXgTxlAoZk28HTFjV946SS034fePWpg02NI2ldcU*nA9VKQlpQS:EDTfCmPffLY6Pbul6DWzwPYoukmK8y7cbif1Ao:QIZFYuTg*280qqFCDwm3jY2LhXGSF9dTjg3ujhe9DDwdqnuk8LWDKp6jcrH9t9Btam58KHriVUMUHMCzf:rb63nZmRIbQo4VQcj2xc:9C6qsT4FX7WptrejLlQ3me64vHeNog5yNYrTQ2EyoLqMV2tW'
            },
            url: 'http://activity.weilaijishi.com/api/comisnactivity/doublecomis/activity/infomation',
            method: 'GET'
        };
        request(options, function(error, response, data) {
    　　　　if (!error && response.statusCode == 200) {
    　　　　　　console.log('------用户接口数据------',data);
    　　　　　　res.end(data)
    　　　　}
    　　});
    }

    // //获取地址中的参数
    // var query = url.parse(req.url).query;

    // //用qs模块的方法 把地址中的参数转变成对象 方便获取
    // var queryObj = qs.parse(query);
    // //获取前端传来的myUrl=后面的内容　　GET方式传入的数据
    // var myUrl = queryObj.myUrl;
    // //创建变量保存请求到的数据
    // var data = "";

    // //开始请求数据 http.get()方法
    // http.get(myUrl, function (request) {
    //     //监听myUrl地址的请求过程
    //     //设置编码格式
    //     request.setEncoding("utf8");

    //     //数据传输过程中会不断触发data信号
    //     request.on("data", function (response) {
    //         data += response;
    //     });

    //     //当数据传输结束触发end
    //     request.on("end", function () {
    //         //把data数据返回前端
    //         res.end(data);
    //     });
    // }).on("error", function () {
    //     console.log("请求myUrl地址出错！");
    // });
}).listen(8989, function (err) {
    console.log("服务器启动成功，正在监听8989...");
});