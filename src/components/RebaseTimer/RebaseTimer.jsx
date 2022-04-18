import { useSelector, useDispatch } from "react-redux";
import { secondsUntilBlock, prettifySeconds } from "../../helpers";
import { Box, Typography } from "@material-ui/core";
import "./rebasetimer.scss";
import { Skeleton } from "@material-ui/lab";
import { useEffect, useMemo, useState, useCallback } from "react";
import { loadAppDetailsContract } from "../../slices/AppSlice";
import { useWeb3Context } from "../../hooks/web3Context";
import { Trans } from "@lingui/macro";
import { addresses } from "../../constants";
import { abi as ThemisStakingABI } from "src/abi/ThemisStaking.json";
import { ethers } from "ethers";

function RebaseTimer() {
  const dispatch = useDispatch();
  const { provider, chainID } = useWeb3Context();

  const SECONDS_TO_REFRESH = 60;
  const [secondsToRebase, setSecondsToRebase] = useState(0);
  const [rebaseString, setRebaseString] = useState("");
  const [rebaseBlock, setRebaseBlock] = useState("");
  const [secondsToRefresh, setSecondsToRefresh] = useState(SECONDS_TO_REFRESH);

  const currentBlock = useSelector(state => {
    return state.app.currentBlock;
  });

  const initializeTimer = useCallback(
    async () => {
      const signer = provider.getSigner();
      let seconds = 0;
      try {
        const StakingContract = new ethers.Contract(
          addresses[chainID].STAKING_ADDRESS,
          ThemisStakingABI,
          signer,
        )
        const epoch = await StakingContract.epoch()
        const rebaseBlock = epoch.endBlock.toString();
        setRebaseBlock(rebaseBlock)
        seconds = secondsUntilBlock(currentBlock, Number(rebaseBlock));
        setSecondsToRebase(seconds);
      } catch (error) {

      }
      const prettified = prettifySeconds(seconds);
      setRebaseString(prettified !== "" ? prettified : "Less than a minute");
    },
    [currentBlock, addresses, chainID, provider],
  )

  // This initializes secondsToRebase as soon as currentBlock becomes available
  useMemo(() => {
    if (currentBlock && addresses && chainID && provider) {
      initializeTimer();
    }
  }, [currentBlock, addresses, chainID, provider]);

  // After every period SECONDS_TO_REFRESH, decrement secondsToRebase by SECONDS_TO_REFRESH,
  // keeping the display up to date without requiring an on chain request to update currentBlock.
  useEffect(() => {
    let interval = null;
    if (secondsToRefresh > 0) {
      interval = setInterval(() => {
        setSecondsToRefresh(secondsToRefresh => secondsToRefresh - 1);
      }, 1000);
    } else {
      // When the countdown goes negative, reload the app details and reinitialize the timer
      if (secondsToRebase < 0) {
        async function reload() {
          await dispatch(loadAppDetailsContract(chainID));
        }
        reload();
        setRebaseString("");
      } else {
        clearInterval(interval);
        setSecondsToRebase(secondsToRebase => secondsToRebase - SECONDS_TO_REFRESH);
        setSecondsToRefresh(SECONDS_TO_REFRESH);
        const prettified = prettifySeconds(secondsToRebase);
        setRebaseString(prettified !== "" ? prettified : <Trans>Less than a minute</Trans>);
      }
    }
    return () => clearInterval(interval);
  }, [secondsToRebase, secondsToRefresh, chainID]);

  return (
    <Box className="rebase-timer">
      <Typography variant="body2">
        {currentBlock ? (
          secondsToRebase ? (
            <>
              <strong>{rebaseString}&nbsp;</strong>
              <Trans>to next rebase</Trans>
            </>
          ) : (
            <strong>rebasing</strong>
          )
        ) : (
          <Skeleton width="155px" />
        )}
        <div>currentBlock: {currentBlock}</div>
        <div>rebaseBlock: {rebaseBlock}</div>
      </Typography>
    </Box>
  );
}

export default RebaseTimer;
