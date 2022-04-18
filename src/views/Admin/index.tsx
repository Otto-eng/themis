import { makeStyles, Theme, createStyles, InputBase, Paper, Button } from "@material-ui/core";
import { useState, useCallback, useEffect } from "react";
import { addresses, THEME_LIGHT } from "src/constants";
import { useWeb3Context } from "src/hooks/web3Context";
import { debounce } from "src/utils/debounce";
import styled from "styled-components"
import { isPending } from "../Claim";
import { abi as ThemisERC20TokenABI } from "src/abi/ThemisERC20Token.json";
import { BigNumber, ethers } from "ethers";
import { error, info } from "src/slices/MessagesSlice";
import { useDispatch } from "react-redux";
import { useAppSelector } from "src/hooks";
import { GridFlex } from "src/components/Grid";
import copy from "copy-to-clipboard"
import React from "react";

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
		divider: {
			height: "20px",
			width: "100%"
		},
	}),
);

const Container = styled.div`
  width: 100%;
  padding: 0 15%;
  @media (max-width: 750px) {
    width: 100%;
    padding: 0;
  }
`

const Send = styled(Button)({
	width: "100%",
	padding: "16px",
	borderRadius: "6px",
	backgroundColor: "#F8CC82",
	color: "#000"
})

const Card = styled("div")({
	padding: "16px",
	borderRadius: '10px',
	marginTop: "16px",
})

const Item = styled(GridFlex)({
	padding: "8px 0",
	borderBottom: "1px solid rgba(127, 127, 127, 0.12)"
})

const Amount = styled("div")({
	fontSize: "12px",
	textAlign: "right",
	padding: "8px 0",
	width: "70px"
})

const Ol = styled("div")({
	width: "100%",
	fontSize: "12px",
	textAlign: "center",
	padding: "8px 0",
	cursor: "pointer"
})

const Option = styled(GridFlex)({
	flex: 1,
	width: "100px",
	fontSize: "12px",
	padding: "8px 0"
})

const More = styled(GridFlex)({
	margin: "16px 0",
	fontSize: "14px",
	cursor: "pointer"
})


export default function Admin() {
	const dispatch = useDispatch()
	const [value, setValue] = useState<string>("")
	const [pendingStatus, setPendingStatus] = useState({ update: false, remove: false });
	const { chainID, address, provider } = useWeb3Context();

	const theme = useAppSelector(state => state.theme.theme)
	const classes = useStyles();

	const [robotPage, setRobotPage] = useState(1)
	const [robotList, setRobotList] = useState<string[]>([])


	const getRootDetail = useCallback(
		async () => {
			const signer = provider.getSigner();
			try {
				const thsContract = new ethers.Contract(addresses[chainID]?.THS_ADDRESS, ThemisERC20TokenABI, signer);
				const robotByPage = await thsContract.getRobotByPage(BigNumber.from("0"), BigNumber.from(robotPage * 10));
				// setRobotList(robotByPage)
				console.log("robotByPage", robotByPage)
			} catch {
				setRobotList([])
			}
		},
		[address, chainID, provider, addresses, robotPage]
	)

	useEffect(() => {
		if (address && chainID && provider && addresses[chainID]?.THS_ADDRESS) {
			getRootDetail()
		}
	}, [address, chainID, provider, addresses, robotPage])

	const setRoot = useCallback(
		async (key: string) => {
			if (!value) {
				dispatch(error("Please enter address!"));
				return;
			}
			const flag = key === "update";
			const keyWord = key === "update" ? "UPDATE" : "REMOVE"
			setPendingStatus({ ...pendingStatus, [key]: true })
			const signer = provider.getSigner();
			try {

				const thsContract = new ethers.Contract(addresses[chainID]?.THS_ADDRESS, ThemisERC20TokenABI, signer);
				let infoHash: any;
				if (flag) {
					infoHash = await thsContract.setRobot(value, true)
				} else {
					infoHash = await thsContract.setRobot(value, false)
				}
				await infoHash.wait();

				const res = await thsContract.provider.getTransactionReceipt(infoHash.hash)
				dispatch(info(`${keyWord} ${value} SUCCESS`))
				setTimeout(() => {
					setPendingStatus({ ...pendingStatus, [key]: false })
					setValue("")
				}, 2000);
			} catch (error) {
				setTimeout(() => {
					dispatch(info(`${keyWord} ${value} ERROR`))
					setPendingStatus({ ...pendingStatus, [key]: false })
				}, 2000);
			}

		}, [address, chainID, provider, addresses, value])

	return (
		<Container>
			<Paper component="form" className={classes.root}>
				<InputBase
					className={classes.input}
					inputProps={{ 'aria-label': 'search google maps' }}
					onChange={(e) => {
						const strN = e.target.value
						setValue(strN)
					}}
					value={value}
					placeholder={"Please enter address"}
				/>
			</Paper>
			<Send
				variant="contained"
				color="primary"
				disabled={pendingStatus.update || pendingStatus.remove}
				key={pendingStatus.update + "UPDATE"}
				onClick={() => debounce(() => setRoot("update"), 500)}
			>
				{isPending(pendingStatus, "update", "UPDATE")}
			</Send >
			<div className={classes.divider}></div>
			<Send
				variant="contained"
				color="primary"
				disabled={pendingStatus.update || pendingStatus.remove}
				key={pendingStatus.update + "REMOVE"}
				onClick={() => debounce(() => setRoot("remove"), 500,)}
			>
				{isPending(pendingStatus, "remove", "REMOVE")}
			</Send >
			{/* <Card style={{ backgroundColor: theme === THEME_LIGHT ? "#FAFAFA" : "#18253A" }}>
				<Item>
					<Ol>address</Ol>
				</Item>
				{robotList.map((item) => <React.Fragment>
					<Item>
						<Ol onClick={() => {
							copy(item)
						}} style={{ cursor: "pointer" }}>{item}</Ol>
					</Item>
				</React.Fragment>)}
				<More
					style={((robotPage * 10) > robotList.length) ? ({ display: "none" }) : ({})}
					onClick={() => {
						setRobotPage(robotPage + 1)
					}}>view more</More>
			</Card> */}
		</Container>
	)
}
