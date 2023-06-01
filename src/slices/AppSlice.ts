import { ethers } from "ethers";
import { setAll } from "../helpers";
import apollo from "../lib/apolloClient";
import { createSlice, createSelector, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "src/store";
import { addresses, BINANCE_URI, NetworkId } from "src/constants";
import { StaticJsonRpcProvider } from "@ethersproject/providers";
import { abi as THSUSDTPAIRABI } from "src/abi/THSUSDTPair.json";

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
  readonly treasuryMarketValue?: number;
}

export const loadAppDetails = createAsyncThunk(
  "app/loadAppDetails",
  async ({ provider, chainID }: { provider: StaticJsonRpcProvider, chainID: number }, { dispatch }) => {
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
    
    let graphData: any = []
    try {
      graphData = await apollo<{ protocolMetrics: IProtocolMetrics[] }>(protocolMetricsQuery);
    } catch (error) {

    }
    if (!graphData || graphData == null) {
      console.error("Returned a null response when querying TheGraph");
      return;
    }

    let thsPrice = 0;

    try {
      const THSUSDTPairContract = new ethers.Contract(addresses[chainID]?.THS_USDT_PAIR_ADDRESS, THSUSDTPAIRABI, provider);
      const [thsBanlance, usdtBanlance] = await THSUSDTPairContract.getReserves()
      thsPrice = Number(ethers.utils.formatUnits(thsBanlance, "ether")) / Number(ethers.utils.formatUnits(usdtBanlance, "gwei"))
    } catch {
      thsPrice = parseFloat(graphData?.data?.protocolMetrics[0]?.thsPrice ?? 0)
    }
    const stakingTVL = parseFloat(graphData?.data?.protocolMetrics[0]?.totalValueLocked ?? 0);
    const marketCap = parseFloat(graphData?.data?.protocolMetrics[0]?.marketCap ?? 0);
    const circSupply = parseFloat(graphData?.data?.protocolMetrics[0]?.thsCirculatingSupply ?? 0) 
    const totalSupply = parseFloat(graphData?.data?.protocolMetrics[0]?.totalSupply ?? 0);
    const treasuryMarketValue = parseFloat(graphData?.data?.protocolMetrics[0]?.treasuryMarketValue ?? 0)

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
  async (chainID: NetworkId) => {

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
    const result = await fetch(BINANCE_URI, {
      method: "POST",
      body: JSON.stringify({
        jsonrpc: "2.0", method: "eth_blockNumber",
        params: [],
        id: 1
      })
    })
    const res = await result.json()
    let graphData: any = []
    try {
      graphData = await apollo<{ protocolMetrics: IProtocolMetrics2[], rebases: IRebases[] }>(protocolMetricsQuery);
    } catch (error) {

    }
    if (!graphData || !res || res == null || graphData == null) {
      console.error("Returned a null response when querying TheGraph");
      return;
    }
    const currentIndex = graphData?.data?.rebases[0]?.index ?? 0;
    const fiveDayRate = parseFloat(graphData?.data?.protocolMetrics[0]?.days5APY ?? 0);
    const stakingAPY = parseFloat(graphData?.data?.protocolMetrics[0]?.currentAPY ?? 0);
    const stakingRebase = parseFloat(graphData?.data?.protocolMetrics[0]?.nextEpochRebase ?? 0);
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
  readonly currentIndex?: number;
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
  readonly treasuryMarketValue?: number;
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

