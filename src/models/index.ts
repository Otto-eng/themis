// 检查用户网络状态
export const CheckNetWork = (now: any) => ({
	onLine: window.navigator.onLine,
	update(onLine: boolean) {
		now({ onLine });
	},
});