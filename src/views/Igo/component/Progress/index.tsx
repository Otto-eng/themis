import LinearProgress, { LinearProgressProps } from "@material-ui/core/LinearProgress"
import Typography from "@material-ui/core/Typography"
import Box from "@material-ui/core/Box"
import styled from "styled-components"
import { GridFlex } from "../../../../components/Grid"
import Border1 from "../../../../images/home/border-01@2x.png"
// import { useTranslation } from "react-i18next"

const Main = styled.div`
	background-image: ${`url(${Border1})`};
	background-size: 100% 100%;
	width: 100%;
	height: 80px;
	margin-top: 8px;
	padding: 16px;
	box-sizing: border-box;
	margin-top: 80px;
	.a {
		background: linear-gradient(360deg, #4CB53B 0%, #368523 25%, #2E701C 64%, #E9FFE5 100%);
		border-radius: 50px;
	}
`

const Text = styled(GridFlex)`
	width: 100%;
	justify-content: space-between;
	align-items: center;
	color: #2A160A;
	font-size: 14px;
`
const Left = styled(GridFlex)`
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
	// const { t } = useTranslation()
	const total = totalBuy * 2.5
	const ratio = total / 2100000 * 100

	return (
		<Main>
			<div style={{ width: "100%" }}>
				<LinearProgressWithLabel key={"current"} style={{
					height: "14px",
					background: "rgba(89, 66, 52, 0.39)",
					borderRadius: "50px"
				}}
					classes={{
						barColorPrimary: "a"
					}}
					value={ratio <= 100 ? ratio : 100} />
			</div>
			<Text>
				<Left>{
					"progress"
					// t("progress")
				}</Left>
				<Right>{total <= 2100000 ? total : 2100000}/{2100000}</Right>
			</Text>
		</Main>
	)
}

export default Progress