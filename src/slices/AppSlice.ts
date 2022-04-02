import { BigNumberish, ethers } from "ethers";
import { addresses } from "../constants";
import { abi as ierc20Abi } from "../abi/IERC20.json";
import { abi as OlympusStakingv2ABI } from "../abi/OlympusStakingv2.json";
import { abi as sTHS } from "../abi/sThemis.json";
import { setAll } from "../helpers";
import apollo from "../lib/apolloClient";
import { createSlice, createSelector, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "src/store";
import { IBaseAsyncThunk } from "./interfaces";
import { OlympusStakingv2, SOhmv2 } from "../typechain";

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
    console.log("loadAppDetails")
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
  async ({ networkID, provider }: IBaseAsyncThunk) => {
    const firstDate = +new Date()
    console.log("firstDate", firstDate)
    const currentBlock = await provider.getBlockNumber();
    const lastDate = +new Date()

    console.log("currentBlock", currentBlock, lastDate - firstDate)
    const stakingContract = new ethers.Contract(
      addresses[networkID].STAKING_ADDRESS as string,
      OlympusStakingv2ABI,
      provider,
    ) as OlympusStakingv2;


    const sThsMainContract = new ethers.Contract(
      addresses[networkID].STHS_ADDRESS as string,
      sTHS,
      provider,
    ) as SOhmv2;


    const epoch = await stakingContract.epoch();

    const stakingReward = epoch.distribute;
    const circ = await sThsMainContract.circulatingSupply();
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
      // stakingTVL,
      stakingRebase,
      // marketCap,
      // thsPrice,
      // circSupply,
      // totalSupply,
      // treasuryMarketValue,
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
