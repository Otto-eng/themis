import { Dispatch, SetStateAction, useEffect, useState } from "react"
import styled from "styled-components"
import { GridFlex } from "../../../../components/Grid"


const CountDownTimeMain = styled(GridFlex)`
	width: 100%;
	justify-content: center;
	align-items: center;
	margin-top: 60px;
`

const Main = styled.div`
	width: 60%;
	height: 70px;
	margin-top: 8px;
	padding: 16px;
	box-sizing: border-box;
	background-color: #FFF;
	border-radius: 10px;
`

const Top = styled(GridFlex)`
	width: 100%;
	height: 60%;
	justify-content: space-between;
	align-items: center;
`

const Bottom = styled(GridFlex)`
	width: 100%;
	height: 40%;
	justify-content: space-between;
	align-items: center;
	margin-top:	8px;
`

const Value = styled(GridFlex)`
	font-weight: bold;
	line-height: 14px;
	color: #000000;
	opacity: 1;
	font-size: 30px;
	flex: 1;
	justify-content: center;
`

const Tips = styled(GridFlex)`
font-size: 12px;
	font-weight: 400;
	line-height: 14px;
	color: #000000;
	opacity: 1;
	flex: 1;
	justify-content: center;
`

const Division = styled.div`
  width: 0px;
  height: 12px;
  border: 1px solid #45382D;
	opacity: 0.4;
`

interface CountDownTimeProps {
	startTimestamp: number,
	endTimestamp: number,
	setIsStart: Dispatch<SetStateAction<boolean>>
}


function CountDownTime({ setIsStart, startTimestamp, endTimestamp }: CountDownTimeProps) {
	const [date, setDate] = useState<{ d?: number, h?: number, m?: number, s?: number }>({ d: 1 })
	// useEffect(() => {
	// 	const { d, h, m, s } = date || {}
	// 	if ((d || h || m || s) && !!startTimestamp && !!endTimestamp) {
	// 		setTimeout(() => {
	// 			const currentDete = +new Date() / 1000
	// 			const now = Math.floor(Number(startTimestamp - currentDete)) > 0 ? (startTimestamp - currentDete) : (endTimestamp - currentDete);
	// 			const d = Math.floor(now / 3600 / 24);
	// 			const h = Math.floor(((now / 3600 / 24) - d) * 24)
	// 			const m = Math.floor(((((now / 3600 / 24) - d) * 24) - h) * 60)
	// 			const s = Math.floor(((((((now / 3600 / 24) - d) * 24) - h) * 60) - m) * 60)
	// 			setIsStart((Math.floor(Number(currentDete - startTimestamp)) > 0) && (Math.floor(Number(endTimestamp - currentDete)) > 0))
	// 			if (Math.floor(Number(currentDete - endTimestamp)) > 0) {
	// 				setDate({ d: 0, h: 0, m: 0, s: 0 })
	// 			} else {
	// 				setDate({ d, h : h + 24 * d, m, s })
	// 			}
	// 		}, 1000);
	// 	}
	// }, [date, startTimestamp, endTimestamp])

	return (
		<CountDownTimeMain>
			<Main>
				<Top>
					{/* <Value>{date?.d ? (date.d < 10 ? ("0" + date.d) : (date.d ?? "00")) : "00"}</Value>  */}
					{/* <Division /> */}
					<Value>{date?.h ? (date.h < 10 ? ("0" + date.h) : (date.h ?? "00")) : "00"}</Value>
					<Division />
					<Value>{date?.m ? (date.m < 10 ? ("0" + date.m) : (date.m ?? "00")) : "00"}</Value>
					<Division />
					<Value>{date?.s ? (date.s < 10 ? ("0" + date.s) : (date.s ?? "00")) : "00"}</Value>
				</Top>
				<Bottom>
					{/* <Tips>{"days"}</Tips> */}
					<Tips>{"hrs"}</Tips>
					<Tips>{"mins"}</Tips>
					<Tips>{"secs"}</Tips>
				</Bottom>
			</Main>
		</CountDownTimeMain>
	)
}

export default CountDownTime