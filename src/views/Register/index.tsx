import { useState, useEffect } from "react";
import { ethers } from "ethers";

import { Container, Grid, Button, styled } from "@material-ui/core";
import { FormFieldsGroup } from "src/components/Input";
import { useAddress, useAppSelector, useWeb3Context } from "src/hooks";
import { getFormatedAddressForShow } from "src/utils";
import { Title } from "./components/Title";
import { addresses, THEME_LIGHT, ZERO_ADDRESS } from "src/constants";


import { abi as RelationshipABI } from "src/abi/Relationship.json";
import { invitationIdCode } from "src/utils/invitationIdCode";
import { isPending } from "../Claim";
import { useHistory } from "react-router-dom";
import { t } from "@lingui/macro";


const GridFlex = styled(Grid)({
	display: "flex"
})

const Confirm = styled(GridFlex)({
	width: "100%",
	justifyContent: "center",
	alignItems: "center"
})

const StyledGrid = styled(GridFlex)({
	padding: "48px 24px",
	marginTop: "16px",
	marginBottom: "42px",
	backgroundColor: "#18253a"
})

const RegisterButton = styled(Button)({
	marginTop: "28px"
});


interface RegisterFormValues {
	address?: string | null;
	invitationId?: string | null;
}

interface FormFieldsProps {
	address: boolean;
	invitationId: boolean;
}


type FieldNameKeys = "address" | "invitationId";

const DEFAULT_FEILDS_VALUE = {
	address: false,
	invitationId: false,
};

function Register() {
	const history = useHistory()
	const theme = useAppSelector(state => state.theme.theme)
	const address = useAddress()
	const { chainID, provider } = useWeb3Context()
	const [values, updateValues] = useState<RegisterFormValues>({ address, invitationId: "" });
	const [validations, setValidations] = useState<FormFieldsProps>(DEFAULT_FEILDS_VALUE);
	const [corrects, setCorrects] = useState<FormFieldsProps>(DEFAULT_FEILDS_VALUE);
	const [showWarn, setShowWarn] = useState<boolean>(false);
	const [isInvited, setIsInvited] = useState<boolean>(false);
	const [isConfig, setIsConfig] = useState<boolean>(false);
	const [config, setConfig] = useState<boolean>(false);
	const [userRegisterInvitedCode, setUserRegisterInvitedCode] = useState("");

	function onChange(value: string, keyName: FieldNameKeys) {
		console.log("value", values, value, keyName)
		values[keyName] = value;
		updateValues({ ...values });
	}

	function onClear(keyName: FieldNameKeys) {
		values[keyName] = "";
		updateValues({ ...values });
	}

	useEffect(() => {
		updateValues((v) => {
			v.address = address;
			return { ...v };
		});
		setCorrects({
			...corrects,
			address: !!address
		});
	}, [address, updateValues, setCorrects]);

	const serachRelationship = async (pro: ethers.providers.JsonRpcProvider) => {
		const signer = pro.getSigner();

		const RelationshipContract = new ethers.Contract(addresses[chainID].Relationship_ADDRESS as string, RelationshipABI, signer)

		let defaultCode = await RelationshipContract.defaultInviteCode()
		let invitedAddress = await RelationshipContract.getInviter(address)
		let paramsObj: { [key: string]: any } = {}
		if (location.search) {
			const [_firstStr, nextStr] = location.search.split("?")
			if (nextStr) {
				const arr = nextStr.split("&")
				arr.forEach((item) => {
					const [key, value] = item.split("=")
					paramsObj[key] = value
				})
			}
		}
		if (paramsObj["initCode"]) {
			defaultCode = paramsObj["initCode"]
		}
		const info = await RelationshipContract.RegisterInfoOf(address)
		if (!!info?.inviterCode && !!info.inviter) {
			// inviter
			invitedAddress = info.inviter;
			defaultCode = info.inviterCode;
			setUserRegisterInvitedCode(defaultCode)
		}

		setIsInvited(invitedAddress !== ZERO_ADDRESS)

		updateValues({
			...values,
			invitationId: defaultCode
		})
	}

	useEffect(() => {
		if (address && chainID && provider && addresses[chainID]?.Relationship_ADDRESS) {
			serachRelationship(provider)
		}
	}, [address, chainID, provider, addresses])



	async function onConfirm() {
		setIsConfig(true)
		if (address && chainID && !!provider && !!addresses && values.address && values.invitationId) {
			try {
				const signer = provider.getSigner();
				const RelationshipContract = new ethers.Contract(addresses[chainID].Relationship_ADDRESS as string, RelationshipABI, signer)
				let currentInvitationId = invitationIdCode()
				let flag = true
				do {
					const add = await RelationshipContract.AddressOf(currentInvitationId)
					if (add === ZERO_ADDRESS) {
						flag = false
					}
					currentInvitationId = invitationIdCode()
				} while (flag);
				const infoHash = await RelationshipContract.register(values.invitationId, currentInvitationId);
				await infoHash.wait()
				if ("hash" in infoHash) {
					const info = await RelationshipContract.provider.getTransactionReceipt(infoHash.hash)
				}
				setTimeout(() => {
					setIsConfig(false)
					setConfig(true)
					setUserRegisterInvitedCode(values.invitationId ?? "")
				}, 500);
				setTimeout(() => {
					history.replace("/stake")
				}, 2000);
			} catch (error) {
				console.log("CONFIG", error)
				setTimeout(() => {
					setIsConfig(false)
				}, 2000);
			}
		} else {
			const isAddress = !values.address
			const isInvitationId = !values.invitationId
			setValidations({
				address: isAddress,
				invitationId: isInvitationId
			})
			setShowWarn(isInvitationId || isAddress)
		}
	}


	return (
		<Container>
			<StyledGrid style={{ backgroundColor: theme === THEME_LIGHT ? "rgba(255, 255, 255, .6)" : "#18253A" }} container>
				<GridFlex container justify="center">
					<Title
						size={24}
						weight={400}
						height={30}
						color={theme === THEME_LIGHT ? "#000" : "#F9FAFC"}
						align="center"
						text={t`Bind Invitation ID`}
					/>
				</GridFlex>
				<FormFieldsGroup fields={[
					{
						top: 46,
						keyName: "address",
						readOnly: true,
						error: validations.address,
						correct: corrects.address,
						type: "text",
						label: t`Wallet Address`,
						placeholder: t`Wallet address`,
						warn: (!!address || !showWarn) ? `` : t`Please connect wallet`,
						value: getFormatedAddressForShow(values.address || "", { startNum: 10, endNum: 34 }),
						onClear: onClear,
						onChange: onChange,
					},
					{
						top: 28,
						keyName: "invitationId",
						readOnly: false,
						error: validations.invitationId,
						correct: corrects.invitationId,
						type: "text",
						label: t`Invitation ID`,
						placeholder: t`Invitation ID`,
						warn: !validations.invitationId || !showWarn ? `` : t`Please enter the correct invitation ID`,
						value: values.invitationId,
						onClear: onClear,
						onChange: onChange,
					},
				]} />
				<Confirm>
					<RegisterButton
						className="stake-button"
						variant="contained"
						color="primary"
						disabled={config || !!isInvited || !(!!values.invitationId && !!values.address)}
						onClick={onConfirm}
						key={isConfig + "config"}
					>
						{isPending({ config: isConfig }, "config", userRegisterInvitedCode ? t`Success` : t`Confirm`)}
					</RegisterButton>
				</Confirm>
			</StyledGrid>
		</Container >
	);
}

export default Register