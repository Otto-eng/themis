import { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { useTheme, makeStyles } from "@material-ui/core/styles";
import { trim } from "src/helpers";
import { ReactComponent as ArrowUpIcon } from "src/asstes/icons/arrow-up.svg";
import { ReactComponent as SthsIcon } from "src/asstes/icons/Sthslogo.svg";


import { ReactComponent as ThsIcon } from "src/asstes/tokens/ths.svg";
import { abi as ScaleCodeABI } from "src/abi/ScaleCode.json";
import { ethers } from "ethers";
import { useAppSelector, useWeb3Context } from "src/hooks"

import { addresses } from "src/constants";
import { abi as ierc20Abi } from "src/abi/ThemisERC20Token.json";
import { abi as sTHSAbi } from "src/abi/sThemis.json"; 
import { thsIcon, sThsIcon, scIcon } from "src/tokenIcon";

import SCLightIcon from "src/asstes/icons/sc@2x.png";
import SCDarkIcon from "src/asstes/icons/scLight@2x.png";
import STHSDarkImg from "src/asstes/icons/sTHSDark.png";
import STHSLightImg from "src/asstes/icons/sTHS.png";

import { THEME_LIGHT } from "src/constants"

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
  styled,
} from "@material-ui/core";


const TokenImg = styled("img")({
  width: "24px",
  height: "24px",
})

const Wallet = styled(Button)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  fontSize: "16px",
  fontWeight: 500,
  width: "100%",
  padding: "12px 32px",
  cursor: "pointer",
  "&:hover": {
    background: "#888888"
  }
})

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

const Token = ({ name, icon, userBalance, userBalanceUSD, onExpandedChange, expanded, tokenImg, toggleDrawer = () => { } }) => {
  const theme = useAppSelector(state => state.theme.theme)
  return (
    <Accordion expanded={expanded} onChange={onExpandedChange}>
      <AccordionSummary
        expandIcon={<SvgIcon component={ArrowUpIcon} viewBox="0 0 32 32" style={{ height: "25px", width: "25px" }} />}
      >
        <Button variant="contained" style={{ width: "100%", flexDirection: "row" }} color="secondary">
          <Typography align="left" style={{ width: "100%", flexDirection: "row" }}>
            {icon && <SvgIcon component={icon} viewBox="0 0 32 32" style={{ height: "25px", width: "25px", margin: "auto" }} />}
            {tokenImg && <TokenImg src={tokenImg}></TokenImg>}
            {name}
          </Typography>
          <Box>
            <Typography align="left">{userBalance}</Typography>
            {userBalanceUSD && <Typography align="left">${userBalanceUSD}</Typography>}
          </Box>
        </Button>

      </AccordionSummary>
      {toggleDrawer && <AccordionDetails margin="auto" style={{ margin: "auto", padding: 0 }}>
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
      </AccordionDetails>}
    </Accordion>
  );
};

