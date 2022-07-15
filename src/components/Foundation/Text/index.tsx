import styled from "styled-components";
// import { space, typography, border, color } from "styled-system";
import { space, typography, color as baseColor, border } from "styled-system";
import { TextProps } from "./types";

const getFontSize = ({ fontSize, small }: TextProps) => {
  return small ? "12px" : fontSize || "0.875rem";
};

const Text = styled.div<TextProps>`
  font-family: 'Lato', 'Roboto', 'Noto Sans SC Sliced', 'Helvetica', 'Arial', sans-serif;
  font-size: ${getFontSize};
  font-weight: ${({ bold }) => (bold ? 900 : 500)};
  line-height: 1.75;
  color: ${({ color, theme }) => color ?? theme.colors.textPrimary};
  ${({ textTransform }) => textTransform && `text-transform: ${textTransform};`}
  ${space}
  ${typography}
  ${border}
  ${baseColor}
`;

Text.defaultProps = {
  color: "textPrimary",
  font: "bodyRegular"
};

export default Text;
