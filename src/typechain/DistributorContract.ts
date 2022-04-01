/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
  BaseContract,
  ContractTransaction,
  Overrides,
  CallOverrides,
} from "ethers";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
} from "./common";

export interface DistributorContractInterface extends ethers.utils.Interface {
  functions: {
    "DAI()": FunctionFragment;
    "THS()": FunctionFragment;
    "blocksInEpoch()": FunctionFragment;
    "distribute()": FunctionFragment;
    "getCurrentRewardForNextEpoch()": FunctionFragment;
    "initialize(uint256,uint256,uint256,address,address,address,address)": FunctionFragment;
    "isInitialized()": FunctionFragment;
    "nextEpochBlock()": FunctionFragment;
    "notEnoughDAIToDistribute()": FunctionFragment;
    "owner()": FunctionFragment;
    "rewardRate()": FunctionFragment;
    "setBlocksInEpoch(uint256)": FunctionFragment;
    "setRewardRate(uint256)": FunctionFragment;
    "stakingContract()": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
    "transferRemainingDAIOutIfNotEnough()": FunctionFragment;
    "vault()": FunctionFragment;
  };

  encodeFunctionData(functionFragment: "DAI", values?: undefined): string;
  encodeFunctionData(functionFragment: "THS", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "blocksInEpoch",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "distribute",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getCurrentRewardForNextEpoch",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "initialize",
    values: [
      BigNumberish,
      BigNumberish,
      BigNumberish,
      string,
      string,
      string,
      string
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "isInitialized",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "nextEpochBlock",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "notEnoughDAIToDistribute",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "rewardRate",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "setBlocksInEpoch",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "setRewardRate",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "stakingContract",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "transferRemainingDAIOutIfNotEnough",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "vault", values?: undefined): string;

  decodeFunctionResult(functionFragment: "DAI", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "THS", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "blocksInEpoch",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "distribute", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getCurrentRewardForNextEpoch",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "initialize", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "isInitialized",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "nextEpochBlock",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "notEnoughDAIToDistribute",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "rewardRate", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "setBlocksInEpoch",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setRewardRate",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "stakingContract",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferRemainingDAIOutIfNotEnough",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "vault", data: BytesLike): Result;

  events: {};
}

export interface DistributorContract extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: DistributorContractInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    DAI(overrides?: CallOverrides): Promise<[string]>;

    THS(overrides?: CallOverrides): Promise<[string]>;

    blocksInEpoch(overrides?: CallOverrides): Promise<[BigNumber]>;

    distribute(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    getCurrentRewardForNextEpoch(
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    initialize(
      _nextEpochBlock: BigNumberish,
      _blocksInEpoch: BigNumberish,
      _rewardRate: BigNumberish,
      _vault: string,
      _stakingContract: string,
      _OHM: string,
      _DAI: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    isInitialized(overrides?: CallOverrides): Promise<[boolean]>;

    nextEpochBlock(overrides?: CallOverrides): Promise<[BigNumber]>;

    notEnoughDAIToDistribute(overrides?: CallOverrides): Promise<[boolean]>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    rewardRate(overrides?: CallOverrides): Promise<[BigNumber]>;

    setBlocksInEpoch(
      _blocksInEpoch: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setRewardRate(
      _rewardRate: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    stakingContract(overrides?: CallOverrides): Promise<[string]>;

    transferOwnership(
      _owner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    transferRemainingDAIOutIfNotEnough(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    vault(overrides?: CallOverrides): Promise<[string]>;
  };

  DAI(overrides?: CallOverrides): Promise<string>;

  THS(overrides?: CallOverrides): Promise<string>;

  blocksInEpoch(overrides?: CallOverrides): Promise<BigNumber>;

  distribute(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  getCurrentRewardForNextEpoch(overrides?: CallOverrides): Promise<BigNumber>;

  initialize(
    _nextEpochBlock: BigNumberish,
    _blocksInEpoch: BigNumberish,
    _rewardRate: BigNumberish,
    _vault: string,
    _stakingContract: string,
    _OHM: string,
    _DAI: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  isInitialized(overrides?: CallOverrides): Promise<boolean>;

  nextEpochBlock(overrides?: CallOverrides): Promise<BigNumber>;

  notEnoughDAIToDistribute(overrides?: CallOverrides): Promise<boolean>;

  owner(overrides?: CallOverrides): Promise<string>;

  rewardRate(overrides?: CallOverrides): Promise<BigNumber>;

  setBlocksInEpoch(
    _blocksInEpoch: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setRewardRate(
    _rewardRate: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  stakingContract(overrides?: CallOverrides): Promise<string>;

  transferOwnership(
    _owner: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  transferRemainingDAIOutIfNotEnough(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  vault(overrides?: CallOverrides): Promise<string>;

  callStatic: {
    DAI(overrides?: CallOverrides): Promise<string>;

    THS(overrides?: CallOverrides): Promise<string>;

    blocksInEpoch(overrides?: CallOverrides): Promise<BigNumber>;

    distribute(overrides?: CallOverrides): Promise<boolean>;

    getCurrentRewardForNextEpoch(overrides?: CallOverrides): Promise<BigNumber>;

    initialize(
      _nextEpochBlock: BigNumberish,
      _blocksInEpoch: BigNumberish,
      _rewardRate: BigNumberish,
      _vault: string,
      _stakingContract: string,
      _OHM: string,
      _DAI: string,
      overrides?: CallOverrides
    ): Promise<boolean>;

    isInitialized(overrides?: CallOverrides): Promise<boolean>;

    nextEpochBlock(overrides?: CallOverrides): Promise<BigNumber>;

    notEnoughDAIToDistribute(overrides?: CallOverrides): Promise<boolean>;

    owner(overrides?: CallOverrides): Promise<string>;

    rewardRate(overrides?: CallOverrides): Promise<BigNumber>;

    setBlocksInEpoch(
      _blocksInEpoch: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    setRewardRate(
      _rewardRate: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    stakingContract(overrides?: CallOverrides): Promise<string>;

    transferOwnership(
      _owner: string,
      overrides?: CallOverrides
    ): Promise<boolean>;

    transferRemainingDAIOutIfNotEnough(
      overrides?: CallOverrides
    ): Promise<boolean>;

    vault(overrides?: CallOverrides): Promise<string>;
  };

  filters: {};

  estimateGas: {
    DAI(overrides?: CallOverrides): Promise<BigNumber>;

    THS(overrides?: CallOverrides): Promise<BigNumber>;

    blocksInEpoch(overrides?: CallOverrides): Promise<BigNumber>;

    distribute(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    getCurrentRewardForNextEpoch(overrides?: CallOverrides): Promise<BigNumber>;

    initialize(
      _nextEpochBlock: BigNumberish,
      _blocksInEpoch: BigNumberish,
      _rewardRate: BigNumberish,
      _vault: string,
      _stakingContract: string,
      _OHM: string,
      _DAI: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    isInitialized(overrides?: CallOverrides): Promise<BigNumber>;

    nextEpochBlock(overrides?: CallOverrides): Promise<BigNumber>;

    notEnoughDAIToDistribute(overrides?: CallOverrides): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    rewardRate(overrides?: CallOverrides): Promise<BigNumber>;

    setBlocksInEpoch(
      _blocksInEpoch: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setRewardRate(
      _rewardRate: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    stakingContract(overrides?: CallOverrides): Promise<BigNumber>;

    transferOwnership(
      _owner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    transferRemainingDAIOutIfNotEnough(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    vault(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    DAI(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    THS(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    blocksInEpoch(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    distribute(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    getCurrentRewardForNextEpoch(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    initialize(
      _nextEpochBlock: BigNumberish,
      _blocksInEpoch: BigNumberish,
      _rewardRate: BigNumberish,
      _vault: string,
      _stakingContract: string,
      _OHM: string,
      _DAI: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    isInitialized(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    nextEpochBlock(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    notEnoughDAIToDistribute(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    rewardRate(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    setBlocksInEpoch(
      _blocksInEpoch: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setRewardRate(
      _rewardRate: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    stakingContract(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    transferOwnership(
      _owner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    transferRemainingDAIOutIfNotEnough(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    vault(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}
