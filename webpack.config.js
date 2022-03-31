// webpack.config.js
module.exports = {
	devServer: {
		hot: true, // 它是热更新：只更新改变的组件或者模块，不会整体刷新页面
		open: true, // 是否自动打开浏览器
		proxy: { // 配置代理（只在本地开发有效，上线无效）
			"/": { // 这是请求接口中要替换的标识
				target: "http://122.228.226.116:25001", // 被替换的目标地址，即把 /api 替换成这个
				secure: false, // 若代理的地址是https协议，需要配置这个属性
				changeOrigin: true,
			},
		}
	}
}
