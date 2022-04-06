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

export interface ScFarmForInvterInterface extends ethers.utils.Interface {
  functions: {
    "DEFAULT_ADMIN_ROLE()": FunctionFragment;
    "MANAGER_ROLE()": FunctionFragment;
    "ONE_SC()": FunctionFragment;
    "ONE_THS()": FunctionFragment;
    "ONE_USDT()": FunctionFragment;
    "OWNER_ROLE()": FunctionFragment;
    "addManagerBatch(address[])": FunctionFragment;
    "changeOwner(address)": FunctionFragment;
    "changeStakeAmount(address,uint256)": FunctionFragment;
    "claim()": FunctionFragment;
    "claimSpecificInvitee(address)": FunctionFragment;
    "earnBlockCountMax()": FunctionFragment;
    "getRoleAdmin(bytes32)": FunctionFragment;
    "grantRole(bytes32,address)": FunctionFragment;
    "hasRole(bytes32,address)": FunctionFragment;
    "initFlag()": FunctionFragment;
    "initalize(address,address,address,address,address,address)": FunctionFragment;
    "inviteRewardPerLevelPerBlock()": FunctionFragment;
    "inviterThresholdToEarned()": FunctionFragment;
    "levelDec()": FunctionFragment;
    "pairAddr()": FunctionFragment;
    "pendingReward(address)": FunctionFragment;
    "pendingRewardSpecificInvitee(address,address)": FunctionFragment;
    "relationshipAdr()": FunctionFragment;
    "removeManager(address)": FunctionFragment;
    "renounceRole(bytes32,address)": FunctionFragment;
    "revokeRole(bytes32,address)": FunctionFragment;
    "rewardInfoOf(address,address)": FunctionFragment;
    "scAddr()": FunctionFragment;
    "setEarnBlockCountMax(uint256)": FunctionFragment;
    "setInviteRewardPerLevelPerBlock(uint256)": FunctionFragment;
    "stakedInfoOf(address)": FunctionFragment;
    "supportsInterface(bytes4)": FunctionFragment;
    "thsAddr()": FunctionFragment;
    "thsStaking()": FunctionFragment;
    "usdtAddr()": FunctionFragment;
    "viewAsUsdt(uint256)": FunctionFragment;
    "withdrawToken(address,address)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "DEFAULT_ADMIN_ROLE",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "MANAGER_ROLE",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "ONE_SC", values?: undefined): string;
  encodeFunctionData(functionFragment: "ONE_THS", values?: undefined): string;
  encodeFunctionData(functionFragment: "ONE_USDT", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "OWNER_ROLE",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "addManagerBatch",
    values: [string[]]
  ): string;
  encodeFunctionData(functionFragment: "changeOwner", values: [string]): string;
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
    functionFragment: "getRoleAdmin",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "grantRole",
    values: [BytesLike, string]
  ): string;
  encodeFunctionData(
    functionFragment: "hasRole",
    values: [BytesLike, string]
  ): string;
  encodeFunctionData(functionFragment: "initFlag", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "initalize",
    values: [string, string, string, string, string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "inviteRewardPerLevelPerBlock",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "inviterThresholdToEarned",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "levelDec", values?: undefined): string;
  encodeFunctionData(functionFragment: "pairAddr", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "pendingReward",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "pendingRewardSpecificInvitee",
    values: [string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "relationshipAdr",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "removeManager",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "renounceRole",
    values: [BytesLike, string]
  ): string;
  encodeFunctionData(
    functionFragment: "revokeRole",
    values: [BytesLike, string]
  ): string;
  encodeFunctionData(
    functionFragment: "rewardInfoOf",
    values: [string, string]
  ): string;
  encodeFunctionData(functionFragment: "scAddr", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "setEarnBlockCountMax",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "setInviteRewardPerLevelPerBlock",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "stakedInfoOf",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "supportsInterface",
    values: [BytesLike]
  ): string;
  encodeFunctionData(functionFragment: "thsAddr", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "thsStaking",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "usdtAddr", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "viewAsUsdt",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "withdrawToken",
    values: [string, string]
  ): string;

  decodeFunctionResult(
    functionFragment: "DEFAULT_ADMIN_ROLE",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "MANAGER_ROLE",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "ONE_SC", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "ONE_THS", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "ONE_USDT", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "OWNER_ROLE", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "addManagerBatch",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "changeOwner",
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
    functionFragment: "getRoleAdmin",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "grantRole", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "hasRole", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "initFlag", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "initalize", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "inviteRewardPerLevelPerBlock",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "inviterThresholdToEarned",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "levelDec", data: BytesLike): Result;
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
    functionFragment: "removeManager",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "renounceRole",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "revokeRole", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "rewardInfoOf",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "scAddr", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "setEarnBlockCountMax",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setInviteRewardPerLevelPerBlock",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "stakedInfoOf",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "supportsInterface",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "thsAddr", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "thsStaking", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "usdtAddr", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "viewAsUsdt", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "withdrawToken",
    data: BytesLike
  ): Result;

  events: {
    "ChangeStakeAmount(address,uint256,uint256)": EventFragment;
    "Claim(address,uint256)": EventFragment;
    "Initalize(address,address,address,address,address,address,address)": EventFragment;
    "RoleAdminChanged(bytes32,bytes32,bytes32)": EventFragment;
    "RoleGranted(bytes32,address,address)": EventFragment;
    "RoleRevoked(bytes32,address,address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "ChangeStakeAmount"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Claim"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Initalize"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RoleAdminChanged"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RoleGranted"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RoleRevoked"): EventFragment;
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

export type InitalizeEvent = TypedEvent<
  [string, string, string, string, string, string, string],
  {
    sender: string;
    pair: string;
    ths: string;
    usdt: string;
    staking: string;
    sc: string;
    relationship: string;
  }
>;

export type InitalizeEventFilter = TypedEventFilter<InitalizeEvent>;

export type RoleAdminChangedEvent = TypedEvent<
  [string, string, string],
  { role: string; previousAdminRole: string; newAdminRole: string }
>;

export type RoleAdminChangedEventFilter =
  TypedEventFilter<RoleAdminChangedEvent>;

export type RoleGrantedEvent = TypedEvent<
  [string, string, string],
  { role: string; account: string; sender: string }
>;

export type RoleGrantedEventFilter = TypedEventFilter<RoleGrantedEvent>;

export type RoleRevokedEvent = TypedEvent<
  [string, string, string],
  { role: string; account: string; sender: string }
>;

export type RoleRevokedEventFilter = TypedEventFilter<RoleRevokedEvent>;

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
    DEFAULT_ADMIN_ROLE(overrides?: CallOverrides): Promise<[string]>;

    MANAGER_ROLE(overrides?: CallOverrides): Promise<[string]>;

    ONE_SC(overrides?: CallOverrides): Promise<[BigNumber]>;

    ONE_THS(overrides?: CallOverrides): Promise<[BigNumber]>;

    ONE_USDT(overrides?: CallOverrides): Promise<[BigNumber]>;

    OWNER_ROLE(overrides?: CallOverrides): Promise<[string]>;

    addManagerBatch(
      _users: string[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    changeOwner(
      _newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

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

    getRoleAdmin(role: BytesLike, overrides?: CallOverrides): Promise<[string]>;

    grantRole(
      role: BytesLike,
      account: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    hasRole(
      role: BytesLike,
      account: string,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    initFlag(overrides?: CallOverrides): Promise<[boolean]>;

    initalize(
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

    inviterThresholdToEarned(overrides?: CallOverrides): Promise<[BigNumber]>;

    levelDec(overrides?: CallOverrides): Promise<[BigNumber]>;

    pairAddr(overrides?: CallOverrides): Promise<[string]>;

    pendingReward(
      _inviter: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { pendingReward_: BigNumber }>;

    pendingRewardSpecificInvitee(
      _inviter: string,
      _invitee: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { pendingReward_: BigNumber }>;

    relationshipAdr(overrides?: CallOverrides): Promise<[string]>;

    removeManager(
      _user: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    renounceRole(
      role: BytesLike,
      account: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    revokeRole(
      role: BytesLike,
      account: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    rewardInfoOf(
      arg0: string,
      arg1: string,
      overrides?: CallOverrides
    ): Promise<
      [
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber
      ] & {
        earnedTotal: BigNumber;
        earnedBlockTotal: BigNumber;
        lastEarnedBlock: BigNumber;
        lastEarnedAmount: BigNumber;
        lastInviterStakedTHS: BigNumber;
        lastInviterStakedTHSAsUsdt: BigNumber;
        lastInviteeStakedTHS: BigNumber;
        lastInviteeStakedTHSAsUsdt: BigNumber;
      }
    >;

    scAddr(overrides?: CallOverrides): Promise<[string]>;

    setEarnBlockCountMax(
      _newMax: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setInviteRewardPerLevelPerBlock(
      _newReward: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    stakedInfoOf(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber] & {
        currentStakedTHS: BigNumber;
        earnedTotal: BigNumber;
      }
    >;

    supportsInterface(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    thsAddr(overrides?: CallOverrides): Promise<[string]>;

    thsStaking(overrides?: CallOverrides): Promise<[string]>;

    usdtAddr(overrides?: CallOverrides): Promise<[string]>;

    viewAsUsdt(
      _thsAmount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { usdtAmount_: BigNumber }>;

    withdrawToken(
      _token: string,
      _to: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  DEFAULT_ADMIN_ROLE(overrides?: CallOverrides): Promise<string>;

  MANAGER_ROLE(overrides?: CallOverrides): Promise<string>;

  ONE_SC(overrides?: CallOverrides): Promise<BigNumber>;

  ONE_THS(overrides?: CallOverrides): Promise<BigNumber>;

  ONE_USDT(overrides?: CallOverrides): Promise<BigNumber>;

  OWNER_ROLE(overrides?: CallOverrides): Promise<string>;

  addManagerBatch(
    _users: string[],
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  changeOwner(
    _newOwner: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

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

  getRoleAdmin(role: BytesLike, overrides?: CallOverrides): Promise<string>;

  grantRole(
    role: BytesLike,
    account: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  hasRole(
    role: BytesLike,
    account: string,
    overrides?: CallOverrides
  ): Promise<boolean>;

  initFlag(overrides?: CallOverrides): Promise<boolean>;

  initalize(
    _pair: string,
    _ths: string,
    _usdt: string,
    _staking: string,
    _sc: string,
    _relationship: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  inviteRewardPerLevelPerBlock(overrides?: CallOverrides): Promise<BigNumber>;

  inviterThresholdToEarned(overrides?: CallOverrides): Promise<BigNumber>;

  levelDec(overrides?: CallOverrides): Promise<BigNumber>;

  pairAddr(overrides?: CallOverrides): Promise<string>;

  pendingReward(
    _inviter: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  pendingRewardSpecificInvitee(
    _inviter: string,
    _invitee: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  relationshipAdr(overrides?: CallOverrides): Promise<string>;

  removeManager(
    _user: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  renounceRole(
    role: BytesLike,
    account: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  revokeRole(
    role: BytesLike,
    account: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  rewardInfoOf(
    arg0: string,
    arg1: string,
    overrides?: CallOverrides
  ): Promise<
    [
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber
    ] & {
      earnedTotal: BigNumber;
      earnedBlockTotal: BigNumber;
      lastEarnedBlock: BigNumber;
      lastEarnedAmount: BigNumber;
      lastInviterStakedTHS: BigNumber;
      lastInviterStakedTHSAsUsdt: BigNumber;
      lastInviteeStakedTHS: BigNumber;
      lastInviteeStakedTHSAsUsdt: BigNumber;
    }
  >;

  scAddr(overrides?: CallOverrides): Promise<string>;

  setEarnBlockCountMax(
    _newMax: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setInviteRewardPerLevelPerBlock(
    _newReward: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  stakedInfoOf(
    arg0: string,
    overrides?: CallOverrides
  ): Promise<
    [BigNumber, BigNumber] & {
      currentStakedTHS: BigNumber;
      earnedTotal: BigNumber;
    }
  >;

  supportsInterface(
    interfaceId: BytesLike,
    overrides?: CallOverrides
  ): Promise<boolean>;

  thsAddr(overrides?: CallOverrides): Promise<string>;

  thsStaking(overrides?: CallOverrides): Promise<string>;

  usdtAddr(overrides?: CallOverrides): Promise<string>;

  viewAsUsdt(
    _thsAmount: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  withdrawToken(
    _token: string,
    _to: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    DEFAULT_ADMIN_ROLE(overrides?: CallOverrides): Promise<string>;

    MANAGER_ROLE(overrides?: CallOverrides): Promise<string>;

    ONE_SC(overrides?: CallOverrides): Promise<BigNumber>;

    ONE_THS(overrides?: CallOverrides): Promise<BigNumber>;

    ONE_USDT(overrides?: CallOverrides): Promise<BigNumber>;

    OWNER_ROLE(overrides?: CallOverrides): Promise<string>;

    addManagerBatch(_users: string[], overrides?: CallOverrides): Promise<void>;

    changeOwner(_newOwner: string, overrides?: CallOverrides): Promise<void>;

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

    getRoleAdmin(role: BytesLike, overrides?: CallOverrides): Promise<string>;

    grantRole(
      role: BytesLike,
      account: string,
      overrides?: CallOverrides
    ): Promise<void>;

    hasRole(
      role: BytesLike,
      account: string,
      overrides?: CallOverrides
    ): Promise<boolean>;

    initFlag(overrides?: CallOverrides): Promise<boolean>;

    initalize(
      _pair: string,
      _ths: string,
      _usdt: string,
      _staking: string,
      _sc: string,
      _relationship: string,
      overrides?: CallOverrides
    ): Promise<void>;

    inviteRewardPerLevelPerBlock(overrides?: CallOverrides): Promise<BigNumber>;

    inviterThresholdToEarned(overrides?: CallOverrides): Promise<BigNumber>;

    levelDec(overrides?: CallOverrides): Promise<BigNumber>;

    pairAddr(overrides?: CallOverrides): Promise<string>;

    pendingReward(
      _inviter: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    pendingRewardSpecificInvitee(
      _inviter: string,
      _invitee: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    relationshipAdr(overrides?: CallOverrides): Promise<string>;

    removeManager(_user: string, overrides?: CallOverrides): Promise<void>;

    renounceRole(
      role: BytesLike,
      account: string,
      overrides?: CallOverrides
    ): Promise<void>;

    revokeRole(
      role: BytesLike,
      account: string,
      overrides?: CallOverrides
    ): Promise<void>;

    rewardInfoOf(
      arg0: string,
      arg1: string,
      overrides?: CallOverrides
    ): Promise<
      [
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber
      ] & {
        earnedTotal: BigNumber;
        earnedBlockTotal: BigNumber;
        lastEarnedBlock: BigNumber;
        lastEarnedAmount: BigNumber;
        lastInviterStakedTHS: BigNumber;
        lastInviterStakedTHSAsUsdt: BigNumber;
        lastInviteeStakedTHS: BigNumber;
        lastInviteeStakedTHSAsUsdt: BigNumber;
      }
    >;

    scAddr(overrides?: CallOverrides): Promise<string>;

    setEarnBlockCountMax(
      _newMax: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    setInviteRewardPerLevelPerBlock(
      _newReward: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    stakedInfoOf(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber] & {
        currentStakedTHS: BigNumber;
        earnedTotal: BigNumber;
      }
    >;

    supportsInterface(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<boolean>;

    thsAddr(overrides?: CallOverrides): Promise<string>;

    thsStaking(overrides?: CallOverrides): Promise<string>;

    usdtAddr(overrides?: CallOverrides): Promise<string>;

    viewAsUsdt(
      _thsAmount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    withdrawToken(
      _token: string,
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

    "Initalize(address,address,address,address,address,address,address)"(
      sender?: null,
      pair?: null,
      ths?: null,
      usdt?: null,
      staking?: null,
      sc?: null,
      relationship?: null
    ): InitalizeEventFilter;
    Initalize(
      sender?: null,
      pair?: null,
      ths?: null,
      usdt?: null,
      staking?: null,
      sc?: null,
      relationship?: null
    ): InitalizeEventFilter;

    "RoleAdminChanged(bytes32,bytes32,bytes32)"(
      role?: BytesLike | null,
      previousAdminRole?: BytesLike | null,
      newAdminRole?: BytesLike | null
    ): RoleAdminChangedEventFilter;
    RoleAdminChanged(
      role?: BytesLike | null,
      previousAdminRole?: BytesLike | null,
      newAdminRole?: BytesLike | null
    ): RoleAdminChangedEventFilter;

    "RoleGranted(bytes32,address,address)"(
      role?: BytesLike | null,
      account?: string | null,
      sender?: string | null
    ): RoleGrantedEventFilter;
    RoleGranted(
      role?: BytesLike | null,
      account?: string | null,
      sender?: string | null
    ): RoleGrantedEventFilter;

    "RoleRevoked(bytes32,address,address)"(
      role?: BytesLike | null,
      account?: string | null,
      sender?: string | null
    ): RoleRevokedEventFilter;
    RoleRevoked(
      role?: BytesLike | null,
      account?: string | null,
      sender?: string | null
    ): RoleRevokedEventFilter;
  };

  estimateGas: {
    DEFAULT_ADMIN_ROLE(overrides?: CallOverrides): Promise<BigNumber>;

    MANAGER_ROLE(overrides?: CallOverrides): Promise<BigNumber>;

    ONE_SC(overrides?: CallOverrides): Promise<BigNumber>;

    ONE_THS(overrides?: CallOverrides): Promise<BigNumber>;

    ONE_USDT(overrides?: CallOverrides): Promise<BigNumber>;

    OWNER_ROLE(overrides?: CallOverrides): Promise<BigNumber>;

    addManagerBatch(
      _users: string[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    changeOwner(
      _newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
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

    getRoleAdmin(
      role: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    grantRole(
      role: BytesLike,
      account: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    hasRole(
      role: BytesLike,
      account: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    initFlag(overrides?: CallOverrides): Promise<BigNumber>;

    initalize(
      _pair: string,
      _ths: string,
      _usdt: string,
      _staking: string,
      _sc: string,
      _relationship: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    inviteRewardPerLevelPerBlock(overrides?: CallOverrides): Promise<BigNumber>;

    inviterThresholdToEarned(overrides?: CallOverrides): Promise<BigNumber>;

    levelDec(overrides?: CallOverrides): Promise<BigNumber>;

    pairAddr(overrides?: CallOverrides): Promise<BigNumber>;

    pendingReward(
      _inviter: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    pendingRewardSpecificInvitee(
      _inviter: string,
      _invitee: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    relationshipAdr(overrides?: CallOverrides): Promise<BigNumber>;

    removeManager(
      _user: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    renounceRole(
      role: BytesLike,
      account: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    revokeRole(
      role: BytesLike,
      account: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    rewardInfoOf(
      arg0: string,
      arg1: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    scAddr(overrides?: CallOverrides): Promise<BigNumber>;

    setEarnBlockCountMax(
      _newMax: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setInviteRewardPerLevelPerBlock(
      _newReward: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    stakedInfoOf(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    supportsInterface(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    thsAddr(overrides?: CallOverrides): Promise<BigNumber>;

    thsStaking(overrides?: CallOverrides): Promise<BigNumber>;

    usdtAddr(overrides?: CallOverrides): Promise<BigNumber>;

    viewAsUsdt(
      _thsAmount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    withdrawToken(
      _token: string,
      _to: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    DEFAULT_ADMIN_ROLE(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    MANAGER_ROLE(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    ONE_SC(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    ONE_THS(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    ONE_USDT(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    OWNER_ROLE(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    addManagerBatch(
      _users: string[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    changeOwner(
      _newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
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

    getRoleAdmin(
      role: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    grantRole(
      role: BytesLike,
      account: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    hasRole(
      role: BytesLike,
      account: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    initFlag(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    initalize(
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

    inviterThresholdToEarned(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    levelDec(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    pairAddr(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    pendingReward(
      _inviter: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    pendingRewardSpecificInvitee(
      _inviter: string,
      _invitee: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    relationshipAdr(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    removeManager(
      _user: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    renounceRole(
      role: BytesLike,
      account: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    revokeRole(
      role: BytesLike,
      account: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    rewardInfoOf(
      arg0: string,
      arg1: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    scAddr(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    setEarnBlockCountMax(
      _newMax: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setInviteRewardPerLevelPerBlock(
      _newReward: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    stakedInfoOf(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    supportsInterface(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    thsAddr(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    thsStaking(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    usdtAddr(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    viewAsUsdt(
      _thsAmount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    withdrawToken(
      _token: string,
      _to: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
