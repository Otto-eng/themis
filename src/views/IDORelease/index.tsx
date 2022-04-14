import { Button, styled } from "@material-ui/core"
import { ethers } from "ethers"
import React, { useCallback, useEffect, useState } from "react"
import { addresses, THEME_LIGHT } from "src/constants"
import { useAppSelector, useWeb3Context } from "src/hooks"
import { abi as PresaleReleaseABI } from "src/abi/PresaleRelease.json";
import { abi as ThemisERC20TokenABI } from "../../abi/ThemisERC20Token.json";
import dayjs from "dayjs"
import utc from 'dayjs/plugin/utc'
import copy from "copy-to-clipboard"
import { useDispatch } from "react-redux"
import { abi as PreThemisERC20ABI } from "src/abi/PreThemisERC20.json";
import { isPending } from "../Claim"
import Skeleton from "@material-ui/lab/Skeleton/Skeleton"
import { ThemisERC20Token } from "src/typechain"
import { idoRelease70List } from "src/slices/idoReleaseSlice"
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
	fontWeight: 400,
	width: "120px"
})

const Value = styled("div")({
	fontSize: "20px",
	paddingTop: "8px",
	fontWeight: 600
})

export default function IDORelease() {
	const { chainID, provider, address } = useWeb3Context()
	const [stakValue, setStakValue] = useState("0.0000")
	const [invterValue, setInvterValue] = useState("0.0000")
	const [SCBanlance, setSCBanlance] = useState("0.0000")
	// const [num, setNum] = useState(true)
	const [num, setNum] = useState(false)

	const [stake, setStake] = useState(true)
	const [invter, setInvter] = useState(true)
	const theme = useAppSelector(state => state.theme.theme)
	const dispatch = useDispatch();

	const [pendingStatus, setPeddingStatus] = useState({
		ScFarmForStaker: false,
		ScFarmForInvter: false
	})

	const [idoRelease70DetailsPage, setIdoRelease70DetailsPage] = useState(1)

	const ido30List = useAppSelector(state => state.ido.ido30List)
	const ido70List = useAppSelector(state => state.ido.ido70List)

	const getThsBanlance = useCallback(async () => {
		if (address && chainID && provider && addresses && num && addresses[chainID]?.THS_ADDRESS) {
			try {
				const signer = provider.getSigner();
				const thsContract = new ethers.Contract(addresses[chainID].THS_ADDRESS as string, ThemisERC20TokenABI, signer) as ThemisERC20Token;
				const balanceBigNumber = await thsContract.balanceOf(address)
				setSCBanlance((Math.floor((Number(ethers.utils.formatUnits(balanceBigNumber, "gwei")) ?? 0) * 10000) / 10000).toFixed(4) + "");
			} finally {
				setTimeout(() => {
					setNum(false)
				}, 1000);
			}
		}

	}, [chainID, address, provider, num])


	const getStakeList = useCallback(async () => {
		if (address && chainID && provider && !!stake && addresses[chainID]?.IDO_PRESALERELEASE_ADDRESS) {
			try {
				const signer = provider.getSigner();
				const PresaleReleaseContract = new ethers.Contract(addresses[chainID].IDO_PRESALERELEASE_ADDRESS, PresaleReleaseABI, signer)
				console.log("PresaleReleaseContract", PresaleReleaseContract)
				const PresaleRelease30 = await PresaleReleaseContract.getpendingPart1(address)
				console.log("PresaleRelease30", PresaleRelease30)
				setStakValue((Math.floor(Number(ethers.utils.formatUnits(PresaleRelease30, "gwei")) * 10000) / 10000) + "")
			} finally {
				setTimeout(() => {
					setStake(false)
				}, 1000);
			}
		}

	}, [chainID, address, provider, stake])

	const getInvterList = useCallback(async () => {
		if (address && chainID && addresses[chainID]?.IDO_PRESALERELEASE_ADDRESS && provider && !!invter) {
			try {
				const signer = provider.getSigner();
				const PresaleReleaseContract = new ethers.Contract(addresses[chainID].IDO_PRESALERELEASE_ADDRESS, PresaleReleaseABI, signer)
				const PresaleRelease70 = await PresaleReleaseContract.getpendingPart2(address)
				setInvterValue((Math.floor(Number(ethers.utils.formatUnits(PresaleRelease70, "gwei")) * 10000) / 10000) + "")
			} finally {
				setTimeout(() => {
					setInvter(false)
				}, 1000);
			}
		}

	}, [chainID, address, provider, invter])

	useEffect(() => {
		// getStakeList()
	}, [chainID, address, provider, num, stake])

	useEffect(() => {
		// getInvterList()
	}, [chainID, address, provider, num, invter])

	useEffect(() => {
		// getThsBanlance()
	}, [chainID, address, provider, num])


	useEffect(() => {
		dispatch(idoRelease70List({ first: idoRelease70DetailsPage * 10, address }))
	}, [idoRelease70DetailsPage])

	return (
		<Main>
			<Container >
				<Top style={{ backgroundColor: theme === THEME_LIGHT ? "#FAFAFA" : "#18253A" }}>
					<Title >THS Amount</Title>
					<Blance>{num ? <Skeleton width="80px" /> : SCBanlance}</Blance>
				</Top>
				<CardTitle>IDO Release 35%</CardTitle>
				<Card style={{ backgroundColor: theme === THEME_LIGHT ? "#FAFAFA" : "#18253A", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
					<Left ><div>THS Unclaimed</div> <Value>{stakValue === "0" ? "0.0000" : stakValue}</Value></Left>
					<Claim
						className="stake-button sc-stake-button"
						variant="contained"
						color="primary"
						key={pendingStatus.ScFarmForStaker + ""}
						disabled={!Number(stakValue) || pendingStatus.ScFarmForStaker}
						onClick={async () => {
							if (pendingStatus.ScFarmForStaker) return;
							setPeddingStatus({
								...pendingStatus,
								ScFarmForStaker: true
							})
							const signer = provider.getSigner();
							try {
								const PresaleReleaseContract = new ethers.Contract(addresses[chainID].IDO_PRESALERELEASE_ADDRESS, PresaleReleaseABI, signer);
								const preThsContract = new ethers.Contract(addresses[chainID].PRETHS_ADDRESS as string, PreThemisERC20ABI, signer);
								await preThsContract.approve(addresses[chainID].IDO_PRESALERELEASE_ADDRESS, ethers.utils.parseUnits("1000", "gwei").toString());
								const infoHash = await PresaleReleaseContract.claimPart1()
								await infoHash.wait()
								if ("hash" in infoHash) {
									const info = await PresaleReleaseContract.provider.getTransactionReceipt(infoHash.hash)
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
				<Card style={{ backgroundColor: theme === THEME_LIGHT ? "#FAFAFA" : "#18253A" }}>
					<Item>
						<Ol>hash</Ol>
						<Option>time</Option>
						<Amount>THS amount</Amount>
					</Item>
					{ido30List.map((item) => <React.Fragment>
						<Item>
							<Ol onClick={() => {
								copy(item.id)
							}} style={{ cursor: "pointer" }}>{item.id.slice(0, 4)}...{item.id.slice(item.id.length - 4)}</Ol>
							<Option>UTC {dayjs.unix(Number(item.timestamp)).utc().format("YYYY-MM-DD HH:mm")}</Option>
							<Amount>{(Math.floor(Number(Number(item.amount)) * 10000) / 10000).toFixed(4)}</Amount>
						</Item>
					</React.Fragment>)}
				</Card>
				<CardTitle >IDO Release 65%</CardTitle>
				<Card style={{ backgroundColor: theme === THEME_LIGHT ? "#FAFAFA" : "#18253A", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
					<Left ><div>THS Unclaimed </div><Value>{invterValue === "0" ? "0.0000" : invterValue}</Value></Left>
					<Claim
						className="stake-button sc-stake-button"
						variant="contained"
						color="primary"
						key={pendingStatus.ScFarmForInvter + ""}
						disabled={!Number(invterValue) || pendingStatus.ScFarmForInvter}
						onClick={async () => {
							if (pendingStatus.ScFarmForInvter) return;

							setPeddingStatus({
								...pendingStatus,
								ScFarmForInvter: true
							})
							const signer = provider.getSigner();

							try {
								const PresaleReleaseContract = new ethers.Contract(addresses[chainID].IDO_PRESALERELEASE_ADDRESS, PresaleReleaseABI, signer);
								const preThsContract = new ethers.Contract(addresses[chainID].PRETHS_ADDRESS as string, PreThemisERC20ABI, signer);
								await preThsContract.approve(addresses[chainID].IDO_PRESALERELEASE_ADDRESS, ethers.utils.parseUnits("1000", "gwei").toString());
								const infoHash = await PresaleReleaseContract.claimPart2()
								await infoHash.wait()
								if ("hash" in infoHash) {
									const info = await PresaleReleaseContract.provider.getTransactionReceipt(infoHash.hash)
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
				<Card style={{ backgroundColor: theme === THEME_LIGHT ? "#FAFAFA" : "#18253A" }}>
					<Item>
						<Ol>hash</Ol>
						<Option>time</Option>
						<Amount>THS amount</Amount>
					</Item>
					{ido70List.map((item, _idx) => (<Item>
						<Ol onClick={() => {
							copy(item.id)
						}} style={{ cursor: "pointer" }}>{item.id.slice(0, 4)}...{item.id.slice(item.id.length - 4)}</Ol>
						<Option>UTC {dayjs.unix(Number(item.timestamp)).utc().format("YYYY-MM-DD HH:mm")}</Option>
						<Amount>{(Math.floor(Number(Number(item.amount)) * Math.pow(10, 8)) / Math.pow(10, 8)).toFixed(8)}</Amount>
					</Item>))}
					<More
						style={((idoRelease70DetailsPage * 10) > ido70List.length) ? ({ display: "none" }) : ({})}
						onClick={() => {
							setIdoRelease70DetailsPage(idoRelease70DetailsPage + 1)
						}}>view more</More>
				</Card>
			</Container>
		</Main>
	)
}
