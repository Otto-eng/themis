import styled from "styled-components"
import { GridFlex } from "../../../../components/Grid"
import bgImg from "../../../../asstes/asstes/images/ido/边框@2x.png"
import img1 from "../../../../asstes/asstes/images/ido/骑马@2x.png"
import img2 from "../../../../asstes/asstes/images/ido/human@2x.png"
import img3 from "../../../../asstes/asstes/images/ido/pig@2x.png"
import img4 from "../../../../asstes/asstes/images/ido/InviteRewards@2x.png"
// import { useTranslation } from "react-i18next"

const Main = styled.div`
  width: 100%;
	background-image: ${`url(${bgImg})`};
  background-size: 100% 100%;
  box-sizing: border-box;
	padding: 16px;
  margin-top: 10px;	
`

const Box = styled(GridFlex) <{ margin?: string }>`
	margin: ${({ margin }) => margin ?? "20px 0 0"};
  width: 100%;
	justify-content: start;
	align-items: center;
	flex: 1;
	span {
		font-weight: bold;
		font-size: 18px;
		color: #1B100C;
	}
`

const Text = styled(GridFlex)`
	justify-content: start;
	text-align: left;
	line-height: 22px;
	font-size: 14px;
	color: #341B17;
	flex: 1;
`

const TextA = styled.div`
	display: inline;
	text-align: left;
	line-height: 22px;
	font-size: 14px;
	color: #341B17;
	word-break :break-all;
	flex: 1;
	a {
		text-decoration:underline
	}
`

const Img1 = styled(GridFlex)`
	background-image: ${`url(${img1})`};
  background-size: 100% 100%;
	width: 150px;
	height: 136px;
`

const Img2 = styled(GridFlex)`
	background-image: ${`url(${img2})`};
  background-size: 100% 100%;
	width: 100px;
	height: 220px;
	margin-right: 10px;
`

const Img3 = styled(GridFlex)`
	background-image: ${`url(${img3})`};
  background-size: 100% 100%;
	width: 140px;
	height: 90px;
`

const Img4 = styled(GridFlex)`
	background-image: ${`url(${img4})`};
  background-size: 100% 100%;
	width: 116px;
	height: 130px;
	margin-right: 4px;
`

const Ol = styled(GridFlex)`
	width: 20px;
	height: 20px;
	justify-content: center;
	align-items: center;
	background: #000;
	border-radius: 50%;
	font-weight: 700;
	color: #ECBF77;
	font-size: 16px;
	margin-right: 10px;
`

const Item = styled(GridFlex)`
	width: 100%;
	margin-top: 10px;
`

const Content = styled.div`
	flex: 1;
`

function ProgressCard() {
	// const { t } = useTranslation()

	return (
		<Main>
			<Text>
				{/* {t("wallet")} */}
			</Text>
			<Box margin={"0"}>
				<Text>
					{/* {t("below")} */}
				</Text>
				<Img1 />
			</Box>
			<Box>
				<Ol>1</Ol>
				<span>
					{/* {t("creat")} */}
				</span>
			</Box>
			<Content >
				<Item>
					<Text>
						{/* {t("page")} */}
					</Text>
				</Item>
				<Item>
					<Text>
						{/* {t("safety")} */}
					</Text>
				</Item>
				<Item>
					<Text>
						{/* {t("transfer")} */}
					</Text>
				</Item>
			</Content>
			<Box>
				<Ol>2</Ol>
				<span>
					{/* {t("open")} */}
				</span>
			</Box>
			<Box margin={"0"}>
				<Img2 />
				<Content>
					<Item>
						<TextA>
							{/* {t("url")} */}
							<a href="https://mcdao.org/igo" target="black">https://mcdao.org/igo</a>
							{/* {t("url1")} */}
						</TextA>
					</Item>
					<Item>
						<Text>
							{/* {t("connect")} */}
						</Text>
					</Item>
					<Item>
						<Text>
							{/* {t("asset")} */}
						</Text>
					</Item>
				</Content>
			</Box>
			<Box>
				<Ol>3</Ol>
				<span>
					{/* {t("buy")} */}
				</span>
			</Box>
			<Box>
				<Text>
					{/* {t("amount")} */}
				</Text>
				<Img3 />
			</Box>
			<Box>
				<Ol>4</Ol>
				<span>
					{/* {t("InviteRewards")} */}
				</span>
			</Box>
			<Box>
				<Img4 />
				<Text>
					{/* {t("InviteOneFriend")} */}
				</Text>
			</Box>
		</Main>
	)
}
export default ProgressCard