function InitialWalletView() {
  const theme = useAppSelector(state => state.theme.theme)
  const styles = useStyles();
  const { chainID, address, provider } = useWeb3Context();
  const thsBalance = useSelector(state => state.account.balances?.ths);
  const sThsBalance = useSelector(state => state.account.balances?.sThs);
  const marketPrice = useSelector(state => state.app.thsPrice);
  const [ths, setThs] = useState(thsBalance)
  const [sThs, setSThs] = useState(sThsBalance)
  const [SCBanlance, setSCBanlance] = useState("0.0000")


  const getScbanlance = useCallback(async () => {

    try {
      const signer = provider.getSigner();
      const ScaleCodeContract = new ethers.Contract(addresses[chainID].ScaleCode_ADDRESS, ScaleCodeABI, signer)
      const banlance = await ScaleCodeContract.balanceOf(address)
      setSCBanlance((Math.floor((Number(ethers.utils.formatUnits(banlance, "ether")) ?? 0) * 10000) / 10000) + "");
    } finally {

    }

  }, [chainID, address, provider])

  useEffect(() => {
    if (address && chainID && provider && addresses?.[chainID].ScaleCode_ADDRESS) {
      getScbanlance()
    }
  }, [chainID, address, provider])

  const getThsBanlance = useCallback(
    async () => {
      const signer = provider.getSigner();

      const thsContract = new ethers.Contract(addresses[chainID]?.THS_ADDRESS, ierc20Abi, signer);
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

  const addSCToken = useCallback(
    () => {
      window.ethereum.request({
        method: "wallet_watchAsset",
        params: {
          type: "ERC20",
          options: {
            address: "0x59e9ea6D581e0b71D4db8B7Ab3d142b1A575216B",
            symbol: "SC",
            decimals: 18,
            image: scIcon
          }
        }
      })
    },
    [window.ethereum, provider],
  )

  const addTHSToken = useCallback(
    () => {
      window.ethereum.request({
        method: "wallet_watchAsset",
        params: {
          type: "ERC20",
          options: {
            address: "0x5Ecd430413488C1fBfEfe64f0EF759E4b2FC5F8b",
            symbol: "THS",
            decimals: 9,
            image: thsIcon
          }
        }
      })
    },
    [window.ethereum, provider],
  )
  
  const addsTHSToken = useCallback(
    () => {
      window.ethereum.request({
        method: "wallet_watchAsset",
        params: {
          type: "ERC20",
          options: {
            address: "0x96005e02A7f37b5365dF15081E638E82B48EA87B",
            symbol: "sTHS",
            decimals: 9,
            image: sThsIcon
          }
        }
      })
    },
    [window.ethereum, provider],
  )

  return (
    <Paper>
      <Token
        name="THS"
        userBalance={ths ?? "--"}
        userBalanceUSD={
          !isNaN(marketPrice) ? trim((ths ?? 0) * marketPrice, 4) : "--"
        }
        icon={ThsIcon}
        toggleDrawer={() => {
          window.open(`https://www.bscscan.com/address/${addresses[chainID]?.THS_ADDRESS}?fromaddress=${address}`)
        }}
      />
      <Token
        name="sTHS"
        userBalance={sThs ?? "--"}
        userBalanceUSD={
          !isNaN(marketPrice) ? trim((sThs ?? 0) * marketPrice, 4) : "--"
        }
        addToken={addsTHSToken}
        // icon={SthsIcon}
        tokenImg={theme === THEME_LIGHT ? STHSLightImg : STHSDarkImg}
        toggleDrawer={() => {
          window.open(`https://www.bscscan.com/address/${addresses[chainID].STHS_ADDRESS}?fromaddress=${address}`)
        }}
      />
      <Token
        name="SC"
        addToken={addSCToken}
        userBalance={SCBanlance}
        // icon={SCIcon}
        toggleDrawer={null}
        tokenImg={theme === THEME_LIGHT ? SCLightIcon : SCDarkIcon}
      />

      <Divider color="secondary" className="less-margin" />

      <Divider color="secondary" className="less-margin" />

      <Divider color="secondary" className="less-margin" />

      <Wallet onClick={addTHSToken}>
        <SvgIcon
          component={ThsIcon}
          viewBox="0 0 32 32"
          style={{ height: "25px", width: "25px" }}
        />
        <div>Add</div>
      </Wallet>
      <Wallet onClick={addsTHSToken}>
        <TokenImg src={theme === THEME_LIGHT ? STHSLightImg : STHSDarkImg}></TokenImg>


        <div>Add</div>
      </Wallet>
      <Wallet onClick={addSCToken}>
        <TokenImg src={theme === THEME_LIGHT ? SCLightIcon : SCDarkIcon}></TokenImg>
        <div>Add</div>
      </Wallet>

      <Box className={styles.menuSection}>
        <Box sx={{ flexWrap: "nowrap", flexDirection: "row" }}>
          {/* <ExternalLink
            href={`https://app.sushi.com/swap?inputCurrency=${usdt.getAddressForReserve(chainID)}&outputCurrency=${
              addresses[chainID]?.THS_ADDRESS
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
              `https://pancakeswap.finance/add/${usdt.getAddressForReserve(chainID)}/${addresses[chainID]?.THS_ADDRESS}`
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
