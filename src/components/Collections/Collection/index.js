import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { VerifiedIcon, HeartOutlineIcon, CommentIcon, FourGridIcon, NineGridIcon } from '../../Shared/SvgIcons'
import {
  CollectionContainer,
  HeaderImage,
  CollectionLogoWrapper,
  DetailWrapper,
  DetailInfoWrapper,
  DetailInfo,
  Description
} from './styles'

export const Collection = (props) => {
  const {
    collection
  } = props

  const navigate = useNavigate()

  return (
    <CollectionContainer
      onClick={() => navigate(`/profile/${collection.walletAddress.toLowerCase()}`)}
    >
      <HeaderImage bgimage={collection.bannerURI} />
      <CollectionLogoWrapper>
        <img src={collection.logoURI} alt={collection.name} />
      </CollectionLogoWrapper>
      <DetailWrapper>
        <h1>{collection.name}</h1>
        <div className='link'>
          <span>{collection.user}</span>
        </div>
        <DetailInfoWrapper>
          <DetailInfo>
            <VerifiedIcon />
            <span>Verify</span>     
          </DetailInfo>
          <DetailInfo>
            <HeartOutlineIcon />
            <span>{collection.favoriteCount} favorites</span>     
          </DetailInfo>
          <DetailInfo>
            <CommentIcon />
            <span>{collection.commentCount} comments</span>     
          </DetailInfo>
        </DetailInfoWrapper>
        <DetailInfoWrapper>
          <DetailInfo>
            <FourGridIcon />
            <span>{collection.tradeCount} trades</span>     
          </DetailInfo>
          <DetailInfo>
            <NineGridIcon />
            {/* <span>Volume {collection.tradeVolume.toFixed(2)}$</span>      */}
            <span>Volume {collection.tradeVolume.toFixed(2)}$</span>     
          </DetailInfo>
        </DetailInfoWrapper>
        <Description>{collection.description}</Description>
      </DetailWrapper>
    </CollectionContainer>
  )
}