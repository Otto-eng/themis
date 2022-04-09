import LinearProgress, { LinearProgressProps } from "@material-ui/core/LinearProgress"
import Typography from "@material-ui/core/Typography"
import Box from "@material-ui/core/Box"
import styled from "styled-components"
import { GridFlex } from "../../../../components/Grid"

const Main = styled.div`
	width: 100%;
	height: 80px;
	margin-top: 8px;
	padding: 16px;
	box-sizing: border-box;
	.a {
		/* background: #000; */
		box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.1);		
		border-radius: 50px;
	}
`

const Text = styled(GridFlex)`
	width: 100%;
	justify-content: space-between;
	align-items: center;
	font-size: 14px;
`
const Left = styled(GridFlex)`
	visibility: hidden;
	text-align:left;
`
const Right = styled(GridFlex)`
	text-align: right;
`

export function LinearProgressWithLabel(props: LinearProgressProps & { value?: number }) {
	return (
		<Box width="100%" display="flex" alignItems="center">
			<Box width="100%" mr={1}>
				<LinearProgress variant="determinate" {...props} />
			</Box>
			<Box minWidth={35}>
				<Typography variant="body2" >{`${props?.value?.toFixed(2) ?? 0}%`}</Typography>
			</Box>
		</Box>
	);
}

interface PropsType {
	totalBuy: number
}

function Progress({ totalBuy }: PropsType) {
	const total = totalBuy
	const ratio = total / 500000 * 100

	return (
		<Main>
			<div style={{ width: "100%" }}>
				<LinearProgressWithLabel style={{
					height: "14px",
					// background: "rgba(89, 66, 52, 0.39)",
					borderRadius: "50px"
				}}
					classes={{
						barColorPrimary: "a"
					}}
					value={ratio <= 100 ? ratio : 100} />
			</div>
			<Text>
				<Left>{"Progress"}</Left>
				<Right>{total <= 500000 ? total.toFixed(2) : 500000}/{500000}</Right>
			</Text>
		</Main>
	)
}

export default Progress