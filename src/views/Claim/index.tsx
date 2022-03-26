import { Button, FormControl, MenuItem, Select, styled } from "@material-ui/core"
import { BigNumber, ethers } from "ethers"
import React, { useCallback, useEffect, useState } from "react"
import { addresses, THEME_LIGHT } from "src/constants"
import { useAppSelector, useWeb3Context } from "src/hooks"
import { abi as ierc20Abi } from "../../abi/IERC20.json";

import { abi as StakingRewardReleaseABI } from "src/abi/StakingRewardRelease.json";
import { IERC20 } from "src/typechain/IERC20"
import { error } from "src/slices/MessagesSlice"
import { useDispatch } from "react-redux"

const listDay = [
	{ id: 0, value: 180, gasSc: "0" },
	{ id: 1, value: 150, gasSc: "15" },
	{ id: 2, value: 120, gasSc: "30" },
	{ id: 3, value: 100, gasSc: "60" },
	{ id: 4, value: 80, gasSc: "100" },
	{ id: 5, value: 60, gasSc: "150" },
	{ id: 6, value: 45, gasSc: "210" },
	{ id: 7, value: 30, gasSc: "300" }]

const GridFlex = styled('div')({
	width: "100%",
	display: "flex",
	justifyContent: 'center',
	alignItems: 'center',
	fontSize: '14px',
	textAlign: 'center'
})

const Main = styled("div")({
	width: "100%",
	// height: "100%"
})


// position: "absolute",
// top: "50%",
// left: '50%',
// transform: "translate(-50%, -50%)",
const CalimModal = styled(GridFlex)({
	position: "fixed",
	top: "50%",
	left: "50%",
	width: "100%",
	height: "100vh",
	zIndex: 1300,
	transform: "translate(-50%, -50%)",
	background: "rgba(0, 0, 0, .5)"
})

const Container = styled("div")({
	width: "350px",
	padding: "40px",
	borderRadius: '10px',
	background: "rgba(255, 255, 255, .5)"
})

const ReleaseTime = styled(GridFlex)({
	justifyContent: "space-between",
	fontWeight: 700
})

const ModalTop = styled("div")({
	padding: "16px",
	borderRadius: '10px',
	textAlign: "left"
})


const Top = styled(GridFlex)({
	padding: "16px",
	borderRadius: '10px',
	justifyContent: "space-between",
	textAlign: "left"
})


const Item = styled(MenuItem)({
	width: "100%",
	padding: "16px",
	borderBottom: '1px solid rgba(127,127,127, .34)',
})

const Confrim = styled(Button)({
	width: "100%",
	padding: "16px",
	borderRadius: "6px",
	marginTop: "16px",
	backgroundColor: "#F8CC82",
	color: "#000"
})

const Title = styled("div")({
	fontSize: "18px",
	fontWeight: 500,
})

const Blance = styled("div")({
	fontSize: '20px'
})

const Card = styled("div")({
	width: "100%",
	marginTop: "24px"
})

const CardTop = styled(GridFlex)({
	width: "100%",
	justifyContent: "center",
	textAlign: "center",
	alignItems: "stretch"
})


const CardBottom = styled(GridFlex)({
	width: "100%",
	justifyContent: "center",
	textAlign: "center",
	marginTop: "4px",
	alignItems: "stretch"
})

const CardContainer = styled("div")({
})

const CardItem = styled(GridFlex)({
	width: "33%",
	padding: "16px",
	justifyContent: "center",
	textAlign: "center",
	fontSize: "14px"
})

const Ol = styled("div")({
	fontSize: "44px",

})

const TopText = styled("div")({
})

const Text = styled("div")({
	marginTop: "8px"
})

const ClaimBtn = styled(Button)({
	marginTop: "8px",
	backgroundColor: "#F8CC82",
	padding: "8px",
	color: "#000",
	borderRadius: "8px",
	cursor: "pointer"
})


const More = styled(GridFlex)({
	margin: "16px 0",
	color: "#4E566C",
	fontSize: "16px",
	padding: "16px",
	cursor: "pointer"
})

