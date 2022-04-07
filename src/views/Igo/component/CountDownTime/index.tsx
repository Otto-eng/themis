import { Dispatch, SetStateAction, useEffect, useState } from "react"
// import { useTranslation } from "react-i18next"
import styled from "styled-components"
import { GridFlex } from "../../../../components/Grid"
import Border1 from "../../../../images/home/time-bg@2x.png"


const CountDownTimeMain = styled(GridFlex)`
	width: 100%;
	justify-content: center;
	align-items: center;
`

const Main = styled.div`
	background-image: ${`url(${Border1})`};
	background-size: 100% 100%;
	width: 60%;
	height: 70px;
	margin-top: 8px;
	padding: 16px;
	box-sizing: border-box;
`

const BlockPrice = styled.div`
  color: ${({ color }) => color ?? "#FFF"};
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
`

const Value = styled(GridFlex)`
	font-weight: bold;
	line-height: 14px;
	color: #341B17;
	opacity: 1;
	font-size: 30px;
	flex: 1;
	justify-content: center;
`

const Tips = styled(GridFlex)`
font-size: 12px;
	font-weight: 400;
	line-height: 14px;
	color: #341B17;
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
	isStart: boolean
	setIsStart: Dispatch<SetStateAction<boolean>>
}


function CountDownTime({ setIsStart }: CountDownTimeProps) {
	// const { t } = useTranslation()
	const [blockPrice] = useState<string>("1")
	const [date, setDate] = useState<{ d?: number, h?: number, m?: number, s?: number }>({ h: 1 })
	useEffect(() => {
		const { d, h, m, s } = date || {}
		if (d || h || m || s) {
			setTimeout(() => {
				const currentDete = +new Date()
				const now = Math.floor(Number(+new Date("2022/01/26 15:00:00") - currentDete) / 1000) > 0 ? (+new Date("2022/01/26 15:00:00") - currentDete) : (+new Date("2022/02/15 15:00:00") - currentDete);
				const d = Math.floor(now / 1000 / 3600 / 24);
				const h = Math.floor(((now / 1000 / 3600 / 24) - d) * 24)
				const m = Math.floor(((((now / 1000 / 3600 / 24) - d) * 24) - h) * 60)
				const s = Math.floor(((((((now / 1000 / 3600 / 24) - d) * 24) - h) * 60) - m) * 60)
				setIsStart((Math.floor(Number(+new Date("2022/01/26 15:00:00") - currentDete) / 1000) > 0) || (Math.floor(Number(currentDete - +new Date("2022/02/15 15:00:00")) / 1000) > 0))
				if (Math.floor(Number(currentDete - +new Date("2022/02/15 15:00:00")) / 1000) > 0) {
					setDate({ d: 0, h: 0, m: 0, s: 0 })
				} else {
					setDate({ d, h, m, s })
				}
			}, 1000);
		}
	}, [date])

	return (
		<>
			<CountDownTimeMain>
				<BlockPrice>{blockPrice} MCT ≈ 0.30 USDT(BEP20）</BlockPrice>
			</CountDownTimeMain>
			<CountDownTimeMain>
				<Main>
					<Top>
						<Value>{date?.d ? (date.d < 10 ? ("0" + date.d) : (date.d ?? "00")) : "00"}</Value>
						<Division />
						<Value>{date?.h ? (date.h < 10 ? ("0" + date.h) : (date.h ?? "00")) : "00"}</Value>
						<Division />
						<Value>{date?.m ? (date.m < 10 ? ("0" + date.m) : (date.m ?? "00")) : "00"}</Value>
						<Division />
						<Value>{date?.s ? (date.s < 10 ? ("0" + date.s) : (date.s ?? "00")) : "00"}</Value>
					</Top>
					<Bottom>
						{/* <Tips>{t("days")}</Tips> */}
						{/* <Tips>{t("hrs")}</Tips> */}
						{/* <Tips>{t("mins")}</Tips> */}
						{/* <Tips>{t("secs")}</Tips> */}
					</Bottom>
				</Main>
			</CountDownTimeMain>
		</>
	)
}

export default CountDownTime