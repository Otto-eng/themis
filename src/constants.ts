import { BigNumber } from "ethers";

export const THE_GRAPH_URL = "/subgraphs/name/shimonxie/themisdao";
export const EPOCH_INTERVAL = 2200;


// NOTE could get this from an outside source since it changes slightly over time
export const BLOCK_RATE_SECONDS = 4;

export const TOKEN_DECIMALS = 9;

export const NETWORK_CHAINID = Number(process.env.REACT_APP_ALLOW_CHAINID! as string)
export const DEFAULT_INVITATION_ID = process.env.REACT_APP_DEFAULT_INVITATION_ID! as string
export const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000"

interface IPoolGraphURLS {
  [index: string]: string;
}

export const POOL_GRAPH_URLS: IPoolGraphURLS = {
  NETWORK_CHAINID: "https://api.thegraph.com/subgraphs/name/pooltogether/pooltogether-v3_4_3",
};

export const KOVAN_URI = process.env.INFURA_API_KEY as string

export enum NetworkId {
  TESTNET_KOVAN = NETWORK_CHAINID,
}

export const USDT_DECIMAL = BigNumber.from("10").pow(18);

export const DEFAULT_ADDRESS = "0x9824952061C4Af5744B623c4FAAB527Bf2a81ADD"

interface IAddresses {
  [key: string]: { [key: string]: string };
}


export const addresses: IAddresses = {
  [NETWORK_CHAINID]: {
    USDT_ADDRESS: "0xbd8a03E74e53929DB75E30ca692e6188FabdEdE7",
    THS_ADDRESS: "0xE43329547ef139a874564f7D1006fab95Ea1CfE8",
    STAKING_ADDRESS: "0x8cc45eD60B90e935e8f49bf76a460fC3Be9bd08a",
    STAKING_HELPER_ADDRESS: "0x74B5174D44b57456aAaDE76F8A05ad928D4518Fc",
    STHS_ADDRESS: "0x99a61b800519a299807ba4B9c9fbd07398c5c1d6", 
    WSOHM_ADDRESS: "0xe73384f11Bb748Aa0Bc20f7b02958DF573e6E2ad",
    // OLD_SOHM_ADDRESS: "0x8Fc4167B0bdA22cb9890af2dB6cB1B818D6068AE",
    // MIGRATE_ADDRESS: "0x3BA7C6346b93DA485e97ba55aec28E8eDd3e33E2",
    DISTRIBUTOR_ADDRESS: "0x82Bdf404A020AAeeB54af8eBEb333E139C026c92",
    BONDINGCALC_ADDRESS: "0x62AdcEe96F228A5DF1AaEEcd26E8b8A53a1D1d53", 
    // CIRCULATING_SUPPLY_ADDRESS: "0x5b0AA7903FD2EaA16F1462879B71c3cE2cFfE868",
    TREASURY_ADDRESS: "0x39F59AE8c6Aef9D7Ca8f65a7Cc35EF7a3Bada974", 
    REDEEM_HELPER_ADDRESS: "0x4E53A828266365945868eF3B2C36EE9782E2DEEc",
    USDT_BOND: "0x289ce758F9eCFc4C2e5f212d25e2BEab9a173Eaf",
    ScFarmForStaker_ADDRESS: "0x91f1C7EDfA681dD4BaA60EfB6B9d6429C4d78Fe8",
    ScFarmForInvter_ADDRESS: "0x816D6821f68ecB7024E4AdD514ddBAE1a3196Eb0",
    StakingRewardRelease_ADDRESS: "0x1692F7356f60CBA451360Be36D2008c4A2E66cC5",
    Relationship_ADDRESS: "0xE6E2EF65d1c71255F7545efFEc3aD1827f0a983C",
    ScaleCode_ADDRESS: "0xDe08933B9C0Aa63860E38A36CF2d3449EaA37967",
    THS_USDT_PAIR_ADDRESS: "0x196623F3b407d1B69bC2f3d256e84c2A0834154f"
  },
  // 1: {
  //   USDT_ADDRESS: "0x6b175474e89094c44da98b954eedeac495271d0f", // duplicate
  //   THS_ADDRESS: "0x383518188c0c6d7730d91b2c03a03c837814a899",
  //   STAKING_ADDRESS: "0xfd31c7d00ca47653c6ce64af53c1571f9c36566a", // The new staking contract
  //   STAKING_HELPER_ADDRESS: "0xc8c436271f9a6f10a5b80c8b8ed7d0e8f37a612d", // Helper contract used for Staking only
  //   OLD_STAKING_ADDRESS: "0x0822F3C03dcc24d200AFF33493Dc08d0e1f274A2",
  //   STHS_ADDRESS: "0x04F2694C8fcee23e8Fd0dfEA1d4f5Bb8c352111F",
  //   WSOHM_ADDRESS: "0xca76543cf381ebbb277be79574059e32108e3e65",
  //   OLD_SOHM_ADDRESS: "0x31932E6e45012476ba3A3A4953cbA62AeE77Fbbe",
  //   PRESALE_ADDRESS: "0xcBb60264fe0AC96B0EFa0145A9709A825afa17D8",
  //   AOHM_ADDRESS: "0x24ecfd535675f36ba1ab9c5d39b50dc097b0792e",
  //   MIGRATE_ADDRESS: "0xC7f56EC779cB9e60afA116d73F3708761197dB3d",
  //   DISTRIBUTOR_ADDRESS: "0xbe731507810C8747C3E01E62c676b1cA6F93242f",
  //   BONDINGCALC_ADDRESS: "0xcaaa6a2d4b26067a391e7b7d65c16bb2d5fa571a",
  //   CIRCULATING_SUPPLY_ADDRESS: "0x0efff9199aa1ac3c3e34e957567c1be8bf295034",
  //   TREASURY_ADDRESS: "0x31f8cc382c9898b273eff4e0b7626a6987c846e8",
  //   CRUCIBLE_OHM_LUSD: "0x2230ad29920D61A535759678191094b74271f373",
  //   LQTY: "0x6dea81c8171d0ba574754ef6f8b412f2ed88c54d",
  //   MIST: "0x88acdd2a6425c3faae4bc9650fd7e27e0bebb7ab",
  //   REDEEM_HELPER_ADDRESS: "0xE1e83825613DE12E8F0502Da939523558f0B819E",
  //   FUSE_6_SOHM: "0x59bd6774c22486d9f4fab2d448dce4f892a9ae25", // Tetranode's Locker
  //   FUSE_18_SOHM: "0x6eDa4b59BaC787933A4A21b65672539ceF6ec97b", // Themis Pool Party
  //   FUSE_36_SOHM: "0x252d447c54F33e033AD04048baEAdE7628cB1274", // Fraximalist Money Market
  //   PT_TOKEN_ADDRESS: "0x0E930b8610229D74Da0A174626138Deb732cE6e9", // 33T token address, taken from `ticket` function on PRIZE_STRATEGY_ADDRESS
  //   PT_PRIZE_POOL_ADDRESS: "0xEaB695A8F5a44f583003A8bC97d677880D528248", // NEW
  //   PT_PRIZE_STRATEGY_ADDRESS: "0xf3d253257167c935f8C62A02AEaeBB24c9c5012a", // NEW
  // },
};

export const THEME_KEYWORD = "THS_THEME"
export const THEME_DARK = "dark"
export const THEME_LIGHT = "light"