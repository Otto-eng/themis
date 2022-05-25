import React, { useCallback, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { ethers } from "ethers";
import { ReactComponent as StakeIcon } from "../../asstes/icons/stake.svg";
import { ReactComponent as BondIcon } from "../../asstes/icons/bond.svg";
import { ReactComponent as InviteUsersIcon } from "../../asstes/icons/invite.svg";
import { ReactComponent as DashboardIcon } from "../../asstes/icons/dashboard.svg";
import THSLightPng from "../../asstes/icons/THS_light@2x.png";
import THSDarkPng from "../../asstes/icons/THS_dark@2x.png";
import ClaimLightIcon from "../../asstes/icons/claim@2x.png";
import ClaimDarkIcon from "../../asstes/icons/claimLight@2x.png";
import idoReleaseDarkIcon from "../../asstes/icons/idoReleaseLight@2x.png";
import idoReleaseLightIcon from "../../asstes/icons/idoRelease@2x.png";
import SCLightIcon from "../../asstes/icons/sc@2x.png";
import SCDarkIcon from "../../asstes/icons/scLight@2x.png";
import openBetaLightIcon from "../../asstes/icons/openBeta@2x.png";
import openBetaDarkIcon from "../../asstes/icons/openBetaLight@2x.png";
import idoLightIcon from "../../asstes/icons/ido@2x.png";
import idoDarkIcon from "../../asstes/icons/idoLight@2x.png";
import adminDarkIcon from "../../asstes/icons/adminLight@2x.png";
import adminLightIcon from "../../asstes/icons/admin@2x.png";
import daoProfitLightIcon from "../../asstes/icons/daoProfit@2x.png";
import daoProfitDarkIcon from "../../asstes/icons/daoProfitLight@2x.png";

import { Trans, t } from "@lingui/macro";
import { styled } from "@material-ui/core"
import { useDispatch } from "react-redux";
import { info } from "../../slices/MessagesSlice";
import { abi as ThemisERC20TokenABI } from "src/abi/ThemisERC20Token.json";
import { Skeleton } from "@material-ui/lab";

import { trim, shorten } from "../../helpers";
import { useWeb3Context } from "src/hooks/web3Context";
import useBonds from "../../hooks/Bonds";
import { Paper, Link, Box, Typography, SvgIcon } from "@material-ui/core";
import { addresses } from "../../constants";
import "./sidebar.scss";
import { useAppSelector } from "../../hooks"
import { THEME_LIGHT } from "src/constants";


const Title = styled("div")({display: "flex",
  justifyContent:"center",
  alignItems: "center",
  fontSize: "36px",
  fontWeight: "700",
  fontFamily: "Square"
})
  

function NavContent() {
  const [isActive] = useState();
  const { chainID, address, provider } = useWeb3Context();
  const { bonds } = useBonds(chainID);
  const [icon, setIcon] = useState({ claim: ClaimDarkIcon, logo: THSDarkPng, sc: SCDarkIcon, openBeta: openBetaDarkIcon, ido: idoDarkIcon, idoRelease: idoReleaseDarkIcon.default, admin: adminDarkIcon, daoRewards: daoProfitDarkIcon })
  const dispatch = useDispatch()
  const [adminAddress, setAdminAddress] = useState("hash")

  const theme = useAppSelector(state => state.theme.theme)

  useEffect(() => {
    if (theme === THEME_LIGHT) {
      setIcon({
        claim: ClaimLightIcon,
        sc: SCLightIcon,
        logo: THSLightPng,
        openBeta: openBetaLightIcon,
        ido: idoLightIcon,
        idoRelease: idoReleaseLightIcon,
        admin: adminLightIcon,
        daoRewards: daoProfitLightIcon
      })
    } else {
      setIcon({
        claim: ClaimDarkIcon, sc: SCDarkIcon, logo: THSDarkPng, openBeta: openBetaDarkIcon, ido: idoDarkIcon, idoRelease: idoReleaseDarkIcon, admin: adminDarkIcon, daoRewards: daoProfitDarkIcon
      })
    }
  }, [theme])

  const setRoot = useCallback(
    async () => {
      const signer = provider.getSigner();
      try {
        const thsContract = new ethers.Contract(addresses[chainID]?.THS_ADDRESS, ThemisERC20TokenABI, signer);
        const info = await thsContract.robotManager()
        setAdminAddress(info)
      } catch (error) {
        console.log("ERROR")
      }
    }, [address, chainID, provider, addresses])

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

  useEffect(() => {
    if (address && chainID && provider && addresses[chainID]?.THS_ADDRESS) {
      setRoot()
    }
  }, [address, chainID, provider, addresses])

  return (
    <Paper className="dapp-sidebar">
      <Box className="dapp-sidebar-inner" display="flex" justifyContent="space-between" flexDirection="column">
        <div className="dapp-menu-top">
          <Box className="branding-header">
            <Link href="https://themis.capital" target="_blank">
              <img src={icon.logo} style={{ width: "100px", height: "72px" }}></img>
              <Title>THEMIS</Title>
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
              {/* <Link
                component={NavLink}
                id="openBeta-nav"
                to="/openBeta"
                isActive={(match, location) => {
                  return checkPage(match, location, "openBeta");
                }}
                className={`button-dapp-menu ${isActive ? "active" : ""}`}
              >
                <Typography style={{ display: "flex", alignItems: "center" }} variant="h6">
                  <img style={{ width: "20px", height: "20px", marginRight: "12px" }} src={icon.openBeta} />
                  <Trans>Open Beta</Trans>
                </Typography>
              </Link> */}
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
                to="/stake"
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
                    <Link
                      component={NavLink}
                      to={`/bonds/${bond.name}`} key={i} className={"bond"}>
                      {!bond.bondDiscount ? (
                        <React.Fragment>
                          <Skeleton variant="text" width={"150px"} />
                        </React.Fragment>
                      ) : (
                        <Typography variant="body2">
                          {bond.displayName}
                           <span className="bond-pair-roi">
                            {!bond.isAvailable[chainID]
                              ? "Sold Out"
                              : `${bond.bondDiscount && trim(bond.bondDiscount * 100, 2)}%`}
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
                  <Trans>Claim Profit</Trans>
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
              <Link
                component={NavLink}
                id="daoRewards-nav"
                to="/daoRewards"
                isActive={(match, location) => {
                  return checkPage(match, location, "daoRewards");
                }}
                // onClick={() => dispatch(info(t`The launch time of DAO Rewards is waiting for the DAO voting.`))}
                className={`button-dapp-menu ${isActive ? "active" : ""}`}
              >
                <Typography style={{ display: "flex", alignItems: "center" }} variant="h6">
                  <img style={{ width: "20px", height: "20px", marginRight: "12px" }} src={icon.daoRewards} />
                  <Trans>DAO Rewards</Trans>
                </Typography>
              </Link>
              <Link
                component={NavLink}
                id="ido-release-nav"
                to="/IDORelease"
                isActive={(match, location) => {
                  return checkPage(match, location, "sc");
                }}
                className={`button-dapp-menu ${isActive ? "active" : ""}`}
              >
                <Typography style={{ display: "flex", alignItems: "center" }} variant="h6">
                  <img style={{ width: "20px", height: "20px", marginRight: "12px" }} src={icon.idoRelease} />
                  <Trans>IDO Release</Trans>
                </Typography>
              </Link>
              <Link
                component={NavLink}
                id="ido-nav"
                to="/ido"
                isActive={(match, location) => {
                  return checkPage(match, location, "ido");
                }}
                className={`button-dapp-menu ${isActive ? "active" : ""}`}
              >
                <Typography style={{ display: "flex", alignItems: "center" }} variant="h6">
                  <img style={{ width: "20px", height: "20px", marginRight: "12px" }} src={icon.ido} />
                  <Trans>IDO</Trans>
                </Typography>
              </Link>

              <Link
                component={NavLink}
                id="inviteUsers-nav"
                to="/inviteUsers"
                isActive={(match, location) => {
                  return checkPage(match, location, "inviteUsers");
                }}
                className={`button-dapp-menu ${isActive ? "active" : ""}`}
              >
                <Typography variant="h6">
                  <SvgIcon color="primary" component={InviteUsersIcon} />
                  <Trans>Invite Users</Trans>
                </Typography>
              </Link>

              {address.toLowerCase() === adminAddress.toLowerCase() && (<Link
                component={NavLink}
                id="admin-nav"
                to="/admin"
                isActive={(match, location) => {
                  return checkPage(match, location, "admin");
                }}
                className={`button-dapp-menu ${isActive ? "active" : ""}`}
              >
                <Typography style={{ display: "flex", alignItems: "center" }} variant="h6">
                  <img style={{ width: "20px", height: "20px", marginRight: "12px" }} src={icon.admin} />
                  <Trans>Admin</Trans>
                </Typography>
              </Link>)}

            </div>
          </div>
        </div>
      </Box>
    </Paper>
  );
}

export default NavContent;
