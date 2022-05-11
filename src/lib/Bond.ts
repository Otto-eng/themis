import { StaticJsonRpcProvider, JsonRpcSigner } from "@ethersproject/providers";
import { Contract, ethers } from "ethers";

import { abi as ierc20Abi } from "src/abi/IERC20.json";
import { addresses } from "src/constants";
import { EthContract } from "src/typechain/EthContract";
import { BondCalcContract } from "src/typechain/BondCalcContract";
import { abi as BondCalcContractABI } from "src/abi/IBondCalculator.json";


export enum NetworkID {
  Mainnet = 56, // NETWORK_CHAINID
}

export const getBondCalculator = (NetworkId: NetworkID, provider: StaticJsonRpcProvider) => {
  const contractAddress = addresses[NetworkId].BONDINGCALC_ADDRESS;

  return new ethers.Contract(contractAddress as string, BondCalcContractABI, provider) as BondCalcContract;
};


export enum BondType {
  StableAsset,
  LP,
}

export interface BondAddresses {
  reserveAddress: string;
  bondAddress: string;
}

export interface NetworkAddresses {
  // [NetworkID.Test]: BondAddresses;
  [NetworkID.Mainnet]: BondAddresses;
}

export interface Available {
  [NetworkID.Mainnet]?: boolean;
  // [NetworkID.Test]?: boolean;
}

interface BondOpts {
  name: string; // Internal name used for references
  displayName: string; // Displayname on UI
  isAvailable: Available; // set false to hide
  isBondable: Available; // aka isBondable => set false to hide
  // bondIconSvg: React.ReactNode; //  SVG path for icons
  bondContractABI: ethers.ContractInterface; // ABI for contract
  networkAddrs: NetworkAddresses; // Mapping of network --> Addresses
  isLOLable: Available; // aka isBondable => set false to hide
  payoutToken: string; // Token the user will receive - currently OHM on ethereum, wsOHM on ARBITRUM
  bondToken: string; // Unused, but native token to buy the bond.
  isClaimable: Available;
}

// Technically only exporting for the interface
export abstract class Bond {
  // Standard Bond fields regardless of LP bonds or stable bonds.
  readonly name: string;
  readonly displayName: string;
  readonly type: BondType;
  readonly isAvailable: Available;
  // readonly bondIconSvg: React.ReactNode;
  readonly bondContractABI: ethers.ContractInterface; // Bond ABI
  readonly networkAddrs: NetworkAddresses;
  readonly bondToken: string;
  readonly payoutToken: string;
  readonly isClaimable: Available;
  
  // The following two fields will differ on how they are set depending on bond type
  abstract isLP: Boolean;
  abstract reserveContract: ethers.ContractInterface; // Token ABI
  abstract displayUnits: string;

  // Async method that returns a Promise
  abstract getTreasuryBalance(networkID: NetworkID, provider: StaticJsonRpcProvider): Promise<number>;

  constructor(type: BondType, bondOpts: BondOpts) {
    this.name = bondOpts.name;
    this.displayName = bondOpts.displayName;
    this.type = type;
    this.isAvailable = bondOpts.isAvailable;
    // this.bondIconSvg = bondOpts.bondIconSvg;
    this.bondContractABI = bondOpts.bondContractABI;
    this.networkAddrs = bondOpts.networkAddrs;
    this.bondToken = bondOpts.bondToken;
    this.payoutToken = bondOpts.payoutToken;
    this.isClaimable = bondOpts.isClaimable;
  }

  /**
   * makes isAvailable accessible within Bonds.ts
   * @param networkID
   * @returns boolean
   */
  getAvailability(networkID: NetworkID) {
    return this.isAvailable[networkID];
  }

  getAddressForBond(networkID: NetworkID) {
    return this.networkAddrs[networkID].bondAddress;
  }
  getContractForBond(networkID: NetworkID, provider: StaticJsonRpcProvider | JsonRpcSigner) {
    const bondAddress = this.getAddressForBond(networkID);
    return new Contract(bondAddress, this.bondContractABI, provider) as EthContract;
  }

  getAddressForReserve(networkID: NetworkID) {
    return this.networkAddrs[networkID].reserveAddress;
  }
  getContractForReserve(networkID: NetworkID, provider: StaticJsonRpcProvider | JsonRpcSigner) {
    const reserveAddress = this.getAddressForReserve(networkID);
    return new ethers.Contract(reserveAddress, this.reserveContract, provider);
  }

  async getBondReservePrice(networkID: NetworkID, provider: StaticJsonRpcProvider | JsonRpcSigner) {
    let marketPrice: number = 0;
    const pairContract = this.getContractForBond(networkID, provider);

    return marketPrice;
  }
}

// Generic BondClass we should be using everywhere
// Assumes the token being deposited follows the standard ERC20 spec
export interface StableBondOpts extends BondOpts {}
export class StableBond extends Bond {
  readonly isLP = false;
  readonly reserveContract: ethers.ContractInterface;
  readonly displayUnits: string;

  constructor(stableBondOpts: StableBondOpts) {
    super(BondType.StableAsset, stableBondOpts);
    // For stable bonds the display units are the same as the actual token
    this.displayUnits = stableBondOpts.displayName;
    this.reserveContract = ierc20Abi; // The Standard ierc20Abi since they're normal tokens
  }

  async getTreasuryBalance(networkID: NetworkID, provider: StaticJsonRpcProvider) {
    let token = this.getContractForReserve(networkID, provider);
    let tokenAmount = await token.balanceOf(addresses[networkID].TREASURY_ADDRESS);
    return Number(tokenAmount.toString()) / Math.pow(10, 18);
  }
}

export interface LPBondOpts extends BondOpts {
  reserveContract: ethers.ContractInterface;
  lpUrl: string
}


export class LPBond extends Bond {
  readonly isLP = true;
  readonly reserveContract: ethers.ContractInterface;
  readonly displayUnits: string;
  readonly lpUrl: string;
  constructor(lpBondOpts: LPBondOpts) {
    super(BondType.LP, lpBondOpts);
    this.reserveContract = lpBondOpts.reserveContract;
    this.lpUrl = lpBondOpts.lpUrl;
    this.displayUnits = "LP";
  }
  async getTreasuryBalance(NetworkId: NetworkID, provider: StaticJsonRpcProvider) {
    const token = this.getContractForReserve(NetworkId, provider); // ths_usdt_pair
    const tokenAddress = this.getAddressForReserve(NetworkId); // reserveAddress

    const bondCalculator = getBondCalculator(NetworkId, provider); // BONDING CALC
    const tokenAmount = await token.balanceOf(addresses[NetworkId].TREASURY_ADDRESS); // 
    const valuation = await bondCalculator.valuation(tokenAddress || "", tokenAmount);
    const markdown = await bondCalculator.markdown(tokenAddress || "");
    const tokenUSD =
      (Number(valuation.toString()) / Math.pow(10, 9)) * (Number(markdown.toString()) / Math.pow(10, 18));
    return Number(tokenUSD.toString());
  }
}