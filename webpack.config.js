module.exports = {
	devServer: {
		proxy: {
			'/': {
				target: 'https://bsc-dataseed.binance.org/',
				secure: true,
				changeOrigin: false,
			}
		}
	}
}