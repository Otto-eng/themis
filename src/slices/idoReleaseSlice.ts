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
	readonly ido30List: ScStakeEarningsType[];
	readonly ido70List: ScStakeEarningsType[];
}

const setSCState = (state: ISCSlice, payload: any) => {
	const ido = payload.key;
	state[ido] = payload.data;
	state.loading = false;
};

export const idoRelease30List = createAsyncThunk(
	"ido/idoRelease30List",
	async ({ first, address }: ISCAsyncThunk) => {
		const protocolMetricsQuery = `
			query MyQuery {
 	 			idoReleaseEarnings(
    			first:${first}
    			where: {type: "1", themis: "${address.toLowerCase()}"}
  			) {
    			amount
    			id
    			timestamp
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
			data = graphData.data.idoReleaseEarnings ?? []

		} catch (error) {
			data = []
		}
		return ({
			data,
			key: "ido30List"
		})
	},
);

export const idoRelease70List = createAsyncThunk(
	"ido/idoRelease70List",
	async ({ first, address }: ISCAsyncThunk) => {
		const protocolMetricsQuery = `
				query MyQuery {
 	 			idoReleaseEarnings(
    			first:${first}
    			where: {type: "2", themis: "${address.toLowerCase()}"}
  			) {
    			amount
    			id
    			timestamp
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
			data = graphData.data.idoReleaseEarnings ?? []
		} catch (error) {
			data = []
		}
		return ({
			data,
			key: "ido70List"
		})
	},
);

const initialState: ISCData = {
	loading: false,
	loadingInviter: false,
	ido30List: [],
	ido70List: [],
};


const idoReleaseSlice = createSlice({
	name: "app",
	initialState,
	reducers: {
		fetchAppSuccess(state, action) {
			setAll(state, action.payload);
		},
	},
	extraReducers: builder => {
		builder
			.addCase(idoRelease30List.pending, state => {
				state.loading = true;
			})
			.addCase(idoRelease30List.fulfilled, (state, action) => {
				state.loading = false;
				setSCState(state, action.payload);
			})
			.addCase(idoRelease30List.rejected, (state, { error }) => {
				state.loading = false;
				console.error(error.name, error.message, error.stack);
			})
			.addCase(idoRelease70List.pending, (state, action) => {
				state.loadingInviter = true;
			})
			.addCase(idoRelease70List.fulfilled, (state, action) => {
				state.loadingInviter = false;
				setSCState(state, action.payload);
			})
			.addCase(idoRelease70List.rejected, (state, { error }) => {
				state.loadingInviter = false;
				console.error(error.name, error.message, error.stack);
			})
	},
});


const baseInfo = (state: RootState) => state.ido;

export default idoReleaseSlice.reducer;

export const { fetchAppSuccess } = idoReleaseSlice.actions;

export const getAppState = createSelector(baseInfo, ido => ido);