const CardDetaile = styled("div")({
	padding: "16px",
	borderRadius: '10px',
	marginTop: "60px",
})

const Option = styled(GridFlex)({
	flex: 1,
	width: "100px",
	fontSize: "12px",
	color: "#4E566C",
	padding: "8px 0"
})

const Amount = styled("div")({
	fontSize: "12px",
	color: "#4E566C",
	textAlign: "right",
	padding: "8px 0",
	width: "70px"
})

const CardDetaileOl = styled("div")({
	width: "70px",
	fontSize: "12px",
	color: "#4E566C",
	textAlign: "left",
	padding: "8px 0"
})

interface rewardInfoList_ {
	speedLevel: string, // 释放等级
	recordBlock: BigNumber, // 收益产生的区块
	earnedTotal: string, // 已领取的收益总额
	rewardTotal: string, // 可领取的收益总额
	lastEarnedAmount: string, // 上次领取的份额
	lastEarnedBlock: BigNumber, // 上次领取收益的时间
	recordTimestamp: string, // 时间戳
}

interface InfoListType extends rewardInfoList_ {
	pendingTotal: string;
}


export const isPending = (pendingData: { [key: string]: boolean }, type: string, defaultText: string) => {
	return pendingData[type] ? "Pending..." : defaultText;
};

