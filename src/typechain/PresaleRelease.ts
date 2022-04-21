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

export interface PresaleReleaseInterface extends ethers.utils.Interface {
  functions: {
    "addrPreThs()": FunctionFragment;
    "addrPresale()": FunctionFragment;
    "addrThs()": FunctionFragment;
    "claimPart1()": FunctionFragment;
    "claimPart2()": FunctionFragment;
    "earnedTotal()": FunctionFragment;
    "getpendingPart1(address)": FunctionFragment;
    "getpendingPart2(address)": FunctionFragment;
    "owner()": FunctionFragment;
    "part1Rate()": FunctionFragment;
    "part1Start()": FunctionFragment;
    "part2Start()": FunctionFragment;
    "part2TermBlocks()": FunctionFragment;
    "releaseDec()": FunctionFragment;
    "releaseInfoOf(address)": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "setPart2Terms(uint256)": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
    "withdrawToken(address,address)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "addrPreThs",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "addrPresale",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "addrThs", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "claimPart1",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "claimPart2",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "earnedTotal",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getpendingPart1",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "getpendingPart2",
    values: [string]
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(functionFragment: "part1Rate", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "part1Start",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "part2Start",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "part2TermBlocks",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "releaseDec",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "releaseInfoOf",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "setPart2Terms",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "withdrawToken",
    values: [string, string]
  ): string;

  decodeFunctionResult(functionFragment: "addrPreThs", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "addrPresale",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "addrThs", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "claimPart1", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "claimPart2", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "earnedTotal",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getpendingPart1",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getpendingPart2",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "part1Rate", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "part1Start", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "part2Start", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "part2TermBlocks",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "releaseDec", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "releaseInfoOf",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setPart2Terms",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "withdrawToken",
    data: BytesLike
  ): Result;

  events: {
    "ClaimPart1(address,uint256)": EventFragment;
    "ClaimPart2(address,uint256)": EventFragment;
    "OwnershipTransferred(address,address)": EventFragment;
    "SetPart2Terms(address,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "ClaimPart1"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ClaimPart2"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "SetPart2Terms"): EventFragment;
}

export type ClaimPart1Event = TypedEvent<
  [string, BigNumber],
  { sender: string; amount: BigNumber }
>;

export type ClaimPart1EventFilter = TypedEventFilter<ClaimPart1Event>;

export type ClaimPart2Event = TypedEvent<
  [string, BigNumber],
  { sender: string; amount: BigNumber }
>;

export type ClaimPart2EventFilter = TypedEventFilter<ClaimPart2Event>;

export type OwnershipTransferredEvent = TypedEvent<
  [string, string],
  { previousOwner: string; newOwner: string }
>;

export type OwnershipTransferredEventFilter =
  TypedEventFilter<OwnershipTransferredEvent>;

export type SetPart2TermsEvent = TypedEvent<
  [string, BigNumber],
  { sender: string; terms: BigNumber }
>;

export type SetPart2TermsEventFilter = TypedEventFilter<SetPart2TermsEvent>;

export interface PresaleRelease extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: PresaleReleaseInterface;

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
    addrPreThs(overrides?: CallOverrides): Promise<[string]>;

    addrPresale(overrides?: CallOverrides): Promise<[string]>;

    addrThs(overrides?: CallOverrides): Promise<[string]>;

