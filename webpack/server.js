const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');

const app = express();
const config = require('./webpack.config.js');
const compiler = webpack(config);

app.use(webpackDevMiddleware(compiler, {
	publicPath: config.output.publicPath
}));

let sever = app.listen(6000, 'localhost', function() {
	console.log("应用实例，访问地址为 http://%s:%s", sever.address().address, sever.address().port);
});