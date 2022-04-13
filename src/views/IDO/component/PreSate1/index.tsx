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
import { useDispatch } from "react-redux"
import { error } from "src/slices/MessagesSlice"
import { useWeb3Context } from "src/hooks"
import { isPending } from "src/views/Claim"
import Skeleton from "@material-ui/lab/Skeleton/Skeleton"

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
			paddingLeft: "16px",
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
	cursor: pointer;
`

const Total = styled(GridFlex)`
	justify-content: center;
	align-items: center;
  margin-top: 10px;
	width: 100%;
	text-align: center;
`
const BanlanceU = styled(GridFlex)`
  margin: 10px 0;
	width: 100%;
	text-align: center;
	justify-content: center;
	align-items: center;
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
	isExperiencerAddressBuy: boolean
	isExperiencerAddress: boolean
	totalBuy: number
	currentBuyTotal: number
	setHash: Dispatch<SetStateAction<string>>
}


function PreSate1({ accountBuy, currentBuyTotal, setHash, isStart, isExperiencerAddressBuy, isExperiencerAddress, totalBuy }: PreSate2Props) {
	const dispatch = useDispatch()
	const [value, setValue] = useState<string | undefined>(undefined)
	const buyFtn = useBuyFtn()
	const { address } = useWeb3Context();
	const [participated, setParticipated] = useState<string>("0.00");
	const [isBuy, setIsBuy] = useState(false);
	const [pendingStatus, setPendingStatus] = useState({ send: false });
	const classes = useStyles();

	useEffect(() => {
		console.log("isStart, isExperiencerAddressBuy, isExperiencerAddress", isStart, isExperiencerAddressBuy, isExperiencerAddress)
		if (isStart) {
			if (isExperiencerAddressBuy) {
				if (isExperiencerAddress) {
					setIsBuy(true)
				}
			} else {
				setIsBuy(true)
			}
		} else {
			setIsBuy(false)
		}

	}, [isStart, isExperiencerAddressBuy, isExperiencerAddress])

	useEffect(() => {
		setPendingStatus({ send: false })
		setParticipated(accountBuy.toFixed(2))
	}, [accountBuy])

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
					type="number"
					onChange={(e) => {
						const strN = e.target.value
						setValue(strN)
					}}
					value={value}
					placeholder={"Please enter 100-1000 USDT(BEP20)"}
					disabled={!isBuy}
				/>
			</Paper>
			<Send
				disbaled={!isBuy}
				onClick={async () => {
					if (!isBuy) return
					const num = Number(value)
					if (address && !isNaN(num) && num >= 100 && num <= 1000) {
						if (totalBuy + Number(value) > 500000) {
							dispatch(error("Insufficient MCT or already sold out"))
						} else {
							if ((currentBuyTotal + num) > 1000) {
								return dispatch(error("Your maximum purchase amount is 1000 USDT (BEP20)"))
							} else {
								setPendingStatus({ send: true })
								buyFtn(num.toString()).then((res: any) => {
									console.log("RES", res)
									setHash(res?.transactionHash || "")
								}).catch(() => {
									setPendingStatus({ send: false })
									console.log("ERROR")
								})
							}
						}
					} else {
						dispatch(error("Please enter at least 100 USDT (BEP20) and no more than 1000 USDT (BEP20)"))
					}
				}}
			> {isPending(pendingStatus, "send", "Send")}
				<BgMain imgsrc={right} style={{ width: "20px", height: "20px", marginLeft: "8px" }}>

				</BgMain>
			</Send >
			<Total>{"Your Total Contribution(THS):"}</Total>
			<BanlanceU>{pendingStatus.send ? <Skeleton width="100px" /> : participated}</BanlanceU>
		</Container >

	)
}
export default PreSate1
