/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";

export interface ScFarmForInvterInterface extends utils.Interface {
  functions: {
    "ONE_SC()": FunctionFragment;
    "ONE_THS()": FunctionFragment;
    "ONE_USDT()": FunctionFragment;
    "changeHistoryOf(address,uint256)": FunctionFragment;
    "changeStakeAmount(address,uint256)": FunctionFragment;
    "claim()": FunctionFragment;
    "claimSpecificInvitee(address)": FunctionFragment;
    "earnBlockCountMax()": FunctionFragment;
    "getCurrentStakeInfo(address)": FunctionFragment;
    "initialize(address,address,address,address,address,address)": FunctionFragment;
    "inviteRewardPerLevelPerBlock()": FunctionFragment;
    "levelDec()": FunctionFragment;
    "owner()": FunctionFragment;
    "pairAddr()": FunctionFragment;
    "pendingReward(address)": FunctionFragment;
    "pendingRewardSpecificInvitee(address)": FunctionFragment;
    "relationshipAdr()": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "rewardLockBlocks()": FunctionFragment;
    "rewardedDataOf(address,address)": FunctionFragment;
    "scAddr()": FunctionFragment;
    "setEarnBlockCountMax(uint256)": FunctionFragment;
    "setRewardLockBlocks(uint256)": FunctionFragment;
    "stakeThresholdToEarn()": FunctionFragment;
    "supportClaim()": FunctionFragment;
    "thsAddr()": FunctionFragment;
    "thsStaking()": FunctionFragment;
    "toggleSupportClaim()": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
    "usdtAddr()": FunctionFragment;
    "viewAsUsdt(uint256)": FunctionFragment;
    "withdrawToken(address,uint256,address)": FunctionFragment;
  };

