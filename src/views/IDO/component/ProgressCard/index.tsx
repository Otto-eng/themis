import styled from "styled-components"
import { GridFlex } from "../../../../components/Grid"
import hotImg from "../../../../asstes/images/home/hot@2x.png"
import { LinearProgressWithLabel } from "../Progress"

const data: LinearProgresstype[] = [{
	topLeftText: "Pre-Sale",
	// status: "ing",
	status: "ing",
	totalU: 500000,
	hot: 1,
	progressBgColor: true,
	value: 100,
	uPrice: {
		usdt: "4",
		THS: "1"
	}
}
	// , {
	// topLeftText: "Pre-Sale 2",
	// status: "unstart",
	// totalU: 90000,
	// hot: 1,
	// progressBgColor: false,
	// value: 100,
	// uPrice: {
	// 	usdt: "5",
	// 	THS: "1"
	// }
	// }
]

const Main = styled.div`
  width: 100%;
  box-sizing: border-box;
  margin-top: 10px;	
	z-index: 0;
`

const LinearProgressmain = styled.div<{ bg?: boolean }>`
  width: 100%;
	z-index: 0;
	font-weight: 700;
	background: rgba(255, 255, 255, 0.39);
	box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.1);
	box-sizing: border-box;
	margin-top: 16px;
	padding: 16px;
	border-radius: 16px;
	.a {
		background: ${({ bg }) => bg ? "#000" : "rgba(148, 148, 148, 0.39)"};
		border-radius: 50px;
	}
`

const LinearTitle = styled(GridFlex)`
justify-content: start;
align-items: center;
width: 100%;
height: 90px;
`

const Left = styled(GridFlex)`
width: 100%;
height: 63px;
	justify-content: center;
  align-items: center;
	font-size: 24px;
	font-family: Roboto;
	font-weight: bold;
	line-height: 20px;
	opacity: 1;
`

const ProgressList = styled.div`
padding: 16px;
margin-top: -16px;
z-index: -1;
width: 100%;
box-sizing: border-box;
`

const Text = styled(GridFlex)`
width: 100%;
justify-content: space-between;
align-items: center;
margin: 4px 0;
`

const TopLeft = styled(GridFlex)`
font-size: 14px;
justify-content: start;
align-items: center;
margin-top: 16px;
opacity: .8;
`

const TopRight = styled(GridFlex)`
justify-content: start;
align-items: center;
span {

	font-size: 12px;
	margin-left: 8px;
}
`

const SmallText = styled.span`
font-size: 12px;
margin: 10px 0;
font-weight: 400;
opacity: .6;
`

const BtnStatus = styled.span<{ status?: string }>`
border-radius: 50px;
zoom: 0.8;
font-size: 12px;
font-weight: 400;
padding: 2px 8px;
border: ${({ status }) => `1px solid ${status !== "ing" ? "#777" : "#000"}`};
color: ${({ status }) => status !== "ing" ? "#ccc" : "#000"};
background: ${({ status }) => status !== "ing" ? "rgba(0, 0, 0, 0.08)" : "rgba(117, 62, 30, 0.39)"};
`

const RightText = styled.span`
text-align: right;
width: 100%;
flex: 1;
`

const Hot = styled.span`
display: inline-block;
background-image: ${`url(${hotImg})`};
background-size: 100% 100%;
width: 10px;
height: 13px;
margin: 0 4px;
`

interface LinearProgresstype {
	topLeftText: string,
	status: string,
	totalU: number,
	progressBgColor?: boolean,
	hot?: number,
	value?: number,
	isDvid?: boolean
	uPrice: {
		usdt: string,
		THS: string
	}
}

const LinearProgress = ({
	topLeftText,
	status,
	totalU,
	progressBgColor,
	hot,
	value,
	uPrice,
	isDvid
}: LinearProgresstype) => {
	return (
		<>
			<TopLeft>{topLeftText}</TopLeft>
			<LinearProgressmain bg={progressBgColor} >
				<Text>
					<TopRight>
						{totalU} <span>USDT</span>
					</TopRight>
					<BtnStatus status={status}>{status}</BtnStatus>
				</Text>
				<SmallText>{"Total"}</SmallText>
				<LinearProgressWithLabel style={{
					height: "14px",
					background: "rgba(89, 66, 52, 0.39)",
					borderRadius: "50px",
					marginTop: "8px"
				}}
					classes={{
						barColorPrimary: "a"
					}} value={value} />
				<Text>
					<RightText><SmallText>{new Array(hot ?? 0).fill(1).map(() => < Hot />)} {uPrice.usdt} USDT = {uPrice.THS} THS</SmallText></RightText>
				</Text>
			</LinearProgressmain>
		</>)
}

interface PropsType {
	totalBuy: number,
}

function ProgressCard({ totalBuy }: PropsType) {
	const ratio = totalBuy * 4 / 500000 * 100
	return (
		<Main key={totalBuy}>
			<LinearTitle>
				<Left ><span>{"Token Sales Progress"}</span></Left>
			</LinearTitle>
			<ProgressList>
				{
					data.map((item, idx) => {
						if (idx === 0) {
							item = {
								...item,
								value: ratio <= 100 ? ratio : 100
							}
						}
						return item
					}).map((item: LinearProgresstype, idx) => <LinearProgress isDvid={idx !== data.length - 1} {...item} />)
				}
			</ProgressList>
		</Main>
	)
}
export default ProgressCard