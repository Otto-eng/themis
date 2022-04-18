import styled from "styled-components"
import { GridFlex } from "../../../../components/Grid"
import { Dispatch, SetStateAction, useCallback, useEffect, useState } from "react"
import { createStyles, InputBase, makeStyles, Paper, Theme, Button } from "@material-ui/core"
import { useBuyFtn } from "src/hooks/useBuyFtn"
import { useDispatch } from "react-redux"
import { error } from "src/slices/MessagesSlice"
import { useWeb3Context } from "src/hooks"
import { isPending } from "src/views/Claim"
import Skeleton from "@material-ui/lab/Skeleton/Skeleton"
import { ethers } from "ethers"
import { addresses } from "src/constants"
import { IERC20 } from "src/typechain"
import { abi as ierc20Abi } from "src/abi/IERC20.json";
import { debounce } from "src/utils/debounce"


const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			padding: '2px 0',
			display: 'flex',
			alignItems: 'center',
			width: "100%",
			margin: "16px 0",
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

const Send = styled(Button)({
	width: "100%",
	padding: "16px",
	borderRadius: "6px",
	backgroundColor: "#F8CC82",
	color: "#000"
})

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
	setHash: Dispatch<SetStateAction<string>>
}


function PreSate1({ accountBuy, setHash, isStart, isExperiencerAddressBuy, isExperiencerAddress, totalBuy }: PreSate2Props) {
	const dispatch = useDispatch()
	const [value, setValue] = useState<string | undefined>(undefined)
	const buyFtn = useBuyFtn()
	const [participated, setParticipated] = useState<string>("0.00");
	const [isBuy, setIsBuy] = useState(false);
	const [approveHash, setApproveHash] = useState("");
	const [pendingTransactions, setPendingTransactions] = useState(false);
	const [pendingStatus, setPendingStatus] = useState({ send: false });
	const classes = useStyles();
	const { provider, chainID, address } = useWeb3Context();
	useEffect(() => {
		if (isStart) {
			if (isExperiencerAddressBuy) {
				if (isExperiencerAddress) {
					setIsBuy(true)
				} else {
					setIsBuy(false)
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

	const isApprove = useCallback(
		async () => {
			const signer = provider.getSigner();
			const usdtContract = new ethers.Contract(addresses[chainID].USDT_ADDRESS as string, ierc20Abi, signer) as IERC20;
			const approveBig = await usdtContract.allowance(address, addresses[chainID].IDO_PRESALECONTRACT_ADDRESS)
			setPendingTransactions(!!Number(ethers.utils.formatUnits(approveBig, "ether")))
			setPendingStatus({ send: false })
		}, [provider, chainID, address, addresses, approveHash]
	)

	const userApprove = useCallback(
		async () => {
			const signer = provider.getSigner();
			try {
				const usdtContract = new ethers.Contract(addresses[chainID].USDT_ADDRESS as string, ierc20Abi, signer) as IERC20;
				const infoHash = await usdtContract.approve(addresses[chainID].IDO_PRESALECONTRACT_ADDRESS, ethers.utils.parseUnits("1000", "ether").toString());
				await infoHash.wait()
				await usdtContract.provider.getTransactionReceipt(infoHash.hash)
				setApproveHash(infoHash.hash)
			} catch (error) {
				setPendingStatus({ send: false })
			}
		}, [provider, chainID, address, addresses]
	)

	const buyIdo = useCallback(
		async () => {
			if (!isBuy || pendingStatus.send) return
			setPendingStatus({ send: true })
			const num = Number(value)
			if (pendingTransactions) {
				if (address && !isNaN(num) && num >= 100 && num <= 1000) {
					if ((totalBuy * 4 + Number(value)) > 500000) {
						dispatch(error("Insufficient MCT or already sold out"))
					} else {
						if ((accountBuy * 4 + num) > 1000) {
							return dispatch(error("Your maximum purchase amount is 1000 USDT (BEP20)"))
						} else {
							setPendingStatus({ send: true })
							buyFtn(num.toString()).then((res: any) => {
								console.log("RES", res)
								setHash(res?.transactionHash || "")
							}).catch(() => {
								setPendingStatus({ send: false })
							})
						}
					}
				} else {
					setPendingStatus({ send: false })
					dispatch(error("Please enter at least 100 USDT (BEP20) and no more than 1000 USDT (BEP20)"))
				}
			} else {
				userApprove()
			}
		},
		[pendingTransactions, accountBuy, address, totalBuy, value, error, isBuy]
	)

	useEffect(() => {
		if (provider && chainID && address && addresses[chainID]?.USDT_ADDRESS) {
			isApprove()
		}
	}, [provider, chainID, address, addresses, approveHash])

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
					disabled={!isBuy || pendingStatus.send}
				/>
			</Paper>
			<Send
				variant="contained"
				color="primary"
				disabled={!isBuy || pendingStatus.send}
				key={pendingStatus.send + "pendingStatus"}
				onClick={() => debounce(buyIdo, 500)}
			>
				{isPending(pendingStatus, "send", pendingTransactions ? "Send" : "Approve")}
			</Send >
			<Total>{"Your Total Contribution(THS):"}</Total>
			<BanlanceU>{pendingStatus.send ? <Skeleton width="100px" /> : participated}</BanlanceU>
		</Container >

	)
}
export default PreSate1
