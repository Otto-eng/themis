import ToggleButton from "@material-ui/lab/ToggleButton";
import SvgIcon from "@material-ui/core/SvgIcon";
import { ReactComponent as SunIcon } from "../../asstes/icons/sun.svg";
import { ReactComponent as MoonIcon } from "../../asstes/icons/moon.svg";
import { t } from "@lingui/macro";
import { useDispatch } from "react-redux";
import { toggleTheme as toggle } from "../../slices/ThemeSlice"
import { useAppSelector } from "../../hooks"
function ThemeSwitcher() {
  const theme = useAppSelector(state => state.theme.theme)
  const dispatch = useDispatch();

  return (
    <ToggleButton
      className="toggle-button"
      type="button"
      title={t`Change Theme`}
      value="check"
      onClick={() => {
        // toggleTheme()
        dispatch(toggle())
      }}
    >
      {theme === "dark" ? (
        <SvgIcon component={MoonIcon} color="primary" />
      ) : (
        <SvgIcon component={SunIcon} color="primary" />
      )}
    </ToggleButton>
  );
}

export default ThemeSwitcher;
