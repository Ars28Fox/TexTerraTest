// eslint-disable-next-line import/no-extraneous-dependencies
const autoprefixer = require('autoprefixer-stylus');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const commonLoaders = [
	// js loader
	{
		test: /\.m?js$/,
		exclude: /(node_modules|bower_components)/,
		use: {
			loader: require.resolve('babel-loader'),
			options: {
				presets: ['@babel/preset-env'],
			},
		},
	},
	// stylus loader
	{
		test: /\.(styl|stylus)$/,
		exclude: /node_modules/,
		use: [
			{
				loader: MiniCssExtractPlugin.loader,
				options: {
					esModule: true,
					publicPath: '../',
				},
			},
			{
				loader: 'css-loader',
				options: {
					sourceMap: process.env.NODE_ENV === 'development',
					url: false,
				},
			},
			{
				loader: 'stylus-loader',
				options: {
					compress: process.env.NODE_ENV === 'production',
					use: [autoprefixer({ hideWarnings: true })],
					url: false,
				},
			},
		],
	},
	// image loader
	{
		test: /\.(gif|png|jpe?g|svg|ico)$/i,
		use: [
			{
				loader: 'file-loader',
				options: {
					name: 'images/[name].[ext]',
					context: 'src/images/',
				},
			},
			{
				loader: require.resolve('image-webpack-loader'),
				options: {
					mozjpeg: {
						progressive: true,
						quality: 65,
					},
					// optipng.enabled: false will disable optipng
					optipng: {
						enabled: false,
					},
					pngquant: {
						quality: [0.65, 0.9],
						speed: 4,
					},
					gifsicle: {
						interlaced: false,
					},
					// the webp option will enable WEBP
					// webp: {
					// 	quality: 75,
					// },
				},
			},
		],
	},

	// pug loader
	{
		test: /\.(pug|jade)$/,
		exclude: /node_modules/,
		use: [
			{
				loader: 'pug-loader',
				options: {
					pretty: true,
				},
			},
		],
	},

	// font loader
	{
		test: /\.(eot|ttf|woff|woff2)$/,
		exclude: /node_modules/,
		use: {
			loader: 'file-loader',
			options: {
				name: '[path][name].[ext]',
				context: 'src/',
			},
		},
	},
];

module.exports = commonLoaders;
