import React, { useEffect } from 'react'
import {
  ProfilePanelContainer,
  ProfileBanner,
  ProfileHeader,
  ProfileContent,
  ProfileFooter,
  SocialList,
  CategoryTitle,
  UserSocialList
} from './styles'
import IconLabel from '../../Shared/IconLabel'
import AiOutlineGlobal from '@meronex/icons/ai/AiOutlineGlobal'
import FaFacebookF from '@meronex/icons/fa/FaFacebookF'
import { HeartOutlineIcon, TwitterIcon, ItemsIcon, UserListIcon, CommentIcon } from '../../Shared/SvgIcons';
import { UserRole } from '../../../contexts/AuthContext';

export const ProfilePanel = (props) => {
  const { ownerInfo } = props;

  console.log(ownerInfo, 'This is ownerinfo')
  
  return (
    <ProfilePanelContainer>
      <ProfileBanner>
        <img src={ownerInfo.coverURI && ownerInfo.coverURI !== '' ? ownerInfo.coverURI: '/images/on1force.png'} alt='profile_cover' className="cover-image" />
        <img src={ownerInfo.avatarURI && ownerInfo.avatarURI !== '' ? ownerInfo.avatarURI : '/images/profile-user-1.png'} alt='profile_logo' className="logo-image" />
      </ProfileBanner>
      <ProfileHeader>
        <div className="header-title">
          <div>
            {ownerInfo.name && `${ownerInfo.name} / `}{ownerInfo.email}
          </div>
        </div>
        {ownerInfo.role !== UserRole.User && (
          <SocialList>
            <a href='https://twitter.com/' rel="noreferrer" target='_blank' className='twitter'><TwitterIcon /></a>
            <a href='https://facebook.com/' rel="noreferrer" target='_blank' className='facebook'><FaFacebookF /></a>
            <a href='https://linkedin.com/' rel="noreferrer" target='_blank' className='site'><AiOutlineGlobal /></a>
          </SocialList>
        )}
        {ownerInfo.role === UserRole.User && (
          <UserSocialList>
            <a href='https://twitter.com/' rel="noreferrer" target='_blank'>
              <TwitterIcon />
              <span>@USERTWITTERHEADLINE</span>
              </a>
          </UserSocialList>
        )}
        {ownerInfo.role === UserRole.Creator && ownerInfo?.businessName && <CategoryTitle>{ownerInfo?.businessName}</CategoryTitle>}
        <ProfileContent>
          {ownerInfo.role === UserRole.Creator ? ownerInfo.bio : ''}
        </ProfileContent>
        <div className="header-review">
          <IconLabel
            icon={<ItemsIcon />}
            label={`${ownerInfo.items || 0} items`}
          />
          <IconLabel
            icon={<UserListIcon />}
            label={`${ownerInfo.holders || 0} owners`}
          />
        </div>
        <div className="header-review">
          <IconLabel
            icon={<HeartOutlineIcon />}
            label={`${ownerInfo.favoriteCount || 0} favorites`}
          />
          <IconLabel
            icon={<CommentIcon />}
            label={`${ownerInfo.commentCount || 0} comments`}
          />
        </div>
      </ProfileHeader>
      <ProfileFooter>
        <div className="footer-item">
          <div className="item-value-flex">
            {/* <img src={chainLogo} alt='chain-logo' /> */}
            <div className="item-value">{ownerInfo.floorPrice?.toFixed(3)}$</div>
          </div>
          <div className="item-name">floor price</div>
        </div>
        <div className="footer-item">
          <div className="item-value-flex">
            {/* <img src={chainLogo} alt='chain-logo' /> */}
            <div className="item-value">{ownerInfo.volumeTrade?.toFixed(3)}$</div>
          </div>
          <div className="item-name">volume trade</div>
        </div>
      </ProfileFooter>
    </ProfilePanelContainer>
  );
};