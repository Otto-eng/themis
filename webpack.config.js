module.exports = {
	devServer: {
		proxy: {
			'/v3': {
				target: 'https://kovan.infura.io/',
				secure: true,
				changeOrigin: false,
			}
		}
	}
}