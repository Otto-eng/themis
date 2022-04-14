import { LightRawTheme } from "material-ui/styles"
import { THEME_LIGHT } from "src/constants"
import { useAppSelector } from "src/hooks"
import styled from "styled-components"
import { GridFlex } from "../../../../components/Grid"

const Main = styled.div`
  width: 100%;
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
	}
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

const Ol = styled(GridFlex) <{ theme: boolean }>`
	width: 42px;
	height: 42px;
	background: ${({ theme }) => theme ? "#253449" : "#FFF"};
	color: ${({ theme }) => theme ? "#FFF" : "#253449"};
	justify-content: center;
	align-items: center;
	font-weight: 700;
	margin-right: 10px;
	border-radius: 50%;
	font-size: 24px;
	line-height: 29px;
`

const Item = styled(GridFlex)`
	width: 100%;
	margin-top: 10px;
`

const Content = styled.div`
	flex: 1;
	border-left: 2px solid #83879E;
	margin: 16px 0 0 20px;
	padding: 20px;
`

function BuyPHSProgress() {
	const theme = useAppSelector(state => state.theme.theme === THEME_LIGHT)

	return (
		<Main>
			<Box>
				<Ol theme={theme}>1</Ol>
				<span>
					{"Create a Wallet"}
				</span>
			</Box>
			<Content >
				<Text>
					<TextA>
						<a href="https://trustwallet.com/" target="_blank">https://trustwallet.com/</a>
					</TextA>
				</Text>
				<Item>
					<Text>
						{"Download Trust Wallet from this page."}
					</Text>
				</Item>
				<Item>
					<Text>
						{"Then create your own wallet  (Keep your seed phrase and private key safety. Don’t share them with anyone and  store them in a safe place. )"}
					</Text>
				</Item>
				<Item>
					<Text>
						{"Transfer USDT(BEP20) from other wallets or Exchanges to your USDT(BEP20) wallet address on Trust Wallet."}
					</Text>
				</Item>
			</Content>
			<Box>
				<Ol theme={theme}>2</Ol>
				<span>
					{"Open THS IDO Page on Trust Wallet"}
				</span>
			</Box>
			<Box margin={"0"}>
				<Content>
					<Item>
						<TextA>
							{"Open the \"Dapp\" tab on Trust Wallet, and type "}
							<a href="https://app.themis.capital/ido" target="black"> https://app.themis.capital/ido </a>
							{" in the search box, then click the enter to jump to the connect page."}
						</TextA>
					</Item>
					<Item>
						<Text>
							{"Click \"Connect\" to make your wallet connect to the THS offering page."}
						</Text>
					</Item>
					<Item>
						<Text>
							{"Your asset balance will display on the offering page once connected."}
						</Text>
					</Item>
				</Content>
			</Box>
			<Box>
				<Ol theme={theme}>3</Ol>
				<span>
					{"Start to Buy THS Token"}
				</span>
			</Box>
			<Content style={{ borderLeft: "2px solid transparent" }}>
				<Box>
					<Text>
						{"Enter the USDT(BEP20) amount (At Least 100~1000 USDT(BEP20)) you want to participate in this offering."}
					</Text>
				</Box>
			</Content>
		</Main>
	)
}
export default BuyPHSProgress