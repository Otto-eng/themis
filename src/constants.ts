import { BigNumber } from "ethers";
import { Providers } from "./helpers/providers/Providers";

export const THE_GRAPH_URL =
  "https://api.thegraph.com/subgraphs/name/dwusiq/themisgraph"


// NOTE could get this from an outside source since it changes slightly over time
export const BLOCK_RATE_SECONDS = 3;

export const TOKEN_DECIMALS = 9;

export const NETWORK_CHAINID = 56
export const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000"


export const BINANCE_URI =
  "https://bsc-dataseed.binance.org"
  // "https://kovan.infura.io/v3/4e658875764f4112a9cbfe92c4e93b9e";

export enum NetworkId {
  // TESTNET_KOVAN = NETWORK_TEST_CHAINID,
  MAIN_BINANCE = NETWORK_CHAINID,
}

export const USDT_DECIMAL = BigNumber.from("10").pow(18);

export const DEFAULT_ADDRESS = "0x9824952061C4Af5744B623c4FAAB527Bf2a81ADD"

interface IAddresses {
  [key: string]: { [key: string]: string };
}


export const addresses: IAddresses = {
  // kovan
  // [NETWORK_CHAINID]: {
  //   USDT_ADDRESS: "0xbd8a03E74e53929DB75E30ca692e6188FabdEdE7",
  //   THS_USDT_PAIR_ADDRESS: "0x196623F3b407d1B69bC2f3d256e84c2A0834154f",
  //   THS_ADDRESS: "0xE43329547ef139a874564f7D1006fab95Ea1CfE8",
  //   STAKING_ADDRESS: "0x8cc45eD60B90e935e8f49bf76a460fC3Be9bd08a",
  //   STAKING_HELPER_ADDRESS: "0x74B5174D44b57456aAaDE76F8A05ad928D4518Fc",
  //   STHS_ADDRESS: "0x99a61b800519a299807ba4B9c9fbd07398c5c1d6",
  //   DISTRIBUTOR_ADDRESS: "0x82Bdf404A020AAeeB54af8eBEb333E139C026c92",
  //   BONDINGCALC_ADDRESS: "0x62AdcEe96F228A5DF1AaEEcd26E8b8A53a1D1d53",
  //   TREASURY_ADDRESS: "0x39F59AE8c6Aef9D7Ca8f65a7Cc35EF7a3Bada974",
  //   REDEEM_HELPER_ADDRESS: "0x4E53A828266365945868eF3B2C36EE9782E2DEEc", //
  //   USDT_BOND: "0x289ce758F9eCFc4C2e5f212d25e2BEab9a173Eaf",
  //   THS_USDT_BOND: "0x497F9303C65d572A72413A478E24FE33f3725E05",
  //   ScFarmForStaker_ADDRESS: "0x91f1C7EDfA681dD4BaA60EfB6B9d6429C4d78Fe8",
  //   ScFarmForInvter_ADDRESS: "0x816D6821f68ecB7024E4AdD514ddBAE1a3196Eb0",
  //   StakingRewardRelease_ADDRESS: "0x1692F7356f60CBA451360Be36D2008c4A2E66cC5",
  //   Relationship_ADDRESS: "0xE6E2EF65d1c71255F7545efFEc3aD1827f0a983C",
  //   ScaleCode_ADDRESS: "0xDe08933B9C0Aa63860E38A36CF2d3449EaA37967",
  //   RegisterForm_ADDRESS: "0x15B16fAD8Bba0614601768919002F81987C3aF0E", //
  //   PRETHS_ADDRESS: "0x3268392e825400a3455f5F2854CF1fDb46B9F2aC", //
  //   IDO_PRESALECONTRACT_ADDRESS: "0x82fcA713c5bf45b852e3a2C757c16A962C8c784d",
  //   IDO_PRESALERELEASE_ADDRESS: "0xC49b3839CA342749Db910fec15850a7A5c22e6b5",
  //   THSFarmForInviter_ADDRESS: "0xE06d338EB28C35f6a629892AAcB43ad6dDd3bC8A",
  //   uri: Providers.getProviderUrl(NetworkId.MAIN_BINANCE),
  // },
  // BSC
  [NETWORK_CHAINID]: {
    USDT_ADDRESS: "0x55d398326f99059ff775485246999027b3197955",  //
    THS_USDT_PAIR_ADDRESS: "0xBB0E8171E3C14D3E56a3C8860a7AA3d3204e5178",  //
    THS_ADDRESS: "0x5Ecd430413488C1fBfEfe64f0EF759E4b2FC5F8b",  //
    STAKING_ADDRESS: "0x3C53Ca0E6B9e3ED8Ffe5aF1A9495604258E1a8B0", //
    STAKING_HELPER_ADDRESS: "0xC11117D86B729d78cfF5c560fa0217489d04C1D8", //
    STHS_ADDRESS: "0x96005e02A7f37b5365dF15081E638E82B48EA87B", //
    DISTRIBUTOR_ADDRESS: "0x79E262a25d7793872d04591AFA82636c88ec46f8", //
    BONDINGCALC_ADDRESS: "0x56897a4Ff43254C9bF19F6Ef97A1B8bcFA7664a5",
    TREASURY_ADDRESS: "0x38FBd2bC791c3DD399F325D73965Ffc88ae55C4c",  //
    REDEEM_HELPER_ADDRESS: "0x4E53A828266365945868eF3B2C36EE9782E2DEEc",
    THS_USDT_BOND: "0x96D626D15909b94A7DA82C712DC532954ABE5204",
    USDT_BOND: "0x74B5B5940d01E2b69195D16E6Ca6Ba30627728Fa",
    ScFarmForStaker_ADDRESS: "0x89A45b5e8d8b2136b8264Ec4e5dB911dAAb11895", //
    ScFarmForInvter_ADDRESS: "0x91621288C0E1739103f7D106b0FfDa7dB1Bf85Fb", //
    StakingRewardRelease_ADDRESS: "0xf962E68cCE07E4AFA8C11BEEf04F9B0222728124", //
    Relationship_ADDRESS: "0xb7D952117282eE127Fd53c6Da512c18CBf93731b", //
    ScaleCode_ADDRESS: "0x59e9ea6D581e0b71D4db8B7Ab3d142b1A575216B", //
    RegisterForm_ADDRESS: "0x15B16fAD8Bba0614601768919002F81987C3aF0E",
    PRETHS_ADDRESS: "0x7cAaEE500E6ABca67E7E391a4288b90F9e37A390", //
    IDO_PRESALECONTRACT_ADDRESS: "0xA33D19E3EdDFc87c2362C991A86a020c7C1DC2ba", //
    IDO_PRESALERELEASE_ADDRESS: "0xE837A61CddD487c0665DD234B8d65E2520a5C7c6", //
    THSFarmForInviter_ADDRESS: "0xC3890f329740ef6C7dF9B1500a3d52c3ee4aF628",
    uri: Providers.getProviderUrl(NetworkId.MAIN_BINANCE),
  },
};

export const THEME_KEYWORD = "THS_THEME"
export const THEME_DARK = "dark"
export const THEME_LIGHT = "light"