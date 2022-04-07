import { Button, styled, Zoom } from "@material-ui/core"
import { ethers } from "ethers"
import React, { useCallback, useEffect, useState } from "react"
import { addresses, THEME_LIGHT } from "src/constants"
import { useAppSelector, useWeb3Context } from "src/hooks"
import { abi as ScFarmForStakerABI } from "src/abi/ScFarmForStaker.json";
import { abi as ScFarmForInvterABI } from "src/abi/ScFarmForInvter.json";
import { abi as ScaleCodeABI } from "src/abi/ScaleCode.json";
import dayjs from "dayjs"
import utc from 'dayjs/plugin/utc'
import copy from "copy-to-clipboard"
import { useDispatch } from "react-redux"
import { scInviterEarningsDetailsList, scStakeEarningsDetailsList } from "src/slices/scSlice"
import { isPending } from "../Claim"
import Skeleton from "@material-ui/lab/Skeleton/Skeleton"
dayjs.extend(utc)
const GridFlex = styled("div")({
	width: "100%",
	display: "flex",
	justifyContent: 'center',
	alignItems: 'center',
	fontSize: '20px',
	textAlign: 'center'
})



const Main = styled("div")({
	width: "100%",
	position: "relative",
	backgroundColor: "transparent"
})

const Container = styled("div")({
	width: "100%",
	padding: "24px",
	borderRadius: "24px"
})

const Top = styled(GridFlex)({
	padding: "16px",
	borderRadius: '10px',
	justifyContent: "space-around",
	textAlign: "left"
})

const Title = styled("div")({
	fontSize: "14px",
	fontWeight: 500
})

const Blance = styled("div")({
	fontSize: '20px'
})

const CardTitle = styled(GridFlex)({
	fontSize: "20px",
	marginTop: "24px",
	justifyContent: "start",
	fontWeight: 500
})

const Card = styled("div")({
	padding: "16px",
	borderRadius: '10px',
	marginTop: "16px",
})

const Item = styled(GridFlex)({
	padding: "8px 0",
	borderBottom: "1px solid rgba(127, 127, 127, 0.12)"
})

const More = styled(GridFlex)({
	margin: "16px 0",
	fontSize: "14px",
	cursor: "pointer"
})

const Option = styled(GridFlex)({
	flex: 1,
	width: "100px",
	fontSize: "12px",
	padding: "8px 0"
})

const Amount = styled("div")({
	fontSize: "12px",
	textAlign: "right",
	padding: "8px 0",
	width: "70px"
})

const Ol = styled("div")({
	width: "70px",
	fontSize: "12px",
	textAlign: "left",
	padding: "8px 0",
})

const Left = styled("div")({
	fontSize: "16px",
	textAlign: "left",
	padding: "8px 0",
	fontWeight: 500

})

const Claim = styled(Button)({
	color: "#000000",
	height: "40px",
	background: "#F8CC82",
	borderRadius: "8px",
	cursor: "pointer",
	fontSize: "16px",
	fontWeight: 400,
	width: "120px"
})

const Value = styled("div")({
	fontSize: "20px",
	paddingTop: "8px",
	fontWeight: 600
})

