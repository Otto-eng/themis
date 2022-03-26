import styled from "styled-components";

export const TitleText = styled.div <{
	align?: "left" | "right" | "center";
	size?: number;
	weight?: string | number;
	height?: number;
}>`
  font-size: ${({ size }) => `${size || 16}px`};
  font-weight: ${({ weight }) => `${weight || "normal"}`};
  line-height: ${({ height }) => (height ? `${height}px` : "100%")};
`;
