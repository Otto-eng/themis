import { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { useTheme, makeStyles } from "@material-ui/core/styles";
import { trim } from "src/helpers";
import { ReactComponent as ArrowUpIcon } from "src/assets/icons/arrow-up.svg";
import { ReactComponent as sOhmTokenImg } from "src/assets/tokens/token_sOHM.svg";
import { ReactComponent as ThsImg } from "src/assets/tokens/ths.svg";
import { ethers } from "ethers";

import { addresses, } from "src/constants";
import { useWeb3Context } from "src/hooks";
import { abi as ierc20Abi } from "src/abi/ThemisERC20Token.json";
import { abi as sTHSAbi } from "src/abi/sThemis.json"; 

import {
  SvgIcon,
  Button,
  Typography,
  Box,
  Drawer,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
  Link,
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  menuContainer: {
    padding: "16px",
    width: "400px",
  },
  closeMenuButton: {
    marginLeft: "auto",
  },
  menuItem: {
    padding: "6px 16px",
  },
  viewAllBonds: {
    marginTop: "6px",
  },
  menuSection: {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(1),
    padding: theme.spacing(1, 0),
  },
}));

const ExternalLinkIcon = ({ size = 20 }) => (
  <SvgIcon
    component={ArrowUpIcon}
    style={{ height: `${size}px`, width: `${size}px`, verticalAlign: "sub" }}
    htmlColor="#A3A3A3"
  />
);
const ExternalLink = props => <Link target="_blank" rel="noreferrer" {...props} />;

const MenuItemBond = ({ Icon1, Icon2, lpName }) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Icon1 style={{ height: "25px", width: "25px" }} />
        <Icon2 style={{ height: "25px", width: "25px" }} />
        <Box sx={{ display: "flex", flexDirection: "column", ml: "8px" }}>
          <Typography>{lpName}</Typography>
          <ExternalLink href="#">
            <Typography variant="body2" color="textSecondary">
              Get LP <ExternalLinkIcon size={16} />
            </Typography>
          </ExternalLink>
        </Box>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", textAlign: "right" }}>
        <Button size="small" color="secondary" variant="outlined">
          <Typography>Bond to Save 12%</Typography>
        </Button>
      </Box>
    </Box>
  );
};

const MenuItemBorrow = ({ Icon1, Icon2, borrowOn, totalAvailable }) => (
  <Button size="large" variant="contained" color="secondary" fullWidth>
    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Icon1 style={{ height: "25px", width: "25px" }} />
        <Icon2 style={{ height: "25px", width: "25px" }} />
      </Box>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box sx={{ display: "flex", flexDirection: "column", textAlign: "right" }}>
          <Typography>Borrow on {borrowOn}</Typography>
          {totalAvailable && (
            <Typography variant="body2" color="textSecondary">
              {totalAvailable} Available
            </Typography>
          )}
        </Box>
        <Box component={ExternalLinkIcon} sx={{ ml: "6px" }} />
      </Box>
    </Box>
  </Button>
);

