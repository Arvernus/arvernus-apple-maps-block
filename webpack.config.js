const ExtractText = require('extract-text-webpack-plugin');
const debug = process.env.NODE_ENV !== 'production';
const webpack = require('webpack');

const extractEditorSCSS = new ExtractText({
	filename: './build/.editor.css',
});

const extractBlockSCSS = new ExtractText({
	filename: './build/style.css',
});

const plugins = [extractEditorSCSS, extractBlockSCSS];

const scssConfig = {
	use: [
		{
			loader: 'css-loader',
		},
		{
			loader: 'sass-loader',
			options: {
				outputStyle: 'compressed',
			},
		},
	],
};

module.exports = {
	context: __dirname,
	devtool: debug ? 'eval-source-map' : '',
	mode: debug ? 'development' : 'production',
	entry: {
		'./build/index': './src/index.js',
		'./build/frontend': './src/frontend.js',
	},
	output: {
		path: __dirname,
		filename: '[name].js',
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'babel-loader',
					},
				],
			},
			{
				test: /editor\.scss$/,
				exclude: /node_modules/,
				use: extractEditorSCSS.extract(scssConfig),
			},
			{
				test: /style\.scss$/,
				exclude: /node_modules/,
				use: extractBlockSCSS.extract(scssConfig),
			},
		],
	},
	plugins,
};