  encodeFunctionData(functionFragment: "ONE_SC", values?: undefined): string;
  encodeFunctionData(functionFragment: "ONE_THS", values?: undefined): string;
  encodeFunctionData(functionFragment: "ONE_USDT", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "changeHistoryOf",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "changeStakeAmount",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "claim", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "claimSpecificInvitee",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "earnBlockCountMax",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getCurrentStakeInfo",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "initialize",
    values: [string, string, string, string, string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "inviteRewardPerLevelPerBlock",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "levelDec", values?: undefined): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(functionFragment: "pairAddr", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "pendingReward",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "pendingRewardSpecificInvitee",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "relationshipAdr",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "rewardLockBlocks",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "rewardedDataOf",
    values: [string, string]
  ): string;
  encodeFunctionData(functionFragment: "scAddr", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "setEarnBlockCountMax",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "setRewardLockBlocks",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "stakeThresholdToEarn",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "supportClaim",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "thsAddr", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "thsStaking",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "toggleSupportClaim",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [string]
  ): string;
  encodeFunctionData(functionFragment: "usdtAddr", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "viewAsUsdt",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "withdrawToken",
    values: [string, BigNumberish, string]
  ): string;

  decodeFunctionResult(functionFragment: "ONE_SC", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "ONE_THS", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "ONE_USDT", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "changeHistoryOf",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "changeStakeAmount",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "claim", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "claimSpecificInvitee",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "earnBlockCountMax",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getCurrentStakeInfo",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "initialize", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "inviteRewardPerLevelPerBlock",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "levelDec", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "pairAddr", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "pendingReward",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "pendingRewardSpecificInvitee",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "relationshipAdr",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "rewardLockBlocks",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "rewardedDataOf",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "scAddr", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "setEarnBlockCountMax",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setRewardLockBlocks",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "stakeThresholdToEarn",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "supportClaim",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "thsAddr", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "thsStaking", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "toggleSupportClaim",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "usdtAddr", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "viewAsUsdt", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "withdrawToken",
    data: BytesLike
  ): Result;

  events: {
    "ChangeStakeAmount(address,uint256,uint256)": EventFragment;
    "Claim(address,uint256)": EventFragment;
    "OwnershipTransferred(address,address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "ChangeStakeAmount"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Claim"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
}

export type ChangeStakeAmountEvent = TypedEvent<
  [string, BigNumber, BigNumber],
  { staker: string; oldAmount: BigNumber; newAmount: BigNumber }
>;

export type ChangeStakeAmountEventFilter =
  TypedEventFilter<ChangeStakeAmountEvent>;

export type ClaimEvent = TypedEvent<
  [string, BigNumber],
  { staker: string; reward: BigNumber }
>;

export type ClaimEventFilter = TypedEventFilter<ClaimEvent>;

export type OwnershipTransferredEvent = TypedEvent<
  [string, string],
  { previousOwner: string; newOwner: string }
>;

export type OwnershipTransferredEventFilter =
  TypedEventFilter<OwnershipTransferredEvent>;

export interface ScFarmForInvter extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: ScFarmForInvterInterface;

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
    ONE_SC(overrides?: CallOverrides): Promise<[BigNumber]>;

    ONE_THS(overrides?: CallOverrides): Promise<[BigNumber]>;

    ONE_USDT(overrides?: CallOverrides): Promise<[BigNumber]>;

    changeHistoryOf(
      arg0: string,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber, BigNumber] & {
        currentBlock: BigNumber;
        amount: BigNumber;
        amountAsUSDT: BigNumber;
      }
    >;

    changeStakeAmount(
      _staker: string,
      _newAmount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    claim(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    claimSpecificInvitee(
      _invitee: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    earnBlockCountMax(overrides?: CallOverrides): Promise<[BigNumber]>;

    getCurrentStakeInfo(
      _staker: string,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber] & {
        thsAmount_: BigNumber;
        amountAsUsdt_: BigNumber;
      }
    >;

    initialize(
      _pair: string,
      _ths: string,
      _usdt: string,
      _staking: string,
      _sc: string,
      _relationship: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    inviteRewardPerLevelPerBlock(
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    levelDec(overrides?: CallOverrides): Promise<[BigNumber]>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    pairAddr(overrides?: CallOverrides): Promise<[string]>;

    pendingReward(
      _inviter: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { pendingReward_: BigNumber }>;

    pendingRewardSpecificInvitee(
      _invitee: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { pendingReward_: BigNumber }>;

    relationshipAdr(overrides?: CallOverrides): Promise<[string]>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    rewardLockBlocks(overrides?: CallOverrides): Promise<[BigNumber]>;

    rewardedDataOf(
      arg0: string,
      arg1: string,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber, BigNumber, BigNumber, BigNumber, BigNumber] & {
        rewaradedTotal: BigNumber;
        earnedBlockTotal: BigNumber;
        lastRewardedBlock: BigNumber;
        lastRewardedAmount: BigNumber;
        lastInviterHistoryIndex: BigNumber;
        lastInviteeHistoryIndex: BigNumber;
      }
    >;

    scAddr(overrides?: CallOverrides): Promise<[string]>;

    setEarnBlockCountMax(
      _newMax: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setRewardLockBlocks(
      _blockCount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    stakeThresholdToEarn(overrides?: CallOverrides): Promise<[BigNumber]>;

    supportClaim(overrides?: CallOverrides): Promise<[boolean]>;

    thsAddr(overrides?: CallOverrides): Promise<[string]>;

    thsStaking(overrides?: CallOverrides): Promise<[string]>;

    toggleSupportClaim(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    usdtAddr(overrides?: CallOverrides): Promise<[string]>;

    viewAsUsdt(
      _thsAmount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { usdtAmount_: BigNumber }>;

    withdrawToken(
      _token: string,
      _amount: BigNumberish,
      _to: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  ONE_SC(overrides?: CallOverrides): Promise<BigNumber>;

  ONE_THS(overrides?: CallOverrides): Promise<BigNumber>;

  ONE_USDT(overrides?: CallOverrides): Promise<BigNumber>;

  changeHistoryOf(
    arg0: string,
    arg1: BigNumberish,
    overrides?: CallOverrides
  ): Promise<
    [BigNumber, BigNumber, BigNumber] & {
      currentBlock: BigNumber;
      amount: BigNumber;
      amountAsUSDT: BigNumber;
    }
  >;

  changeStakeAmount(
    _staker: string,
    _newAmount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  claim(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  claimSpecificInvitee(
    _invitee: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  earnBlockCountMax(overrides?: CallOverrides): Promise<BigNumber>;

  getCurrentStakeInfo(
    _staker: string,
    overrides?: CallOverrides
  ): Promise<
    [BigNumber, BigNumber] & { thsAmount_: BigNumber; amountAsUsdt_: BigNumber }
  >;

  initialize(
    _pair: string,
    _ths: string,
    _usdt: string,
    _staking: string,
    _sc: string,
    _relationship: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  inviteRewardPerLevelPerBlock(overrides?: CallOverrides): Promise<BigNumber>;

  levelDec(overrides?: CallOverrides): Promise<BigNumber>;

  owner(overrides?: CallOverrides): Promise<string>;

  pairAddr(overrides?: CallOverrides): Promise<string>;

  pendingReward(
    _inviter: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  pendingRewardSpecificInvitee(
    _invitee: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  relationshipAdr(overrides?: CallOverrides): Promise<string>;

  renounceOwnership(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  rewardLockBlocks(overrides?: CallOverrides): Promise<BigNumber>;

  rewardedDataOf(
    arg0: string,
    arg1: string,
    overrides?: CallOverrides
  ): Promise<
    [BigNumber, BigNumber, BigNumber, BigNumber, BigNumber, BigNumber] & {
      rewaradedTotal: BigNumber;
      earnedBlockTotal: BigNumber;
      lastRewardedBlock: BigNumber;
      lastRewardedAmount: BigNumber;
      lastInviterHistoryIndex: BigNumber;
      lastInviteeHistoryIndex: BigNumber;
    }
  >;

  scAddr(overrides?: CallOverrides): Promise<string>;

  setEarnBlockCountMax(
    _newMax: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setRewardLockBlocks(
    _blockCount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  stakeThresholdToEarn(overrides?: CallOverrides): Promise<BigNumber>;

  supportClaim(overrides?: CallOverrides): Promise<boolean>;

  thsAddr(overrides?: CallOverrides): Promise<string>;

  thsStaking(overrides?: CallOverrides): Promise<string>;

  toggleSupportClaim(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  transferOwnership(
    newOwner: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  usdtAddr(overrides?: CallOverrides): Promise<string>;

  viewAsUsdt(
    _thsAmount: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  withdrawToken(
    _token: string,
    _amount: BigNumberish,
    _to: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    ONE_SC(overrides?: CallOverrides): Promise<BigNumber>;

    ONE_THS(overrides?: CallOverrides): Promise<BigNumber>;

    ONE_USDT(overrides?: CallOverrides): Promise<BigNumber>;

    changeHistoryOf(
      arg0: string,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber, BigNumber] & {
        currentBlock: BigNumber;
        amount: BigNumber;
        amountAsUSDT: BigNumber;
      }
    >;

    changeStakeAmount(
      _staker: string,
      _newAmount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    claim(overrides?: CallOverrides): Promise<void>;

    claimSpecificInvitee(
      _invitee: string,
      overrides?: CallOverrides
    ): Promise<void>;

    earnBlockCountMax(overrides?: CallOverrides): Promise<BigNumber>;

    getCurrentStakeInfo(
      _staker: string,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber] & {
        thsAmount_: BigNumber;
        amountAsUsdt_: BigNumber;
      }
    >;

    initialize(
      _pair: string,
      _ths: string,
      _usdt: string,
      _staking: string,
      _sc: string,
      _relationship: string,
      overrides?: CallOverrides
    ): Promise<void>;

    inviteRewardPerLevelPerBlock(overrides?: CallOverrides): Promise<BigNumber>;

    levelDec(overrides?: CallOverrides): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<string>;

    pairAddr(overrides?: CallOverrides): Promise<string>;

    pendingReward(
      _inviter: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    pendingRewardSpecificInvitee(
      _invitee: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    relationshipAdr(overrides?: CallOverrides): Promise<string>;

    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    rewardLockBlocks(overrides?: CallOverrides): Promise<BigNumber>;

    rewardedDataOf(
      arg0: string,
      arg1: string,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber, BigNumber, BigNumber, BigNumber, BigNumber] & {
        rewaradedTotal: BigNumber;
        earnedBlockTotal: BigNumber;
        lastRewardedBlock: BigNumber;
        lastRewardedAmount: BigNumber;
        lastInviterHistoryIndex: BigNumber;
        lastInviteeHistoryIndex: BigNumber;
      }
    >;

    scAddr(overrides?: CallOverrides): Promise<string>;

    setEarnBlockCountMax(
      _newMax: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    setRewardLockBlocks(
      _blockCount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    stakeThresholdToEarn(overrides?: CallOverrides): Promise<BigNumber>;

    supportClaim(overrides?: CallOverrides): Promise<boolean>;

    thsAddr(overrides?: CallOverrides): Promise<string>;

    thsStaking(overrides?: CallOverrides): Promise<string>;

    toggleSupportClaim(overrides?: CallOverrides): Promise<void>;

    transferOwnership(
      newOwner: string,
      overrides?: CallOverrides
    ): Promise<void>;

    usdtAddr(overrides?: CallOverrides): Promise<string>;

    viewAsUsdt(
      _thsAmount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    withdrawToken(
      _token: string,
      _amount: BigNumberish,
      _to: string,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "ChangeStakeAmount(address,uint256,uint256)"(
      staker?: string | null,
      oldAmount?: BigNumberish | null,
      newAmount?: BigNumberish | null
    ): ChangeStakeAmountEventFilter;
    ChangeStakeAmount(
      staker?: string | null,
      oldAmount?: BigNumberish | null,
      newAmount?: BigNumberish | null
    ): ChangeStakeAmountEventFilter;

    "Claim(address,uint256)"(
      staker?: string | null,
      reward?: BigNumberish | null
    ): ClaimEventFilter;
    Claim(
      staker?: string | null,
      reward?: BigNumberish | null
    ): ClaimEventFilter;

    "OwnershipTransferred(address,address)"(
      previousOwner?: string | null,
      newOwner?: string | null
    ): OwnershipTransferredEventFilter;
    OwnershipTransferred(
      previousOwner?: string | null,
      newOwner?: string | null
    ): OwnershipTransferredEventFilter;
  };

  estimateGas: {
    ONE_SC(overrides?: CallOverrides): Promise<BigNumber>;

    ONE_THS(overrides?: CallOverrides): Promise<BigNumber>;

    ONE_USDT(overrides?: CallOverrides): Promise<BigNumber>;

    changeHistoryOf(
      arg0: string,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    changeStakeAmount(
      _staker: string,
      _newAmount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    claim(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    claimSpecificInvitee(
      _invitee: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    earnBlockCountMax(overrides?: CallOverrides): Promise<BigNumber>;

    getCurrentStakeInfo(
      _staker: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    initialize(
      _pair: string,
      _ths: string,
      _usdt: string,
      _staking: string,
      _sc: string,
      _relationship: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    inviteRewardPerLevelPerBlock(overrides?: CallOverrides): Promise<BigNumber>;

    levelDec(overrides?: CallOverrides): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    pairAddr(overrides?: CallOverrides): Promise<BigNumber>;

    pendingReward(
      _inviter: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    pendingRewardSpecificInvitee(
      _invitee: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    relationshipAdr(overrides?: CallOverrides): Promise<BigNumber>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    rewardLockBlocks(overrides?: CallOverrides): Promise<BigNumber>;

    rewardedDataOf(
      arg0: string,
      arg1: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    scAddr(overrides?: CallOverrides): Promise<BigNumber>;

    setEarnBlockCountMax(
      _newMax: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setRewardLockBlocks(
      _blockCount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    stakeThresholdToEarn(overrides?: CallOverrides): Promise<BigNumber>;

    supportClaim(overrides?: CallOverrides): Promise<BigNumber>;

    thsAddr(overrides?: CallOverrides): Promise<BigNumber>;

    thsStaking(overrides?: CallOverrides): Promise<BigNumber>;

    toggleSupportClaim(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    usdtAddr(overrides?: CallOverrides): Promise<BigNumber>;

    viewAsUsdt(
      _thsAmount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    withdrawToken(
      _token: string,
      _amount: BigNumberish,
      _to: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    ONE_SC(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    ONE_THS(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    ONE_USDT(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    changeHistoryOf(
      arg0: string,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    changeStakeAmount(
      _staker: string,
      _newAmount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    claim(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    claimSpecificInvitee(
      _invitee: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    earnBlockCountMax(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getCurrentStakeInfo(
      _staker: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    initialize(
      _pair: string,
      _ths: string,
      _usdt: string,
      _staking: string,
      _sc: string,
      _relationship: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    inviteRewardPerLevelPerBlock(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    levelDec(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    pairAddr(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    pendingReward(
      _inviter: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    pendingRewardSpecificInvitee(
      _invitee: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    relationshipAdr(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    rewardLockBlocks(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    rewardedDataOf(
      arg0: string,
      arg1: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    scAddr(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    setEarnBlockCountMax(
      _newMax: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setRewardLockBlocks(
      _blockCount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    stakeThresholdToEarn(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    supportClaim(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    thsAddr(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    thsStaking(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    toggleSupportClaim(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    usdtAddr(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    viewAsUsdt(
      _thsAmount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    withdrawToken(
      _token: string,
      _amount: BigNumberish,
      _to: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
