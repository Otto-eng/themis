import { BigNumberish } from "ethers";
import { setAll } from "../helpers";
import apollo from "../lib/apolloClient";
import { createSlice, createSelector, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "src/store";

interface IProtocolMetrics {
  readonly timestamp: string;
  readonly thsCirculatingSupply: string;
  readonly sThsCirculatingSupply: string;
  readonly totalSupply: string;
  readonly thsPrice: string;
  readonly marketCap: string;
  readonly totalValueLocked: string;
  readonly treasuryMarketValue: string;
  readonly nextEpochRebase: string;
  readonly nextDistributedOhm: string;
}

interface IProtocolMetrics2 {
  readonly currentAPY: string;
  readonly days5APY: string;
  readonly nextEpochRebase: string;
}

interface IRebases {
  readonly index: string;
}

interface ILoadAppDetails {
  readonly stakingTVL?: number;
  readonly thsPrice?: number;
  readonly marketCap?: number;
  readonly circSupply?: number;
  readonly totalSupply?: number;
  readonly treasuryMarketValue?: BigNumberish;
}

export const loadAppDetails = createAsyncThunk(
  "app/loadAppDetails",
  async () => {
    const protocolMetricsQuery = `
 query MyQuery {
   protocolMetrics(first: 1, orderBy: timestamp, orderDirection: desc) {
            timestamp
            thsCirculatingSupply
            sthsCirculatingSupply
            totalSupply
            thsPrice
            marketCap
            totalValueLocked
            treasuryMarketValue
            nextEpochRebase
            nextDistributedThs
        }
    }
`;

    const graphData = await apollo<{ protocolMetrics: IProtocolMetrics[] }>(protocolMetricsQuery);
    if (!graphData || graphData == null) {
      console.error("Returned a null response when querying TheGraph");
      return;
    }

    const stakingTVL = parseFloat(graphData.data.protocolMetrics[0].totalValueLocked);
    const marketCap = parseFloat(graphData.data.protocolMetrics[0].marketCap);
    const circSupply = parseFloat(graphData.data.protocolMetrics[0].thsCirculatingSupply);
    const totalSupply = parseFloat(graphData.data.protocolMetrics[0].totalSupply);
    const thsPrice = parseFloat(graphData.data.protocolMetrics[0].thsPrice);
    const treasuryMarketValue = parseFloat(graphData.data.protocolMetrics[0].treasuryMarketValue) / Math.pow(10, 9);
    // const currentBlock = parseFloat(graphData.data._meta.block.number);

    return {
      stakingTVL,
      thsPrice,
      marketCap,
      circSupply,
      totalSupply,
      treasuryMarketValue,
    } as ILoadAppDetails
  }
);

export const loadAppDetailsContract = createAsyncThunk(
  "app/loadAppDetailsContract",
  async () => {

    const protocolMetricsQuery = `
    query MyQuery {
      protocolMetrics(first: 1, orderBy: timestamp, orderDirection: desc) {
        currentAPY
        days5APY
        nextEpochRebase
      },
      rebases(first: 1, orderDirection: desc, orderBy: timestamp) {
        index
      }
    }
`;
    const result = await fetch("https://kovan.infura.io/v3/4e658875764f4112a9cbfe92c4e93b9e", {
      method: "POST",
      body: JSON.stringify({
        jsonrpc: "2.0", method: "eth_blockNumber",
        params: [],
        id: 1
      })
    })

    const res = await result.json()
    const graphData = await apollo<{ protocolMetrics: IProtocolMetrics2[], rebases: IRebases[] }>(protocolMetricsQuery);
    if (!graphData || !res || res == null || graphData == null) {
      console.error("Returned a null response when querying TheGraph");
      return;
    }

    const currentIndex = graphData.data.rebases[0].index;
    const fiveDayRate = parseFloat(graphData.data.protocolMetrics[0].days5APY);
    const stakingAPY = parseFloat(graphData.data.protocolMetrics[0].currentAPY);
    const stakingRebase = parseFloat(graphData.data.protocolMetrics[0].nextEpochRebase);
    return {
      currentIndex,
      currentBlock: Number(res.result.toString()),
      fiveDayRate,
      stakingAPY,
      stakingRebase,
    } as IAppData;
  },
);

interface IAppData {
  readonly circSupply?: number;
  readonly currentIndex?: string;
  readonly currentBlock?: number;
  readonly fiveDayRate?: number;
  readonly loading: boolean;
  readonly loadingMarketPrice: boolean;
  readonly marketCap?: number;
  readonly thsPrice?: number;
  readonly stakingAPY?: number;
  readonly stakingRebase?: number;
  readonly stakingTVL?: number;
  readonly totalSupply?: number;
  readonly treasuryBalance?: number;
  readonly treasuryMarketValue?: BigNumberish;
}

const initialState: IAppData = {
  loading: false,
  loadingMarketPrice: false,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    fetchAppSuccess(state, action) {
      setAll(state, action.payload);
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loadAppDetails.pending, state => {
        state.loading = true;
      })
      .addCase(loadAppDetails.fulfilled, (state, action) => {
        setAll(state, action.payload);
        state.loading = false;
      })
      .addCase(loadAppDetails.rejected, (state, { error }) => {
        state.loading = false;
        console.error(error.name, error.message, error.stack);
      })
      .addCase(loadAppDetailsContract.pending, state => {
        state.loading = true;
      })
      .addCase(loadAppDetailsContract.fulfilled, (state, action) => {
        setAll(state, action.payload);
        state.loading = false;
      })
      .addCase(loadAppDetailsContract.rejected, (state, { error }) => {
        state.loading = false;
        console.error(error.name, error.message, error.stack);
      })
  },
});

const baseInfo = (state: RootState) => state.app;

export default appSlice.reducer;

export const { fetchAppSuccess } = appSlice.actions;

export const getAppState = createSelector(baseInfo, app => app);
