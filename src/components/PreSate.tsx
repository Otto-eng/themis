import styled from "styled-components";
import PreSate1 from "../../images/home/jieduan@2x.png";
import { GridFlex } from "./Grid";

const Main = styled(GridFlex)`
	justify-content: center;
	align-items: center;
`

const Img = styled(GridFlex) <{ width?: string, height?: string, margin?: string, color?: string, fontSize?: string }>`
	background-image: ${`url(${PreSate1})`};
	background-size: 100% 100%;
	width: ${({ width }) => width ?? "124px"};
	height: ${({ height }) => height ?? "34px"};
	margin: ${({ margin }) => margin ?? "24px auto"};
	justify-content: center;
	align-items: center;
	color: ${({ color }) => color ?? "#FFF"};
	font-size: ${({ fontSize }) => fontSize ?? "18px"};
`;
function PreSate({
	width,
	margin,
	height,
	color,
	fontSize
}: { width?: string, margin?: string, height?: string, color?: string, fontSize?: string }) {
	return (
		<Main>
			<Img width={width} margin={margin} height={height} color={color} fontSize={fontSize}>
				Pre-sale 3
			</Img>
		</Main>
	)
}
export default PreSate