const Token = ({ name, icon, userBalance, userBalanceUSD, onExpandedChange, expanded, toggleDrawer = () => {} }) => {
  return (
    <Accordion expanded={expanded} onChange={onExpandedChange}>
      <AccordionSummary
        expandIcon={<SvgIcon component={ArrowUpIcon} viewBox="0 0 32 32" style={{ height: "25px", width: "25px" }} />}
      >
        <Button variant="contained" style={{ width: "100%", flexDirection: "row" }} color="secondary">
          <Typography align="left" style={{ width: "100%", flexDirection: "row" }}>
            <SvgIcon component={icon} viewBox="0 0 32 32" style={{ height: "25px", width: "25px", margin: "auto" }} />
            {name}
          </Typography>
          <Box>
            <Typography align="left">{userBalance}</Typography>
            <Typography align="left">${userBalanceUSD}</Typography>
          </Box>
        </Button>
      </AccordionSummary>
      <AccordionDetails margin="auto" style={{ margin: "auto", padding: 0 }}>
        <Box className="ohm-pairs" style={{ width: "100%" }}>
          <Button
            variant="contained"
            style={{ backgroundColor: "#272D36", color: "#386794", width: "33%", minHeight: "50px" }}
            onClick={toggleDrawer}
            color="secondary"
          >
            <Typography align="left"> Transaction History</Typography>
          </Button>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

function InitialWalletView() {
  const theme = useTheme();
  const styles = useStyles();
  const { chainID, address, provider } = useWeb3Context();
  const thsBalance = useSelector(state => state.account.balances?.ths);
  const sThsBalance = useSelector(state => state.account.balances?.sThs);
  const marketPrice = useSelector(state => state.app.thsPrice);
  const [ths, setThs] = useState(thsBalance)
  const [sThs, setSThs] = useState(sThsBalance)

  const getThsBanlance = useCallback(
    async () => {
      const signer = provider.getSigner();

      const thsContract = new ethers.Contract(addresses[chainID].THS_ADDRESS, ierc20Abi, signer);
      const thsBalance = await thsContract.balanceOf(address);
      setThs(ethers.utils.formatUnits(thsBalance, "gwei"))
    }, [address, chainID, provider, addresses])
  const getsThsBanlance = useCallback(
    async () => {
      const signer = provider.getSigner();
      const sThsContract = new ethers.Contract(addresses[chainID].STHS_ADDRESS, sTHSAbi, signer);
      const sThsBalance = await sThsContract.balanceOf(address);
      setSThs(ethers.utils.formatUnits(sThsBalance, "gwei"))
    }, [address, chainID, provider, addresses])
  useEffect(() => {
    if (address && chainID && provider && addresses[chainID]?.THS_ADDRESS && addresses[chainID]?.STHS_ADDRESS) {
      getThsBanlance()
      getsThsBanlance()
    }
  }, [address, chainID, provider])
  return (
    <Paper>
      <Token
        name="THS"
        userBalance={ths ?? "--"}
        userBalanceUSD={
          !isNaN(marketPrice) ? trim((ths ?? 0) * marketPrice, 4) : "--"
        }
        icon={ThsImg}
        toggleDrawer={() => {
          window.open(`https://kovan.etherscan.io/address/${addresses[chainID].THS_ADDRESS}?fromaddress=${address}`)
        }}
      />
      <Token
        name="sTHS"
        userBalance={sThs ?? "--"}
        userBalanceUSD={
          !isNaN(marketPrice) ? trim((sThs ?? 0) * marketPrice, 4) : "--"
        }
        icon={sOhmTokenImg}
        toggleDrawer={() => {
          window.open(`https://kovan.etherscan.io/address/${addresses[chainID].STHS_ADDRESS}?fromaddress=${address}`)
        }}
      />

      <Divider color="secondary" className="less-margin" />

      <Divider color="secondary" className="less-margin" />

      <Divider color="secondary" className="less-margin" />

      <Box className={styles.menuSection}>
        <Box sx={{ flexWrap: "nowrap", flexDirection: "row" }}>
          {/* <ExternalLink
            href={`https://app.sushi.com/swap?inputCurrency=${usdt.getAddressForReserve(chainID)}&outputCurrency=${
              addresses[chainID].THS_ADDRESS
            }`}
          >
            <Button size="large" variant="contained" color="secondary">
              <Typography style={{ lineHeight: "20px", whiteSpace: "break-spaces" }}>
                Buy on Sushiswap <ExternalLinkIcon />
              </Typography>
            </Button>
          </ExternalLink> */}

          {/* <ExternalLink
            href={
              `https://pancakeswap.finance/add/${usdt.getAddressForReserve(chainID)}/${addresses[chainID].THS_ADDRESS}`
            }
          >
            <Button size="large" variant="contained" color="secondary">
              <Typography style={{ lineHeight: "20px", whiteSpace: "break-spaces" }}>
                Buy on Pancakeswap <ExternalLinkIcon />
              </Typography>
            </Button>
          </ExternalLink>  */}

          {/* <ExternalLink href={`https://dune.xyz/0xrusowsky/Olympus-Wallet-History`}>
            <Button size="large" variant="contained" color="secondary">
              <Typography style={{ lineHeight: "20px", whiteSpace: "break-spaces" }}>
                View Wallet on Dune Analytics <ExternalLinkIcon />
              </Typography>
            </Button>
          </ExternalLink> */}
        </Box>
      </Box> 


      {/* <Drawer style={{ width: "55%" }} anchor={"right"} open={anchor === "sOHMtx"} onClose={toggleDrawer("OG")}>
        {" "}
        <SOhmTxView></SOhmTxView>
      </Drawer>
      <Drawer style={{ width: "55%" }} anchor={"right"} open={anchor === "sOHMLHIW"} onClose={toggleDrawer("OG")}>
        <SOhmLearnView></SOhmLearnView>
      </Drawer>
      <Drawer style={{ width: "55%" }} anchor={"right"} open={anchor === "sOHMZaps"} onClose={toggleDrawer("OG")}>
        <SOhmZapView></SOhmZapView>
      </Drawer> */}
    </Paper>
  );
}

export default InitialWalletView;
