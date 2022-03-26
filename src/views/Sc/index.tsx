import { Button, styled } from "@material-ui/core"
import { ethers } from "ethers"
import { useCallback, useEffect, useState } from "react"
import { addresses, THEME_LIGHT } from "src/constants"
import { useAppSelector, useWeb3Context } from "src/hooks"
import { abi as ScFarmForStakerABI } from "src/abi/ScFarmForStaker.json";
import { abi as ScFarmForInvterABI } from "src/abi/ScFarmForInvter.json";

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
	fontSize: "14px"
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
	padding: "8px 0"
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
	background: "#F8CC82",
	borderRadius: "8px",
	cursor: "pointer",
	fontSize: "16px",
	fontWeight: 700
})

export default function Sc() {
	const { chainID, provider, address } = useWeb3Context()
	const [stakValue, setStakValue] = useState(0)
	const [invterValue, setInvterValue] = useState(0)
	const theme = useAppSelector(state => state.theme.theme)


	const getList = useCallback(async () => {
		if (!!address && !!chainID && !!provider) {
			const ScFarmForStakerContract = new ethers.Contract(addresses[chainID].ScFarmForStaker_ADDRESS, ScFarmForStakerABI, provider)
			const ScFarmForInvterContract = new ethers.Contract(addresses[chainID].ScFarmForInvter_ADDRESS, ScFarmForInvterABI, provider)


			const ScFarmForStakerpendingRewardValue = await ScFarmForStakerContract.pendingReward(address)
			const stakedInfoOfList = await ScFarmForStakerContract.stakedInfoOf(address)

			setStakValue(ScFarmForStakerpendingRewardValue.sub(stakedInfoOfList.earnedTotal).toNumber())

			const ScFarmForInvterpendingRewardValue = await ScFarmForInvterContract.pendingReward(address)
			const ScFarmForInvterstakedInfoOfList = await ScFarmForInvterContract.stakedInfoOf(address)

			setInvterValue(ScFarmForInvterpendingRewardValue.sub(ScFarmForInvterstakedInfoOfList.earnedTotal).toNumber())

		}

	}, [chainID, address, provider])

	useEffect(() => {
		getList()
	}, [chainID, address, provider])



	return (
		<Main>
			<Container style={{ backgroundColor: theme === THEME_LIGHT ? "rgba(255, 255, 255, 0.6)" : "#010101" }}>
				<Top style={{ backgroundColor: theme === THEME_LIGHT ? "#FAFAFAEF" : "#18253A", color: theme === THEME_LIGHT ? "#010101" : "#768299" }}>
					<Title >SC Amount</Title>
					<Blance>0.00</Blance>
				</Top>
				<CardTitle style={{ color: theme === THEME_LIGHT ? "#010101" : "#768299" }}>Staking Earnings</CardTitle>
				<Card style={{ backgroundColor: theme === THEME_LIGHT ? "#FAFAFAEF" : "#18253A", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
					<Left style={{ color: theme === THEME_LIGHT ? "#010101" : "#768299" }}>SC Unclaimed {stakValue}</Left>
					<Claim
						variant="contained"
						color="primary"
						disabled={!stakValue}
						onClick={() => {
							const ScFarmForStakerContract = new ethers.Contract(addresses[chainID].ScFarmForStaker_ADDRESS, ScFarmForStakerABI, provider)
							ScFarmForStakerContract.claim()
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
					{/* <Item>
						<Ol>1</Ol>
						<Option>{+new Date()}</Option>
						<Amount>13231.23123</Amount>
					</Item>
					<Item>
						<Ol>2</Ol>
						<Option>{+new Date()}</Option>
						<Amount>12.323</Amount>
					</Item>
					<Item>
						<Ol>3</Ol>
						<Option>{+new Date()}</Option>
						<Amount>123456.78</Amount>
					</Item> */}
					<More>view more</More>
				</Card>
				<CardTitle style={{ color: theme === THEME_LIGHT ? "#010101" : "#768299" }}>Invite Earnings</CardTitle>
				<Card style={{ backgroundColor: theme === THEME_LIGHT ? "#FAFAFAEF" : "#18253A", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
					<Left style={{ color: theme === THEME_LIGHT ? "#010101" : "#768299" }}>SC Unclaimed {invterValue}</Left>
					<Claim
						variant="contained"
						color="primary"
						disabled={!invterValue}
						onClick={async () => {
							const ScFarmForInvterContract = new ethers.Contract(addresses[chainID].ScFarmForInvter_ADDRESS, ScFarmForInvterABI, provider)
							await ScFarmForInvterContract.claim()
						}}>
						Claim</Claim>
				</Card>
				<Card style={{ backgroundColor: theme === THEME_LIGHT ? "#FAFAFAEF" : "#18253A" }}>
					<Item>
						<Ol>hash</Ol>
						<Option>time</Option>
						<Option>invitation</Option>
						<Amount>SC amount</Amount>
					</Item>
					{/* <Item>
						<Ol>1</Ol>
						<Option>{+new Date()}</Option>
						<Option>13231.23123</Option>
						<Amount>13231.23123</Amount>
					</Item>
					<Item>
						<Ol>2</Ol>
						<Option>{+new Date()}</Option>
						<Option>12.323</Option>
						<Amount>12.323</Amount>
					</Item>
					<Item>
						<Ol>3</Ol>
						<Option>{+new Date()}</Option>
						<Option>123456.78</Option>
						<Amount>123456.78</Amount>
					</Item> */}
					<More>view more</More>
				</Card>
			</Container>

		</Main>
	)
}