    claimPart1(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    claimPart2(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    earnedTotal(overrides?: CallOverrides): Promise<[BigNumber]>;

    getpendingPart1(
      _receiptor: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { pending_: BigNumber }>;

    getpendingPart2(
      _receiptor: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { pending_: BigNumber }>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    part1Rate(overrides?: CallOverrides): Promise<[BigNumber]>;

    part1Start(overrides?: CallOverrides): Promise<[BigNumber]>;

    part2Start(overrides?: CallOverrides): Promise<[BigNumber]>;

    part2TermBlocks(overrides?: CallOverrides): Promise<[BigNumber]>;

    releaseDec(overrides?: CallOverrides): Promise<[BigNumber]>;

    releaseInfoOf(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber, BigNumber, BigNumber] & {
        part2EarnedTotal: BigNumber;
        part2LastEarnBlock: BigNumber;
        part1EarnedBlock: BigNumber;
        part1EarnedAmount: BigNumber;
      }
    >;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setPart2Terms(
      _termBlocks: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    withdrawToken(
      _token: string,
      _to: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  addrPreThs(overrides?: CallOverrides): Promise<string>;

  addrPresale(overrides?: CallOverrides): Promise<string>;

  addrThs(overrides?: CallOverrides): Promise<string>;

  claimPart1(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  claimPart2(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  earnedTotal(overrides?: CallOverrides): Promise<BigNumber>;

  getpendingPart1(
    _receiptor: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getpendingPart2(
    _receiptor: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  owner(overrides?: CallOverrides): Promise<string>;

  part1Rate(overrides?: CallOverrides): Promise<BigNumber>;

  part1Start(overrides?: CallOverrides): Promise<BigNumber>;

  part2Start(overrides?: CallOverrides): Promise<BigNumber>;

  part2TermBlocks(overrides?: CallOverrides): Promise<BigNumber>;

  releaseDec(overrides?: CallOverrides): Promise<BigNumber>;

  releaseInfoOf(
    arg0: string,
    overrides?: CallOverrides
  ): Promise<
    [BigNumber, BigNumber, BigNumber, BigNumber] & {
      part2EarnedTotal: BigNumber;
      part2LastEarnBlock: BigNumber;
      part1EarnedBlock: BigNumber;
      part1EarnedAmount: BigNumber;
    }
  >;

  renounceOwnership(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setPart2Terms(
    _termBlocks: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  transferOwnership(
    newOwner: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  withdrawToken(
    _token: string,
    _to: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    addrPreThs(overrides?: CallOverrides): Promise<string>;

    addrPresale(overrides?: CallOverrides): Promise<string>;

    addrThs(overrides?: CallOverrides): Promise<string>;

    claimPart1(overrides?: CallOverrides): Promise<void>;

    claimPart2(overrides?: CallOverrides): Promise<void>;

    earnedTotal(overrides?: CallOverrides): Promise<BigNumber>;

    getpendingPart1(
      _receiptor: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getpendingPart2(
      _receiptor: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<string>;

    part1Rate(overrides?: CallOverrides): Promise<BigNumber>;

    part1Start(overrides?: CallOverrides): Promise<BigNumber>;

    part2Start(overrides?: CallOverrides): Promise<BigNumber>;

    part2TermBlocks(overrides?: CallOverrides): Promise<BigNumber>;

    releaseDec(overrides?: CallOverrides): Promise<BigNumber>;

    releaseInfoOf(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber, BigNumber, BigNumber] & {
        part2EarnedTotal: BigNumber;
        part2LastEarnBlock: BigNumber;
        part1EarnedBlock: BigNumber;
        part1EarnedAmount: BigNumber;
      }
    >;

    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    setPart2Terms(
      _termBlocks: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    transferOwnership(
      newOwner: string,
      overrides?: CallOverrides
    ): Promise<void>;

    withdrawToken(
      _token: string,
      _to: string,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "ClaimPart1(address,uint256)"(
      sender?: string | null,
      amount?: BigNumberish | null
    ): ClaimPart1EventFilter;
    ClaimPart1(
      sender?: string | null,
      amount?: BigNumberish | null
    ): ClaimPart1EventFilter;

    "ClaimPart2(address,uint256)"(
      sender?: string | null,
      amount?: BigNumberish | null
    ): ClaimPart2EventFilter;
    ClaimPart2(
      sender?: string | null,
      amount?: BigNumberish | null
    ): ClaimPart2EventFilter;

    "OwnershipTransferred(address,address)"(
      previousOwner?: string | null,
      newOwner?: string | null
    ): OwnershipTransferredEventFilter;
    OwnershipTransferred(
      previousOwner?: string | null,
      newOwner?: string | null
    ): OwnershipTransferredEventFilter;

    "SetPart2Terms(address,uint256)"(
      sender?: string | null,
      terms?: BigNumberish | null
    ): SetPart2TermsEventFilter;
    SetPart2Terms(
      sender?: string | null,
      terms?: BigNumberish | null
    ): SetPart2TermsEventFilter;
  };

  estimateGas: {
    addrPreThs(overrides?: CallOverrides): Promise<BigNumber>;

    addrPresale(overrides?: CallOverrides): Promise<BigNumber>;

    addrThs(overrides?: CallOverrides): Promise<BigNumber>;

    claimPart1(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    claimPart2(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    earnedTotal(overrides?: CallOverrides): Promise<BigNumber>;

    getpendingPart1(
      _receiptor: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getpendingPart2(
      _receiptor: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    part1Rate(overrides?: CallOverrides): Promise<BigNumber>;

    part1Start(overrides?: CallOverrides): Promise<BigNumber>;

    part2Start(overrides?: CallOverrides): Promise<BigNumber>;

    part2TermBlocks(overrides?: CallOverrides): Promise<BigNumber>;

    releaseDec(overrides?: CallOverrides): Promise<BigNumber>;

    releaseInfoOf(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setPart2Terms(
      _termBlocks: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    withdrawToken(
      _token: string,
      _to: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    addrPreThs(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    addrPresale(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    addrThs(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    claimPart1(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    claimPart2(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    earnedTotal(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getpendingPart1(
      _receiptor: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getpendingPart2(
      _receiptor: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    part1Rate(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    part1Start(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    part2Start(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    part2TermBlocks(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    releaseDec(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    releaseInfoOf(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setPart2Terms(
      _termBlocks: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    withdrawToken(
      _token: string,
      _to: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
