import styled from "styled-components"
import { GridFlex } from "../../../../components/Grid"
import bgImg from "../../../../images/home/border-02@2x.png"
import ipt from "../../../../images/home/输入框@2x.png"
import send from "../../../../images/home/按钮@2x.png"
import sendDis from "../../../../images/home/按钮灰色@2x.png"
import PreSate from "../../../../components/PreSate"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { Grid, Input } from "@material-ui/core"
// import { useTranslation } from "react-i18next"
import { useWeb3React } from "@web3-react/core"
import { Web3Provider } from "@ethersproject/providers";
import { DEFAULT_ADDRESS } from "src/constants"
import { useAttentionDialog } from "src/models"
import { useBuyFtn } from "src/hooks/useBuyFtn"


const Main = styled.div`
  background-image: ${`url(${bgImg})`};
  background-size: 100% 100%;
  width: 100%;
  padding: 30px 16px 16px;
  box-sizing: border-box;
  margin-top: 10px;
	color: #341B17;
`

const Top = styled(GridFlex)`
	width: 100%;
	justify-content: space-between;
	align-items: center;
`
const BlockPrice = styled.div`
  font-size: 14px;
  color: #000;
`

const PreInput = styled(Input)`
	margin-top: 16px;
	background-image: ${`url(${ipt})`};
	background-size: 100% 100%;
	width: 100%;
	height: 50px;
	padding: 0 8px;
	&:after {
		border-bottom: 0 none;
	}
`

const Send = styled(GridFlex) <{ disbaled?: boolean }>`
	margin-top: 16px;
	background-image: ${({ disbaled }) => disbaled ? `url(${sendDis})` : `url(${send})`};
	background-size: 100% 100%;
	width: 100%;
	height: 50px;
	justify-content: center;
	align-items: center;
	color: #FFFFFF;
	text-shadow: 0px 1px 2px rgba(0, 0, 0, 0.3);
`

const Total = styled(Grid)`
  margin-top: 10px;
	width: 100%;
	text-align: center;
`
const BanlanceU = styled(Grid)`
  margin: 10px 0;
	width: 100%;
	text-align: center;
	font-weight: bold;
	font-size: 24px;
	color: #341B17;
`

export const DivisionDash = styled.div`
  width: 100%;
	height: 0px;
  border-top: 1px dashed #6E3D1A;
	opacity: 0.4;
`

const Text = styled.span`
	color: #753E1E;
	line-height: 20px;
	font-size: 12px;
	& strong {
		font-weight: 700;
	}
`

interface PreSate1Props {
	accountBuy: number
	isStart: boolean
	setHash: Dispatch<SetStateAction<string>>
	sendCallback: () => void
}


function PreSate1({ accountBuy, setHash, isStart, sendCallback }: PreSate1Props) {
	const [mctPrice] = useState<string>("1")
	const [value, setValue] = useState<string>("0.00")
	const [dis, setDis] = useState<boolean>(false)
	const buyFtn = useBuyFtn()
	const { toggle: toast } = useAttentionDialog();
	const { account } = useWeb3React<Web3Provider>();
	const [participated, setParticipated] = useState<string>("0.00");

	useEffect(() => {
		setParticipated(accountBuy.toFixed(2))
	}, [accountBuy])

	return (
		<Main>
			<Top>
				<BlockPrice >{mctPrice} MCT ≈ 0.20 USDT</BlockPrice>
				<PreSate width={"80px"} margin={"0"} color={"#EFD3B3"} fontSize={"12px"} height={"22px"} />
			</Top>
			<PreInput disabled={isStart || dis} type="number" onChange={(e) => {
				setValue(e.target.value)
			}} placeholder={"input200U" /*t("input200U") */}></PreInput>
			<Send
				key={dis + ""}
				disbaled={isStart || dis}
				onClick={async () => {
					if (isStart || dis) return
					const num = Number(value)
					if (account && !isNaN(num) && num >= 200 && num <= 5000) {
						const res: any = await sendCallback();
						const { totalBuy, currentBuyTotal } = res
						if (totalBuy + Number(value) > 400000) {
							toast(
								"totaltips"
								// t("totaltips")
							)
						} else {
							if (((currentBuyTotal ?? accountBuy) + Number(value) > 5000) && (account !== DEFAULT_ADDRESS)) {
								return toast(
									"currentAddresstips"
									// t("currentAddresstips")
								)
							} else {
								setDis(true)
								buyFtn(num.toString(), "").then((res: any) => {
									setTimeout(() => {
										setHash(res.hash ?? "")
										setDis(false)
									}, 10000);
								}).catch(() => {
									setTimeout(() => {
										setDis(false)
									}, 5000);
								})
							}
						}
					} else {
						toast(
							"sendBalanceError"
							// t("sendBalanceError")
						)
					}
				}}
			> {
					// t("sendButtonText")
					"sendButtonText"
				}</Send >
			<Total>{
				"totalUsdt"
				// t("totalUsdt")
			}</Total>
			<BanlanceU>{participated}</BanlanceU>
			<DivisionDash />
			<Text>
				<strong>{
					"ruler"
					// t("ruler")
				}</strong>{
					"linearRelease"
					// t("linearRelease")
				}
			</Text>
		</Main >
	)
}
export default PreSate1
