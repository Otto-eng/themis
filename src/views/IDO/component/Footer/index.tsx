import BgMain from 'src/components/BgMain'
import { GridFlex } from 'src/components/Grid'
import styled from 'styled-components'
import MainPng from "../../../../asstes/images/ido/logoFooter@2x.png"

const Main = styled(GridFlex)`
	width: 100%;
	justify-content: center;
	align-items: center;
	background-color: #000;
	padding: 16px 0;
`

function Footer() {
	return (
		<Main>
			<BgMain imgsrc={MainPng} style={{ width: "124px", height: "33px" }}>
			</BgMain>
		</Main>
	)
}
export default Footer