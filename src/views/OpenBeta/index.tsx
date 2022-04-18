import { Button, createStyles, InputBase, makeStyles, Paper, Theme, useMediaQuery } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import { ethers } from "ethers";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addresses, THEME_LIGHT } from "src/constants";
import { useAppSelector, useWeb3Context } from "src/hooks";
import { error } from "src/slices/MessagesSlice";
import styled from "styled-components";
import { isPending } from "../Claim";

import { abi as RegisterFormABI } from "src/abi/RegisterForm.json";
import { GridFlex } from "src/components/Grid";



const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			padding: '2px 0',
			display: 'flex',
			alignItems: 'center',
			width: "100%",
			maxWidth: "750px",
			marginTop: "24px",
		},
		input: {
			flex: 1,
			fontSize: "14px",
			borderRadius: "10px",
			bakcground: "transparent",
			paddingLeft: "16px"
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


const Main = styled(GridFlex)({
	width: "100%",
	padding: "100px 0 0",
	backgroundColor: "transparent",
	justifyContent: "center",
	alignItems: "center",
	minWidth: "350px"
})

const Container = styled("div")({
	padding: "60px 24px",
	borderRadius: "24px",
	minWidth: "300px"
})


const Title = styled("div")({
	width: "100%",
	textAlign: "center",
	fontWeight: 700
})

const Address = styled("div")({
	width: "100%",
	marginTop: "40px",
	fontSize: "2vw",
	textAlign: "center"
})

const SendBtn = styled(Button)({
	width: "100%",
	maxWidth: "750px",
	backgroundColor: "#87A7B8",
	fontSize: "24px",
	marginTop: "24px !important",
	borderRadius: "4px"
})


export default function OpenBeta() {
	const isSmallScreen = useMediaQuery("(max-width: 750px)");

	const classes = useStyles();
	const { address, provider, chainID } = useWeb3Context();
	const [value, setValue] = useState("")
	const [registerInfo, setRegisterInfo] = useState("")
	const [num, setNum] = useState(0)
	const dispatch = useDispatch();
	const [pendingStatus, setPeddingStatus] = useState({
		submit: false,
	})
	const theme = useAppSelector(state => state.theme.theme)

	const registerForm = useCallback(
		async () => {
			const signer = provider.getSigner();
			try {
				const RegisterFormContract = new ethers.Contract(addresses[chainID].RegisterForm_ADDRESS, RegisterFormABI, signer);
				const registerInfo = await RegisterFormContract.registerOf(address);
				if (registerInfo) {
					setRegisterInfo(registerInfo)
					setValue(registerInfo)
				}
			} catch (error) {

			}
			setTimeout(() => {
				setPeddingStatus({
					submit: false
				})
			}, 2000);
		},
		[address, provider, chainID, addresses, num],
	)


	useEffect(() => {
		if (address && provider && chainID && addresses[chainID]?.RegisterForm_ADDRESS) {
			registerForm()
		}
	}, [address, provider, chainID, addresses, num])

	return (
		<Main>
			<Container
				style={{ backgroundColor: theme === THEME_LIGHT ? "#FAFAFA" : "#18253A" }}
			>
				<Title style={{ fontSize: isSmallScreen ? "5vw" : "3vw" }}>Welcom to themis open beta </Title>
				<Address>{address ? address : <Skeleton width="100%" />}</Address>
				<Paper component="form" className={classes.root}>
					<InputBase
						className={classes.input}
						inputProps={{ 'aria-label': 'search google maps' }}
						onChange={(e) => {
							const strN = e.target.value
							setValue(strN)
						}}
						disabled={!!registerInfo || pendingStatus.submit}
						value={value}
						placeholder={"Telegram Username"}
						style={{ border: `1px solid ${theme === THEME_LIGHT ? "#000000" : "#FFFFFF"}` }}
					/>
				</Paper>
				<SendBtn
					variant="contained"
					color="primary"
					disabled={!value.trim() || !!registerInfo || !address || !provider || pendingStatus.submit}
					key={pendingStatus.submit + ""}
					onClick={async () => {
						if (pendingStatus.submit) return;
						setPeddingStatus({
							submit: true
						})
						const signer = provider.getSigner();
						try {
							const RegisterFormContract = new ethers.Contract(addresses[chainID].RegisterForm_ADDRESS, RegisterFormABI, signer);
							if (!!value.trim()) {
								console.log("value", value)
								console.log("RegisterFormContract", RegisterFormContract)
								const infoHash = await RegisterFormContract.register(value)
								console.log("infoHash", infoHash)
								await infoHash.wait();
								const info = await RegisterFormContract.provider.getTransactionReceipt(infoHash.hash)
								setNum(num + 1)
							} else {
								dispatch(error("Please enter the Telegram Username"));
							}
						} catch (err) {
							dispatch(error("The Telegram ID have been register"))
							setTimeout(() => {
								setPeddingStatus({
									submit: false
								})
							}, 2000);
						}

					}}
				>
					{isPending(pendingStatus, "submit", registerInfo ? "Success" : "Submit")}
				</SendBtn>
			</Container>
		</Main>
	)
}
