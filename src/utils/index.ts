export const getFormatedAddressForShow = (
	address?: string | null,
	option?: { startNum: number; endNum: number }
) => {
	if (!address) {
		return "";
	}

	return `${address.slice(0, option?.startNum || 6)}...${address.slice(
		option?.endNum || address.length - 4
	)}`;
};

export const isEmailAddress = (email: string | null | undefined) => {
	if (!email) {
		return false;
	}
	return /^([a-zA-Z]|[0-9])(\w|-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/.test(email);
};

export const getErrorPromise = (err: { code?: number; message?: string }) => {
	return new Promise((_resolve, reject) => {
		reject(err);
	});
};

// 保留两位小数（直接截取）
export const handleToFixed = (numbers: string | number) => {
	if (!numbers) {
		return "0.00";
	}
	if (typeof numbers === "number") {
		numbers = `${numbers}`;
	}
	if (numbers.includes(",")) numbers = numbers.replaceAll(",", "");
	const [firstNumber, floats] = numbers.split(".");
	let endFloat = "00";
	if (floats && floats.length > 0) {
		if (floats.length > 1) {
			endFloat = floats.slice(0, 2);
		} else {
			endFloat = floats[0] + "0";
		}
	}
	return `${firstNumber}.${endFloat}`;
};

export const getContentLabel = (key: number) => {
	let text = "offered";
	switch (key) {
		case 2:
			text = "sell";
			break;
		case 1:
		case 3:
		case 4:
		case 5:
			text = "placed a bid";
			break;
		default:
			break;
	}
	return text;
};
