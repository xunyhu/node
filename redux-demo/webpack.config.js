const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: './src/index.js',
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist')
	},
	plugins: [
		new CleanWebpackPlugin(['dist']),
		new HtmlWebpackPlugin({
			template: './template/index.html'
		})
	],
	module: {
		rules: [{
			test: /\.js$/,
			use: {
				loader: 'babel-loader'
			},
			exclude: /node_modules/
		}]
	},
	devtool: 'inline-source-map',
	devServer: {
		contentBase: './dist',
		port: '3031',
		host: '0.0.0.0'
	}
}