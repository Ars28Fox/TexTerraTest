const path = require('path');
const fs = require('fs');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const context = path.resolve(__dirname, '../');

// const languageFolders = ['en', 'cn', 'es'];

/* eslint-disable implicit-arrow-linebreak */
const getPugFiles = (folder = '') =>
	fs.readdirSync(path.resolve(__dirname, `../src/pug/${folder}`)).filter(fileName => fileName.endsWith('.pug'));

const pages = getPugFiles();
// const includes = getPugFiles('includes');

// const languageDirectroies = languageFolders.reduce((acc, folder) => {
// 	const pagesInLangDir = fs
// 		.readdirSync(path.resolve(__dirname, `../src/pug/${folder}`))
// 		.filter(fileName => fileName.endsWith('pug'));
// 	const resultObj = {
// 		folder,
// 		pages: pagesInLangDir,
// 	};
// 	return [...acc, resultObj];
// }, []);

const plugins = [
	new CleanWebpackPlugin({
		root: context,
		verbose: true,
		dry: false,
		cleanAfterEveryBuildPatterns: ['!fonts/**/*'],
	}),
	new CopyPlugin([
		{
			from: 'src/robots.txt',
			to: '',
			context,
		},
		{
			from: 'src/fonts/',
			to: 'fonts/',
			context,
		},
	]),
	new MiniCssExtractPlugin({
		filename: '[name].[contenthash].css',
		chunkFilename: 'css/[name].[contenthash].css',
	}),
	...pages.map(
		page =>
			new HtmlWebpackPlugin({
				template: `./src/pug/${page}`,
				filename: `${page.replace(/\.pug/, '.html')}`,
			})
	),
	// ...includes.map(
	// 	page =>
	// 		new HtmlWebpackPlugin({
	// 			template: `./src/pug/includes/${page}`,
	// 			filename: `includes/${page.replace(/\.pug/, '.html')}`,
	// 			inject: false,
	// 		})
	// ),
	// ...languageDirectroies.reduce((acc, pageDir) => {
	// 	const folderName = pageDir.folder.replace(/\.pug/, '');
	// 	const pluginForEachPageInFolder = pageDir.pages.map(
	// 		pageName =>
	// 			new HtmlWebpackPlugin({
	// 				template: `./src/pug/${folderName}/${pageName}`,
	// 				filename: `${folderName}/${pageName.replace(/\.pug/, '.html')}`,
	// 			})
	// 	);
	// 	return [...acc, ...pluginForEachPageInFolder];
	// }, []),
];

module.exports = plugins;
