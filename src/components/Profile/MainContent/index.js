import React, { useEffect, useState, useRef } from 'react'
import { useNavigate } from "react-router-dom"
import CardItem from '../../Shared/CardItem'
import { ProfilePanel } from '../ProfilePanel'
import { ProfilePageSections } from '../index'
import ActivitySection from '../../Shared/ActivitySection'
import OfferSection from '../../Shared/OfferSection'
import Notifications from '../../Shared/Notifications'
import { EmptyFolderIcon } from '../../Shared/SvgIcons'
import GradientButton from '../../Shared/GradientButton'
import HideNFTSection from '../../Shared/HideNFTSection'
import FavoriteSection from '../../Shared/FavoriteSection'
import { useCustomWallet } from '../../../contexts/WalletContext'
import { useGlobal } from '../../../contexts/GlobalContext'
import { useAuth, UserRole } from '../../../contexts/AuthContext'
import { Select } from '../../Shared/Select'
import {
  MainContentContainer,
  CardContainer,
  CardList,
  FilterWrapper,
  Option
} from './styles'
import AuctionSection from '../../Shared/AuctionSection'
import ListingSection from '../../Shared/ListingSection'

export const MainContent = (props) => {
  const {
    address,
    // isOpenRightMenu,
    isMoreView,
    activeSection
  } = props

  let navigate = useNavigate()
  const gridDivRef = useRef()
  const { wallet } = useCustomWallet()
  const { auth } = useAuth()
  const { invokeServer } = useGlobal()

  const [ownedNFTs, setOwnedNFTs] = useState([])
  const [nftFound, setNFTFound] = useState([])

  const [isOperator, setIsOperator] = useState(false)
  const [ownerInfo, setOwnerInfo] = useState({
    items: 0,
    holders: 0,
    floorPrice: 0.0,
    volumeTrade: 0.0,
  })
  const [selectedFilterOption, setSelectedFilterOption] = useState('all')

  const tokenOptions = [
    { id: 0, value: 'all', content: <Option><span>ALL</span></Option> },
    { id: 1, value: 'direct_sale', content: <Option><span>DIRECT SALE</span></Option> },
    { id: 2, value: 'auction', content: <Option><span>AUCTION</span></Option> },
    { id: 2, value: 'unlisted', content: <Option><span>UNLISTED</span></Option> },
  ]

  const handleDetails = (collectionAddress, tokenId) => {
    if (address.toLowerCase() === wallet.address.toLowerCase())
      navigate(`/products/${collectionAddress}/${tokenId}/sell`);
    else
      navigate(`/products/${collectionAddress}/${tokenId}/offer`);
  }

  const getGridDivDimension = () => {
    return gridDivRef.current?.clientWidth - 10;
  }

  useEffect(() => {
    setIsOperator(t => wallet.address.toLowerCase() === address.toLowerCase());
  }, [wallet.address, address])

  useEffect(() => {
    let ac = new AbortController();
    invokeServer('get', `/api/nft/owner?address=${address}&validBalance=`)
      .then(res => {
        if (ac.signal.aborted === false) {
          if (res.data.result === 1) {
            let j;
            let rr = res.data.items;
            // simulated too many items...
            // for (j = 0; j < 1000; j++) {
            //   let t = JSON.parse(JSON.stringify(res.data.items[0]));
            //   rr[j] = t;
            // }

            setOwnedNFTs(t => rr);
            setNFTFound(t => []);
          } else {
            setOwnedNFTs(t => []);
          }
        }
      })
      .catch(err => {
        console.log(`${err.message}`);
      })

    invokeServer('get', `/api/user?address=${address}`)
      .then(res => {
        if (ac.signal.aborted === false) {
          if (res.data.result === 1) {
            let j;
            let rr = res.data.user;
            setOwnerInfo(t => { return { ...t, ...rr } })
          }
        }
      })
      .catch(err => {
        console.log(`${err.message}`);
      })

    return () => ac.abort();
  }, [address])

  useEffect(() => {
    let ac = new AbortController();

    let i, maxCount = 100;
    if (maxCount > ownedNFTs.length)
      maxCount = ownedNFTs.length;

    if (maxCount > 0) {
      let filters = ownedNFTs.slice(0, maxCount).map(item => {
        return {
          collectionAddress: item.collectionAddress,
          tokenId: item.tokenId,
        }
      })

      invokeServer('post', '/api/nft/lump', filters.map(t => {
        return {
          collectionAddress: t.collectionAddress.toLowerCase(),
          tokenId: t.tokenId
        }
      }))
        .then(res => {
          if (res.data.result === 1) {
            if (ac.signal.aborted === false) {
              setNFTFound(t => [...t, ...res.data.items]);
              if (ownedNFTs.length > maxCount) {
                setOwnedNFTs(t => t.slice(maxCount, t.length));
              } else {
                setOwnedNFTs(t => [])
              }
            }
          }
        })
        .catch(err => {
          console.log(`${err.message}`);
        })
    } else {
      if (address !== '') {
        invokeServer('get', `/api/user/statistics?address=${address}`)
          .then(res => {
            if (ac.signal.aborted === false) {
              if (res.data.result === 1) {
                setOwnerInfo(t => { return { ...t, ...res.data.info } });
              }
            }
          })
          .catch(err => {
            console.log(`${err.message}`);
          })
      }
    }

    return () => ac.abort();
  }, [ownedNFTs])

  const handleBuyNewItem = () => {
    navigate('/explorer');
  }

  const handleCreateNewItem = () => {
    navigate('/upload');
  }

  const renderMainContent = () => {
    switch (activeSection) {
      case ProfilePageSections.grid:
        return (
          <>
            {nftFound.length > 0 ? (
              <>
                <FilterWrapper>
                  <Select
                    notReload
                    placeholder='Select a option'
                    options={tokenOptions}
                    defaultValue={selectedFilterOption}
                    onChange={val => console.log(val)}
                  />
                </FilterWrapper>
                <CardList isMoreView={isMoreView} ref={gridDivRef}>
                  {nftFound.map((item, index) => (
                    <CardItem key={index} item={item} onClick={() => handleDetails(item.collectionAddress, item.tokenId)} profileAddress={address} />
                  ))}
                </CardList>
              </>
            ) : (<div className="no-result" ref={gridDivRef}>
              <EmptyFolderIcon />
              <div className="empty-text">There Are No NFT in {isOperator === true ? 'your' : `${address}'s`} portfolio Yet</div>
              {
                isOperator ?
                  <div className="action-buttons">
                    {
                      auth.loggedUserRole === UserRole.Creator ?
                        <GradientButton
                          label={'Create item'}
                          height={'36px'}
                          width={'106px'}
                          fontSize={'14px'}
                          handleClick={handleCreateNewItem}
                        /> : <></>
                    }
                    <GradientButton
                      label={'Buy new item'}
                      height={'36px'}
                      width={'106px'}
                      fontSize={'14px'}
                      handleClick={handleBuyNewItem}
                    />
                  </div> : <></>
              }
            </div>
            )}
          </>
        )
      case ProfilePageSections.activity:
        return (
          <div className="activity-section">
            <ActivitySection />
          </div>
        )
      case ProfilePageSections.offer:
        return (
          <div className="offer-section">
            <OfferSection />
          </div>
        )
      case ProfilePageSections.notifications:
      return (
        <div className="offer-section">
          <Notifications />
        </div>
      )
      case ProfilePageSections.auction:
      return (
        <div className="offer-section">
          <AuctionSection />
        </div>
      )
      case ProfilePageSections.listing:
        return (
          <div className="offer-section">
            <ListingSection />
          </div>
        )
      case ProfilePageSections.hideNFT:
        return (
          <div className="hideNft-section">
            <HideNFTSection />
          </div>
        )
      case ProfilePageSections.favorite:
        return (
          <div className="favorite-section">
            <FavoriteSection address={address} />
          </div>
        )
      default:
        break;
    }
  }

  return (
    <MainContentContainer>
      <ProfilePanel ownerInfo={ownerInfo} />
      <CardContainer>
        {renderMainContent()}
      </CardContainer>
    </MainContentContainer>
  )
}