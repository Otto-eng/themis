import { BigNumber, ethers } from "ethers";
import { useCallback } from "react";
import { addresses } from "../constants";
import { abi as PresaleContractABI } from "src/abi/PresaleContract.json";
import { useWeb3Context } from "./web3Context";

export const useBuyFtn = () => {
	const { provider, chainID, address } = useWeb3Context();
	return useCallback(
		async (amount1: string) => {
			const balance1 = ethers.utils.parseUnits(Math.floor(parseFloat(amount1) * 100).toString(), "ether")
				.div(BigNumber.from("100"));
			if (provider) {

			}
			const signer = provider.getSigner();

			const PresaleContractContract = new ethers.Contract(addresses[chainID].IDO_PRESALECONTRACT_ADDRESS as string, PresaleContractABI, signer);
			console.log("PresaleContractContract", PresaleContractContract);
			
			const infoHash = await PresaleContractContract.buyPreTHS(addresses[chainID].USDT_ADDRESS, balance1)
			console.log("infoHash", infoHash)
			await infoHash.wait();

			return await PresaleContractContract.provider.getTransactionReceipt(infoHash.hash)
		},
		[provider, chainID, address, addresses]
	);
};