import { ThemeProvider, makeStyles } from "@material-ui/core/styles";
import { useEffect, useState, useCallback } from "react";
import { Route, Redirect, Switch, useLocation, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useMediaQuery } from "@material-ui/core";
import { ethers } from "ethers";
import CssBaseline from "@material-ui/core/CssBaseline";
import useBonds, { IAllBondData } from "./hooks/Bonds";
import { useAddress, useWeb3Context } from "./hooks/web3Context";

import { calcBondDetails } from "./slices/BondSlice";
import { loadAppDetails, loadAppDetailsContract } from "./slices/AppSlice";
import { loadAccountDetails, calculateUserBondDetails } from "./slices/AccountSlice";

import { Stake, ChooseBond, Bond, TreasuryDashboard } from "./views";
import Sidebar from "./components/Sidebar/Sidebar.jsx";
import TopBar from "./components/TopBar/TopBar.jsx";
import NavDrawer from "./components/Sidebar/NavDrawer.jsx";
import Messages from "./components/Messages/Messages";
import NotFound from "./views/404/NotFound";

import { dark as darkTheme } from "./themes/dark.js";
import { light as lightTheme } from "./themes/light.js";
import "./style.scss";
import Claim from "./views/Claim";
import { addresses, NETWORK_CHAINID, THEME_LIGHT } from "./constants";
import Sc from "./views/Sc";
import { useAppSelector } from "./hooks";
import Register from "./views/Register";

import { abi as RelationshipABI } from "src/abi/Relationship.json";
import { abi as ThemisERC20TokenABI } from "src/abi/ThemisERC20Token.json";
import { scInviterEarningsDetailsList, scStakeEarningsDetailsList, stakeTHSReleaseEarningsList, thsInviterEarningsDetailsList } from "./slices/scSlice";
import { IDO } from "./views/IDO";
// import OpenBeta from "./views/OpenBeta";
import IDORelease from "./views/IDORelease";
import { idoRelease35List, idoRelease65List } from "./slices/idoReleaseSlice";
import { info } from "./slices/MessagesSlice";
import Admin from "./views/Admin";
import DaoProfit from "./views/DaoProfit";
import { t } from "@lingui/macro";
import InviteUsers from "./views/InviteUsers";

// 😬 Sorry for all the console logging
const DEBUG = false;

// 🛰 providers
if (DEBUG) console.log("📡 Connecting to Mainnet Ethereum");
// 🔭 block explorer URL
// const blockExplorer = targetNetwork.blockExplorer;

const drawerWidth = 280;
const transitionDuration = 969;

const useStyles = makeStyles(theme => ({
  drawer: {
    [theme.breakpoints.up("md")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(1),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: transitionDuration,
    }),
    height: "100%",
    overflow: "auto",
    marginLeft: drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: transitionDuration,
    }),
    marginLeft: 0,
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
}));

