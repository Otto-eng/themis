import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ethers } from "ethers";
import { addresses } from "src/constants";
import apollo from "src/lib/apolloClient";
import { IERC20, OlympusStakingv2, SOhmv2 } from "src/typechain";
import { ISCAsyncThunk } from "./interfaces";
import { abi as ierc20Abi } from "src/abi/IERC20.json";
import { abi as sOHMv2 } from "../abi/sOhmv2.json";
import { abi as OlympusStakingv2ABI } from "../abi/OlympusStakingv2.json";
import { setAll } from "src/helpers";


interface IAppData {
	readonly circSupply?: number;
	readonly currentIndex?: string;
	readonly currentBlock?: number;
	readonly fiveDayRate?: number;
	readonly loading: boolean;
	readonly loadingMarketPrice: boolean;
	readonly marketCap?: number;
	readonly marketPrice?: number;
	readonly stakingAPY?: number;
	readonly stakingRebase?: number;
	readonly stakingTVL?: number;
	readonly totalSupply?: number;
	readonly treasuryBalance?: number;
	readonly treasuryMarketValue?: number;
}

interface IProtocolMetrics {
	readonly timestamp: string;
	readonly ohmCirculatingSupply: string;
	readonly sOhmCirculatingSupply: string;
	readonly totalSupply: string;
	readonly ohmPrice: string;
	readonly marketCap: string;
	readonly totalValueLocked: string;
	readonly treasuryMarketValue: string;
	readonly nextEpochRebase: string;
	readonly nextDistributedOhm: string;
}



export const scListDetails = createAsyncThunk(
	"app/scListDetails",
	async ({ first, address, networkID, provider }: ISCAsyncThunk, { dispatch }) => {
		const protocolMetricsQuery = `
  query {
  	scInviteEarnings(
  	  first: ${first}
  	  where: {themis: ${address}}
  	) {
    	id
    	timestamp
    	amount
    	themis {
    	  id
    	}
  	}
	}`;


		const graphData = await apollo<any>(protocolMetricsQuery);
		console.log("GRAPHDATA", graphData)
		if (!graphData || graphData == null) {
			console.error("Returned a null response when querying TheGraph");
			return;
		}


		const thsContract = new ethers.Contract(addresses[networkID].THS_ADDRESS as string, ierc20Abi, provider) as IERC20;
		console.log("thsContract", thsContract)
		const num = await thsContract.totalSupply()
		console.log("thsContract", num.toString())
		const stakingTVL = parseFloat(graphData.data.scInviteEarnings[0].totalValueLocked);
		// NOTE (appleseed): marketPrice from Graph was delayed, so get CoinGecko price
		// const marketPrice = parseFloat(graphData.data.protocolMetrics[0].ohmPrice);
		let marketPrice;
		try {
			const originalPromiseResult = await dispatch(
				loadMarketPrice({ networkID: networkID, provider: provider }),
			).unwrap();
			marketPrice = originalPromiseResult?.marketPrice;
		} catch (rejectedValueOrSerializedError) {
			// handle error here
			console.error("Returned a null response from dispatch(loadMarketPrice)");
			return;
		}

		const marketCap = parseFloat(graphData.data.scInviteEarnings[0].marketCap);
		const circSupply = parseFloat(graphData.data.scInviteEarnings[0].ohmCirculatingSupply);
		const totalSupply = parseFloat(graphData.data.scInviteEarnings[0].totalSupply);
		const treasuryMarketValue = parseFloat(graphData.data.scInviteEarnings[0].treasuryMarketValue);
		// const currentBlock = parseFloat(graphData.data._meta.block.number);

		if (!provider) {
			console.error("failed to connect to provider, please connect your wallet");
			return {
				stakingTVL,
				marketPrice,
				marketCap,
				circSupply,
				totalSupply,
				treasuryMarketValue,
			} as IAppData;
		}
		const currentBlock = await provider.getBlockNumber();

		const stakingContract = new ethers.Contract(
			addresses[networkID].STAKING_ADDRESS as string,
			OlympusStakingv2ABI,
			provider,
		) as OlympusStakingv2;

		const sohmMainContract = new ethers.Contract(
			addresses[networkID].STHS_ADDRESS as string,
			sOHMv2,
			provider,
		) as SOhmv2;

		console.log("sohmMainContract", sohmMainContract)
		console.log("stakingContract", stakingContract)

		stakingContract.epoch().then((res) => {
			console.log("RES", res)
		}).catch((error) => {
			console.log("ERROR", error)
		})
		// Calculating staking
		const epoch = await stakingContract.epoch();
		console.log("EPOCH", epoch)

		const stakingReward = epoch.distribute;
		const circ = await sohmMainContract.circulatingSupply();
		const stakingRebase = Number(stakingReward.toString()) / Number(circ.toString());
		const fiveDayRate = Math.pow(1 + stakingRebase, 5 * 3) - 1;
		const stakingAPY = Math.pow(1 + stakingRebase, 365 * 3) - 1;

		// Current index
		const currentIndex = await stakingContract.index();

		return {
			currentIndex: ethers.utils.formatUnits(currentIndex, "gwei"),
			currentBlock,
			fiveDayRate,
			stakingAPY,
			stakingTVL,
			stakingRebase,
			marketCap,
			marketPrice,
			circSupply,
			totalSupply,
			treasuryMarketValue,
		} as IAppData;
	},
);

const initialState: IAppData = {
	loading: false,
	loadingMarketPrice: false,
};


const scSlice = createSlice({
	name: "app",
	initialState,
	reducers: {
		fetchAppSuccess(state, action) {
			setAll(state, action.payload);
		},
	},
	extraReducers: builder => {
		builder
			.addCase(scListDetails.pending, state => {
				state.loading = true;
			})
			.addCase(scListDetails.fulfilled, (state, action) => {
				setAll(state, action.payload);
				state.loading = false;
			})
			.addCase(scListDetails.rejected, (state, { error }) => {
				state.loading = false;
				console.error(error.name, error.message, error.stack);
			})
		// .addCase(loadMarketPrice.pending, (state, action) => {
		// 	state.loadingMarketPrice = true;
		// })
		// .addCase(loadMarketPrice.fulfilled, (state, action) => {
		// 	setAll(state, action.payload);
		// 	state.loadingMarketPrice = false;
		// })
		// .addCase(loadMarketPrice.rejected, (state, { error }) => {
		// 	state.loadingMarketPrice = false;
		// 	console.error(error.name, error.message, error.stack);
		// });
	},
});


export default scSlice.reducer;
function loadMarketPrice(arg0: { networkID: import("../lib/Bond").NetworkID; provider: ethers.providers.StaticJsonRpcProvider | ethers.providers.JsonRpcProvider; }): any {
	throw new Error("Function not implemented.");
}

