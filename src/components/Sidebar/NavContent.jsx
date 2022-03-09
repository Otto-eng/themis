import { useCallback, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { ReactComponent as StakeIcon } from "../../assets/icons/stake.svg";
import { ReactComponent as BondIcon } from "../../assets/icons/bond.svg";
import { ReactComponent as DashboardIcon } from "../../assets/icons/dashboard.svg";
import THSLightPng from "../../assets/icons/THS_light@2x.png";
import THSDarkPng from "../../assets/icons/THS_dark@2x.png";
import ClaimLightIcon from "../../assets/icons/claim@2x.png";
import ClaimDarkIcon from "../../assets/icons/claimLight@2x.png";
import SCLightIcon from "../../assets/icons/sc@2x.png";
import SCDarkIcon from "../../assets/icons/scLight@2x.png";
import { Trans } from "@lingui/macro";

import { trim, shorten } from "../../helpers";
import { useAddress, useWeb3Context } from "src/hooks/web3Context";
import useBonds from "../../hooks/Bonds";
import { Paper, Link, Box, Typography, SvgIcon } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import "./sidebar.scss";
import { useAppSelector } from "../../hooks"
import { THEME_LIGHT } from "src/constants";

function NavContent() {
  const [isActive] = useState();
  const address = useAddress();
  const { chainID } = useWeb3Context();
  const { bonds } = useBonds(chainID);
  const [icon, setIcon] = useState({claim: ClaimDarkIcon, logo: THSDarkPng, sc: SCDarkIcon})

  const theme = useAppSelector(state => state.theme.theme)

  useEffect(() => {
    if (theme === THEME_LIGHT) {
      setIcon({
        claim: ClaimLightIcon,
        sc: SCLightIcon,
        logo: THSLightPng
      })
    } else {
      setIcon({claim: ClaimDarkIcon, sc: SCDarkIcon, logo: THSDarkPng})
    }
  }, [theme])


  const checkPage = useCallback((match, location, page) => {
    const currentPath = location.pathname.replace("/", "");
    if (currentPath.indexOf("dashboard") >= 0 && page === "dashboard") {
      return true;
    }
    if (currentPath.indexOf("stake") >= 0 && page === "stake") {
      return true;
    }
    if ((currentPath.indexOf("bonds") >= 0 || currentPath.indexOf("choose_bond") >= 0) && page === "bonds") {
      return true;
    }
    if (currentPath.indexOf("33-together") >= 0 && page === "33-together") {
      return true;
    }
    return false;
  }, []);

  return (
    <Paper className="dapp-sidebar">
      <Box className="dapp-sidebar-inner" display="flex" justifyContent="space-between" flexDirection="column">
        <div className="dapp-menu-top">
          <Box className="branding-header">
            <Link href="https://app.themis.capital" target="_blank">
             <img src={icon.logo} style={{width: "150px", height: "98px"}}></img>
            </Link>

            {address && (
              <div className="wallet-link">
                <Link href={`https://etherscan.io/address/${address}`} target="_blank">
                  {shorten(address)}
                </Link>
              </div>
            )}
          </Box>

          <div className="dapp-menu-links">
            <div className="dapp-nav" id="navbarNav">
              <Link
                component={NavLink}
                id="dash-nav"
                to="/dashboard"
                isActive={(match, location) => {
                  return checkPage(match, location, "dashboard");
                }}
                className={`button-dapp-menu ${isActive ? "active" : ""}`}
              >
                <Typography variant="h6">
                  <SvgIcon color="primary" component={DashboardIcon} />
                  <Trans>Dashboard</Trans>
                </Typography>
              </Link>

              <Link
                component={NavLink}
                id="stake-nav"
                to="/"
                isActive={(match, location) => {
                  return checkPage(match, location, "stake");
                }}
                className={`button-dapp-menu ${isActive ? "active" : ""}`}
              >
                <Typography variant="h6">
                  <SvgIcon color="primary" component={StakeIcon} />
                  <Trans>Stake</Trans>
                </Typography>
              </Link>

              <Link
                component={NavLink}
                id="bond-nav"
                to="/bonds"
                isActive={(match, location) => {
                  return checkPage(match, location, "bonds");
                }}
                className={`button-dapp-menu ${isActive ? "active" : ""}`}
              >
                <Typography variant="h6">
                  <SvgIcon color="primary" component={BondIcon} />
                  <Trans>Bond</Trans>
                </Typography>
              </Link>

              <div className="dapp-menu-data discounts">
                <div className="bond-discounts">
                  <Typography variant="body2">
                    <Trans>Bond discounts</Trans>
                  </Typography>
                  {bonds.map((bond, i) => (
                    <Link component={NavLink} to={`/bonds/${bond.name}`} key={i} className={"bond"}>
                      {!bond.bondDiscount && false ? (
                        <Skeleton variant="text" width={"150px"} />
                      ) : (
                        <Typography variant="body2">
                          {/* {bond.displayName} */}
                        USDT
                            <span className="bond-pair-roi">
                              0.00%
                            {/* {!bond.isAvailable[chainID]
                              ? "Sold Out"
                              : `${bond.bondDiscount && trim(bond.bondDiscount * 100, 2)}%`} */}
                          </span>
                        </Typography>
                      )}
                    </Link>
                  ))}
                </div>
              </div>
              <Link
                component={NavLink}
                id="claim-nav"
                to="/claim"
                isActive={(match, location) => {
                  return checkPage(match, location, "claim");
                }}
                className={`button-dapp-menu ${isActive ? "active" : ""}`}
              >
                <Typography style={{display: "flex", alignItems: "center"}} variant="h6">
                  <img style={{width: "20px", height: "20px", marginRight: "12px"}} src={icon.claim} />
                  <Trans>Claim IDO Profit</Trans>
                </Typography>
              </Link>

              <Link
                component={NavLink}
                id="sc-nav"
                to="/sc"
                isActive={(match, location) => {
                  return checkPage(match, location, "sc");
                }}
                className={`button-dapp-menu ${isActive ? "active" : ""}`}
              >
                <Typography style={{display: "flex", alignItems: "center"}} variant="h6">
                  <img style={{width: "20px", height: "20px", marginRight: "12px"}} src={icon.sc} />
                  <Trans>SC</Trans>
                </Typography>
              </Link>
            </div>
          </div>
        </div>
        {/* <Box className="dapp-menu-bottom" display="flex" justifyContent="space-between" flexDirection="column">
          <div className="dapp-menu-external-links">
            {Object.keys(externalUrls).map((link, i) => {
              return (
                <Link key={i} href={`${externalUrls[link].url}`} target="_blank">
                  <Typography variant="h6">{externalUrls[link].icon}</Typography>
                  <Typography variant="h6">{externalUrls[link].title}</Typography>
                </Link>
              );
            })}
          </div>
          <div className="dapp-menu-social">
            <Social />
          </div>
        </Box> */}
      </Box>
    </Paper>
  );
}

export default NavContent;
