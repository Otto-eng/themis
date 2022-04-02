import { Button, styled } from "@material-ui/core"
import { BigNumber, ethers } from "ethers"
import React, { useCallback, useEffect, useState } from "react"
import { addresses, THEME_LIGHT } from "src/constants"
import { useAppSelector, useWeb3Context } from "src/hooks"
import { abi as ScFarmForStakerABI } from "src/abi/ScFarmForStaker.json";
import { abi as ScFarmForInvterABI } from "src/abi/ScFarmForInvter.json";
import { abi as IERC20ABI } from "src/abi/IERC20.json";
import dayjs from "dayjs"
import utc from 'dayjs/plugin/utc'
import copy from "copy-to-clipboard"
import { useDispatch } from "react-redux"
import { scInviterEarningsDetailsList, scStakeEarningsDetailsList } from "src/slices/scSlice"
dayjs.extend(utc)
const GridFlex = styled('div')({
	width: "100%",
	display: "flex",
	justifyContent: 'center',
	alignItems: 'center',
	fontSize: '20px',
	textAlign: 'center'
})



const Main = styled(GridFlex)({
	width: "100%",
	position: "relative",
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
	color: "#4E566C",
	fontSize: "14px",
	cursor: "pointer"
})

const Option = styled(GridFlex)({
	flex: 1,
	width: "100px",
	fontSize: "12px",
	color: "#4E566C",
	padding: "8px 0"
})

const Amount = styled("div")({
	fontSize: "12px",
	color: "#4E566C",
	textAlign: "right",
	padding: "8px 0",
	width: "70px"
})

const Ol = styled("div")({
	width: "70px",
	fontSize: "12px",
	color: "#4E566C",
	textAlign: "left",
	padding: "8px 0",
})

const Left = styled("div")({
	fontSize: "16px",
	color: "#4E566C",
	textAlign: "left",
	padding: "8px 0",
	fontWeight: 500

})

const Claim = styled(Button)({
	color: "#000000",
	padding: "16px 32px",
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	background: "#F8CC82",
	borderRadius: "8px",
	cursor: "pointer",
	fontSize: "16px",
	fontWeight: 400
})

const Value = styled("div")({
	fontSize: "20px",
	paddingTop: "8px",
	fontWeight: 600,
	color: "#555555",

})

