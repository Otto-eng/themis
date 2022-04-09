import { StaticJsonRpcProvider, Web3Provider } from "@ethersproject/providers";
import { BigNumber, ethers } from "ethers";
import { useCallback } from "react";
import { NetworkID } from "src/lib/Bond";
import { addresses, USDT_DECIMAL } from "../constants";
import { getErrorPromise } from "../utils";
import { abi as UsdtBondContractABI } from "src/abi/UsdtBondDepository.json";
import { useWeb3Context } from "./web3Context";


export const useMcDaoShopContractV2 = (chainID: NetworkID, provider: StaticJsonRpcProvider) => {
	return new ethers.Contract(
		addresses[chainID].BONDINGCALC_ADDRESS as string,
		UsdtBondContractABI,
		provider,
	)
};

export const useTetherContract = (chainID: NetworkID, provider: StaticJsonRpcProvider) => {
	return new ethers.Contract(
		addresses[chainID].BONDINGCALC_ADDRESS as string,
		UsdtBondContractABI,
		provider,
	)
};

export const useSYNTokenContract = (chainID: NetworkID, provider: StaticJsonRpcProvider) => {
	return new ethers.Contract(
		addresses[chainID].BONDINGCALC_ADDRESS as string,
		UsdtBondContractABI,
		provider,
	)
};

export const useBuyFtn = () => {
	// const contract1 = useMcDaoShopContract();
	const { chainID, provider } = useWeb3Context()
	const contract2 = useMcDaoShopContractV2(chainID, provider);
	const tetherContract = useTetherContract(chainID, provider);
	const ftnTokenContract = useSYNTokenContract(chainID, provider);
	return useCallback(
		async (amount1: string) => {
			const balance1 = BigNumber.from(Math.floor(parseFloat(amount1) * 100).toString())
				.mul(USDT_DECIMAL)
				.div(BigNumber.from("100"));
			// 	if (!ftnTokenContract || !library /*|| !contract1 */ || !contract2 || !tetherContract) {
			// 		return await getErrorPromise({ code: -1, message: "contract undefined." });
			// 	}

			// 	const gasPrice = await library.getGasPrice();
			// 	/**
			// 	 * MCDAO_IGO_SHOP_ADDRESS igo 第一二阶段
			// 	 * MCDAO_IGO_SHOPV2_ADDRESS igo 第三阶段
			// 	 */

			// 	await tetherContract.approve(MCDAO_IGO_SHOPV2_ADDRESS, balance1, {
			// 		gasLimit: 550000,
			// 		gasPrice,
			// 	});
			// 	if (!!Number(amount2)) {
			// 		await ftnTokenContract.approve(MCDAO_IGO_SHOPV2_ADDRESS, balance2, {
			// 			gasLimit: 550000,
			// 			gasPrice,
			// 		});
			// 		return await contract2.buyMcDaoV2(USDT_ADDRESS, balance1, SYN_TOKEN_ADDRESS, balance2, {
			// 			gasLimit: 550000,
			// 			gasPrice,
			// 		});
			// 	} else {
			// 		return await contract2.buyMcDao(balance1, {
			// 			gasLimit: 550000,
			// 			gasPrice,
			// 		});
			// 	}


		},
		[ /* contract1,  */contract2, tetherContract]
	);
};