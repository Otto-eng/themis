import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";
import apollo from "src/lib/apolloClient";
import { ISCAsyncThunk } from "./interfaces";
import { setAll } from "src/helpers";
import { RootState } from "src/store";


interface ScStakeEarningsType {
	id: string
	timestamp: string
	amount: string
	themis: { id: string }
}

interface ISCSlice {
	[key: string]: any;
}

interface ISCData {
	readonly loading: boolean;
	readonly loadingInviter: boolean;
	readonly scStakeEarningsList: ScStakeEarningsType[];
	readonly scInviterEarningsList: ScStakeEarningsType[];
	readonly stakeReleaseEarningsList: ScStakeEarningsType[];

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
						where: { themis: "${address.toLowerCase()}" }
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
			const list = graphData.data.scStakeEarnings ?? []
			data = list.filter((item: ScStakeEarningsType) => item.themis.id.toLowerCase() === address.toLowerCase());

		} catch (error) {
			data = []
		}
		return ({
			data,
			key: "scStakeEarningsList"
		})
	},
);


export const stakeTHSReleaseEarningsList = createAsyncThunk(
	"sc/stakeReleaseEarningsList",
	async ({ first, address }: ISCAsyncThunk) => {
		// where: { themis: "${address.toLowerCase()}" }

		const protocolMetricsQuery = `
				query MyQuery {
				  stakeReleaseEarnings(
				    first: ${first},
						orderBy: timestamp,
						orderDirection: desc,
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
			console.log("stakeReleaseEarnings", graphData)
			if (!graphData || graphData == null) {
				console.error("Returned a null response when querying TheGraph");
				throw new Error("");
			}
			const list = graphData.data.stakeReleaseEarnings ?? []
			data = list.filter((item: ScStakeEarningsType) => item.themis.id.toLowerCase() === address.toLowerCase());
		} catch (error) {
			data = []
		}
		return ({
			data,
			key: "stakeReleaseEarningsList"
		})
	},
);

export const scInviterEarningsDetailsList = createAsyncThunk(
	"sc/scInviterEarningsDetailsList",
	async ({ first, address }: ISCAsyncThunk) => {
		const protocolMetricsQuery = `
				query MyQuery {
				  scInviteEarnings(
				    first: ${first},
						orderBy: timestamp,
						orderDirection: desc,
						where: { themis: "${address.toLowerCase()}" }
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
			data = graphData.data.scInviteEarnings ?? []
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
	scInviterEarningsList: [],
	stakeReleaseEarningsList: []
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
			.addCase(stakeTHSReleaseEarningsList.pending, (state, action) => {
				state.loadingInviter = true;
			})
			.addCase(stakeTHSReleaseEarningsList.fulfilled, (state, action) => {
				state.loadingInviter = false;
				setSCState(state, action.payload);
			})
			.addCase(stakeTHSReleaseEarningsList.rejected, (state, { error }) => {
				state.loadingInviter = false;
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
