import { StableBond, NetworkID } from "src/lib/Bond";
import { addresses } from "src/constants";

import { ReactComponent as DaiImg } from "src/assets/tokens/LUSD.svg";

import { abi as DaiBondContract } from "src/abi/bonds/OlympusBondDepository.json";

// TODO(zx): Further modularize by splitting up reserveAssets into vendor token definitions
//   and include that in the definition of a bond
export const dai = new StableBond({
  name: "usdt",
  displayName: "USDT",
  bondToken: "USDT",
  isAvailable: { [NetworkID.Mainnet]: true },
  bondIconSvg: DaiImg,
  bondContractABI: DaiBondContract,
  networkAddrs: {
    [NetworkID.Mainnet]: {
      bondAddress: "0x3E19EbAD5C9180410598E5ed7b8c82c4Cf4A8232",
      reserveAddress: "0x205df2b395aE13fddA5790D9fD114f3548EB8A7A",
    },
  },
});


// HOW TO ADD A NEW BOND:
// Is it a stableCoin bond? use `new StableBond`
// Is it an LP Bond? use `new LPBond`
// Add new bonds to this array!!
export const allBonds = [dai/*, frax, eth, cvx, ohm_dai, ohm_frax, lusd, ohm_lusd, ohm_weth */];
// TODO (appleseed-expiredBonds): there may be a smarter way to refactor this
// export const allExpiredBonds = [cvx_expired];
export const allBondsMap = allBonds.reduce((prevVal, bond) => {
  // TODO:BONDDATA
  return { ...prevVal, [bond.name]: bond };
}, {});

// Debug Log
// console.log(allBondsMap);
export default allBonds;
