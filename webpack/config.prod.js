/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const plugins = require('./plugins');
const commonLoaders = require('./commonLoaders');
const chunksOptimization = require('./chunksOptimization');
/* eslint-enable import/no-extraneous-dependencies */

const context = path.resolve(__dirname, '../');

module.exports = {
	context,
	mode: 'production',
	entry: {
		all: [
			require.resolve('core-js/stable'),
			require.resolve('regenerator-runtime/runtime'),
			require.resolve('jquery'),
			'./src/js/index.js',
			'./src/styl/all.styl',
		],
		fonts: './src/styl/fonts.styl',
		images: './webpack/images.js',
	},

	output: {
		filename: 'js/[name].[contenthash].js',
		path: path.resolve(context, 'dist/'),
	},

	resolve: {
		alias: {
			jquery: path.resolve(context, 'node_modules/jquery/src/jquery.js'),
		},
	},

	module: {
		rules: [...commonLoaders],
	},

	target: 'web',
	stats: 'errors-only',

	optimization: {
		minimizer: [
			new TerserPlugin({
				exclude: [/node_modules/],
				sourceMap: false,
				terserOptions: {
					ie8: false,
					warnings: false,
					drop_console: true,
					comments: false,
				},
			}),
			new OptimizeCssAssetsPlugin(),
		],
		...chunksOptimization,
	},

	plugins,
};
