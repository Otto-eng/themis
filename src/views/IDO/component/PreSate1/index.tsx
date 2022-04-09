import styled from "styled-components"
import { GridFlex } from "../../../../components/Grid"
import ipt from "../../../../asstes/images/home/输入框@2x.png"
import right from "../../../../asstes/images/ido/right@2x.png"
import PreSate from "../../../../components/PreSate"
import { Dispatch, SetStateAction, useEffect, useLayoutEffect, useState } from "react"
import { createStyles, Grid, IconButton, Input, InputBase, makeStyles, Paper, Theme } from "@material-ui/core"
import { useWeb3React } from "@web3-react/core"
import { Web3Provider } from "@ethersproject/providers";
import { DEFAULT_ADDRESS } from "../../../../constants"
import useSingleCase from "../../../../hooks/useSingleCase"
import BgMain from "src/components/BgMain"
import { useBuyFtn } from "src/hooks/useBuyFtn"
import { useAttentionDialog } from "src/models"

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			padding: '2px 4px',
			display: 'flex',
			alignItems: 'center',
			width: "100%",
			marginTop: "16px",

		},
		input: {
			marginLeft: theme.spacing(1),
			flex: 1,
			fontSize: "14px",
			background: "rgba(248, 248, 248, 0.39)",
			borderRadius: "10px"
		},
		iconButton: {
			padding: 10,
			fontSize: "14px"
		},
		divider: {
			height: 28,
			margin: 4,
		},
	}),
);

const Container = styled.div`
	 background: rgba(255, 255, 255, 0.39);
	box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  padding: 16px;
  box-sizing: border-box;
	border-radius: 16px;
`

const Top = styled(GridFlex)`
	margin-top: 16px;
	width: 100%;
	justify-content: space-between;
	align-items: center;
`
const BlockPrice = styled.div`
  font-size: 14px;
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
	background-color: ${({ disbaled }) => disbaled ? `rgba(0, 0, 0, 0.39)` : `#000`};
	width: 100%;
	height: 50px;
	border-radius: 10px;
	justify-content: center;
	align-items: center;
	color: #FFFFFF;
	font-size: 20px;
	font-weight: 700;
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

interface PreSate2Props {
	accountBuy: number
	isStart: boolean
	totalBuy: number
	isHandleSend: boolean
	currentBuyTotal: number
	setHash: Dispatch<SetStateAction<string>>
	setIsHandleSend: Dispatch<SetStateAction<boolean>>
}


function PreSate1({ accountBuy, setIsHandleSend, currentBuyTotal, setHash, isHandleSend, isStart, totalBuy }: PreSate2Props) {
	const [value, setValue] = useState<string | undefined>(undefined)
	// const { t } = useTranslation()
	const { infoHash, setHash: addHash } = useSingleCase({ key: "igo" })
	const [dis, setDis] = useState<boolean>(!!infoHash.length)
	const buyFtn = useBuyFtn()
	const { toggle: toast } = useAttentionDialog();
	const { account } = useWeb3React<Web3Provider>();
	const [participated, setParticipated] = useState<string>("0.00");
	const classes = useStyles();

	useEffect(() => {
		setParticipated(accountBuy.toFixed(2))
	}, [accountBuy])

	useLayoutEffect(() => {
		if (!infoHash.length) {
			setDis(false);
			setIsHandleSend(true);
			setHash(+new Date() + "")
		}
	}, [infoHash, account])

	return (
		<Container id="ido-view">
			<Top>
				<BlockPrice >1 THS ≈ 4 USDT(BEP20）</BlockPrice>
				{/* <PreSate width={"80px"} margin={"0"} color={"#EFD3B3"} fontSize={"12px"} height={"22px"} /> */}
			</Top>
			<Paper component="form" className={classes.root}>
				<InputBase
					className={classes.input}
					inputProps={{ 'aria-label': 'search google maps' }}
					type="number" onChange={(e) => {
						const strN = e.target.value
						setValue(strN)
					}}
					value={value}
					placeholder={"Please enter 200-3000 USDT(BEP20)"}
					disabled={isStart || dis}
				/>
			</Paper>
			<Send
				key={dis + ""}
				disbaled={isHandleSend || isStart || dis}
				onClick={async () => {
					if (isHandleSend || isStart || dis) return
					const num = Number(value)
					if (account && !isNaN(num) && num >= 200 && num <= 3000) {
						if (totalBuy + Number(value) > 500000) {
							toast("Insufficient MCT or already sold out")
						} else {
							if (((currentBuyTotal + num) > 3000) && (account !== DEFAULT_ADDRESS)) {
								return toast("Your maximum purchase amount is 3000 USDT (BEP20)")
							} else {
								setDis(true)
								buyFtn(num.toString()).then((res: any) => {
									addHash(res?.hash)
								}).catch(() => {
									setTimeout(() => {
										setDis(false)
									}, 5000);
								})
							}
						}
					} else {
						toast("Please enter at least 200 USDT(BEP20) and no more than 3000 USDT(BEP20)")
					}
				}}
			> {"Send"}
				<BgMain imgsrc={right} style={{ width: "20px", height: "20px", marginLeft: "8px" }}>

				</BgMain>
			</Send >
			<Total>{"Your Total Contribution(USDT):"}</Total>
			<BanlanceU>{participated}</BanlanceU>
		</Container >

	)
}
export default PreSate1
