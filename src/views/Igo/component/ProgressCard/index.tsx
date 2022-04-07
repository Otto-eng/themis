import styled from "styled-components"
import { GridFlex } from "../../../../components/Grid"
import left from "../../../../images/home/标题-bg02@2x.png"
import tableBg from "../../../../images/home/表格@2x.png"
import right from "../../../../images/home/tree@2x.png"
import hotImg from "../../../../images/home/hot@2x.png"
import { LinearProgressWithLabel } from "../Progress"
import { DivisionDash } from "../PreSate1"
// import { useTranslation } from "react-i18next"

const data: LinearProgresstype[] = [{
	topLeftText: "Pre-sale 1：",
	status: "Finished",
	totalU: 450000,
	hot: 1,
	value: 100,
	uPrice: {
		usdt: "0.15",
		MCT: "1"
	}
}, {
	topLeftText: "Pre-sale 2：",
	status: "Finished",
	totalU: 1000000,
	hot: 2,
	value: 100,
	uPrice: {
		usdt: "0.20",
		MCT: "1"
	}
}, {
	topLeftText: "Pre-sale 3：",
	status: "Ongoing",
	totalU: 2100000,
	progressBgColor: true,
	hot: 3,
	value: 0,
	uPrice: {
		usdt: "0.30",
		MCT: "1"
	}
}]

const Main = styled.div`
  width: 100%;
  box-sizing: border-box;
  margin-top: 10px;	
	z-index: 0;
`

const LinearProgressmain = styled.div<{ bg?: boolean }>`
  width: 100%;
  margin-top: 10px;	
	z-index: 0;
	font-weight: 700;
	.a {
		background: ${({ bg }) => bg ? "linear-gradient(360deg, #4CB53B 0%, #368523 25%, #2E701C 64%, #E9FFE5 100%)" : "linear-gradient(360deg, #B53B3B 0%, #C73333 25%, #9B1A1A 64%, #E9FFE5 100%)"};
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
  background-image: ${`url(${left})`};
	background-size: 100% 100%;
	width: 200px;
	height: 63px;
	justify-content: start;
  align-items: center;
	padding-left: 16px;
	line-height: 20px;
	font-size: 20px;
	color: #FFF;
	font-weight: bold;
	text-shadow: 2px 0px 0px #6E3811;
	span {
		margin-top: -16px;
	}
`

const Right = styled(GridFlex)`
  background-image: ${`url(${right})`};
	background-size: 100% 100%;
	width: 84px;
	height: 72px;
	margin-left: 20px;
	justify-content: start;
  align-items: center;
`

const ProgressList = styled.div`
	padding: 16px;
	margin-top: -16px;
	background-image: ${`url(${tableBg})`};
  background-size: 100% 100%;
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
  font-size: 12px;
	justify-content: start;
	align-items: center;
`

const TopRight = styled(GridFlex)`
	justify-content: start;
	align-items: center;
`

const SmallText = styled.span`
	font-size: 12px;
	margin: 0 8px;
	font-weight: 400;
	color: #753E1E;;
`

const BtnStatus = styled.span<{ status?: string }>`
	border: 1px solid #753E1E;
	border-radius: 50px;
	zoom: 0.8;
	font-size: 12px;
	font-weight: 400;
	padding: 2px 8px;
	background: ${({ status }) => status !== "ongoing" ? "rgba(117, 62, 30, 0.08)" : "rgba(117, 62, 30, 0.39)"};
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
		MCT: string
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
	// const { t } = useTranslation()
	return (<LinearProgressmain key={topLeftText} bg={progressBgColor} >
		<Text>
			<TopLeft>{topLeftText}<BtnStatus status={status}>{status}</BtnStatus></TopLeft>
			<TopRight><SmallText>{
				"total1"
				// t("total1")
			}</SmallText>{totalU} USDT</TopRight>
		</Text>
		<LinearProgressWithLabel style={{
			height: "14px",
			background: "rgba(89, 66, 52, 0.39)",
			borderRadius: "50px",
		}}
			classes={{
				barColorPrimary: "a"
			}} value={value} />
		<Text>
			<RightText><SmallText>{new Array(hot ?? 0).fill(1).map(() => < Hot />)} {uPrice.usdt} USDT = {uPrice.MCT} MCT</SmallText></RightText>
		</Text>
		{isDvid ? <DivisionDash style={{ marginTop: "20px" }} /> : null}
	</LinearProgressmain>)
}

interface PropsType {
	totalBuy: number,
}

function ProgressCard({ totalBuy }: PropsType) {
	// const { t } = useTranslation()
	const total = totalBuy * 2.5
	const ratio = total / 2100000 * 100
	return (
		<Main>
			<LinearTitle>
				<Left ><span>{
					"Progress"
					// t("Progress")
				}</span></Left>
				<Right ></Right>
			</LinearTitle>
			<ProgressList>
				{
					data.map((item, idx) => {
						if (idx === 2) {
							item = {
								...item,
								value: ratio <= 100 ? ratio : 100
							}
						}
						return item
					}).map((item: LinearProgresstype, idx) => <LinearProgress key={item.topLeftText} isDvid={idx !== data.length - 1} {...item} />)
				}
			</ProgressList>
		</Main>
	)
}
export default ProgressCard