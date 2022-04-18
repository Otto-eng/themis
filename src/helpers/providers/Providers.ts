import { StaticJsonRpcProvider } from "@ethersproject/providers";
import { BINANCE_URI /*, KOVAN_URI */, NetworkId } from "src/constants";

export class Environment {
	public static env = process.env;

	private static _get(args: { key: string; err?: string; first: true; fallback: string }): string;
	private static _get(args: { key: string; err?: string; first?: never; fallback: string }): string[];
	private static _get(args: { key: string; err?: string; first: true; fallback?: never }): string | undefined;
	private static _get(args: { key: string; err?: string; first?: never; fallback?: never }): string[] | undefined;
	private static _get(args: { key: string; err?: string; first?: boolean; fallback?: string }) {
		const value = this.env[args.key] || args.fallback;

		if (!value) console.warn(args.err);

		if (value === undefined) return value;

		return args.first ? value : value.split(" ");
	}

	public static getGoogleAnalyticsApiKey = () =>
		this._get({
			first: true,
			key: "REACT_APP_GOOGLE_ANALYTICS_API_KEY",
			err: "Please provide an Google Analytics API key in your .env file",
		});

	public static getCovalentApiKey = () =>
		this._get({
			first: true,
			key: "REACT_APP_COVALENT_API_KEY",
			err: "Please provide an API key for Covalent (https://www.covalenthq.com) in your .env file",
		});

	public static getNodeUrls = (networkId: NetworkId) => {
		switch (networkId) {
			// case NetworkId.TESTNET_KOVAN:
			// 	return this._get({
			// 		key: `REACT_APP_KOVAN_NODE_URL`,
			// 		fallback: KOVAN_URI,
			// 	});
			case NetworkId.MAIN_BINANCE:
				return this._get({
					key: `REACT_APP_KOVAN_NODE_URL`,
					fallback: BINANCE_URI,
				});
		}
	};

	/**
	 * Indicates whether the give feature is enabled.
	 *
	 * Defaults to true. Only false when `REACT_APP_GIVE_ENABLED` === "false"
	 */
	public static isGiveEnabled() {
		const isDisabled = this.env.REACT_APP_GIVE_ENABLED === "false";

		return !isDisabled;
	}

	/**
	 * Indicates whether the multifarm dashboard feature is enabled.
	 *
	 * Defaults to true. Only false when `REACT_APP_MULTIFARM_DASHBOARD_ENABLED` === "false"
	 */
	public static isMultifarmDashboardEnabled() {
		const isDisabled = this.env.REACT_APP_MULTIFARM_DASHBOARD_ENABLED === "false";

		return !isDisabled;
	}

	/**
	 * Indicates whether mockSohm is enabled.
	 * This is needed for easily manually testing rebases for Give on testnet
	 *
	 * Defaults to false. Only true when the `mock_sohm` query param is present or `REACT_APP_MOCK_SOHM_ENABLED` === "true"
	 */
	public static isMockSohmEnabled(url: string) {
		const isQueryParamActive = url.includes("mock_sohm");
		const isEnvTrue = this.env.REACT_APP_MOCK_SOHM_ENABLED === "true";

		return isQueryParamActive || isEnvTrue;
	}
}


export class Providers {
	private static _providerCache = {} as Record<NetworkId, StaticJsonRpcProvider>;

	/**
	 * Returns a provider url for a given network
	 */
	public static getProviderUrl(networkId: NetworkId) {
		const url = (Environment.getNodeUrls(networkId) ?? [])[0];

		return url ?? "";
	}

	/**
	 * Returns a static provider for a given network
	 */
	public static getStaticProvider(networkId: NetworkId) {
		if (!this._providerCache[networkId])
			this._providerCache[networkId] = new StaticJsonRpcProvider(this.getProviderUrl(networkId));
		return this._providerCache[networkId];
	}
}
