import { Box } from "@material-ui/core";
import styled from "styled-components";

import { GridFlex } from "../../components/Grid";

type ImgWidth = "100%" | "auto" | string;

const StyledGrid = styled(GridFlex) <{ background?: string; br?: number }>`

  position: relative;
  border-radius: ${({ br }) => `${br || 0}px`};
  background: ${({ background }) => `${background || "none"}`};
`;

const Img = styled.img<{ width?: ImgWidth }>`
  width: ${({ width }) => `${width || "100%"}`};
  height: auto;
`;

const StyledBox = styled(Box)`
  display: flex;
  width: 100%;
  height: auto;
  justify-content: flex-end;
`;

const Container = styled(GridFlex)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: auto;
  min-height: 100%;
  z-index: 0;
`;

export const ResponseBackground = ({
	img,
	children,
	imgWidth,
	background,
	borderRadius,
}: {
	img: string;
	children?: JSX.Element;
	imgWidth?: ImgWidth;
	background?: string;
	borderRadius?: number;
}) => {
	return (
		<StyledGrid container background={background} br={borderRadius}>
			<StyledBox>
				<Img width={imgWidth} src={img} />
			</StyledBox>
			<Container>{children}</Container>
		</StyledGrid>
	);
};
