import { Box, SvgIcon } from "@material-ui/core";
import { useAppSelector } from "src/hooks";
import { THEME_DARK } from "../constants"
import { ReactComponent as THSUSDTDarkPng } from "../asstes/icons/ths_usdt_light@2x.svg";
import { ReactComponent as THSUSDTPng } from "../asstes/icons/ths_usdt@2x.svg";

function BondLogo({ bond }) {
  const theme = useAppSelector(state => state.theme.theme)
  let viewBox = "0 0 32 32";
  let style = { height: "32px", width: "32px" };

  // Need more space if its an LP token
  if (bond.isLP) {
    viewBox = "0 0 64 32";
    style = { height: "32px", width: "62px" };
  }

  return (
    <Box display="flex" alignItems="center" justifyContent="center" width={"64px"}>
      <SvgIcon component={theme === THEME_DARK ? THSUSDTPng : THSUSDTDarkPng} viewBox={viewBox} style={style} />
    </Box>
  );
}

export default BondLogo;
