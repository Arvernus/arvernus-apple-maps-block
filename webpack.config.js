var packageJson = require('./package.json');
var ExtractText = require('extract-text-webpack-plugin');
var debug = process.env.NODE_ENV !== 'production';
var webpack = require('webpack');
var ZipFilesPlugin = require('webpack-zip-plugin');
var CopyPlugin = require('copy-webpack-plugin');

var extractEditorSCSS = new ExtractText({
	filename: './assets/css/blocks.editor.css',
});

var extractBlockSCSS = new ExtractText({
	filename: './assets/css/blocks.style.css',
});

var copyToDist = new CopyPlugin([
	{
		from: '.',
		to: `./${packageJson.name}`,
		ignore: [
			'node_modules/**/*',
			'dist/**/*',
			'.gitignore',
			'webpack.config.js',
			'.prettierrc',
			'gulp.config.js',
			'gulpfile.js',
			'package.json',
			'package-lock.json',
			'**.DS_Store*',
			'composer.lock',
			'.vscode/**/*',
			'.git/**/*',
			`${packageJson.name}.zip*`,
			`${packageJson.name}/**/*`,
		],
	},
]);

var zipDist = new ZipFilesPlugin({
	initialFile: `./${packageJson.name}`,
	endPath: `./`,
	zipName: `${packageJson.name}.zip`,
});

var devPlugins = [extractEditorSCSS, extractBlockSCSS];
var prodPlugins = [...devPlugins, copyToDist, zipDist];

var scssConfig = {
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
		'./assets/js/editor.blocks': './blocks/index.js',
		'./assets/js/frontend.blocks': './blocks/frontend.js',
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
	plugins: debug ? devPlugins : prodPlugins,
};
