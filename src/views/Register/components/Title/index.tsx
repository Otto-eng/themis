import styled from "styled-components";
import { Box } from "@material-ui/core";
import { TitleText } from "../TitleText";

const LightBorder = styled.span<{ bg?: string }>`
  display: flex;
  width: 30px;
  height: 2px;
  border-radius: 1px;
  background: ${({ bg }) => bg || "#1ac1b5"};
  margin: 10px auto 0;
`;


export const Title = ({
	gup = 0,
	text = "title",
	size,
	color,
	weight,
	height,
	align = "left",
	underLine = false,
	lineBg,
}: {
	gup?: number;
	text?: string;
	size?: number;
	color?: string;
	height?: number;
	weight?: string | number;
	align?: "left" | "center" | "right";
	underLine?: boolean;
	lineBg?: string;
}) => {

	return (
		<Box style={{ color, marginTop: gup }}>
			<TitleText align={align} size={size} weight={weight} height={height}>
				{text}
			</TitleText>
			{underLine && <LightBorder bg={lineBg} />}
		</Box>
	);
};