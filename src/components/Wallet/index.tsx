import { useEffect, useState } from "react";
import copy from "copy-to-clipboard"

import { ReactComponent as CloseIcon } from "../../assets/icons/x.svg";
import { ReactComponent as WalletIcon } from "../../assets/icons/wallet.svg";
import { useAddress, useWeb3Context } from "../../hooks/web3Context";
import InitialWalletView from "./InitialWalletView";
import { Drawer, SvgIcon, Button, Typography, Box, IconButton, ButtonProps, styled } from "@material-ui/core";
import { ethers } from "ethers";
import { addresses, ZERO_ADDRESS } from "src/constants";
import { abi as RelationshipABI } from "src/abi/Relationship.json";



const WalletButtonBase = (props: ButtonProps) => (
  <Button id="ohm-menu-button" size="large" variant="contained" color="secondary" {...props} />
);

const OpenWalletButton = (props: ButtonProps) => (
  <WalletButtonBase {...props}>
    <SvgIcon component={WalletIcon} color="primary" />
    <Typography>Wallet</Typography>
  </WalletButtonBase>
);

const ConnectButton = (props: ButtonProps) => (
  <WalletButtonBase {...props}>
    <SvgIcon component={WalletIcon} color="primary" />
    <Typography>Connect Wallet</Typography>
  </WalletButtonBase>
);

const InitCode = styled("div")({
  width: "100%",
  padding: "16px 32px",
  fontSize: "16px",
  cursor: "pointer"
})

const WalletButton = ({ openWallet }: { openWallet: () => void }) => {
  const { connect, connected } = useWeb3Context();
  return connected ? <OpenWalletButton onClick={openWallet} /> : <ConnectButton onClick={connect} />;
};

// const PendingTxsList = ({ pendingTxs, anchorEl }) => {
//   <Popper id={id} open={open} anchorEl={walletButtonRef.current} placement="bottom-end">
//             <Fade {...TransitionProps} timeout={100}>
//               <Paper className="ohm-menu" elevation={1}>
//                 {pendingTransactions.map(({ txnHash, text }) => (
//                   <Box key={txnHash} fullWidth>
//                     <Link key={txnHash} href={getEtherscanUrl({ chainID, txnHash })} target="_blank" rel="noreferrer">
//                       <Button size="large" variant="contained" color="secondary" fullWidth>
//                         <Typography align="left">
//                           {text} <SvgIcon component={ArrowUpIcon} />
//                         </Typography>
//                       </Button>
//                     </Link>
//                   </Box>
//                 ))}
//               </Paper>
//             </Fade>
//       </Popper>
// }

const DisconnectButton = () => {
  const { disconnect } = useWeb3Context();
  return (
    <Button onClick={disconnect} variant="contained" size="large" color="secondary">
      <Typography>Disconnect</Typography>
    </Button>
  );
};

export function Wallet() {
  const [isWalletOpen, setWalletOpen] = useState(false);
  const [initCode, setInitCode] = useState("--");
  const closeWallet = () => setWalletOpen(false);
  const openWallet = () => setWalletOpen(true);
  const { chainID, provider } = useWeb3Context()
  const address = useAddress()
  const [state, setState] = useState(false)
  // const pendingTransactions = useSelector(state => {
  //   return state.pendingTransactions;
  // }); // [{ txnHash: "3241141", text: "test" }];

  const serachRelationship = async (account: string) => {
    const RelationshipContract = new ethers.Contract(addresses[chainID].Relationship_ADDRESS as string, RelationshipABI, provider)

    const info = await RelationshipContract.RegisterInfoOf(account)
    info?.registrantCode && setInitCode(info.registrantCode)
  }

  useEffect(() => {
    if (address && chainID && !!provider && !!addresses) {
      serachRelationship(address)
    }
  }, [address, chainID, provider, addresses])


  return (
    <>
      <WalletButton openWallet={openWallet} />
      <Drawer anchor="right" open={isWalletOpen} onClose={closeWallet}>
        <Box sx={{ display: "flex", justifyContent: "right" }}>
          <IconButton onClick={closeWallet} aria-label="close wallet">
            <SvgIcon component={CloseIcon} color="primary" />
          </IconButton>
        </Box>
        <InitialWalletView />
        <InitCode onClick={() => {
          if (initCode && copy("http://122.228.226.116:25001/register?initCode=" + initCode)) {
            setState(true)
            setInterval(() => {
              setState(false)
            }, 2000)
          }
        }}>{state ? "Copied" : `Invitation code:  ${initCode}`}</InitCode>
          <DisconnectButton />
      </Drawer>
    </>
  );
}
