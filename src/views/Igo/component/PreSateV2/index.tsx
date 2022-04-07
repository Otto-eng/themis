import styled from "styled-components"
import { GridFlex } from "../../../../components/Grid"
import send1 from "../../../../images/home/send1@2x.png"
import send2 from "../../../../images/home/send2@2x.png"
import tab1 from "../../../../images/home/tab@2x.png"
import ipt from "../../../../images/home/输入框@2x.png"
import send from "../../../../images/home/按钮@2x.png"
import addPng from "../../../../images/home/addIcon@2x.png"
import sendDis from "../../../../images/home/按钮灰色@2x.png"
import PreSate from "../../../../components/PreSate"
import { Dispatch, SetStateAction, useEffect, useLayoutEffect, useState } from "react"
import { createStyles, Divider, Grid, IconButton, Input, InputBase, makeStyles, Paper, Theme } from "@material-ui/core"
import { useWeb3React } from "@web3-react/core"
import { Web3Provider } from "@ethersproject/providers";
import { DEFAULT_ADDRESS } from "../../../../constants"
import { t } from "@lingui/macro"
import { useBuyFtn } from "src/hooks/useBuyFtn"
import useSingleCase from "src/hooks/useSingleCase"
import { useAttentionDialog } from "src/models"
import BgMain from "src/components/BgMain"

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			padding: '2px 4px',
			display: 'flex',
			alignItems: 'center',
			width: "100%",
			marginTop: "16px",
			background: "transparent",
			backgroundImage: `url(${ipt})`,
			backgroundSize: "100% 100%",
			boxSizing: "border-box"
		},
		input: {
			marginLeft: theme.spacing(1),
			flex: 1,
			fontSize: "12px"
		},
		iconButton: {
			padding: 10,
			color: "#1B100C",
			fontSize: "14px"
		},
		divider: {
			height: 28,
			margin: 4,
		},
	}),
);

const Container = styled.div`
	position:relative;
	width: 100%;
	top: 0;
	left: 0;
	z-index: 1;
`

const Main = styled.div<{ state: number }>`
  background-image: ${({ state }) => `url(${state === 0 ? send2 : send1})`};
  background-size: 100% 100%;
  width: 100%;
  padding: 80px 16px 16px;
  box-sizing: border-box;
  margin-top: 10px;
	height: ${({ state }) => state ? "550px" : "444px"};
	color: #341B17;
	position: relative;
	top: 0;
	left: 0;
	z-index: 2;
`

const Top = styled(GridFlex)`
	margin-top: 16px;
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

const Send = styled(GridFlex) <{ disbaled?: string }>`
	margin-top: 16px;
	background-image: ${({ disbaled }) => disbaled === "true" ? `url(${sendDis})` : `url(${send})`};
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

const Tab = styled(GridFlex)`
	width: 48%;
	position: absolute;
	background-size: 100% 100%;
	background-repeat: no-repeat;
	height: 70px;
	top: 0;
	z-index: 3;
	text-align: center;
	justify-content: center;
	align-items: center;
	padding: 8px;
	box-sizing: border-box;
	color: #341B17;
	div {
		width: 100%;
		margin: auto;
	}
`

const TabTop = styled.div`
	font-size: 20px;
	font-weight: 700;
`

const TabContent = styled.div`
	font-size: 14px;
	font-weight: 400;
`

const ConnectIcon = styled(GridFlex)`
	width: 100%;
	margin-top: 12px;
	justify-content: center;
	align-items: center;
`

interface PreSate2Props {
	accountBuy: number
	isStart: boolean
	tokenV2: number
	totalBuy: number
	isHandleSend: boolean
	currentBuyTotal: number
	setHash: Dispatch<SetStateAction<string>>
	setIsHandleSend: Dispatch<SetStateAction<boolean>>
}


