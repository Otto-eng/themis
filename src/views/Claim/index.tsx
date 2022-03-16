import { styled } from "@material-ui/core"
import { THEME_LIGHT } from "src/constants"
import { useAppSelector } from "src/hooks"

export const GridFlex = styled('div')({
	width: "100%",
	display: "flex",
	justifyContent: 'center',
	alignItems: 'center',
	color: "#FFF",
	fontSize: '20px',
	textAlign: 'center'
})

const Main = styled(GridFlex)({
	width: "100%",
	position: "relative",
	// height: "100%"
})


// position: "absolute",
// top: "50%",
// left: '50%',
// transform: "translate(-50%, -50%)",
const Container = styled("div")({
	width: "350px",
	background: '#18253A',
	padding: "40px",
	borderRadius: '10px',
})


const Top = styled("div")({
	width: "100%",
	padding: "8px 16px 16px",
})

const Item = styled(GridFlex)({
	width: "100%",
	padding: "16px",
	borderBottom: '1px solid rgba(127,127,127, .34)',
})

const Tips = styled("div")({
	width: "100%",
	padding: "8px",
	color: "#83879E",
	fontSize: '12px',
	textAlign: 'right',
	margin: '8px'
})

const Confrim = styled("div")({
	width: "100%",
	background: 'linear-gradient(180deg, #BCBDCC 0%, #E1E0E5 100%)',
	padding: "16px",
	borderRadius: "6px",
	marginTop: "16px"
})

function Claim() {
	const theme = useAppSelector(state => state.theme.theme)

	return (
		<Main>
			<Container style={{ backgroundColor: theme === THEME_LIGHT ? "rgba(255, 255, 255, 0.6)" : "#010101" }}>
				<Top style={{ backgroundColor: theme === THEME_LIGHT ? "#FAFAFAEF" : "#18253A" }}>
					<Item style={{ color: theme === THEME_LIGHT ? "#010101" : "#768299" }}>180 DAY</Item>
					<Item style={{ color: theme === THEME_LIGHT ? "#010101" : "#768299" }}>150 DAY</Item>
					<Item style={{ color: theme === THEME_LIGHT ? "#010101" : "#768299" }}>120 DAY</Item>
					<Item style={{ color: theme === THEME_LIGHT ? "#010101" : "#768299" }}>90 DAY</Item>
					<Item style={{ color: theme === THEME_LIGHT ? "#010101" : "#768299" }}>60 DAY</Item>
					<Item style={{ color: theme === THEME_LIGHT ? "#010101" : "#768299" }}>30 DAY</Item>
				</Top>
				{/* <Tips>加速后，每天释放量：50</Tips> */}
				<Confrim >Confrim</Confrim>
			</Container>
		</Main>
	)
}
export default Claim
