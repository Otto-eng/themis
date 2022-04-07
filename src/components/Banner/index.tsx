import styled from "styled-components";
import { GridFlex } from "../../components/Grid";

import BannerBg from "../../images/home/banner-font@2x.png";
import { ResponseBackground } from "../ResponseBackground";

const StyledGrid = styled(GridFlex)`
  padding: 0 32px;
`;

export const Banner = () => {
	return (
		<StyledGrid container>
			<ResponseBackground
				img={BannerBg}
				borderRadius={4}
			/>
		</StyledGrid>
	);
};