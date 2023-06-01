import { StableBond, LPBond, NetworkID } from "src/lib/Bond";
import { abi as UsdtBondContractABI } from "src/abi/UsdtBondDepository.json";
import { abi as ierc20Abi } from "src/abi/THSUSDTPair.json";
import { addresses, NETWORK_CHAINID } from "src/constants";

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
      bondAddress: addresses[NETWORK_CHAINID].USDT_BOND,
      reserveAddress: addresses[NETWORK_CHAINID].USDT_ADDRESS,
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
      bondAddress: addresses[NETWORK_CHAINID].THS_USDT_BOND,
      reserveAddress: addresses[NETWORK_CHAINID].THS_USDT_PAIR_ADDRESS,
    },
  },
  lpUrl: "https://app.sushi.com/add/0xE43329547ef139a874564f7D1006fab95Ea1CfE8/0xbd8a03E74e53929DB75E30ca692e6188FabdEdE7",
});

// HOW TO ADD A NEW BOND:
// Is it a stableCoin bond? use `new StableBond`
// Is it an LP Bond? use `new LPBond`
// Add new bonds to this array!!
export const allBonds = [usdt, ths_usdt /* usdt, frax, eth, cvx, ohm_dai, ohm_frax, lusd, ohm_lusd, ohm_weth */];
// TODO (appleseed-expiredBonds): there may be a smarter way to refactor this
// export const allExpiredBonds = [cvx_expired];
export const allBondsMap = allBonds.reduce((prevVal, bond) => {
  // TODO:BONDDATA
  return { ...prevVal, [bond.name]: bond };
}, {});

// Debug Log
export default allBonds;
