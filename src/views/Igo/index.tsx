import styled from "styled-components";
import PreSate from "../../components/PreSate";
import bgImg from "../../images/home/banner@2x.png"
import detailImg from "../../images/home/bg@2x.png"
import CountDownTime from "./component/CountDownTime";
import LinearCard from "./component/LinearCard";
import Progress from "./component/Progress";
import LinkCard from "./component/LinkCard";
import ProgressCard from "./component/ProgressCard";
import BuyBlockToken from "./component/BuyBlockToken";
import { useLayoutEffect, useState, useEffect } from "react"
import { useWeb3React } from "@web3-react/core"
import { Web3Provider } from "@ethersproject/providers";
import { DEFAULT_ADDRESS } from "../../constants";
import PreSateV2 from "./component/PreSateV2";
import { Banner } from "src/components/Banner";


export const ratio = [0.15, 0.2, 0.3]

const Main = styled.div`
  background-image: ${`url(${bgImg})`};
  background-size: cover;
  background-repeat: no-repeat;
  width: 100%;
  padding: 60px 16px 0;
  box-sizing: border-box;
`

const Detail = styled.div`
  background-image: ${`url(${detailImg})`};
  background-size: 100% 100%;
  background-repeat: no-repeat;
  width: 100%;
  padding: 0px 16px 16px;
  box-sizing: border-box;
`

export interface AccountBuyHisType { amount: number, stage: number }

export const Igo = () => {
  const { account } = useWeb3React<Web3Provider>();
  const [totalBuy, setTotalBuy] = useState<number>(0)
  const [accountBuy, setAccountBuy] = useState<number>(0)
  const [myTotalContr, setMyTotalContr] = useState<number>(0)
  const [isDIs, setIsDis] = useState<boolean>(false)
  const [tokenV2, setTokenV2] = useState<number>(0)
  const [overflow, setOverflow] = useState<boolean>(false)
  const [isHandleSend, setIsHandleSend] = useState<boolean>(false)
  const [hash, setHash] = useState<string>("")
  const [currentBuyTotal, setCurrentBuyTotal] = useState<number>(0)
  const [num, setNum] = useState<number>(1)

  const total = (cBT: number, count: number) => {
    setTimeout(async () => {
      // if (account && count) {
      //   const result = await getMcdaoIgoTotal(account);
      //   const { data: { totalBuy: totalBuyNow, accountBuyHis, code, totalBuyType2 } } = result
      //   const currentTotal = accountBuyHis[accountBuyHis.length - 1]["amount"] ?? 0
      //   if (code === 200) {
      //     const list: AccountBuyHisType[] = accountBuyHis
      //     setAccountBuy(Number(list[list.length - 1]["amount"] ?? 0));
      //     const totalContr = list.reduce((prev: number, item, index) => {
      //       return prev + item.amount / ratio[index]
      //     }, 0)
      //     if (cBT && currentTotal && (Math.floor(cBT) === Math.floor(currentTotal))) {
      //       setNum(count + 1);
      //     } else {
      //       setNum(0)
      //       setIsHandleSend(false)
      //       setMyTotalContr(totalContr);
      //       setCurrentBuyTotal(currentTotal)
      //       setTotalBuy(Number(totalBuyNow) + Number(totalBuyType2));
      //       setTokenV2(Number(totalBuyType2))
      //       setOverflow(((currentTotal >= 8801) && account !== DEFAULT_ADDRESS) || (totalBuyNow + totalBuyType2 >= 840000))
      //     }
      //   }
      // }

    }, 5000);
  }

  useEffect(() => {
    setNum(1)
  }, [hash])

  useLayoutEffect(() => {
    total(currentBuyTotal, num)
  }, [account, num])

  return (
    <>
      <Main>
        <Banner></Banner>
        <PreSate></PreSate>
        <CountDownTime isStart={isDIs || overflow} setIsStart={setIsDis} />
        <Progress totalBuy={totalBuy} />
      </Main>
      <Detail>
        {/* <PreSate1 setHash={setHash} sendCallback={total} isStart={isDIs || overflow} accountBuy={myTotalContr} /> */}
        <PreSateV2 setIsHandleSend={setIsHandleSend} isHandleSend={isHandleSend} currentBuyTotal={currentBuyTotal} totalBuy={totalBuy} tokenV2={tokenV2} setHash={setHash} isStart={isDIs || overflow} accountBuy={myTotalContr} />
        <LinearCard />
        <LinkCard />
        <ProgressCard totalBuy={totalBuy} />
        <BuyBlockToken />
      </Detail>
    </>
  );
};
