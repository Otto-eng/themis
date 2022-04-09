import styled from "styled-components";
import PreSate from "../../components/PreSate";
import bgImg from "../../asstes/images/ido/bg01@2x.png"
import invite from "../../asstes/images/ido/邀请@2x.png"
import CountDownTime from "./component/CountDownTime";
import LinearCard from "./component/LinearCard";
import PreSate1 from "./component/PreSate1";
import Progress from "./component/Progress";
import ProgressCard from "./component/ProgressCard";
import React, { useLayoutEffect, useCallback, useState, useEffect } from "react"
import { useWeb3React } from "@web3-react/core"
import { Web3Provider } from "@ethersproject/providers";
import copy from "copy-to-clipboard"
import useModel from "flooks";
import { GlobalAttentionDialog } from "../../models";
import LinearReleaseRule from "./component/LinearReleaseRule";
import BuyPHS from "./component/BuyPHS";
import BuyPHSProgress from "./component/BuyPHSProgress";
import Footer from "./component/Footer";
import { GridFlex } from "src/components/Grid";
import Zoom from "@material-ui/core/Zoom/Zoom";


export const ratio = [0.15, 0.2, 0.3]

const Container = styled.div`
  width: 100%;
`

const Main = styled.div`
  background-image: ${`url(${bgImg})`};
  background-size: cover;
  background-repeat: no-repeat;
  width: 100%;
  padding: 80px 16px 80px;
  box-sizing: border-box;
`

const Detail = styled(Zoom)`
  width: 100%;
  margin-top: -20px;
  padding: 0px 16px 16px;
  box-sizing: border-box;
  border-radius: 30px 30px 0 0;
  padding: 16px;
`

const Title = styled.div`
  font-size: 28px;
  font-weight: 700;
  color: #FFF;
  width: 100%;
  margin-top: 20px;
  text-align: center;
`

const DetailTitle = styled(GridFlex)`
  margin: 24px 0;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`

const Text = styled(GridFlex)`
  justify-content: center;
  align-items: center;
  font-size: 24px;
  font-family: Roboto;
  font-weight: 700;
  line-height: 24px;
`

const Copy = styled(GridFlex)`
  color: #FFF;
  justify-content: center;
  align-items: center;
  background-color: #000;
  border-radius: 8px;
  padding: 4px 8px;
  cursor: pointer;
`

export interface AccountBuyHisType { amount: number, stage: number }

export const IDO = () => {
  const { account } = useWeb3React<Web3Provider>();
  const [totalBuy, setTotalBuy] = useState<number>(0)
  const [myTotalContr, setMyTotalContr] = useState<number>(0)
  const [isDIs, setIsDis] = useState<boolean>(false)
  const [overflow, setOverflow] = useState<boolean>(false)
  const [isHandleSend, setIsHandleSend] = useState<boolean>(false)
  const [hash, setHash] = useState<string>("")
  const [currentBuyTotal, setCurrentBuyTotal] = useState<number>(0)
  const [num, setNum] = useState<number>(1)

  const total = useCallback(
    () => {
      // setTimeout(async () => {
      //   if (account && count) {
      //     const result = await getMcdaoIgoTotal(account);
      //     const { data: { totalBuy: totalBuyNow, accountBuyHis, code } } = result
      //     const currentTotal = accountBuyHis[0]["amount"] ?? 0
      //     if (code === 200) {
      //       const list: AccountBuyHisType[] = accountBuyHis
      //       const totalContr = list.reduce((prev: number, item, index) => {
      //         return prev + item.amount
      //       }, 0)
      //       if (currentTotal && Math.floor(CBT) === Math.floor(totalContr)) {
      //         setNum(count + 1);
      //       } else {
      //         setNum(0)
      //         setIsHandleSend(false)
      //         setMyTotalContr(totalContr);
      //         setCurrentBuyTotal(currentTotal)
      //         setTotalBuy(Number(totalBuyNow));
      //         setOverflow((currentTotal >= 2801 && account !== DEFAULT_ADDRESS) || totalBuy >= 499801)
      //       }
      //     }
      //   }

      // }, 5000);
    },
    [account],
  )

  useEffect(() => {
    setNum(1)
  }, [hash])

  useLayoutEffect(() => {
    total()
  }, [account, num])


  return (
    <>
      <Main>
        <PreSate></PreSate>
        <Title>{"Only Now Cheaper"}</Title>
        <Title>{"Than Public Launch !"}</Title>

        <CountDownTime isStart={isDIs || overflow} setIsStart={setIsDis} />
      </Main>
      <Detail>
        <React.Fragment>
          <DetailTitle>
            <Text>
              {"Themis IDO"}
            </Text>

          </DetailTitle>
          <Progress totalBuy={totalBuy} />
          <PreSate1 setIsHandleSend={setIsHandleSend} isHandleSend={isHandleSend} currentBuyTotal={currentBuyTotal} totalBuy={totalBuy} setHash={setHash} isStart={isDIs || overflow} accountBuy={myTotalContr} />
          <LinearCard />
          {/* <LinkCard /> */}
          <ProgressCard totalBuy={totalBuy} />
          <LinearReleaseRule />
          <BuyPHS />
          <BuyPHSProgress />
        </React.Fragment>
      </Detail>
      <Footer />
    </>
  );
};
