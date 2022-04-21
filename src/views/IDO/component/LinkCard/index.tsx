import styled from "styled-components"
import { GridFlex } from "../../../../components/Grid"
import left from "../../../../asstes/asstes/images/ido/标题-bg03@2x.png"
import tableBg from "../../../../asstes/asstes/images/ido/copy@2x.png"
import right from "../../../../asstes/asstes/images/ido/people02@2x.png"
import ipt from "../../../../asstes/asstes/images/ido/输入框@2x.png"
import send from "../../../../asstes/asstes/images/ido/按钮@2x.png"
import copy from "copy-to-clipboard"
import { useState } from "react"
// import { useTranslation } from "react-i18next"
// import { useInvitationId } from "../../../../hooks/Server/useInvitationId"
// import { APP_MAIN_URL } from "../../../../constants"
import useModel from "flooks"
import { GlobalAttentionDialog } from "../../../../models"
import { Trans } from "@lingui/macro"

const Main = styled.div`
  width: 100%;
  box-sizing: border-box;
  margin-top: 10px;
	z-index: 0;
`

const LinearTitle = styled(GridFlex)`
	justify-content: start;
  align-items: center;
	width: 100%;
	height: 90px;
`

const Left = styled(GridFlex)`
  background-image: ${`url(${left})`};
	background-size: 100% 100%;
	width: 200px;
	height: 63px;
	justify-content: start;
  align-items: center;
	padding-left: 16px;
	line-height: 20px;
	font-size: 20px;
	color: #FFF;
	font-weight: bold;
	text-shadow: 2px 0px 0px #6E3811;
	span {
		margin-top: -16px;
	}
`

const Right = styled(GridFlex)`
  background-image: ${`url(${right})`};
	background-size: 100% 100%;
	width: 104px;
	height: 80px;
	margin-left: 20px;
	justify-content: start;
  align-items: center;
`

const Copy = styled.div`
	padding: 16px;
	margin-top: -16px;
	box-sizing: border-box;
	width: 100%;
	background-image: ${`url(${tableBg})`};
  background-size: 100% 100%;
	z-index: -1;
`

const PreCopy = styled(GridFlex)`
	margin-top: 10px;
	background-image: ${`url(${ipt})`};
	background-size: 100% 100%;
	width: 100%;
	height: 50px;
	color: #341B17;
	align-items: center;
	span {
		margin: 0 8px;
	}
`

const CopyBtn = styled(GridFlex)`
	margin-top: 10px;
	background-image: ${`url(${send})`};
	background-size: 100% 100%;
	width: 100%;
	height: 50px;
	justify-content: center;
	align-items: center;
	color: #FFFFFF;
	text-shadow: 0px 1px 2px rgba(0, 0, 0, 0.3);
`

function LinkCard() {



	// const { id } = useInvitationId(true);
	return (
		<Main>
			<LinearTitle>
				<Left ><span><Trans>inviteLink</Trans></span></Left>
				<Right ></Right>
			</LinearTitle>
			{/* <Copy>
				<PreCopy ><span id="copy">{`${APP_MAIN_URL}?id=${id || "------"}`}</span></PreCopy>
				<CopyBtn onClick={() => {
					if (!id) {
						showAttention({ open: true, content: "Error Invitation Id" });
						return;
					}
					handleCopy(`${APP_MAIN_URL}?id=${id}`);
					showAttention({ open: true, content: "", type: "success" });
				}}>{
						"copySuccess"
						// t(copyText)
					}</CopyBtn>
			</Copy> */}
		</Main>
	)
}
export default LinkCard