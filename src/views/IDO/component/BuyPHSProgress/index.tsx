import { Trans } from "@lingui/macro"
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
					<Trans>Create a Wallet</Trans>
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
						<Trans>Download Trust Wallet from this page.</Trans>
					</Text>
				</Item>
				<Item>
					<Text>
						<Trans>Then create your own wallet  (Keep your seed phrase and private key safety. Don’t share them with anyone and  store them in a safe place. )</Trans>
					</Text>
				</Item>
				<Item>
					<Text>
						<Trans>Transfer USDT(BEP20) from other wallets or Exchanges to your USDT(BEP20) wallet address on Trust Wallet.</Trans>
					</Text>
				</Item>
			</Content>
			<Box>
				<Ol theme={theme}>2</Ol>
				<span>
					<Trans>Open THS IDO Page on Trust Wallet</Trans>
				</span>
			</Box>
			<Box margin={"0"}>
				<Content>
					<Item>
						<TextA>
							<Trans>Open the \"Dapp\" tab on Trust Wallet, and type </Trans>
							<a href="https://app.themis.capital/ido" target="black"> https://app.themis.capital/ido </a>
							<Trans> in the search box, then click the enter to jump to the connect page.</Trans>
						</TextA>
					</Item>
					<Item>
						<Text>
							<Trans>Click \"Connect\" to make your wallet connect to the THS offering page.</Trans>
						</Text>
					</Item>
					<Item>
						<Text>
							<Trans>Your asset balance will display on the offering page once connected.</Trans>
						</Text>
					</Item>
				</Content>
			</Box>
			<Box>
				<Ol theme={theme}>3</Ol>
				<span>
					<Trans>Start to Buy THS Token</Trans>
				</span>
			</Box>
			<Content style={{ borderLeft: "2px solid transparent" }}>
				<Box>
					<Text>
						<Trans>Enter the USDT(BEP20) amount (At Least 100~1000 USDT(BEP20)) you want to participate in this offering.</Trans>
					</Text>
				</Box>
			</Content>
		</Main>
	)
}
export default BuyPHSProgress