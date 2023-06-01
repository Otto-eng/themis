
import { useState, useEffect } from "react"

interface SingleCaseType {
	key: string
}


function useSingleCase({ key }: SingleCaseType) {
	const [state, setState] = useState<string[]>((localStorage.getItem(key) ?? "").split(",").filter(item => item))
	const [hash, setHash] = useState<string>()

	useEffect(() => {
		const keys = localStorage.getItem(key)
		if (!keys) {
			localStorage.setItem(key, "")
		} else {
			const keyList: string[] = keys.split(",")
			setState(Array.from(new Set(keyList)))
		}
	}, [])

	useEffect(() => {
		if (hash) {
			const keys = localStorage.getItem(key)
			if (!keys) {
				localStorage.setItem(key, hash)
				setState(Array.from(new Set([hash])))
			} else {
				const keyList: string[] = keys.split(",")
				const strList = [...keyList, hash]
				localStorage.setItem(key, strList.join(","))
				setState(Array.from(new Set(strList)))
			}
		}
	}, [hash])
	return ({
		infoHash: state,
		setHash
	})
}

export default useSingleCase