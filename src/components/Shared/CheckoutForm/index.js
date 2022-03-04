import React, { useState, useEffect } from "react";
import { useSaleItem } from "../../../contexts/SaleContext";
import GradientButton from "../GradientButton";
import BigNumber from 'bignumber.js'
import { Input } from '../InputBox';

import { 
  CheckoutFormContainer, 
  WelComeCheckout, 
  CheckoutDetail,
  CheckoutTerms,
  AmountContainer,
  OutlineBox
} from "./styles";

import { useContract } from "../../../contexts/ContractContext";
import { useCustomWallet } from "../../../contexts/WalletContext";

export const CheckoutForm = (props) => {
  const { handleProcess } = props;

  const { saleInfo, nftItem } = useSaleItem();
  const { getTokenBalance } = useContract();
  const { getWalletAddressBySessionKey } = useCustomWallet();

  const [myBalance, setMyBalance] = useState(0.0);

  const serviceFeeCalculate = (s) => {
    return BigNumber(s.price).times(s.fee).div(100).toString();
  }

  const totalAmountCalculate = (s) => {
    return BigNumber(s.price).times(s.copy).toString();
  }

  const payAmountCalculate = (s) => {
    return BigNumber(serviceFeeCalculate(s)).plus(BigNumber(totalAmountCalculate(s))).toString();
  }

  useEffect(() => {
    if (saleInfo?.payment !== undefined) {
      getTokenBalance(saleInfo.payment, getWalletAddressBySessionKey())
      .then(r => {
        setMyBalance(r);
      })
      .catch(err => {
        console.log(`${err.message}`);
      })
    }
  }, [saleInfo, getWalletAddressBySessionKey])

  return (
    <CheckoutFormContainer>
      <WelComeCheckout>
        <div className="welcome-text">You are about to purchase</div>
        <div className="user-name"><span>{saleInfo?.copy} x</span> {nftItem?.title}</div>
      </WelComeCheckout>
      <AmountContainer>
        <label>Amount to buy</label>
        <div>
          <Input
            type='number'
            defaultValue={1}
            min={1}
            max={99}
          />
          <OutlineBox>1/96</OutlineBox>
        </div>
      </AmountContainer>
      <CheckoutDetail>
        <div className="flex-div">
          <div className="purchase-label">Your purchase</div>
          <div className="purchase-name">{saleInfo.paymentName}</div>
        </div>

        <div className="divider"></div>
        <div className="flex-div">
          <div className="purchase-label">Royalty Fee</div>
          <div className="purchase-desc">0.00075</div>
        </div>
        <div className="flex-div">
          <div className="purchase-label">Service Fee</div>
          <div className="purchase-desc">{serviceFeeCalculate(saleInfo)}</div>
        </div>
        <div className="flex-div">
          <div className="purchase-label">Total Amount</div>
          <div className="purchase-desc">{totalAmountCalculate(saleInfo)}</div>
        </div>
        <div className="flex-div">
          <div className="purchase-label">You Will Pay</div>
          <div className="purchase-desc">{payAmountCalculate(saleInfo)}</div>
        </div>
        <div className="flex-div">
          <div className="purchase-label">Your Account Balance</div>
          <div className="purchase-desc">{myBalance}</div>
        </div>
      </CheckoutDetail>
      <CheckoutTerms>
        {'By clicking the below button to purchase, you confirm that you have done your own due diligence to verify the authenticity of this NFT & assume any incurred loss resulting from this purchase. Network fees may be assessed at payment processing.'}
      </CheckoutTerms>
      <GradientButton
        label={'Proceed to Payment'} 
        height={'50px'} 
        width={'316px'}
        fontSize={'22px'}
        isNoPadding
        handleClick={() => handleProcess()} 
      />
    </CheckoutFormContainer>
  );
};