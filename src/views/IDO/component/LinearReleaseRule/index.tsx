import styled from "styled-components"
import { GridFlex } from "../../../../components/Grid"
import bgImg from "../../../../asstes/images/ido/bg02@2x.jpg"
import img1 from "../../../../asstes/images/ido/lock@2x.png"
import img2 from "../../../../asstes/images/ido/square@2x.png"
import img3 from "../../../../asstes/images/ido/piechart@2x.png"
import BgMain from "src/components/BgMain"

const Main = styled.div`
	position: relative;
	top: 0;
	left: 0;
	background-image: ${`url(${bgImg})`};
  background-size: 100% 100%;
	background-repeat: no-repeat;
  width: 100%;
  box-sizing: border-box;
	padding: 16px;
  margin-top: 10px;	
	color: #FFF;
`

const Box = styled(GridFlex)`
	margin: 16px 0;
  width: 100%;
	justify-content: start;
	align-items: center;
	flex: 1;
`

const Text = styled(GridFlex)`
	justify-content: start;
	text-align: left;
	line-height: 22px;
	font-size: 14px;
	flex: 1;
`

const TextA = styled.div`
	display: inline;
	text-align: left;
	line-height: 22px;
	font-size: 14px;
	word-break :break-all;
	flex: 1;
	a {
		text-decoration:underline
	}
`

const LinearTitle = styled(GridFlex)`
justify-content: start;
align-items: center;
width: 100%;
height: 90px;
`

const Left = styled(GridFlex)`
width: 100%;
height: 63px;
	justify-content: center;
  align-items: center;
	font-size: 24px;
	font-family: Roboto;
	font-weight: bold;
	line-height: 20px;
	color: #FFF;
	opacity: 1;
`

const Item = styled(GridFlex)`
	width: 100%;
	margin-top: 10px;
`

const Content = styled.div`
	flex: 1;
`

function LinearReleaseRule() {

	return (
		<Main>
			<LinearTitle>
				<Left ><span>{"Linear Release Rules"}</span></Left>
			</LinearTitle>
			<Box>
				<Text>
					{"Release 35% of the total participated amount first, the leftover will release an equal amount every day."}
				</Text>
				<BgMain imgsrc={img1} style={{ width: "56px", marginLeft: "16px", height: "56px" }} />
			</Box>
			<Box>
				<BgMain imgsrc={img2} style={{ width: "56px", marginRight: "16px", height: "56px" }} />

				<Content>
					<Item>
						<Text>
							{"eg. if one user has 10000 THS tokens leftover, of which 100 tokens will be released every day and needs 100 days to release all."}
						</Text>
					</Item>
				</Content>
			</Box>
			<Box>
				<Text>
					{"Part of IDO release rules won’t be affected by other staking rules."}
				</Text>
				<BgMain imgsrc={img3} style={{ width: "56px", marginLeft: "16px", height: "56px" }} />

			</Box>
		</Main>
	)
}

export default LinearReleaseRule