export default function Sc() {
	const { chainID, provider, address } = useWeb3Context()
	const [stakValue, setStakValue] = useState("0.0000")
	const [invterValue, setInvterValue] = useState("0.0000")
	const [SCBanlance, setSCBanlance] = useState("0.0000")
	const [num, setNum] = useState(true)
	const [stake, setStake] = useState(true)
	const [invter, setInvter] = useState(true)
	const theme = useAppSelector(state => state.theme.theme)
	const dispatch = useDispatch();

	const [pendingStatus, setPeddingStatus] = useState({
		ScFarmForStaker: false,
		ScFarmForInvter: false
	})

	const [scStakeEarningsDetailsListPage, setScStakeEarningsDetailsListPage] = useState(1)
	const [scScInviterEarningsDetailsListPage, setScInviterEarningsDetailsListPage] = useState(1)

	const scStakeEarningsList = useAppSelector(state => state.sc.scStakeEarningsList)
	const scInviterEarningsList = useAppSelector(state => state.sc.scInviterEarningsList)

	const getScbanlance = useCallback(async () => {
		if (address && chainID && provider && addresses && num) {
			try {
				const signer = provider.getSigner();
				const ScaleCodeContract = new ethers.Contract(addresses[chainID].ScaleCode_ADDRESS, ScaleCodeABI, signer)
					const banlance = await ScaleCodeContract.balanceOf(address)
				setSCBanlance((Math.floor((Number(ethers.utils.formatUnits(banlance, "ether")) ?? 0) * 10000) / 10000) + "");
			} finally {
				setTimeout(() => {
					setNum(false)
				}, 1000);
			}
		}

	}, [chainID, address, provider, num])


	const getStakeList = useCallback(async () => {
		if (address && chainID && provider && !!stake) {
			try {
				const signer = provider.getSigner();
				const ScFarmForStakerContract = new ethers.Contract(addresses[chainID].ScFarmForStaker_ADDRESS, ScFarmForStakerABI, signer)
				const ScFarmForStakerpendingRewardValue = await ScFarmForStakerContract.pendingReward(address)
				setStakValue((Math.floor(Number(ethers.utils.formatUnits(ScFarmForStakerpendingRewardValue, "ether")) * 10000) / 10000) + "")
			} finally {
				setTimeout(() => {
					setStake(false)
				}, 1000);
			}
		}

	}, [chainID, address, provider, stake])

	const getInvterList = useCallback(async () => {
		if (address && chainID && provider && !!invter) {
			try {
			const signer = provider.getSigner();
				const ScFarmForInvterContract = new ethers.Contract(addresses[chainID].ScFarmForInvter_ADDRESS, ScFarmForInvterABI, signer)
			const ScFarmForInvterpendingRewardValue = await ScFarmForInvterContract.pendingReward(address)
			setInvterValue((Math.floor(Number(ethers.utils.formatUnits(ScFarmForInvterpendingRewardValue, "ether")) * 10000) / 10000) + "")
			} finally {
				setTimeout(() => {
					setInvter(false)
				}, 1000);
			}
		}

	}, [chainID, address, provider, invter])

	useEffect(() => {
		getStakeList()
	}, [chainID, address, provider, num, stake])

	useEffect(() => {
		getInvterList()
	}, [chainID, address, provider, num, invter])

	useEffect(() => {
		getScbanlance()
	}, [chainID, address, provider, num])


	useEffect(() => {
		dispatch(scInviterEarningsDetailsList({ first: scScInviterEarningsDetailsListPage * 10, address }))
	}, [scScInviterEarningsDetailsListPage])

	useEffect(() => {
		dispatch(scStakeEarningsDetailsList({ first: scStakeEarningsDetailsListPage * 10, address }))
	}, [scStakeEarningsDetailsListPage])

	return (
		<Main>
			<Container >
				<Top style={{ backgroundColor: theme === THEME_LIGHT ? "#FAFAFAEF" : "#18253A" }}>
						<Title >SC Amount</Title>
						<Blance>{num ? <Skeleton width="80px" /> : SCBanlance}</Blance>
					</Top>
				<CardTitle>Staking Earnings</CardTitle>
					<Card style={{ backgroundColor: theme === THEME_LIGHT ? "#FAFAFAEF" : "#18253A", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
					<Left ><div>SC Unclaimed</div> <Value>{stakValue === "0" ? "0.0000" : stakValue}</Value></Left>
						<Claim
						className="stake-button sc-stake-button"
							variant="contained"
							color="primary"
							disabled={!Number(stakValue)}
							onClick={async () => {
								setPeddingStatus({
									...pendingStatus,
									ScFarmForStaker: true
								})
								const signer = provider.getSigner();
								try {
									const ScFarmForStakerContract = new ethers.Contract(addresses[chainID].ScFarmForStaker_ADDRESS, ScFarmForStakerABI, signer)
									const infoHash = await ScFarmForStakerContract.claim()
									await infoHash.wait()
									if ("hash" in infoHash) {
										const info = await ScFarmForStakerContract.provider.getTransactionReceipt(infoHash.hash)
									}
								
									setTimeout(() => {
										setPeddingStatus({
											...pendingStatus,
											ScFarmForStaker: false
										})
									}, 500);
									setTimeout(() => {
										setNum(true)
										setStake(true)
									}, 1000);
								} catch (error) {
									setTimeout(() => {
										setPeddingStatus({
											...pendingStatus,
											ScFarmForStaker: false
										})
									}, 500);
								}
							}}>
							{isPending(pendingStatus, "ScFarmForStaker", "Claim")}
						</Claim>
					</Card>
					<Card style={{ backgroundColor: theme === THEME_LIGHT ? "#FAFAFAEF" : "#18253A" }}>
						<Item>
							<Ol>hash</Ol>
							<Option>time</Option>
							<Amount>SC amount</Amount>
						</Item>
						{scStakeEarningsList.map((item) => <React.Fragment>
							<Item>
								<Ol onClick={() => {
									copy(item.id)
								}} style={{ cursor: "pointer" }}>{item.id.slice(0, 4)}...{item.id.slice(item.id.length - 4)}</Ol>
								<Option>UTC {dayjs.unix(Number(item.timestamp)).utc().format("YYYY-MM-DD HH:mm")}</Option>
								<Amount>{(Math.floor(Number(Number(item.amount) / Math.pow(10, 9)) * 10000) / 10000).toFixed(4)}</Amount>
							</Item>
						</React.Fragment>)}
						<More
							style={((scStakeEarningsDetailsListPage * 10) > scStakeEarningsList.length) ? ({ display: "none" }) : ({})}
							onClick={() => {
							setScStakeEarningsDetailsListPage(scStakeEarningsDetailsListPage + 1)
						}}>view more</More>
					</Card>
				<CardTitle >Invite Earnings</CardTitle>
					<Card style={{ backgroundColor: theme === THEME_LIGHT ? "#FAFAFAEF" : "#18253A", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
					<Left ><div>SC Unclaimed </div><Value>{invterValue === "0" ? "0.0000" : invterValue}</Value></Left>
						<Claim
						className="stake-button sc-stake-button"
							variant="contained"
							color="primary"
							disabled={!Number(invterValue) || pendingStatus.ScFarmForInvter}
							onClick={async () => {
								setPeddingStatus({
									...pendingStatus,
									ScFarmForInvter: true
								})
								const signer = provider.getSigner();
							
								try {
									const ScFarmForInvterContract = new ethers.Contract(addresses[chainID].ScFarmForInvter_ADDRESS, ScFarmForInvterABI, signer);
									const infoHash = await ScFarmForInvterContract.claim()
									await infoHash.wait()
									if ("hash" in infoHash) {
										const info = await ScFarmForInvterContract.provider.getTransactionReceipt(infoHash.hash)
									}
									setTimeout(() => {
										setPeddingStatus({
											...pendingStatus,
											ScFarmForInvter: false
										})
									}, 500);
									setTimeout(() => {
										setNum(true)
										setInvter(true)
									}, 1000);
								} catch (error) {
									setTimeout(() => {
										setPeddingStatus({
											...pendingStatus,
											ScFarmForInvter: false
										})
									}, 500);
								}
							}}>{isPending(pendingStatus, "ScFarmForInvter", "Claim")}</Claim>
					</Card>
					<Card style={{ backgroundColor: theme === THEME_LIGHT ? "#FAFAFAEF" : "#18253A" }}>
						<Item>
							<Ol>hash</Ol>
							<Option>time</Option>
							<Amount>SC amount</Amount>
						</Item>
						{scInviterEarningsList.map((item, _idx) => (<Item>
							<Ol onClick={() => {
								copy(item.id)
							}} style={{ cursor: "pointer" }}>{item.id.slice(0, 4)}...{item.id.slice(item.id.length - 4)}</Ol>
							<Option>UTC {dayjs.unix(Number(item.timestamp)).utc().format("YYYY-MM-DD HH:mm")}</Option>
							<Amount>{(Math.floor(Number(Number(item.amount) / Math.pow(10, 9)) * 10000) / 10000).toFixed(4)}</Amount>
						</Item>))}
						<More
							style={((scScInviterEarningsDetailsListPage * 10) > scInviterEarningsList.length) ? ({ display: "none" }) : ({})}
							onClick={() => {
								setScInviterEarningsDetailsListPage(scScInviterEarningsDetailsListPage + 1)
							}}>view more</More>
					</Card>
			</Container>
		</Main>
	)
}
