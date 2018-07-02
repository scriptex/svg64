const UnminifiedWebpackPlugin = require('unminified-webpack-plugin');

module.exports = {
	mode: 'production',
	entry: './src/svg64.js',
	output: {
		filename: 'svg64.min.js',
		library: 'SVG64',
		libraryTarget: 'umd',
		libraryExport: 'default'
	},
	module: {
		rules: [
			{
				test: /\.(js)$/,
				loader: 'babel-loader'
			}
		]
	},
	plugins: [new UnminifiedWebpackPlugin()]
};
