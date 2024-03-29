import React, { useCallback, useState, useEffect, useMemo } from 'react'
import { Select } from '../../Shared/Select'
import { Input } from '../../Shared/InputBox'
import ToggleButton from '../../Shared/ToggleButton'
import { useTheme } from 'styled-components'
import NFTInputBox from '../../Shared/NFTInputBox'
import GradientButton from '../../Shared/GradientButton'

import {
  TimeAuctionContainer,
  MethodContainer,
  CustomLabel,
  Option,
  StartingPriceContainer,
  InputWrapper,
  DurationContainer,
  OutlineBox,
  ToggleContainer
} from './styles'
import { useNavigate } from 'react-router-dom'

import { useContract } from '../../../contexts/ContractContext'
import { useNFTItem } from '../../../contexts/NFTContext'
import useToast from '../../../hooks/useToast'
import { useGlobal } from '../../../contexts/GlobalContext'
import { useCustomWallet } from '../../../contexts/WalletContext'
import { useAuth, UserRole } from '../../../contexts/AuthContext'
import walletConfig from '../../../contexts/WalletContext/config'

export const TimeAuction = (props) => {
  const { item, defFee } = props;

  const { showLoading, hideLoading, toastError, toastInfo } = useToast();
  const { invokeServer } = useGlobal();
  const { wallet, getWalletAddressBySessionKey } = useCustomWallet();
  const { auth } = useAuth();
  const { convertPrice, createSale, tokenAmountWithoutDecimal, tokenAmountWithDecimal, getPaymentName } = useContract();

  const { itemLoaded, balance, saleCount } = useNFTItem();

  const [paymentIndex, setPaymentIndex] = useState(0);
  const [usdPrice, setUSDPrice] = useState('0.00');
  const [copy, setCopy] = useState(1);

  const theme = useTheme()
  const [price, setPrice] = useState('1')
  const [durationTime, setDurationTime] = useState('00:00')
  const [isCustomDate, setIsCustomDate] = useState(false)

  const [isIncludeReservePrice, setIsIncludeReservePrice] = useState(false)
  const [tokenPayments, setTokenPayments] = useState([]);

  const [defFeeValue, setDefFeeValue] = useState(defFee);
  const [selectedPayment, setSelectedPayment] = useState('BNB')

  const navigate = useNavigate();

  const methodOptions = [
    { value: '1', content: <Option>Sell to the highest bidder</Option> }
  ]
  const tokenOptions = [
    { id: 0, value: 'BNB', content: <Option><img src={theme.images.binanceTokenIcon} alt='' /><span>BNB</span></Option> },
    { id: 1, value: 'BUSD', content: <Option><img src={theme.images.binanceUsdIcon} alt='' /><span>BUSD</span></Option> },
    { id: 2, value: 'HyperX', content: <Option><img src={theme.images.chainTokenIcon} alt='' /><span>HyperX</span></Option> },
  ]

  const dateListOptions = [
    { days: 3, value: '3_days', content: <Option>3 Days</Option> },
    { days: 7, value: '7_days', content: <Option>7 days </Option> },
    { days: 15, value: '15_days', content: <Option>15 days</Option> },
    { days: 30, value: 'custom', content: <Option>Custom days (max. 30 days)</Option> }
  ]

  const [customDays, setCustomDays] = useState(dateListOptions[1].days);

  useEffect(() => {
    if (wallet.address) {
      if (auth.loggedUserRole === UserRole.Creator) {
        invokeServer('get', `/api/creators?info=payment&address=${getWalletAddressBySessionKey()}`)
          .then(r => {
            let ret = r.data.data;
            let newrs = ret.map(t => {
              let tval = tokenOptions.find(ttt => ttt.id === t.id);
              return {
                id: t.id,
                value: t.name,
                content: tval === undefined? <Option><span>{t.name}</span></Option>: tval.content
              }
            })

            setTokenPayments(tt => newrs);
          })
          .catch(err => {
            console.log(`${err.message}`);
          })
      } else {
        setTokenPayments(tt => [tokenOptions[0], tokenOptions[1]])
      }
    }
  }, [wallet.address, auth.loggedUserRole, getWalletAddressBySessionKey])

  const handleDateChange = (val) => {
    setIsCustomDate(t => val === 'custom');
    if (val !== 'custom') {
      let item = dateListOptions.find(item => item.value === val);
      item && setCustomDays(item.days);
    }
  }

  const handleCustomDays = (val) => {
    let nval = parseInt(val);
    if (isNaN(nval) || nval < 0) {
      nval = 0;
    } else if (nval > 30) {
      nval = 30;
    }

    setCustomDays(t => nval);
  }

  const changeToken = (val) => {
    const item = tokenPayments.find(item => item.value === val);
    setSelectedPayment(item.value)
    if (item !== undefined) {
      setPaymentIndex(t => item.id);
    }
  }

  const goToPage = useCallback(() => {
    item.collectionAddress && navigate({
      pathname: `/products/${item.collectionAddress}/${item.tokenId}/sell`
    })
  }, [item])

  useEffect(() => {
    let res = convertPrice(paymentIndex, price);

    if (res !== null) {
      setUSDPrice(res);
    }
  }, [convertPrice, price, paymentIndex])

  const listOnSale = async () => {
    let v = durationTime.split(':');
    v = parseInt(v[0]) * 3600 + parseInt(v[1]) * 60;

    let d = customDays * 24 * 3600 + v;

    showLoading('Creating a timed auction sale...');

    let tx = await createSale({
      saleName: 'timed auction sale',
      collectionAddress: item.collectionAddress,
      tokenId: item.tokenId,
      payment: paymentIndex,
      copy: copy,
      method: 1, // timed auction
      duration: d,
      basePrice: tokenAmountWithoutDecimal(paymentIndex, price),
      fee: defFeeValue.fee * 100,
      royalty: defFeeValue.royalty * 100,
    });

    if (tx !== undefined) {
      let retval = tx.events.ListedOnSale.returnValues;
      let basePrice = tokenAmountWithDecimal(parseInt(retval.saleInfo.payment), retval.saleInfo.basePrice).toString();
      let saleId = parseInt(retval.saleId);

      invokeServer('put', '/api/sale', {
        collectionAddress: retval.saleInfo.sc,
        tokenId: parseInt(retval.saleInfo.tokenId),
        saleId: saleId,
        copy: parseInt(retval.saleInfo.copy),
        method: 1,
        payment: parseInt(retval.saleInfo.payment),
        paymentName: getPaymentName(parseInt(retval.saleInfo.payment)),
        price: parseFloat(basePrice),
        seller: retval.saleInfo.seller,
        fee: parseFloat(retval.saleInfo.feeRatio) / 100,
        royalty: parseFloat(retval.saleInfo.royaltyRatio) / 100,
        duration: parseInt(retval.saleInfo.endTime) - parseInt(retval.saleInfo.startTime)
      })
        .then(r => {
          if (r.data.result === 1) {
            toastInfo('Sale', r.data.msg);
            goToPage();
          } else {
            toastError('Sale', r.data.msg);
          }
        })
        .catch (err => {
          console.log(err.message);
          toastError('Sale', err.message);
        })
    }

    hideLoading();
  }

  return (
    <TimeAuctionContainer>
      <MethodContainer>
        <CustomLabel>Method</CustomLabel>
        <Select
          notReload
          options={methodOptions}
          defaultValue='1'
          onChange={val => console.log(val)}
        />
      </MethodContainer>
      <CustomLabel>Starting price</CustomLabel>
      <StartingPriceContainer>
        <div className="nft-dropdown-container">
          <Select
            notReload
            placeholder='Select token'
            options={tokenPayments}
            defaultValue={selectedPayment}
            onChange={val => changeToken(val)}
          />
        </div>
        <div className="nft-input-container">
          <Input
            value={price}
            onChange={e => setPrice(e.target.value)}
            placeholder='Amount'
            onKeyPress={(e) => {
              if (!/^[0-9.]$/.test(e.key)) {
                e.preventDefault()
              }
            }}
          />
          <span>${usdPrice}</span>
        </div>
      </StartingPriceContainer>

      <InputWrapper>
        <div>
          <label><span>*</span>Copies</label>
          <div className="copy-balance">
            <Input
              type='number'
              defaultValue={copy}
              onChange={(e) => {
                let val = parseInt(e.target.value);
                if (isNaN(val))
                  val = 1;
                else if (val <= 0 || val + saleCount > balance)
                  return;

                setCopy(t => val)
              }}
            />
            <OutlineBox>
              {`${copy}/${balance - saleCount}`}
            </OutlineBox>
          </div>
        </div>
        {auth.loggedUserRole === UserRole.Creator ? <div>
          <label><span>*</span>Royalties (Max 10%)</label>
          <Input
            type='number'
            defaultValue={defFeeValue.royalty}
            onChange={(e) => setDefFeeValue(t => {
              let val = parseFloat(e.target.value);
              if (isNaN(val)) {
                val = defFee.royalty;
              } else if (val > 10) {
                val = 10;
              } else if (val < 0) {
                val = 0;
              }

              return { ...t, royalty: val }
            })}
          />
        </div> : <></>}
      </InputWrapper>

      <CustomLabel>Duration</CustomLabel>
      <DurationContainer>
        <Select
          notReload
          options={dateListOptions}
          placeholder='Select date'
          defaultValue='7_days'
          onChange={handleDateChange}
        />
        <NFTInputBox
          placeholder={'Enter Time'}
          name={'durationTime'}
          type={'time'}
          value={durationTime}
          onChange={setDurationTime}
        />
      </DurationContainer>
      {isCustomDate && (
        <div className='set-custom-date'>
          <Input
            type='number'
            defaultValue={customDays}
            onChange={e => handleCustomDays(e.target.value)}
          />
        </div>
      )}
      <ToggleContainer>
        {/* <span>include reserve price</span>
        <ToggleButton
          isChecked={isIncludeReservePrice}
          handleToggle={() => setIsIncludeReservePrice(!isIncludeReservePrice)}
        /> */}
      </ToggleContainer>
      <div className="price-fees">
        <div className="price-fee-title">Fees</div>
        <div className="price-fee-desc">
          <div>Service Fee</div>
          <div>{defFeeValue.fee}%</div>
        </div>
        <div className="price-fee-desc">
          <div>Creator royalty</div>
          <div>{defFeeValue.royalty}%</div>
        </div>
      </div>
      <GradientButton
        label={'List Now'}
        height={'52px'}
        width={'131px'}
        fontSize={'16px'}
        isNoPadding
        handleClick={() => listOnSale()}
      />
    </TimeAuctionContainer>
  )
}
