import { styled } from "@material-ui/core"
import { THEME_LIGHT } from "src/constants"
import { useAppSelector } from "src/hooks"
import { GridFlex } from "../Claim"

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
	fontSize: "14px"
})

const Blance = styled("div")({
	fontSize: '20px'
})

const CardTitle = styled(GridFlex)({
	fontSize: "20px",
	marginTop: "24px",
	justifyContent: "start"
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

export default function Sc() {
	const theme = useAppSelector(state => state.theme.theme)
	return (
		<Main>
			<Container style={{ backgroundColor: theme === THEME_LIGHT ? "rgba(255, 255, 255, 0.6)" : "#010101" }}>
				<Top style={{ backgroundColor: theme === THEME_LIGHT ? "#FAFAFAEF" : "#18253A", color: theme === THEME_LIGHT ? "#010101" : "#768299" }}>
					<Title >SC Amount</Title>
					<Blance>0.00</Blance>
				</Top>
				<CardTitle style={{ color: theme === THEME_LIGHT ? "#010101" : "#768299" }}>Staking Earnings</CardTitle>
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
