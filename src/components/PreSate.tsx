import styled from "styled-components";
import { GridFlex } from "./Grid";

const Main = styled(GridFlex)`
	justify-content: center;
	align-items: center;
	div {
		border: 1px solid #FFFFFF;
		border-radius: 30px;
		padding: 8px 16px;
		color: #FFF;
		font-size: 14px;
	}
`

function PreSate() {
	return (
		<Main>
			<div>
				{"PreSale 1"}
			</div>
		</Main>
	)
}
export default PreSate