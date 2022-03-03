import React from 'react';
import { useNavigate } from 'react-router';
import { useAuth, UserRole } from '../../../contexts/AuthContext';
import {
  LinkItem,
  PopUpUserProfileItemContainer
} from './styles';
import NotificationUserImage from '../../../assets/images/notification-user-sample.png';
import { useCustomWallet } from '../../../contexts/WalletContext';

const PopUpUserProfileItem = (props) => {

  let navigate = useNavigate();
  const { handleLogOut } = useAuth();

  const { auth } = useAuth();
  const { wallet } = useCustomWallet();

  return (
    <PopUpUserProfileItemContainer>
      <div className="popup-title">
        <div className="user-image">
          {auth.avatarURI && auth.avatarURI !== '' ?
            <>
              <img src={auth.avatarURI} alt="" />
            </>
            : <>
              <img src={NotificationUserImage} alt="user-img" />
            </>
          }
        </div>
        <div className="user-detail">
          <div className="user-name">{auth.loggedUserName != '' ? auth.loggedUserName : 'ON1 Force'}</div>
          <div className="user-name">{wallet.address ? wallet.address.slice(0, 6) + '...' + wallet.address.slice(-4) : '0x0'}</div>
        </div>
      </div>
      <LinkItem onClick={() => navigate('/profile/me')}>Profile</LinkItem>
      {/* <LinkItem>Favorites</LinkItem> */}
      {auth.loggedUserRole === UserRole.Creator && <LinkItem onClick={() => navigate('/my-collections')}>My Collections</LinkItem>}
      {auth.loggedUserRole === UserRole.Creator && <LinkItem onClick={() => navigate('/upload')}>UPLOAD NFT</LinkItem>}
      <LinkItem onClick={() => navigate('/settings')}>Settings</LinkItem>
      <LinkItem onClick={handleLogOut}>Log Out</LinkItem>
    </PopUpUserProfileItemContainer>
  )
}

export default PopUpUserProfileItem;
