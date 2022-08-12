import { useCallback, useEffect, useState } from "react";
import {
	Box,
	Button,
	FormControl,
	Grid,
	InputAdornment,
	InputLabel,
	OutlinedInput,
	Paper,
	Typography,
	Zoom
} from "@material-ui/core";
import { BigNumber, ethers } from "ethers";

import { t, Trans } from "@lingui/macro";
import { useWeb3Context } from "src/hooks/web3Context";
import { Skeleton } from "@material-ui/lab";
import { useAppSelector } from "src/hooks";
import { debounce } from "src/utils/debounce";
import styled from "styled-components";
import { addresses, THEME_LIGHT } from "src/constants";
import { abi as LoanContractABI } from "src/abi/LoanContract.json";
import { abi as sTHSABI } from "src/abi/sThemis.json";
import dayjs from "dayjs"
import utc from 'dayjs/plugin/utc'
import { isPending } from "../Claim";
import { useDispatch } from "react-redux";
import { info } from "src/slices/MessagesSlice";
import React from "react";

dayjs.extend(utc)
const GridFlex = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 20px;
	text-align: center;
`

const USDTAmount = styled(Grid)`
	display: flex;
	width: 100%;
	justify-content: space-around;
	align-items: center;
	text-align: right;
	font-size: 16px;
	& div {
		width: 100%;
		max-width: 542px;
		margin: 10px;
	}
`

const BorrowFormControl = styled(FormControl)`
	margin: 0 20px 0 0 !important;
	@media (max-width: 750px) {
    margin: 0 0 20px 0 !important;
  }
`

const Approve = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	font-size: 14px;
	padding: 16px;
	@media (max-width: 750px) {
    display: block;
		font-size: 12px;
  }
`

const FirstBorrow = styled.div`
	text-align: center;
	line-height: 1.5;
	margin-right: 20px;
	@media (max-width: 750px) {
    margin: 0 20px 20px 0;
  }
`

const Card = styled.div`
	width: 97%;
	max-width: 833px;
	padding: 16px;
	border-radius: 10px;
	margin-top: 16px;
`

const Title = styled.div`
	width: 100%;
	padding: 16px 0;
	font-size: 24px;
	font-weight: 700;
	@media (max-width: 750px) {
    font-size: 16px;
  }
`

const Item = styled(GridFlex)`
	padding: 8px 0;
	border-bottom: 1px solid rgba(127, 127, 127, 0.12);
`


const Option = styled(GridFlex)`
	flex: 1;
	width: 100px;
	font-size: 12px;
	padding: 8px 0;
`


const More = styled(GridFlex)`
	margin: 16px 0;
	font-size: 14px;
	cursor: pointer;
`

const Amount = styled.div`
	font-size: 12px;
	text-align: right;
	padding: 8px 0;
	width: 70px;
`

const Ol = styled.div`
	width: 70px;
	font-size: 12px;
	text-align: left;
	padding: 8px 0;
`

const Left = styled.div`
	font-size: 16px;
	text-align: left;
	padding: 8px 0;
	font-weight: 500;
`

const Quantity = styled.span`
	font-size: 16px;
	padding: 0 8px;
	font-weight: 500;
	color: blue;
`

const ClaimBtn = styled(Button)`
	margin-top: 8px;
	background-color: #F8CC82;
	color: #000;
	border-radius: 8px;
	cursor: pointer;
	@media (max-width: 750px) {
		height: 24px;
		& span {
  	  height: 24px;
			font-size: 14px;
  	}
	}
`

const RepayModal = styled.div`
	position: fixed;
	top: 50%;
	left: 50%;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100vw;
	height: 100vh;
	z-Index: 1300;
	transform: translate(-50%, -50%);
`

const RepayContainer = styled.div`
	width: 100%;
	background: #FFFFFF;
	padding: 40px 40px 24px;
	border-radius: 8px;
	max-width: 350px;
	font-size: 16px;
	text-align: left;
`

const RepayTitle = styled.div`
	width: 100%;
	font-weight: 700;
`

