import { Button, styled } from "@material-ui/core"
import { ethers } from "ethers"
import React, { useCallback, useEffect, useState } from "react"
import { addresses, THEME_LIGHT } from "src/constants"
import { useAppSelector, useWeb3Context } from "src/hooks"
import { abi as THSFarmForStakerABI } from "src/abi/ThsFarmForInvter.json";
import { abi as ThemisERC20TokenABI } from "../../abi/ThemisERC20Token.json";
import dayjs from "dayjs"
import utc from 'dayjs/plugin/utc'
import copy from "copy-to-clipboard"
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
	fontWeight: 400,
	width: "120px"
})

const Value = styled("div")({
	fontSize: "20px",
	paddingTop: "8px",
	fontWeight: 600
})

export default function DaoProfit() {
	const { chainID, provider, address } = useWeb3Context()
	const theme = useAppSelector(state => state.theme.theme)
	const [thsBalance, setThsBalance] = useState("0.0000")
	const [flag, setFlag] = useState(true)
	const scStakeEarningsList = useAppSelector(state => state.sc.scStakeEarningsList)
	const [invter, setInvter] = useState(true)

	const [pendingStatus, setPeddingStatus] = useState({
		banlance: false
	})
	const [stakValue, setStakValue] = useState("0.0000")
	const [scStakeEarningsDetailsListPage, setScStakeEarningsDetailsListPage] = useState(1)

	const getBalance = useCallback(async () => {
		if (address && chainID && provider && addresses[chainID]?.THS_ADDRESS) {
			if (pendingStatus.banlance) return;

			setPeddingStatus({
				banlance: true
			})
			try {
				const signer = provider.getSigner();

				const thsContract = new ethers.Contract(addresses[chainID]?.THS_ADDRESS as string, ThemisERC20TokenABI, signer);
				const balanceBigNumber = await thsContract.balanceOf(address)
				const balance = ethers.utils.formatUnits(balanceBigNumber.toString(), "gwei")
				setThsBalance(((Math.floor(Number(balance) * 10000)) / 10000) + "")
				setFlag(false)
			} catch (error) {
				setFlag(false)
			}

			setTimeout(() => {
				setPeddingStatus({
					banlance: false
				})
			}, 500);

		}
	}, [chainID, address, provider, flag, pendingStatus])

	const getStakeList = useCallback(async () => {
		if (address && chainID && provider && !!invter) {
			try {
				const signer = provider.getSigner();
				const THSFarmForInvterContract = new ethers.Contract(addresses[chainID].ScFarmForStaker_ADDRESS, THSFarmForStakerABI, signer)
				const THSFarmForInvterpendingRewardValue = await THSFarmForInvterContract.pendingReward(address)
				setStakValue((Math.floor(Number(ethers.utils.formatUnits(THSFarmForInvterpendingRewardValue, "gwei")) * 10000) / 10000) + "")
			} finally {
				setTimeout(() => {
					setInvter(false)
				}, 1000);
			}
		}

	}, [chainID, address, provider, invter])

	useEffect(() => {
		getStakeList()
	}, [chainID, address, provider, flag, invter])

	useEffect(() => {
		getBalance();
	}, [chainID, address, provider, flag])

	return (
		<Main>
			<Container >
				<Top style={{ backgroundColor: theme === THEME_LIGHT ? "#FAFAFA" : "#18253A" }}>
					<Title >THS Amount</Title>
					<Blance>{flag ? <Skeleton width="80px" /> : Number(thsBalance).toFixed(4)}</Blance>
				</Top>
				<CardTitle>Invite Earnings</CardTitle>
				<Card style={{ backgroundColor: theme === THEME_LIGHT ? "#FAFAFA" : "#18253A", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
					<Left ><div>THS Unclaimed</div> <Value>{stakValue === "0" ? "0.0000" : stakValue}</Value></Left>
					<Claim
						className="invter-button sc-invter-button"
						variant="contained"
						color="primary"
						key={pendingStatus.banlance + ""}
						disabled={!Number(stakValue) || pendingStatus.banlance}
						onClick={async () => {
							if (pendingStatus.banlance) return;
							setPeddingStatus({
								banlance: true
							})
							const signer = provider.getSigner();
							try {
								const ScFarmForStakerContract = new ethers.Contract(addresses[chainID].ScFarmForStaker_ADDRESS, THSFarmForStakerABI, signer)
								const infoHash = await ScFarmForStakerContract.claim()
								await infoHash.wait()
								if ("hash" in infoHash) {
									const info = await ScFarmForStakerContract.provider.getTransactionReceipt(infoHash.hash)
								}
								setTimeout(() => {
									setPeddingStatus({
										banlance: false
									})
								}, 500);
								setTimeout(() => {
									setFlag(true)
								}, 1000);
							} catch (error) {
								setTimeout(() => {
									setPeddingStatus({
										banlance: false
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
			</Container>
		</Main>
	)
}
