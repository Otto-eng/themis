import { StableBond, LPBond, NetworkID } from "src/lib/Bond";
import { abi as UsdtBondContractABI } from "src/abi/UsdtBondDepository.json";
import { abi as ierc20Abi } from "src/abi/THSUSDTPair.json";

export const usdt = new StableBond({
  name: "usdt",
  displayName: "USDT",
  bondToken: "USDT",
  payoutToken: "THS",
  isAvailable: { [NetworkID.Mainnet]: true },
  bondContractABI: UsdtBondContractABI,
  isBondable: {
    [NetworkID.Mainnet]: false,
  },
  isLOLable: {
    [NetworkID.Mainnet]: false,
  },
  isClaimable: {
    [NetworkID.Mainnet]: true,
  },
  networkAddrs: {
    [NetworkID.Mainnet]: {
      bondAddress: "0x96D626D15909b94A7DA82C712DC532954ABE5204",
      reserveAddress: "0x55d398326f99059ff775485246999027b3197955",
    },
  },
});

export const ths_usdt = new LPBond({
  name: "ths_usdt_lp",
  displayName: "THS-USDT LP",
  bondToken: "USDT",
  payoutToken: "THS",
  // bondIconSvg: USDTImg,
  bondContractABI: UsdtBondContractABI,
  reserveContract: ierc20Abi,
  isAvailable: {
    [NetworkID.Mainnet]: true,
    // [NetworkID.Test]: true
  },
  isBondable: {
    [NetworkID.Mainnet]: false,
    // [NetworkID.Test]: false,
  },
  isLOLable: {
    [NetworkID.Mainnet]: false,
    // [NetworkID.Test]: false,
  },
  isClaimable: {
    [NetworkID.Mainnet]: true,
    // [NetworkID.Test]: true,
  },
  networkAddrs: {
    [NetworkID.Mainnet]: {
      // TODO: add correct bond address when it's created
      bondAddress: "0x96D626D15909b94A7DA82C712DC532954ABE5204",
      reserveAddress: "0xBB0E8171E3C14D3E56a3C8860a7AA3d3204e5178",
    },
    // [NetworkID.Test]: {
    //   // TODO: add correct bond address when it's created
    //   bondAddress: "0x497F9303C65d572A72413A478E24FE33f3725E05",
    //   reserveAddress: "0x196623F3b407d1B69bC2f3d256e84c2A0834154f",
    // },
  },
  lpUrl: "https://app.sushi.com/add/0xE43329547ef139a874564f7D1006fab95Ea1CfE8/0xbd8a03E74e53929DB75E30ca692e6188FabdEdE7",
});

// HOW TO ADD A NEW BOND:
// Is it a stableCoin bond? use `new StableBond`
// Is it an LP Bond? use `new LPBond`
// Add new bonds to this array!!
export const allBonds = [ths_usdt, usdt/*, frax, eth, cvx, ohm_dai, ohm_frax, lusd, ohm_lusd, ohm_weth */];
// TODO (appleseed-expiredBonds): there may be a smarter way to refactor this
// export const allExpiredBonds = [cvx_expired];
export const allBondsMap = allBonds.reduce((prevVal, bond) => {
  // TODO:BONDDATA
  return { ...prevVal, [bond.name]: bond };
}, {});

// Debug Log
export default allBonds;