export default function Sc() {
	const { chainID, provider, address } = useWeb3Context()
	const [stakValue, setStakValue] = useState("0.0000")
	const [invterValue, setInvterValue] = useState("0.0000")
	const [SCBanlance, setSCBanlance] = useState("0.0000")
	const [num, setNum] = useState(0)
	const theme = useAppSelector(state => state.theme.theme)
	const dispatch = useDispatch();

	const [scStakeEarningsDetailsListPage, setScStakeEarningsDetailsListPage] = useState(1)
	const [scScInviterEarningsDetailsListPage, setScInviterEarningsDetailsListPage] = useState(1)

	const scStakeEarningsList = useAppSelector(state => state.sc.scStakeEarningsList)
	const scInviterEarningsList = useAppSelector(state => state.sc.scInviterEarningsList)

	const getScbanlance = useCallback(async () => {
		if (!!address && !!chainID && !!provider && !!addresses[chainID].ScaleCode_ADDRESS) {
			const ScaleCodeContract = new ethers.Contract(addresses[chainID].ScaleCode_ADDRESS, IERC20ABI, provider)
			const banlance = await ScaleCodeContract.balanceOf(address)
			setSCBanlance((Math.floor((Number(ethers.utils.formatUnits(banlance, "ether")) ?? 0) * 10000) / 10000) + "")
		}

	}, [chainID, address, provider, num])


	const getList = useCallback(async () => {
		if (!!address && !!chainID && !!provider) {
			const ScFarmForStakerContract = new ethers.Contract(addresses[chainID].ScFarmForStaker_ADDRESS, ScFarmForStakerABI, provider)
			const ScFarmForInvterContract = new ethers.Contract(addresses[chainID].ScFarmForInvter_ADDRESS, ScFarmForInvterABI, provider)

			console.log("ScFarmForStakerContract", ScFarmForStakerContract)

			const ScFarmForStakerpendingRewardValue = await ScFarmForStakerContract.pendingReward(address)

			console.log("ScFarmForStakerpendingRewardValue", ethers.utils.formatUnits(ScFarmForStakerpendingRewardValue, "ether"));
			setStakValue((Math.floor(Number(ethers.utils.formatUnits(ScFarmForStakerpendingRewardValue, "ether")) * 10000) / 10000) + "")

			const ScFarmForInvterpendingRewardValue = await ScFarmForInvterContract.pendingReward(address)
			console.log("ScFarmForInvterpendingRewardValue", ethers.utils.formatUnits(ScFarmForInvterpendingRewardValue, "ether"));
			setInvterValue((Math.floor(Number(ethers.utils.formatUnits(ScFarmForInvterpendingRewardValue, "ether")) * 10000) / 10000) + "")
		}

	}, [chainID, address, provider])

	useEffect(() => {
		getList()
		getScbanlance()
	}, [chainID, address, provider])


	useEffect(() => {
		dispatch(scInviterEarningsDetailsList({ first: BigNumber.from(scScInviterEarningsDetailsListPage * 10 + ""), address, chainID, provider }))
	}, [scScInviterEarningsDetailsListPage])

	useEffect(() => {
		dispatch(scStakeEarningsDetailsList({ first: scStakeEarningsDetailsListPage * 10, address }))
	}, [scStakeEarningsDetailsListPage])

	return (
		<Main>
			<Container style={{ backgroundColor: theme === THEME_LIGHT ? "rgba(255, 255, 255, 0.6)" : "#010101" }}>
				<Top style={{ backgroundColor: theme === THEME_LIGHT ? "#FAFAFAEF" : "#18253A", color: theme === THEME_LIGHT ? "#010101" : "#768299" }}>
					<Title >SC Amount</Title>
					<Blance>{SCBanlance}</Blance>
				</Top>
				<CardTitle style={{ color: theme === THEME_LIGHT ? "#010101" : "#768299" }}>Staking Earnings</CardTitle>
				<Card style={{ backgroundColor: theme === THEME_LIGHT ? "#FAFAFAEF" : "#18253A", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
					<Left style={{ color: theme === THEME_LIGHT ? "#010101" : "#768299" }}><div>SC Unclaimed</div> <Value>{stakValue}</Value></Left>
					<Claim
						variant="contained"
						color="primary"
						disabled={!Number(stakValue)}
						onClick={async () => {
							const signer = provider.getSigner();
							const ScFarmForStakerContract = new ethers.Contract(addresses[chainID].ScFarmForStaker_ADDRESS, ScFarmForStakerABI, signer)
							await ScFarmForStakerContract.claim()
							setNum(num + 1)
						}}>
						Claim
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
							}} style={{ cursor: "pointer" }}>{item.id.slice(0, 7)}...{item.id.slice(item.id.length - 7)}</Ol>
							<Option>UTC {dayjs.unix(Number(item.timestamp)).utc().format("YYYY-MM-DD HH:mm")}</Option>
							<Amount>{(Math.floor(Number(Number(item.amount) / Math.pow(10, 9)) * 10000) / 10000).toFixed(4)}</Amount>
						</Item>
					</React.Fragment>)}
					<More style={((scStakeEarningsDetailsListPage * 10) > scStakeEarningsList.length) ? ({ display: "none" }) : ({})} onClick={() => {
						setScStakeEarningsDetailsListPage(scStakeEarningsDetailsListPage + 1)
					}}>view more</More>
				</Card>
				<CardTitle style={{ color: theme === THEME_LIGHT ? "#010101" : "#768299" }}>Invite Earnings</CardTitle>
				<Card style={{ backgroundColor: theme === THEME_LIGHT ? "#FAFAFAEF" : "#18253A", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
					<Left style={{ color: theme === THEME_LIGHT ? "#010101" : "#768299" }}><div>SC Unclaimed </div><Value>{invterValue}</Value></Left>
					<Claim
						variant="contained"
						color="primary"
						disabled={!Number(invterValue)}
						onClick={async () => {
							const ScFarmForInvterContract = new ethers.Contract(addresses[chainID].ScFarmForInvter_ADDRESS, ScFarmForInvterABI, provider)
							await ScFarmForInvterContract.claim()
							setNum(num + 1)
						}}>
						Claim</Claim>
				</Card>
				<Card style={{ backgroundColor: theme === THEME_LIGHT ? "#FAFAFAEF" : "#18253A" }}>
					<Item>
						<Ol>hash</Ol>
						{/* <Option>time</Option> */}
						<Option>invitation</Option>
						{/* <Amount>SC amount</Amount> */}
					</Item>
					{scInviterEarningsList.map((item, _idx) => <Item>
						<Ol>{_idx + 1}</Ol>
						{/* <Option>{+new Date()}</Option> */}
						<Option>{item.registrant}</Option>
						{/* <Amount>13231.23123</Amount> */}
					</Item>)}
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
