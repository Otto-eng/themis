import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";
import apollo from "src/lib/apolloClient";
import { ISCAsyncThunk, ISCInviterEarningAsyncThunk } from "./interfaces";
import { setAll } from "src/helpers";
import { RootState } from "src/store";
import { error } from "./MessagesSlice";
import { BigNumber, ethers } from "ethers";
import { addresses } from "src/constants";
import { abi as RelationshipABI } from "src/abi/Relationship.json";


interface ScStakeEarningsType {
	id: string
	timestamp: string
	amount: string
	themis: { id: string }
}

interface ScInviterEarningsType {
	id: string
	registrant: string
	amount: string
	invitation: string
}

interface ISCSlice {
	[key: string]: any;
}

interface ISCData {
	readonly loading: boolean;
	readonly loadingInviter: boolean;

	readonly scStakeEarningsList: ScStakeEarningsType[]
	readonly scInviterEarningsList: ScInviterEarningsType[]
}
const setSCState = (state: ISCSlice, payload: any) => {
	const sc = payload.key;
	state[sc] = payload.data;
	state.loading = false;
};

export const scStakeEarningsDetailsList = createAsyncThunk(
	"sc/scStakeEarningsDetailsList",
	async ({ first, address }: ISCAsyncThunk) => {
		const protocolMetricsQuery = `
				query MyQuery {
				  scStakeEarnings(
				    first: ${first},
						orderBy: timestamp,
						orderDirection: desc,
						 where: { themis: ${address} }
				  ) {
						id
						timestamp
						amount
						themis {
						  id
						}
  				}
				}
			`;
		let data: ScStakeEarningsType[] = []

		try {
			const graphData = await apollo<any>(protocolMetricsQuery);
			if (!graphData || graphData == null) {
				console.error("Returned a null response when querying TheGraph");
				throw new Error("");
			}
			data = graphData.data.scStakeEarningsfilter
			// ((item: ScStakeEarningsType) => item.themis.id.toLowerCase() === address.toLowerCase());
		} catch (error) {
			data = []
		}
		return ({
			data,
			key: "scStakeEarningsList"
		})
	},
);

export const scInviterEarningsDetailsList = createAsyncThunk(
	"sc/scInviterEarningsDetailsList",
	async ({ first, address, chainID, provider }: ISCInviterEarningAsyncThunk, { dispatch }) => {
		if (!provider) {
			dispatch(error("Please connect your wallet!"));
			return;
		}
		const signer = provider.getSigner();
		let data: ScStakeEarningsType[] = []
		try {
			const RelationshipContract = new ethers.Contract(addresses[chainID].Relationship_ADDRESS as string, RelationshipABI, signer)
			RelationshipContract.getSubordinateByPage(address, BigNumber.from("0"), first).then((res: any) => {
				console.log("RES", res)
			}).catch(() => {
				console.log("RES ERROR")
			})
			const invitedAddress = await RelationshipContract.getSubordinateByPage(address, BigNumber.from("0"), first)
			data = invitedAddress.subordinateArray
			console.log("DATA", data)
		} catch (error) {
			data = []
		}
		return ({
			data,
			key: "scInviterEarningsList"
		})
	},
);

const initialState: ISCData = {
	loading: false,
	loadingInviter: false,
	scStakeEarningsList: [],
	scInviterEarningsList: []
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
			.addCase(scStakeEarningsDetailsList.pending, state => {
				state.loading = true;
			})
			.addCase(scStakeEarningsDetailsList.fulfilled, (state, action) => {
				state.loading = false;
				setSCState(state, action.payload);
			})
			.addCase(scStakeEarningsDetailsList.rejected, (state, { error }) => {
				state.loading = false;
				console.error(error.name, error.message, error.stack);
			})
			.addCase(scInviterEarningsDetailsList.pending, (state, action) => {
				state.loadingInviter = true;
			})
			.addCase(scInviterEarningsDetailsList.fulfilled, (state, action) => {
				state.loadingInviter = false;
				setSCState(state, action.payload);
			})
			.addCase(scInviterEarningsDetailsList.rejected, (state, { error }) => {
				state.loadingInviter = false;
				console.error(error.name, error.message, error.stack);
			});
	},
});


const baseInfo = (state: RootState) => state.sc;

export default scSlice.reducer;

export const { fetchAppSuccess } = scSlice.actions;

export const getAppState = createSelector(baseInfo, sc => sc);