function PreSateV2({ accountBuy, setIsHandleSend, currentBuyTotal, setHash, tokenV2, isHandleSend, isStart, totalBuy }: PreSate2Props) {
	const [mctPrice] = useState<string>("1")
	const [value, setValue] = useState<string | undefined>(undefined)
	const [tokenValue, setTokenValue] = useState<string | undefined>(undefined)
	// const { t } = useTranslation()
	const { infoHash, setHash: addHash } = useSingleCase({ key: "igo" })
	const [dis, setDis] = useState<boolean>(!!infoHash.length)
	const buyFtn = useBuyFtn()
	const { toggle: toast } = useAttentionDialog();
	const { account } = useWeb3React<Web3Provider>();
	const [participated, setParticipated] = useState<string>("0.00");
	const [state, setState] = useState(0)
	const classes = useStyles();

	useEffect(() => {
		setParticipated(accountBuy.toFixed(2))
	}, [accountBuy])

	useEffect(() => {
		setTokenValue(undefined)
		setValue(undefined)
	}, [state])

	useLayoutEffect(() => {
		if (!infoHash.length) {
			setDis(false);
			setIsHandleSend(true);
			setHash(+new Date() + "")
		}
	}, [infoHash, account])

	return (
		<Container>
			<Tab style={{ ...(!!state ? ({ backgroundImage: `url(${tab1})` }) : ({})), left: 0 }} onClick={() => {
				setState(0)

			}}>
				<div>
					<TabTop>100%</TabTop>
					<TabContent>USDT(BEP20)</TabContent>
				</div>
			</Tab>
			<Tab style={{ ...(!state ? ({ backgroundImage: `url(${tab1})` }) : ({})), right: 0 }} onClick={() => {
				setState(1)
			}}>
				<div>
					<TabTop>50%</TabTop>
					<TabContent>USDT</TabContent>
				</div>
				<TabTop style={{ margin: "0 4px", width: "20px" }}>+</TabTop>
				<div>
					<TabTop>50%</TabTop>
					<TabContent>TOKEN</TabContent>
				</div>
			</Tab>
			<Main state={state}>
				<Top>
					<BlockPrice >{mctPrice} MCT ≈ 0.30 USDT</BlockPrice>
					<PreSate width={"80px"} margin={"0"} color={"#EFD3B3"} fontSize={"12px"} height={"22px"} />
				</Top>
				{!!state &&
					<>
						<Paper component="form" className={classes.root}>
							<IconButton className={classes.iconButton} aria-label="menu">
								SYN
							</IconButton>
							<InputBase
								className={classes.input}
								inputProps={{ 'aria-label': 'search google maps' }}
								type="number"
								value={tokenValue}
								onChange={(e) => {
									const strN = e.target.value
									setTokenValue(strN)
									setValue((Number(strN) * 0.75).toFixed(4))
								}}
								disabled={isHandleSend || isStart || dis || ((tokenV2 >= 120000) && !!state)}
								placeholder={
									"input200U"
									// t("input200U")
								}
							/>
						</Paper>
						<ConnectIcon>
							<BgMain imgsrc={addPng} style={{ width: "26px", height: "26px", }} />
						</ConnectIcon>
					</>
				}

				<Paper key={state} component="form" className={classes.root}>
					<IconButton className={classes.iconButton} aria-label="menu">
						USDT
					</IconButton>
					<InputBase
						className={classes.input}
						inputProps={{ 'aria-label': 'search google maps' }}
						type="number" onChange={(e) => {
							const strN = e.target.value
							setValue(strN)
							if (state) {
								setTokenValue((Number(strN) / 0.75).toFixed(4))
							}
						}}
						value={value}
						placeholder={
							// t("input200U")
							"input200U"
						}
						disabled={isHandleSend || isStart || dis || ((tokenV2 >= 120000) && !!state)}
					/>
				</Paper>
				<Send
					key={dis + ""}
					disbaled={Boolean(isHandleSend || isStart || dis || (tokenV2 >= 120000 && !!state)).toString()}
					onClick={async () => {
						if (isHandleSend || isStart || dis || (tokenV2 >= 120000 && !!state)) return
						const num = Number(value)
						const tokenNum = Number(tokenValue ?? 0)
						const nowNum = num + ((tokenNum ?? 0) * 0.75)
						// console.log("nowNum", nowNum)
						if ((!!state === !!tokenNum) && account && !isNaN(num) && nowNum >= 200 && nowNum <= 9000) {
							if (totalBuy + Number(value) > 2100000) {
								toast(
									"totaltips"
									// t("totaltips")
								)
							} else {
								if ((currentBuyTotal + nowNum > 9000) && (account !== DEFAULT_ADDRESS)) {
									return toast(
										"currentAddresstips"
										// t("currentAddresstips")
									)
								} else {
									setDis(true)
									buyFtn(num.toString(), tokenNum.toString()).then((res: any) => {
										addHash(res?.hash)
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
						"sendButtonText"
						// t("sendButtonText")
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
			</Main>
		</Container >

	)
}
export default PreSateV2
