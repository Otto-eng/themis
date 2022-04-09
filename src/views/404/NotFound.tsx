import OlympusLogo from "../../asstes/Olympus Logo.svg";
import "./notfound.scss";
import { Trans } from "@lingui/macro";

export default function NotFound() {
  return (
    <div id="not-found">
      <div className="not-found-header">
        <a href="https://app.themis.capital/" target="_blank">
          <img className="branding-header-icon" src={OlympusLogo} alt="ThemisDAO" />
        </a>

        <h4>
          <Trans>Page not found</Trans>
        </h4>
      </div>
    </div>
  );
}
