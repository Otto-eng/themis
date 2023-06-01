module.exports = {
	devServer: {
		proxy: {
			'/': {
				target: 'http://124.248.67.122:9090',
				secure: true,
				changeOrigin: false,
			}
		}
	}
}