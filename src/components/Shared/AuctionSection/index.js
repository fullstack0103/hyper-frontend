import React, { useState, useEffect } from 'react';
import {
  OfferSectionContainer,
  OfferSectionHeader,
  OfferSectionBody,
  OfferTable,
  EventCreatorProfile,
  EventUserProfile,
  EventActionProfile,
  FilterWrapper,
  TitleWrapper
} from './styles';
import { useTheme } from 'styled-components';
import { EmptyActivityIcon, ActionCheckIcon, ActionCloseIcon, HammerIcon } from '../SvgIcons';
import { useGlobal } from '../../../contexts/GlobalContext';
import { useCustomWallet } from '../../../contexts/WalletContext';
import { useParams } from 'react-router-dom';
import eventCreatorAvatar from '../../../assets/images/EventCreatorAvatar.png';
import { useContract } from '../../../contexts/ContractContext';
import useToast from '../../../hooks/useToast';
import { useAuth } from '../../../contexts/AuthContext';
import GradientButton from '../GradientButton';

const AuctionSection = () => {

  const { auth } = useAuth();
  const theme = useTheme();
  const { address } = useParams()
  const { removeOffer, acceptOffer } = useContract()
  const { showLoading, hideLoading, toastInfo, toastSuccess, toastError } = useToast();

  // const [offerList, setOfferList] = useState([])
  const [offerListRows, setOfferListRows] = useState([])
  const [users, setUsers] = useState([])
  const [nfts, setNFTs] = useState([]);
  const { wallet, getWalletAddressBySessionKey } = useCustomWallet()
  const [notItems, setNotItems] = useState([])

  const { invokeServer } = useGlobal();

  const [selectedFilterItem, setSelectedFilterItem] = useState('')

  const filterList = [
    { key: 'all', name: 'ALL' },
    { key: 'bids_made', name: 'BIDS MADE' },
    { key: 'bids_received', name: 'BIDS RECEIVED' }
  ]

  useEffect(() => {
    let ac = new AbortController();

    const loadNotification = () => {
      invokeServer('get', `/api/notification?address=${getWalletAddressBySessionKey()}`)
        .then(r => {
          if (ac.signal.aborted)
            return;

          if (r.data.items !== undefined && JSON.stringify(r.data.items) !== JSON.stringify(notItems)) {
            setNotItems(t => r.data.items);
          }
          setTimeout(loadNotification, 10000);
        })
        .catch(err => {
          console.log(`${err.message}`);
          if (ac.signal.aborted)
            return;
          setTimeout(loadNotification, 3000);
        })
    }

    loadNotification();
    return () => ac.abort();
  }, [])

  const renderItemField = (ofr) => {
    let nftFound = nfts.filter(t => t.collectionAddress.toLowerCase() === ofr.collectionAddress.toLowerCase() && t.tokenId === ofr.tokenId);
    let nftAvatar = eventCreatorAvatar;
    let nftName = '---';
    let creator = '';
    if (nftFound?.length > 0) {
      nftAvatar = nftFound[0].avatarURI;
      nftName = nftFound[0].title;
      creator = nftFound[0].creatorName;
    }

    return (
      <EventCreatorProfile>
        <img src={nftAvatar} alt='nft' />
        <div>
          <div className="title">{creator}</div>
          <div className="value">{nftName}</div>
        </div>
      </EventCreatorProfile>
    )
  }

  const renderPriceField = (activity) => {
    switch (activity.paymentName) {
      case 'HyperX':
        return (
          <div className="price-div">
            <img src={theme.images.chainTokenIcon} alt='hyperX' />
            <div>{activity.price}</div>
          </div>
        )
      case 'BNB':
        return (
          <div className="price-div">
            <img src={theme.images.binanceTokenIcon} alt='bnb' />
            <div>{activity.price}</div>
          </div>
        )
      case 'BUSD':
        return (
          <div className="price-div">
            <img src={theme.images.binanceUsdIcon} alt='busd' />
            <div>{activity.price}</div>
          </div>
        )
      default:
        return (
          <div className="price-div">
            <div>{activity.basePrice} {activity.paymentName}</div>
          </div>
        )
    }
  }

  const renderUser = (address) => {
    let user = users.find(user => user.address.toLowerCase() === address.toLowerCase())

    let userAvatar = user?.avatarURI || eventCreatorAvatar;
    return (
      <EventUserProfile>
        <img src={userAvatar} alt='nft' />
        <div>
          <div className="value">{user?.name || '---'}</div>
        </div>
      </EventUserProfile>
    )
  }

  const renderActions = (ofr) => {
    return (
      <EventActionProfile>
        <div onClick={() => handleRemoveNotification(ofr)}><ActionCloseIcon /></div>
      </EventActionProfile>
    )
  }

  useEffect(() => {
    if (notItems.length > 0) {
      setOfferListRows(allRows =>
        notItems.map(ofr => {
          return (
            <tr key={ofr._id}>
              <td>buy</td>
              <td>{renderItemField(ofr)}</td>
              <td>{renderPriceField(ofr)}</td>
              <td>{ofr.copy}</td>
              <td>{ofr.timespan}</td>
              <td>{renderUser(ofr.address)}</td>
              <td>{renderActions(ofr)}</td>
            </tr>
          )
        })
      )
    } else {
      setOfferListRows(allRows => []);
    }
  }, [notItems, nfts, users])

  const handleRemoveNotification = async (not) => {
    // enter code here
  }

  return (
    <OfferSectionContainer>
      <OfferSectionHeader>
        <TitleWrapper>
          <HammerIcon />
          <div className="header-text">Auctions</div>
        </TitleWrapper>
        <FilterWrapper>
          {filterList.map(item => (
            <GradientButton
              key={item.key}
              isNoPadding
              width='130px'
              height='40px'
              label={item.name}
              isBlackMode={selectedFilterItem !== item.key}
              isDarkMode={selectedFilterItem !== item.key}
              handleClick={() => setSelectedFilterItem(item.key)}
            />
          ))}
        </FilterWrapper>
      </OfferSectionHeader>
      <OfferSectionBody>
        <OfferTable>
          <table>
            <thead>
              <tr>
                <th>Event</th>
                <th>Item</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Time</th>
                <th>From</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {offerListRows.length > 0 ? offerListRows : (
                <tr>
                  <td colSpan={8} style={{ paddingTop: '100px' }}>
                    <div className="no-result">
                      <EmptyActivityIcon />
                      <div className="empty-text">There Are No notifications Yet</div>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </OfferTable>
      </OfferSectionBody>
    </OfferSectionContainer>
  )
}

export default AuctionSection;
