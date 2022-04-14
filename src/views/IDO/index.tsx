import styled from "styled-components";
import bgImg from "../../asstes/images/ido/bg01@2x.jpg"
import CountDownTime from "./component/CountDownTime";
import LinearCard from "./component/LinearCard";
import PreSate1 from "./component/PreSate1";
import Progress from "./component/Progress";
import ProgressCard from "./component/ProgressCard";
import React, { useLayoutEffect, useCallback, useState, useEffect } from "react"
import LinearReleaseRule from "./component/LinearReleaseRule";
import BuyPHS from "./component/BuyPHS";
import BuyPHSProgress from "./component/BuyPHSProgress";
import { GridFlex } from "src/components/Grid";
import Zoom from "@material-ui/core/Zoom/Zoom";
import { useWeb3Context } from "src/hooks";
import { abi as PresaleContractABI } from "src/abi/PresaleContract.json";
import { ethers } from "ethers";
import { addresses } from "src/constants";
import Footer from "./component/Footer";


export const ratio = [4]

const Ido = styled.div`
  width: 100%;
  padding: 0 15%;
  @media (max-width: 750px) {
    width: 100%;
    padding: 0;
  }
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
export interface TermInfoOfType {
  termId: string, // 期号
  eachUserBuyMax: number, // ido 预售最大值 
  saleAmountMax: number, // 本期每个用户购买购买份额最大值
  soldAmount: number, // 本期已销售preTHS份额(指被销售的token)
  endTimestamp: number, // 本期IDO周期的结束时间戳
  startTimestamp: number, // 本期已销售preTHS份额(指被销售的token)
}

export const IDO = () => {
  const { provider, chainID, address } = useWeb3Context();
  const [totalBuy, setTotalBuy] = useState<number>(0)
  const [myTotalContr, setMyTotalContr] = useState<number>(0)
  const [isDIs, setIsDis] = useState<boolean>(true)
  const [isBuyMax, setIsBuyMax] = useState<boolean>(false)
  const [hash, setHash] = useState<string>("1")
  const [num, setNum] = useState<number>(1)
  const [isExperiencerAddress, setIsExperiencerAddress] = useState(false)
  const [isExperiencerAddressBuy, setIsExperiencerAddressBuy] = useState(true)

  const [termInfoOf, setTermInfoOf] = useState<TermInfoOfType>({
    termId: "1",
    eachUserBuyMax: 0,
    saleAmountMax: 0,
    soldAmount: 0,
    endTimestamp: 0,
    startTimestamp: 0
  })

  const total = useCallback(
    async () => {
      const signer = provider.getSigner();
      const PresaleContractContract = new ethers.Contract(addresses[chainID].IDO_PRESALECONTRACT_ADDRESS as string, PresaleContractABI, signer);
      const userBuyTotal = await PresaleContractContract.getUserBuyTotal(address)
      const soldPreThsTotal = await PresaleContractContract.soldPreThsTotal()
      setMyTotalContr(Number(ethers.utils.formatUnits(userBuyTotal, "gwei")) || 0)
      setTotalBuy(Number(ethers.utils.formatUnits(soldPreThsTotal, "gwei") || 0))
    },
    [provider, chainID, address, addresses],
  )

  useEffect(() => {
    if ((myTotalContr >= 250) || (totalBuy >= 0)) {
      setIsBuyMax(true)
    }
  }, [myTotalContr, totalBuy])

  useEffect(() => {
    setNum(num + 1)
  }, [hash])

  useLayoutEffect(() => {
    if (provider && chainID && address && addresses[chainID]?.IDO_PRESALECONTRACT_ADDRESS) {
      total()
    }
  }, [provider, chainID, address, addresses, num])

  const isBuy = useCallback(
    async () => {
      const signer = provider.getSigner();
      const PresaleContractContract = new ethers.Contract(addresses[chainID].IDO_PRESALECONTRACT_ADDRESS as string, PresaleContractABI, signer);
      // 众筹期数
      const isStart = await PresaleContractContract.termInfoOf(1)

      setTermInfoOf({
        eachUserBuyMax: Number(ethers.utils.formatUnits(isStart.eachUserBuyMax, "gwei") || 0),
        endTimestamp: Number(isStart.endTimestamp.toString()),
        saleAmountMax: Number(ethers.utils.formatUnits(isStart.saleAmountMax, "gwei") || 0),
        soldAmount: Number(ethers.utils.formatUnits(isStart.soldAmount, "gwei") || 0),
        termId: isStart.termId.toString(),
        startTimestamp: Number(isStart.startTimestamp.toString())
      })
      // 白名单购买结束时间
      const experienceEndTimestamp = await PresaleContractContract.experienceEndTimestamp()
      let timer: any = setInterval(async () => {
        const now = +new Date() / 1000
        setIsExperiencerAddressBuy(
          (now < Number(experienceEndTimestamp.toString()))
          &&
          (now > Number(isStart.startTimestamp.toString()))
        )
        timer = null;
      }, 5000)

      // 是否白名单
      const isExperiencer = await PresaleContractContract.isExperiencer(address)
      setIsExperiencerAddress(isExperiencer)
    },
    [provider, chainID, address, addresses],
  )

  useLayoutEffect(() => {
    if (provider && chainID && address && addresses[chainID]?.IDO_PRESALECONTRACT_ADDRESS) {
      isBuy()
    }
  }, [provider, chainID, address, addresses])
  return (
    <Ido>
      <Main>
        {/* <PreSate></PreSate> */}
        <Title>{"Only Now Cheaper"}</Title>
        <Title>{"Than Public Launch !"}</Title>
        <CountDownTime startTimestamp={termInfoOf.startTimestamp} endTimestamp={termInfoOf.endTimestamp} setIsStart={setIsDis} />
      </Main>
      <Detail>
        <React.Fragment>
          <DetailTitle>
            <Text>
              {"Themis IDO"}
            </Text>
          </DetailTitle>
          <Progress totalBuy={totalBuy} />
          <PreSate1 isExperiencerAddressBuy={isExperiencerAddressBuy} isExperiencerAddress={isExperiencerAddress} totalBuy={totalBuy} setHash={setHash} isStart={isDIs && !isBuyMax} accountBuy={myTotalContr} />
          <LinearCard />
          {/* <LinkCard /> */}
          <ProgressCard totalBuy={totalBuy} />
          <LinearReleaseRule />
          <BuyPHS />
          <BuyPHSProgress />
        </React.Fragment>
        </Detail>
      <Footer />
      </Ido>
  );
};
