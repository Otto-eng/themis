import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";
import apollo from "src/lib/apolloClient";
import { ISCAsyncThunk } from "./interfaces";
import { setAll } from "src/helpers";
import { RootState } from "src/store";


interface IdoListType {
	id: string
	timestamp: string
	amount: string
	themis: { id: string }
}

interface IDOSlice {
	[key: string]: any;
}

interface IDODataType {
	readonly loading: boolean;
	readonly loadingInviter: boolean;
	readonly ido35List: IdoListType[];
	readonly ido65List: IdoListType[];
}

const setSCState = (state: IDOSlice, payload: any) => {
	const ido = payload.key;
	state[ido] = payload.data;
	state.loading = false;
};

export const idoRelease35List = createAsyncThunk(
	"ido/idoRelease35List",
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
		let data: IdoListType[] = []
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
			key: "ido35List"
		})
	},
);

export const idoRelease65List = createAsyncThunk(
	"ido/idoRelease65List",
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
		let data: IdoListType[] = []
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
			key: "ido65List"
		})
	},
);

const initialState: IDODataType = {
	loading: false,
	loadingInviter: false,
	ido35List: [],
	ido65List: [],
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
			.addCase(idoRelease35List.pending, state => {
				state.loading = true;
			})
			.addCase(idoRelease35List.fulfilled, (state, action) => {
				state.loading = false;
				setSCState(state, action.payload);
			})
			.addCase(idoRelease35List.rejected, (state, { error }) => {
				state.loading = false;
				console.error(error.name, error.message, error.stack);
			})
			.addCase(idoRelease65List.pending, (state, action) => {
				state.loadingInviter = true;
			})
			.addCase(idoRelease65List.fulfilled, (state, action) => {
				state.loadingInviter = false;
				setSCState(state, action.payload);
			})
			.addCase(idoRelease65List.rejected, (state, { error }) => {
				state.loadingInviter = false;
				console.error(error.name, error.message, error.stack);
			})
	},
});


const baseInfo = (state: RootState) => state.ido;

export default idoReleaseSlice.reducer;

export const { fetchAppSuccess } = idoReleaseSlice.actions;

export const getAppState = createSelector(baseInfo, ido => ido);
