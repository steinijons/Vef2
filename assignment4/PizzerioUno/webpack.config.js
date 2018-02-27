const path = require('path');
const webpack = require('webpack');

module.exports = {
	entry: './src/entry1.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js'
	},
	module: {
		rules: [
			{ test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
            { test: /\.js$/, exclude: /node_modules/, loader: "eslint-loader" }
		]
	},
	plugins: [
		new webpack.optimize.UglifyJsPlugin({ test: /\.js$/ })
	]
};
