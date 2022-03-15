import React from 'react'
import { useNavigate } from 'react-router-dom'
import { VerifiedIcon, HeartOutlineIcon, CommentIcon } from '../../Shared/SvgIcons'

import {
  CreatorContainer,
  HeaderImage,
  CreatorLogoWrapper,
  DetailWrapper,
  DetailInfoWrapper,
  DetailInfo,
  Description
} from './styles'

export const Creator = (props) => {
  const {
    creator
  } = props

  const navigate = useNavigate()

  return (
    <CreatorContainer
      onClick={() => navigate(`/profile/${creator?.address}`)}
    >
      <HeaderImage bgimage={creator?.coverURI? creator.coverURI: '/images/on1force.png'} />
      <CreatorLogoWrapper>
        <img src={creator?.avatarURI? creator.avatarURI : '/images/profile-user-1.png'} alt='' />
      </CreatorLogoWrapper>
      <DetailWrapper>
        <h1>{creator?.name}</h1>
        <div className='link'>
          <a href={creator?.email}>{creator?.email}</a>
        </div>
        <DetailInfoWrapper>
          <DetailInfo>
            <VerifiedIcon />
            <span>Verify</span>
          </DetailInfo>
          <DetailInfo>
            <HeartOutlineIcon />
            <span>{creator?.favoriteCount} favorites</span>     
          </DetailInfo>
          <DetailInfo>
            <CommentIcon />
            <span>{creator?.commentCount} comments</span>     
          </DetailInfo>
        </DetailInfoWrapper>
        <DetailInfoWrapper>
          <DetailInfo>
            <span>trade volume: <span>{creator?.volumeTrade?.toFixed(2)}$</span></span>
          </DetailInfo>
        </DetailInfoWrapper>
        <Description>{creator?.bio}</Description>
      </DetailWrapper>
    </CreatorContainer>
  )
}