function App() {
  const location = useLocation();
  const dispatch = useDispatch();
  const history = useHistory()
  const theme: { theme: string } = useAppSelector(state => {
    return state.theme
  })
  const classes = useStyles();

  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [themeMode, setThemeMode] = useState(theme.theme === THEME_LIGHT ? lightTheme : darkTheme);
  const isSmallerScreen = useMediaQuery("(max-width: 980px)");
  const isSmallScreen = useMediaQuery("(max-width: 600px)");
  const [isInvited, setIsInvited] = useState(false)
  const [pathname, setPathname] = useState("")
  const [adminAddress, setAdminAddress] = useState("hash")

  const { connect, provider, chainID, connected, disconnect } = useWeb3Context();
  const address = useAddress();


  // TODO: (appleseed-expiredBonds): there may be a smarter way to refactor this
  const { bonds /*, expiredBonds */ } = useBonds(chainID);

  const loadDetails = useCallback(
    async (whichDetails: string) => {
      let loadProvider = provider;
      if (whichDetails === "app") {
        loadApp(loadProvider);
      }

      // don't run unless provider is a Wallet...
      if (whichDetails === "account" && address && connected) {
        loadAccount(loadProvider);
      }
    },
    [provider, address, connected, chainID]
  )

  const getloadAppDetails = useCallback(
    async () => {
      await dispatch(loadAppDetails({ provider, chainID }))
    },
    [provider, chainID],
  )

  useEffect(() => {
    if (connected && (chainID != NETWORK_CHAINID)) {
      disconnect()
    }
    if ((address && connected && provider && chainID && chainID == NETWORK_CHAINID) || !(address || connected)) {
      getloadAppDetails()
    }

  }, [connected, provider, chainID, address])


  const loadApp = useCallback(
    async loadProvider => {
      dispatch(loadAppDetailsContract(chainID));
      bonds.map(async bond => {
        await dispatch(calcBondDetails({ bond, value: "", provider: loadProvider, networkID: chainID }));
      });
    },
    [connected, chainID],
  );

  const loadAccount = useCallback(
    loadProvider => {
      dispatch(loadAccountDetails({ networkID: chainID, address, provider: loadProvider }));
      bonds.map(bond => {
        dispatch(calculateUserBondDetails({ address, bond, provider, networkID: chainID }));
      });
    },
    [connected, chainID, address],
  );

  // this useEffect fires on state change from above. It will ALWAYS fire AFTER
  useEffect(() => {
    // don't load ANY details until wallet is Checked
    loadDetails("app");
    const themisConnected = sessionStorage.getItem("THEMIS_CONNECTED")
    if ((!themisConnected || themisConnected === "true") && !connected) {
      connect()
    }
  }, [chainID, address]);


  // this useEffect picks up any time a user Connects via the button
  useEffect(() => {
    // don't load ANY details until wallet is Connected
    if (connected) {
      loadDetails("account");
    }
  }, [connected, address, provider]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleSidebarClose = () => {
    setIsSidebarExpanded(false);
  };


  const serachRelationship = useCallback(
    async (account: string) => {
      const signer = provider.getSigner();
      const RelationshipContract = new ethers.Contract(addresses[chainID].Relationship_ADDRESS as string, RelationshipABI, signer)
      const invitedAddress = await RelationshipContract.RegisterInfoOf(account)
      setIsInvited(!invitedAddress.registrantCode)
      setPathname(location.pathname)
    }, [address, chainID, provider, addresses, location.pathname]
  )

  const scData = useCallback(
    () => {
      dispatch(scInviterEarningsDetailsList({ first: 10, address }));
      dispatch(thsInviterEarningsDetailsList({ first: 10, address }));
      dispatch(scStakeEarningsDetailsList({ first: 10, address }))
      dispatch(stakeTHSReleaseEarningsList({ first: 10, address }))
      dispatch(idoRelease35List({ first: 1, address }))
      dispatch(idoRelease65List({ first: 10, address }))
    },
    [address, chainID, provider, addresses],
  )

  useEffect(() => {
    if (address && chainID && provider && addresses[chainID]?.Relationship_ADDRESS) {
      serachRelationship(address)
    }
  }, [address, chainID, provider, addresses, location.pathname])

  const setRoot = useCallback(
    async () => {
      const signer = provider.getSigner();
      try {
        const thsContract = new ethers.Contract(addresses[chainID]?.THS_ADDRESS, ThemisERC20TokenABI, signer);
        const info = await thsContract.robotManager()
        setAdminAddress(info)
      } catch (error) {
      }
    }, [address, chainID, provider, addresses])

  useEffect(() => {
    if (address && chainID && provider && addresses[chainID]?.THS_ADDRESS && addresses[chainID]?.Relationship_ADDRESS) {
      setRoot()
      scData()
    }
  }, [address, chainID, provider, addresses])


  useEffect(() => {
    setThemeMode(theme.theme === THEME_LIGHT ? lightTheme : darkTheme)
  }, [theme]);
  useEffect(() => {
    if (isSidebarExpanded) handleSidebarClose();
  }, [location]);

  useEffect(() => {
    if (address && isInvited && (["/bonds", "/stake"].some(item => pathname.includes(item)))) {
      history.replace("/register" + (location.search ?? ""))
    }
  }, [address, isInvited, pathname])

  useEffect(() => {
    const height = document.body.scrollHeight;
    window.onresize = () => {
      if (document.body.scrollHeight < height) {
        document.body.style.height = height + "px"
      }
    }
  }, [])

  return (
    <ThemeProvider theme={themeMode}>
      <CssBaseline />
      <div className={`app ${isSmallerScreen && "tablet"} ${isSmallScreen && "mobile"} ${theme}`}>
        <Messages />
        <TopBar z-index={9} handleDrawerToggle={handleDrawerToggle} />
        <nav className={classes.drawer}>
          {isSmallerScreen ? (
            <NavDrawer mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />
          ) : (
            <Sidebar />
          )}
        </nav>

        <div className={`${classes.content} ${isSmallerScreen && classes.contentShift}`}>
          <Switch>
            <Route exact path="/dashboard">
              <TreasuryDashboard />
            </Route>

            <Route exact path="/">
              <Redirect to="/stake" />
            </Route>

            <Route exact path="/stake">
              <Stake />
            </Route>
            {(bonds as IAllBondData[]).map(bond => {
              return (
                <Route exact key={bond.name} path={`/bonds/${bond.name}`}>
                  <Bond bond={bond} />
                </Route>
              );
            })}
            <Route path="/bonds">
              <ChooseBond />
            </Route>
            <Route path="/inviteUsers">
              <InviteUsers />
            </Route>
            <Route exact path="/ido">
              <IDO />
            </Route>
            <Route path="/claim">
              <Claim />
            </Route>
            <Route path="/sc">
              <Sc />
            </Route>
            <Route path="/daoRewards">
              <DaoProfit />
            </Route>

            <Route path="/IDORelease">
              <IDORelease />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            {
              address.toLowerCase() === adminAddress.toLowerCase() ? <Route path="/admin">
                <Admin />
              </Route> : null
            }
            <Route component={NotFound} />
          </Switch>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
