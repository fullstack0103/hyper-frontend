import React, { useEffect } from 'react'
import {
  ProfilePanelContainer,
  ProfileBanner,
  ProfileHeader,
  ProfileContent,
  ProfileFooter
} from './styles'
import IconLabel from '../../Shared/IconLabel';
import { HeartOutlineIcon, VerifiedIcon, ItemsIcon, UserListIcon, CommentIcon } from '../../Shared/SvgIcons';
import { UserRole } from '../../../contexts/AuthContext';

export const ProfilePanel = (props) => {
  const { ownerInfo } = props;
  
  return (
    <ProfilePanelContainer>
      <ProfileBanner>
        <img src={ownerInfo.coverURI && ownerInfo.coverURI !== '' ? ownerInfo.coverURI: '/images/on1force.png'} alt='profile_cover' className="cover-image" />
        <img src={ownerInfo.avatarURI && ownerInfo.avatarURI !== '' ? ownerInfo.avatarURI : '/images/profile-user-1.png'} alt='profile_logo' className="logo-image" />
      </ProfileBanner>
      <ProfileHeader>
        <div className="header-title">
          <div>
            {ownerInfo.role === UserRole.User ? (
              <></>
            ) : (
              <IconLabel
                icon={<VerifiedIcon />}
                label={''}
              />
            )}
            {ownerInfo.name}
          </div>
        </div>
        {ownerInfo.role !== UserRole.User && (
          <div className="header-link">
            https://www.{ownerInfo.name}.com
          </div>
        )}
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