import { styled } from "@material-ui/core"

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
	background: '#0D132D'
})

const Item = styled(GridFlex)({
	width: "100%",
	padding: "8px",
	borderBottom: '1px solid #253449'
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
	borderRadius: "6px"
})

function Claim() {
	return (
		<Main>
			<Container>
				<Top>
					<Item >180 DAY</Item>
					<Item >150 DAY</Item>
					<Item >120 DAY</Item>
					<Item >90 DAY</Item>
					<Item >60 DAY</Item>
					<Item >30 DAY</Item>
				</Top>
				<Tips>加速后，每天释放量：50</Tips>
				<Confrim >Confrim</Confrim>
			</Container>
		</Main>
	)
}
export default Claim
