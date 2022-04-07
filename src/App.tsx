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
import { addresses, THEME_LIGHT } from "./constants";
import Sc from "./views/Sc";
import { useAppSelector } from "./hooks";
import Register from "./views/Register";

import { abi as RelationshipABI } from "src/abi/Relationship.json";
import { scInviterEarningsDetailsList, scStakeEarningsDetailsList, stakeTHSReleaseEarningsList } from "./slices/scSlice";

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

  const { connect, provider, chainID, connected, disconnect } = useWeb3Context();
  const address = useAddress();


  // TODO (appleseed-expiredBonds): there may be a smarter way to refactor this
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
    [provider, address, connected]
  )

  useEffect(() => {
    if (connected && chainID != 42) {
      disconnect()
    }

  }, [connected, provider, chainID, address])



  const loadApp = useCallback(
    async loadProvider => {
      dispatch(loadAppDetailsContract());
      bonds.map(async bond => {
        await dispatch(calcBondDetails({ bond, value: "", provider: loadProvider, networkID: chainID }));
      });
    },
    [connected],
  );

  const loadAccount = useCallback(
    loadProvider => {
      dispatch(loadAccountDetails({ networkID: chainID, address, provider: loadProvider }));
      bonds.map(bond => {
        dispatch(calculateUserBondDetails({ address, bond, provider, networkID: chainID }));
      });
    },
    [connected],
  );

  // this useEffect fires on state change from above. It will ALWAYS fire AFTER
  useEffect(() => {
    // don't load ANY details until wallet is Checked
    loadDetails("app");
    dispatch(loadAppDetails())
    const themisConnected = sessionStorage.getItem("THEMIS_CONNECTED")
    if (!themisConnected || themisConnected === "true") {
      connect()
    }
  }, []);

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
    }, [address, chainID, provider, addresses]
  )

  const scData = useCallback(
    () => {
      dispatch(scInviterEarningsDetailsList({ first: 10, address }));
      dispatch(scStakeEarningsDetailsList({ first: 10, address }))
      dispatch(stakeTHSReleaseEarningsList({ first: 10, address }))
    },
    [address, chainID, provider, addresses],
  )

  useEffect(() => {
    if (address && chainID && provider && addresses[chainID]?.Relationship_ADDRESS) {
      serachRelationship(address)
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
    if (address && isInvited && location.pathname !== "/register") {
      history.replace("/register" + (location.search ?? ""))
    }
  }, [address, isInvited, location.pathname])

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

            <Route path="/stake">
              <Stake />
            </Route>


            <Route path="/bonds">
              {(bonds as IAllBondData[]).map(bond => {
                return (
                  <Route exact key={bond.name} path={`/bonds/${bond.name}`}>
                    <Bond bond={bond} />
                  </Route>
                );
              })}
              <ChooseBond />
            </Route>
            <Route path="/claim">
              <Claim />
            </Route>
            <Route path="/sc">
              <Sc />
            </Route>
            <Route path="/register">
              <Register />
            </Route>

            <Route component={NotFound} />
          </Switch>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