const RepayViceTitle = styled.div`
	width: 100%;
	margin-top: 24px;
	text-align: left;
	color: #78818E;
`

const RepayText = styled.div`
	width: 100%;
	margin-top: 16px;
	text-align: left;
	font-weight: 700;
	color: #354357;
`

const RepayConfirm = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 12px 0;
`



const Value = styled.div`
	font-size: 20px;
	padding-top: 8px;
	font-weight: 600;
`

interface DataType {
	isPending: boolean
	value: string
}

interface ListType {
	borrowId: string // id
	borrowedBlock: string // 借用时区块高度
	borrowedTimestamp: string // 借用时时间戳
	borrowedUsdtAmount: string // 借用usdt份额
	borrower: string // 所有者
	repayedBlock: string // 归还的区块
	stakedSthsAmount: string // 借款时质押 sths份额
	repayedTimestamp: string // 归还时间戳
}

const BorrowInit: ListType = {
	borrowId: "",
	borrowedBlock: "",
	borrowedTimestamp: "",
	borrowedUsdtAmount: "",
	borrower: "",
	repayedBlock: "",
	stakedSthsAmount: "",
	repayedTimestamp: ""
}
function Borrow() {
	const { provider, address, connect, chainID } = useWeb3Context();
	const theme = useAppSelector(state => state.theme.theme)

	const [zoomed, setZoomed] = useState(false);
	const [quantity, setQuantity] = useState("0");

	const [sThs, setSThs] = useState<DataType>({ isPending: false, value: "--" })
	const [usdt, setUsdt] = useState<DataType>({ isPending: false, value: "--" })
	const [isBorrow, setIsBorrow] = useState(false)

	const [yieldAmount, setYieldAmount] = useState<DataType>({ isPending: false, value: "--" })
	const [sThSAllowance, setSThSAllowance] = useState("")
	const [usdtAllowance, setUSDTAllowance] = useState("")
	const [borrowPage, setBorrowPage] = useState(1)
	const [borrowPageNum, setBorrowPageNum] = useState(0)
	const [borrowList, setBorrowList] = useState<ListType[]>([])
	const [currentBorrow, setCurrentBorrow] = useState<ListType>(BorrowInit)
	const [hashIdx, setHashIdx] = useState("")
	const [hashValue, setHashValue] = useState("")
	const [free, setFree] = useState("")
	const [isOpen, setIsOpen] = useState(false)


	const [pendingStatus, setPendingStatus] = useState({ approve: false, borrow: false, repay: false, repayConfirm: false });

	const dispatch = useDispatch()

	const borrowAmount = Number(sThs.value ?? 0) <= Number(yieldAmount.value ?? 0) ? sThs.value : yieldAmount.value

	const setMax = useCallback(
		() => {
			if (Number(sThs) < Number(yieldAmount)) {
				setQuantity(sThs.value ?? "0");
			} else {
				setQuantity(yieldAmount.value ?? "0");
			}
		},
		[yieldAmount, sThs],
	)

	const getYieldAmount = useCallback(
		async () => {
			setYieldAmount({ isPending: true, value: yieldAmount.value })
			const signer = provider.getSigner();
			const LoanContract = new ethers.Contract(addresses[chainID].LoanContract_ADDRESS as string, LoanContractABI, signer)
			const max = await LoanContract.getAllowStakeSthsMax(address)
			setYieldAmount({ isPending: true, value: Math.floor(Number(ethers.utils.formatUnits(max, "gwei")) * 10000) / 10000 + "" })
		}, [address, chainID, provider, addresses]
	)

	const getList = useCallback(
		async () => {
			const signer = provider.getSigner();
			const LoanContract = new ethers.Contract(addresses[chainID].LoanContract_ADDRESS as string, LoanContractABI, signer)
			const info = await LoanContract.getBorrowInfoByPage(address, BigNumber.from("0"), BigNumber.from(10 * borrowPage + ""))
			setBorrowPageNum(+info.resultSize_.toString() || 0)
			setBorrowList(info.resultArr_.map((item: ListType) => ({
				borrowId: item.borrowId.toString(),
				borrowedBlock: item.borrowedBlock.toString(),
				borrowedTimestamp: item.borrowedTimestamp.toString(),
				borrowedUsdtAmount: ethers.utils.formatUnits(item.borrowedUsdtAmount, "ether"),
				borrower: item.borrower.toString(),
				repayedBlock: item.repayedBlock.toString(),
				stakedSthsAmount: ethers.utils.formatUnits(item.stakedSthsAmount, "gwei"),
				repayedTimestamp: item.repayedTimestamp.toString(),
			})
			))
		}, [address, chainID, provider, addresses, borrowPage]
	)

	const getSTHSBanlance = useCallback(
		async () => {
			setSThs({ isPending: true, value: sThs.value })
			const signer = provider.getSigner();
			const sThsContract = new ethers.Contract(addresses[chainID].STHS_ADDRESS, sTHSABI, signer);
			const sThsBalance = await sThsContract.balanceOf(address);
			setSThs({ isPending: true, value: Math.floor(Number(ethers.utils.formatUnits(sThsBalance, "gwei")) * 10000) / 10000 + "" })
		}, [address, chainID, provider, addresses])

	const getUSDTBanlance = useCallback(
		async () => {
			setUsdt({ isPending: true, value: usdt.value })
			const signer = provider.getSigner();
			const USDTContract = new ethers.Contract(addresses[chainID].USDT_ADDRESS, sTHSABI, signer);
			const USDTBalance = await USDTContract.balanceOf(address);
			setUsdt({ isPending: true, value: Math.floor(Number(ethers.utils.formatUnits(USDTBalance, "ether")) * 10000) / 10000 + "" })
		}, [address, chainID, provider, addresses])

	const onBorrow = useCallback(
		async () => {
			if (Number(quantity) > Number(borrowAmount)) return handleBorrowAmountControl();
			setPendingStatus({ ...pendingStatus, borrow: true })
			try {
				const signer = provider.getSigner();
				const LoanContract = new ethers.Contract(addresses[chainID].LoanContract_ADDRESS as string, LoanContractABI, signer)
				const hash = await LoanContract.stakeSthsAndBorrowUsdts(ethers.utils.parseUnits(quantity, "gwei"))
				const info = await hash.wait()
				console.log("info", info, pendingStatus)
				setHashValue(info.transactionHash)
				setPendingStatus({ ...pendingStatus, borrow: false })
			} catch (error) {
				setTimeout(() => {
					setPendingStatus({ ...pendingStatus, borrow: false })
				}, 1000);
			}
		}, [address, chainID, provider, addresses, quantity, pendingStatus]
	)

	const getAllowance = useCallback(
		async () => {
			const signer = provider.getSigner();
			const sThsContract = new ethers.Contract(addresses[chainID].STHS_ADDRESS, sTHSABI, signer);
			const sThSAllowance = await sThsContract.allowance(address, addresses[chainID].LoanContract_ADDRESS)
			setSThSAllowance(ethers.utils.formatUnits(sThSAllowance, "gwei") || "0")
			const USDTContract = new ethers.Contract(addresses[chainID].USDT_ADDRESS, sTHSABI, signer);
			const usdtAllowance = await USDTContract.allowance(address, addresses[chainID].LoanContract_ADDRESS)
			setUSDTAllowance(ethers.utils.formatUnits(usdtAllowance, "ether") || "0")
		},
		[address, chainID, provider, addresses],
	)

	const onSeekApproval = useCallback(
		async () => {
			setPendingStatus({ ...pendingStatus, approve: true })

			try {
				const signer = provider.getSigner();
				const sThsContract = new ethers.Contract(addresses[chainID].STHS_ADDRESS, sTHSABI, signer);
				const hash = await sThsContract.approve(addresses[chainID].LoanContract_ADDRESS, ethers.utils.parseUnits("100000", "gwei"));
				const info = await hash.wait()
				console.log("hash", info)
				setPendingStatus({ ...pendingStatus, approve: false })
				setHashValue(info.transactionHash)
			} catch (error) {
				setPendingStatus({ ...pendingStatus, approve: false })
			}
		}, [chainID, provider, addresses])

	const onRepay = useCallback(
		async (id: string, amount: string) => {
			if (Number(quantity) > Number(borrowAmount)) return handleBorrowAmountControl();
			setPendingStatus({ ...pendingStatus, repay: true })
			const signer = provider.getSigner();
			const LoanContract = new ethers.Contract(addresses[chainID].LoanContract_ADDRESS as string, LoanContractABI, signer)
			try {
				if (Number(usdtAllowance) < Number(amount)) {
					const USDTContract = new ethers.Contract(addresses[chainID].USDT_ADDRESS, sTHSABI, signer);
					const hash = await USDTContract.approve(addresses[chainID].LoanContract_ADDRESS, ethers.utils.parseUnits("100000", "ether"));
					await hash.wait()
				}
				const hash = await LoanContract.repayUsdt(BigNumber.from(id))
				const info = await hash.wait()
				setHashValue(info.transactionHash)
				setPendingStatus({ ...pendingStatus, repay: false })
				setHashIdx("")
			} catch (error) {
				setTimeout(() => {
					setPendingStatus({ ...pendingStatus, repay: false })
					setHashIdx("")
				}, 1000);
			}
		}, [address, chainID, provider, addresses, quantity, pendingStatus, usdtAllowance]
	)

	const getFree = useCallback(
		async () => {
			const signer = provider.getSigner();
			const LoanContract = new ethers.Contract(addresses[chainID].LoanContract_ADDRESS as string, LoanContractABI, signer)
			const free = await LoanContract.calculateSthsFee(currentBorrow.borrowId)
			console.log("COST", ethers.utils.formatUnits(free, "gwei"))
			setFree(ethers.utils.formatUnits(free, "gwei"))
		},
		[address, chainID, provider, addresses, currentBorrow]
	)

	useEffect(() => {
		if (isOpen) {
			getFree()
		}
	}, [isOpen])


	useEffect(() => {
		if (address && chainID && provider && addresses[chainID]?.LoanContract_ADDRESS && !yieldAmount.isPending) {
			getYieldAmount()
		}
	}, [address, chainID, provider, addresses, yieldAmount])

	useEffect(() => {
		if (address && chainID && provider && addresses[chainID]?.STHS_ADDRESS && !sThs.isPending) {
			getSTHSBanlance()
		}
	}, [address, chainID, provider, addresses, sThs])

	useEffect(() => {
		if (address && chainID && provider && addresses[chainID]?.STHS_ADDRESS && addresses[chainID]?.USDT_ADDRESS && !sThs.isPending) {
			getAllowance()
		}
	}, [address, chainID, provider, addresses, sThs])

	useEffect(() => {
		if (address && chainID && provider && addresses[chainID]?.LoanContract_ADDRESS) {
			getList()
		}
	}, [address, chainID, provider, addresses, borrowPage])


	useEffect(() => {
		if (address && chainID && provider && addresses[chainID]?.USDT_ADDRESS && !usdt.isPending) {
			getUSDTBanlance()
		}
	}, [address, chainID, provider, addresses, usdt])



	let modalButton = [];

	modalButton.push(
		<Button variant="contained" color="primary" className="connect-button" onClick={connect} key={1}>
			<Trans>Connect Wallet</Trans>
		</Button>,
	);

	useEffect(() => {
		if (!!sThs && !!sThSAllowance) {
			setIsBorrow(Number(sThs.value ?? 0) < Number(sThSAllowance ?? 0))
		}
	}, [sThs, sThSAllowance])

	const handleBorrowAmountControl = useCallback(
		() => {
			debounce(() => dispatch(info(t`Exceeding the borrowing limit`)), 500)
			// setMax()
		},
		[quantity],
	)

	useEffect(() => {
		if (Number(quantity ?? 0) > Number(borrowAmount)) {
			handleBorrowAmountControl()
		}
	}, [quantity])

	useEffect(() => {
		if (!!hashValue) {
			getAllowance()
			getList()
			getUSDTBanlance()
			getSTHSBanlance()
			getYieldAmount()
		}
	}, [hashValue])

	const handleClose = () => {
		setIsOpen(false)
		setCurrentBorrow(BorrowInit)
		setFree("")
	}

	const handleRepayConfirm = useCallback(
		() => {
			setPendingStatus({ ...pendingStatus, repay: true })
			setHashIdx(currentBorrow.borrowId)
			onRepay(currentBorrow.borrowId, currentBorrow.borrowedUsdtAmount)
		},
		[pendingStatus, currentBorrow],
	)

	return (
		<div id="stake-view">
			<Zoom in={true} onEntered={() => setZoomed(true)}>
				<React.Fragment>

					{isOpen && <RepayModal onClick={handleClose}>
						<RepayContainer onClick={(event) => {
							event.stopPropagation()
						}}>
							<RepayTitle><Trans>Repay</Trans></RepayTitle>
							<RepayViceTitle><Trans>TIME</Trans></RepayViceTitle>
							<RepayText>{dayjs.unix(Number(currentBorrow.borrowedTimestamp)).utc().format("YYYY-MM-DD HH:mm")}</RepayText>
							<RepayViceTitle><Trans>THE AMOUNT OF BORROWED</Trans></RepayViceTitle>
							<RepayText>{currentBorrow.stakedSthsAmount}</RepayText>
							<RepayViceTitle><Trans>INTEREST COST</Trans></RepayViceTitle>
							{!free ? <Skeleton width="150px" data-testid="apy-loading" /> : <RepayText>{free}</RepayText>}
							<RepayConfirm>
								<Button
									className="stake-button borrow-stake-button"
									variant="contained"
									color="primary"
									disabled={!!pendingStatus.repayConfirm}
									onClick={() => {
										debounce(handleRepayConfirm, 500, "ths");
									}}
								>
									{isPending(pendingStatus, "repayConfirm", t`OK`)}
								</Button>
							</RepayConfirm>
						</RepayContainer>
					</RepayModal>}
					<Paper className={`ohm-card`}>
						<Grid container direction="column" spacing={2}>

							<Grid item>
								<div className="stake-top-metrics">
									<Grid container spacing={2} alignItems="flex-end">
										<Grid item xs={12} sm={4} md={4} lg={4}>
											<div className="stake-apy">
												<Typography variant="h5" color="textSecondary">
													<Trans>total sTHS</Trans>
												</Typography>
												<Typography variant="h4">
													{sThs.isPending ? (
														<span data-testid="apy-value">
															{sThs.value}
														</span>
													) : (
														<Skeleton width="150px" data-testid="apy-loading" />
													)}
												</Typography>
											</div>
										</Grid>

										<Grid item xs={12} sm={4} md={4} lg={4}>
											<div className="stake-tvl">
												<Typography variant="h5" color="textSecondary">
													<Trans>Yield Amount</Trans>
												</Typography>
												<Typography variant="h4">
													{yieldAmount.isPending ? (
														<span data-testid="tvl-value">
															{yieldAmount.value}
														</span>
													) : (
														<Skeleton width="150px" data-testid="tvl-loading" />
													)}
												</Typography>
											</div>
										</Grid>

										<Grid item xs={12} sm={4} md={4} lg={4}>
											<div className="stake-index">
												<Typography variant="h5" color="textSecondary">
													<Trans>total USDT</Trans>
												</Typography>
												<Typography variant="h4">
													{usdt.isPending ? (
														<span data-testid="index-value">{usdt.value}</span>
													) : (
														<Skeleton width="150px" data-testid="index-loading" />
													)}
												</Typography>
											</div>
										</Grid>
									</Grid>
								</div>
							</Grid>

							<div className="staking-area" >
								{!address ? (
									<div className="stake-wallet-notification">
										<div className="wallet-menu" id="wallet-menu">
											{modalButton}
										</div>
										<Typography variant="h6">
											<Trans>Connect your wallet to stake THS</Trans>
										</Typography>
									</div>
								) : (
									<>
										<Box className="stake-action-area">
											<Approve>
												{isBorrow ? (
													<>
														<BorrowFormControl variant="outlined" color="primary">
															<InputLabel htmlFor="amount-input"></InputLabel>
															<OutlinedInput
																id="amount-input"
																type="number"
																placeholder="Enter an amount"
																className="stake-input"
																value={quantity}
																onChange={e => {
																	setQuantity(e.target.value)
																}}
																labelWidth={0}
																endAdornment={
																	<InputAdornment position="end">
																		<Button variant="text"
																			onClick={setMax}
																			color="inherit">
																			<Trans>Max</Trans>
																		</Button>
																	</InputAdornment>
																}
															/>
														</BorrowFormControl>
														<Button
															className="stake-button"
															variant="contained"
															color="primary"
															disabled={!!pendingStatus.borrow || !Number(quantity) || (Number(quantity) > Number(borrowAmount))}
															onClick={() => {
																debounce(onBorrow, 500, "ths");
															}}
														>
															{isPending(pendingStatus, "borrow", t`Borrow`)}
														</Button>
													</>
												) : (
													<>
														<FirstBorrow>
															<Trans>First time borrow</Trans> <b>sTHS</b>?
															<br />
															<Trans>Please approve Themis Dao to use your</Trans> <b>sTHS</b>{" "}
															<Trans>for mortgage</Trans>.
														</FirstBorrow>
														<Button
															className="stake-button"
															variant="contained"
															color="primary"
															disabled={!!pendingStatus.approve}
															onClick={() => {
																debounce(onSeekApproval, 500, "ths");
															}}
														>
															{isPending(pendingStatus, "approve", t`Approve`)}
														</Button>

													</>
													// ) : (
													// <Skeleton width="150px" />
												)
												}
											</Approve>
										</Box>
									</>
								)}
							</div>
							{
								!!Number(quantity) && <USDTAmount>
									<div><Trans>You will get <Quantity>{quantity}</Quantity> <strong> USDT</strong></Trans> </div>
								</USDTAmount>
							}

						</Grid>
					</Paper>
				</React.Fragment>
			</Zoom>

			<Card style={{ backgroundColor: theme === THEME_LIGHT ? "rgba(255, 255, 255, 0.6)" : "rgba(54, 56, 64, 0.4)" }}>
				<Title>Your records</Title>
				<Item>
					<Ol><Trans>amount</Trans></Ol>
					<Option><Trans>time</Trans></Option>
					<Amount><Trans>state</Trans></Amount>
				</Item>
				{borrowList.map((item) => (<Item>
					<Ol style={{ cursor: "pointer" }}>{item.borrowedUsdtAmount}</Ol>
					<Option>UTC {dayjs.unix(Number(item.borrowedTimestamp)).utc().format("YYYY-MM-DD HH:mm")}</Option>
					<ClaimBtn
						className="stake-button borrow-stake-button"
						variant="contained"
						color="primary"
						disabled={!!Number(item.repayedBlock) || pendingStatus.repay}
						key={pendingStatus.repay + ""}
						onClick={() => {

							setCurrentBorrow(item)
							setIsOpen(true)
						}}
					>
						{isPending(hashIdx === item.borrowId ? pendingStatus : { ...pendingStatus, repay: false }, "repay", Number(item?.repayedBlock ?? 0) ? t`Pay offs` : t`Repay`)}
					</ClaimBtn>
				</Item>))}
				<More
					style={((borrowPage * 10) > borrowPageNum) ? ({ display: "none" }) : ({})}
					onClick={() => {
						setBorrowPage(borrowPage + 1)
					}}>view more</More>
			</Card>

		</div>
	);
}

export default Borrow;
