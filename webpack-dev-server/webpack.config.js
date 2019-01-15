const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const HOST = process.env.HOST;
// const HOST = '192.168.88.247:3000/';

module.exports = {
	entry: './src/index.js',
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist')
	},
	devServer: {
		contentBase: './dist',
		port: '3030',
		host: '0.0.0.0'
	},
	plugins: [
		new CleanWebpackPlugin(['dist']),
		new HtmlWebpackPlugin({
			// title: 'React-App',
			// filename: 'index.html',
			template: './template/template.html',
			meta: {
	        	'viewport': 'width=device-width, initial-scale=1, shrink-to-fit=no',
		        // Will generate: <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
		        'theme-color': '#4285f4'
		        // Will generate: <meta name="theme-color" content="#4285f4">
	      	},
	      	favicon: './src/icon.jpg'
		})
	],
	module: {
		rules: [{
			test: /\.js$/,
			use: {
				loader: 'babel-loader', 
				// options: {
	   //        		presets: ['@babel/preset-react']
	   //        		presets: [['presetName', {option: value}]] 
	   //      	}
	    	},
			exclude: /node_modules/
		}]
	},
	devtool: 'inline-source-map'
}