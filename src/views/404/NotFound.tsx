import "./notfound.scss";
import { Trans } from "@lingui/macro";
import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";

export default function NotFound() {
  const [state, setState] = useState(5)
  const history = useHistory()
  console.log("history", history)
  useEffect(() => {
    if (state) {
      setTimeout(() => {
        setState(state - 1)
      }, 1000);
    } else {
      history.replace("/dashboard")
    }
  }, [state])
  return (
    <div id="not-found">
      <div className="not-found-header">
        <h2>
          <Trans>Page not found</Trans>
        </h2>
        <h4>
          <Trans>Will return to the dashboard page in {state} seconds</Trans>
        </h4>
      </div>
    </div>
  );
}
