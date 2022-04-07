import React from "react"
import styled from "styled-components"
import { GridFlex } from "../Grid"

const BgMainFlexBox = styled(GridFlex)<{ imgsrc: string }>`
	justify-content: center;
	align-items: center;
  background-image: ${({ imgsrc }) => `url(${imgsrc})`};
  background-size: 100% 100%;
  background-repeat: no-repeat;
  width: 100%;
  box-sizing: border-box;
`

const BgMainBox = styled.div<{ imgsrc: string }>`
  background-image: ${({ imgsrc }) => `url(${imgsrc})`};
  background-size: 100% 100%;
  background-repeat: no-repeat;
  width: 100%;
  box-sizing: border-box;
`

interface BgMainProps {
	imgsrc: string,
	flexBox?: boolean,
	style?: React.CSSProperties,
	children?: React.ReactNode,
	handleClick?: React.MouseEventHandler<HTMLDivElement> | undefined
}

function BgMain({ imgsrc, handleClick, flexBox, style, children }: BgMainProps) {

	const Box = flexBox ? BgMainFlexBox : BgMainBox;

	return <Box onClick={handleClick} imgsrc={imgsrc} style={style}>
		{children}
	</Box>
}
export default BgMain