function Claim() {
	const theme = useAppSelector(state => state.theme.theme)
	const dispatch = useDispatch();
	const { chainID, provider, address } = useWeb3Context()
	const [infoList, setInfoList] = useState<InfoListType[]>([])
	const [detaileList, setDetaileList] = useState([])
	const [isOpen, setIsOpen] = useState(false)
	const [optionData, setOptionData] = useState({ id: 0, value: 180, gasSc: "0" })
	const [len, setLen] = useState(0)
	const [page, setPage] = useState(1)
	const [peddingStatus, setPeddingStatus] = useState({
		claim: false,
		confrim: false
	})
	const [thsBalance, setThsBalance] = useState("0.00")
	const [block, setBlock] = useState<InfoListType>()

	const handleClose = () => {
		setIsOpen(false)
	}

	const getList = useCallback(async (first: number) => {
		if (!!address && !!chainID && !!provider) {
			const signer = provider.getSigner();

			const StakingRewardReleaseContract = new ethers.Contract(addresses[chainID].StakingRewardRelease_ADDRESS, StakingRewardReleaseABI, signer)
			const info = await StakingRewardReleaseContract.getRewardByPage(address, 0, first)
			console.log("INFO", StakingRewardReleaseContract, info)
			const list: InfoListType[] = info?.rewardInfoList_.map((item: rewardInfoList_, idx: number) => ({
				earnedTotal: ethers.utils.formatUnits(item.earnedTotal.toString(), "gwei"),
				lastEarnedAmount: ethers.utils.formatUnits(item.lastEarnedAmount.toString(), "gwei"),
				lastEarnedBlock: item.lastEarnedBlock,
				recordBlock: item.recordBlock,
				pendingTotal: ethers.utils.formatUnits(info.pendingList_[idx].toString(), "gwei"),
				rewardTotal: ethers.utils.formatUnits(item.rewardTotal.toString(), "gwei"),
				speedLevel: item.speedLevel.toString(),
				recordTimestamp: item.recordTimestamp.toString()
			})) ?? [];

			setInfoList(list);
		}
	}, [chainID, address, provider])

	const getBalance = useCallback(async () => {
		if (!!address && !!chainID && !!provider) {
			const signer = provider.getSigner();

			const thsContract = new ethers.Contract(addresses[chainID].THS_ADDRESS as string, ierc20Abi, signer) as IERC20;
			const balanceBigNumber = await thsContract.balanceOf(address)
			const balance = ethers.utils.formatUnits(balanceBigNumber.toString(), "gwei")
			setThsBalance(Number(balance).toFixed(2))

		}
	}, [chainID, address, provider])


	const claim = async (blocakHight: BigNumber) => {
		const signer = provider.getSigner();
		const StakingRewardReleaseContract = new ethers.Contract(addresses[chainID].StakingRewardRelease_ADDRESS, StakingRewardReleaseABI, signer)
		console.log("StakingRewardReleaseContract", StakingRewardReleaseContract)
		StakingRewardReleaseContract.claim(blocakHight).then((res: any) => {
			console.log("RES", res)
		}).catch(() => {
			console.log("ERROR")
		})
		setTimeout(() => {
			setPeddingStatus({
				...peddingStatus,
				claim: false
			})
		}, 2000);

	}

	useEffect(() => {
		getBalance();
	}, [chainID, address, provider])

	useEffect(() => {
		getList(10 * page);
	}, [chainID, address, provider, page, peddingStatus])

	return (
		<Main>
			{isOpen && <CalimModal onClick={handleClose}>
				<Container onClick={(event) => {
					event.stopPropagation()
				}}
					style={{ backgroundColor: theme === THEME_LIGHT ? "#FAFAFAEF" : "#18253A" }}>
					<ReleaseTime style={{ color: theme === THEME_LIGHT ? "#010101" : "#768299" }}>
						<div> Release Time：{listDay[Number(block?.speedLevel)].value ?? 0}d</div>
						<div>SC:41</div>
					</ReleaseTime>
					<ModalTop
					>
						<FormControl style={{ width: "100%" }}>

							<Select
								style={{ width: "100%" }}
								defaultValue={listDay[len].value + "DAY"}
							>
								{listDay.slice(len + 1).map((item) => (<Item
									value={item.id}
									style={{ color: theme === THEME_LIGHT ? "#010101" : "#768299", cursor: "pointer" }}
									onClick={async (event) => {
										event.stopPropagation()
										setOptionData(item)
									}}
								>{item.value} DAY</Item>))}
							</Select>
						</FormControl>
					</ModalTop>
					<Confrim
						variant="contained"
						color="primary"
						onClick={async () => {
							setPeddingStatus({
								...peddingStatus,
								confrim: true
							})
							const signer = provider.getSigner();
							const StakingRewardReleaseContract = new ethers.Contract(addresses[chainID].StakingRewardRelease_ADDRESS, StakingRewardReleaseABI, signer);
							const SCContract = new ethers.Contract(addresses[chainID].ScaleCode_ADDRESS, ierc20Abi, signer);
							const balance = await SCContract.balanceOf(address);
							if (ethers.utils.parseUnits(optionData.value + "", "ether").lt(balance)) {
								const approveTx = await SCContract.approve(addresses[chainID].StakingRewardRelease_ADDRESS, ethers.utils.parseUnits(optionData.gasSc, "ether"));
								const info = await StakingRewardReleaseContract.speedUp(block?.recordBlock!, BigNumber.from(optionData.id))
								await approveTx.wait();
							} else {
								dispatch(error("SC Insufficient Balance"));
							}
							setTimeout(() => {
								setPeddingStatus({
									...peddingStatus,
									confrim: false
								})
								setOptionData({ id: 0, value: 180, gasSc: "0" });
								setIsOpen(false)
							}, 2000);
						}}>{isPending(peddingStatus, "confrim", "Confrim")}</Confrim>
				</Container>
			</CalimModal>}
			<Top style={{ backgroundColor: theme === THEME_LIGHT ? "#FAFAFAEF" : "#18253A", color: theme === THEME_LIGHT ? "#010101" : "#FFF" }}>
				<Title >THS:</Title>
				<Blance>{thsBalance}</Blance>
			</Top>
			{
				infoList.map((item, idx) => (<Card style={{ color: theme === THEME_LIGHT ? "#010101" : "#B6B7C8" }}>
					<CardTop>
						<CardItem style={{ backgroundColor: theme === THEME_LIGHT ? "rgba(255, 255, 255, 0.6)" : "#18253A" }}>
							<CardContainer>
								<Ol>
									{idx + 1}
								</Ol>
							</CardContainer>
						</CardItem>
						<CardItem style={{ margin: "0 4px", backgroundColor: theme === THEME_LIGHT ? "rgba(255, 255, 255, 0.6)" : "#18253A" }}>
							<CardContainer>
								<TopText>{listDay[Number(item.speedLevel)]?.value ?? 0} day</TopText>
								<Text>Release Time</Text>
								<ClaimBtn
									variant="contained"
									color="primary"
									disabled={item.speedLevel === "7"}
									onClick={() => {
										setIsOpen(true)
										setBlock(item)
										setLen(Number(item.speedLevel))
									}}
								>{isPending(peddingStatus, "confrim", "Accelerate")}</ClaimBtn>
							</CardContainer>
						</CardItem>
						<CardItem style={{ backgroundColor: theme === THEME_LIGHT ? "rgba(255, 255, 255, 0.6)" : "#18253A" }}>
							<CardContainer>
								<TopText>{item.pendingTotal} THS</TopText>
								<Text>Unclaimed</Text>
								<ClaimBtn
									variant="contained"
									color="primary"
									disabled={!Number(item.pendingTotal)}
									onClick={() => {
										setPeddingStatus({
											...peddingStatus,
											claim: true
										})
										claim(item.recordBlock)
									}}
								>{isPending(peddingStatus, "claim", "Claim")}</ClaimBtn>
							</CardContainer>
						</CardItem>
					</CardTop>
					<CardBottom>
						<CardItem style={{ backgroundColor: theme === THEME_LIGHT ? "rgba(255, 255, 255, 0.6)" : "#18253A" }}>
							<CardContainer>
								<TopText>{+new Date(Number(item.recordTimestamp))}</TopText>
								<Text>Unstable Time</Text>
							</CardContainer>
						</CardItem>
						<CardItem style={{ backgroundColor: theme === THEME_LIGHT ? "rgba(255, 255, 255, 0.6)" : "#18253A", margin: "0 4px" }}>
							<CardContainer>
								<TopText>{item.rewardTotal} THS</TopText>
								<Text>Profit Balance</Text>
							</CardContainer>
						</CardItem>
						<CardItem style={{ backgroundColor: theme === THEME_LIGHT ? "rgba(255, 255, 255, 0.6)" : "#18253A" }}>
							<CardContainer>
								<TopText>{item.lastEarnedAmount} THS</TopText>
								<Text>Received</Text>
							</CardContainer>
						</CardItem>
					</CardBottom>
				</Card >))
			}

			{!!infoList.length && (infoList.length === page * 10) && <More
				onClick={() => {
					setPage(page + 1)
				}}
				style={{ backgroundColor: theme === THEME_LIGHT ? "rgba(255, 255, 255, 0.6)" : "#18253A" }}>view more</More>}

			<CardDetaile style={{ backgroundColor: theme === THEME_LIGHT ? "#FAFAFAEF" : "#18253A" }}>
				<Item>
					<CardDetaileOl>hash</CardDetaileOl>
					<Option>time</Option>
					<Amount>SC amount</Amount>
				</Item>
				{detaileList.map((item) => (
					<React.Fragment>
						<Item>
							<CardDetaileOl>1</CardDetaileOl>
							<Option>{+new Date()}</Option>
							<Amount>13231.23123</Amount>
						</Item>
						<Item>
							<CardDetaileOl>2</CardDetaileOl>
							<Option>{+new Date()}</Option>
							<Amount>12.323</Amount>
						</Item>
						<Item>
							<CardDetaileOl>3</CardDetaileOl>
							<Option>{+new Date()}</Option>
							<Amount>123456.78</Amount>
						</Item>
					</React.Fragment>
				))}
				{!!detaileList.length && <More style={{ backgroundColor: theme === THEME_LIGHT ? "rgba(255, 255, 255, 0.6)" : "#18253A" }}> view more</More>}
			</CardDetaile>

		</Main>
	)
}
export default Claim
