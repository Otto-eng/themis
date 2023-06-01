import { Trans } from "@lingui/macro"
import styled from "styled-components"
import { GridFlex } from "../../../../components/Grid"

const Main = styled.div`
  width: 100%;
  box-sizing: border-box;
	padding: 16px;
  margin-top: 10px;	
`

const Box = styled(GridFlex)`
	margin: 16px 0;
  font-size: 14px;
	font-family: Roboto;
	font-weight: 400;
	line-height: 24px;
	opacity: .8;
	text-align: center;
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
	opacity: 1;
`

function BuyPHS() {

	return (
		<Main>
			<LinearTitle>
				<Left ><span><Trans>How to buy THS?</Trans></span></Left>
			</LinearTitle>
			<Box>
				<Trans>
					Users can use MetaMask， TokenPocket， and imTokent wallet to purchase THS, make sure you have USDT(BEP20) on balance and use the Binance Smart Chain network. Enter the amount, click the send button, the smart contract will automatically complete the transaction. Please refer to the tutorial below.
				</Trans>
			</Box>
		</Main>
	)
}

export default BuyPHS
