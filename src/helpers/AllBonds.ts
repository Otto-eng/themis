import { StableBond, NetworkID } from "src/lib/Bond";

import { ReactComponent as USDTImg } from "src/assets/tokens/USDT.svg";

import { abi as UsdtBondContract } from "src/abi/bonds/OlympusBondDepository.json";

// TODO(zx): Further modularize by splitting up reserveAssets into vendor token definitions
//   and include that in the definition of a bond
export const usdt = new StableBond({
  name: "usdt",
  displayName: "USDT",
  bondToken: "USDT",
  isAvailable: { [NetworkID.Mainnet]: true },
  bondIconSvg: USDTImg,
  bondContractABI: UsdtBondContract,
  networkAddrs: {
    [NetworkID.Mainnet]: {
      bondAddress: "0x289ce758F9eCFc4C2e5f212d25e2BEab9a173Eaf",
      reserveAddress: "0xbd8a03E74e53929DB75E30ca692e6188FabdEdE7",
    },

  },
});

// HOW TO ADD A NEW BOND:
// Is it a stableCoin bond? use `new StableBond`
// Is it an LP Bond? use `new LPBond`
// Add new bonds to this array!!
export const allBonds = [usdt/*, frax, eth, cvx, ohm_dai, ohm_frax, lusd, ohm_lusd, ohm_weth */];
// TODO (appleseed-expiredBonds): there may be a smarter way to refactor this
// export const allExpiredBonds = [cvx_expired];
export const allBondsMap = allBonds.reduce((prevVal, bond) => {
  // TODO:BONDDATA
  return { ...prevVal, [bond.name]: bond };
}, {});

// Debug Log
// console.log(allBondsMap);
export default allBonds;
