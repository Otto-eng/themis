import { SvgIcon, Link } from "@material-ui/core";
import { ReactComponent as GitHub } from "../../asstes/icons/github.svg";
import { ReactComponent as Medium } from "../../asstes/icons/medium.svg";
import { ReactComponent as Twitter } from "../../asstes/icons/twitter.svg";
import { ReactComponent as Discord } from "../../asstes/icons/discord.svg";

export default function Social() {
  return (
    <div className="social-row">
      <Link href="https://github.com/OlympusDAO" target="_blank">
        <SvgIcon color="primary" component={GitHub} />
      </Link>

      <Link href="https://olympusdao.medium.com/" target="_blank">
        <SvgIcon color="primary" component={Medium} />
      </Link>

      <Link href="https://twitter.com/OlympusDAO" target="_blank">
        <SvgIcon color="primary" component={Twitter} />
      </Link>

      <Link href="https://discord.gg/6QjjtUcfM4" target="_blank">
        <SvgIcon color="primary" component={Discord} />
      </Link>
    </div>
  );
}
