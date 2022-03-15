import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router';
import {
  PersonSettingSharpIcon,
  UserCircleSharpIcon,
  FourGridIcon,
  NineGridIcon,
  GraphIcon,
  EyeHideIcon,
  MoreIcon,
  MakeOfferIcon,
  ProgressUploadSharpIcon,
  GrayEyeIcon,
  BellActiveIcon,
  HammerIcon,
  TicketIcon
} from '../../Shared/SvgIcons'
import { useAuth, UserRole } from '../../../contexts/AuthContext';
import {
  NavigationBarContainer,
  NavigationBarContent,
  MenuItemWrapper
} from './styles'
import { ProfilePageSections } from '..';
import { useCustomWallet } from '../../../contexts/WalletContext';

export const ProfileNavigatorBar = (props) => {
  const {
    isMoreView,
    handleMoreView,
    isOpenSideMenu,
    setIsOpenSideMenu,
    closeSideMenu,
    activeSection,
    handleActiveSection,
    filterParams,
    setFilterParams,
    address,
    noFilter
  } = props

  const { auth } = useAuth();
  const navigate = useNavigate()
  const [isExpand, setIsExpand] = useState(false)
  const [isOperator, setIsOperator] = useState(false)
  const { wallet } = useCustomWallet();

  useEffect(() => {
    console.log('------------------', wallet.address.toLowerCase(), address.toLowerCase());
    setIsOperator(t => wallet.address.toLowerCase() === address.toLowerCase());
  }, [wallet.address, address])

  const gridHandleOnClick = () => {
    if (activeSection === ProfilePageSections.grid) {
      handleMoreView()
    } else {
      handleActiveSection(ProfilePageSections.grid)
    }
  }

  const handleExpandIcons = () => {
    setIsExpand(!isExpand)
  }

  console.log(ProfilePageSections)

  return (
    <>
      <NavigationBarContainer>
        <NavigationBarContent>
          <MenuItemWrapper
            active={activeSection === ProfilePageSections.grid}
            onClick={() => gridHandleOnClick()}
          >
            {isMoreView ? (
              <FourGridIcon />
            ) : (
              <NineGridIcon />
            )}
            <span>Items</span>
          </MenuItemWrapper>
          <MenuItemWrapper
            active={activeSection === ProfilePageSections.notifications}
            onClick={() => handleActiveSection(ProfilePageSections.notifications)}
          >
            <BellActiveIcon />
            <span>Notifications</span>
          </MenuItemWrapper>
          <MenuItemWrapper
            active={activeSection === ProfilePageSections.activity}
            onClick={() => handleActiveSection(ProfilePageSections.activity)}
          >
            <GraphIcon />
            <span>Activity</span>
          </MenuItemWrapper>
          {wallet.address && (
            <>
              {/* <MenuItemWrapper
                active={activeSection === ProfilePageSections.hideNFT}
                onClick={() => handleActiveSection(ProfilePageSections.hideNFT)}
              >
                <GrayEyeIcon />
                <span>Hidden</span>
              </MenuItemWrapper> */}

              {
                (auth.loggedUserRole !== UserRole.User && isOperator === true) ?
                  <MenuItemWrapper
                    active={activeSection === ProfilePageSections.favorite}
                    onClick={() => handleActiveSection(ProfilePageSections.favorite)}
                  >
                    <UserCircleSharpIcon />
                    <span>Favorites</span>
                  </MenuItemWrapper> : <></>
              }
              {
                isExpand && (auth.loggedUserRole !== UserRole.User && isOperator === true) ? (
                  <>
                    <MenuItemWrapper
                      active={activeSection === ProfilePageSections.listing}
                      onClick={() => handleActiveSection(ProfilePageSections.listing)}
                    >
                      <TicketIcon />
                      <span>Listing</span>
                    </MenuItemWrapper>
                    <MenuItemWrapper
                      active={activeSection === ProfilePageSections.auction}
                      onClick={() => handleActiveSection(ProfilePageSections.auction)}
                    >
                      <HammerIcon />
                      <span>Auctions</span>
                    </MenuItemWrapper>
                    <MenuItemWrapper
                      active={activeSection === ProfilePageSections.offer}
                      onClick={() => handleActiveSection(ProfilePageSections.offer)}
                    >
                      <MakeOfferIcon />
                      <span>Offer</span>
                    </MenuItemWrapper>
                    <MenuItemWrapper
                      onClick={() => navigate('/upload')}
                    >
                      <ProgressUploadSharpIcon />
                      <span>Upload</span>
                    </MenuItemWrapper>
                    <MenuItemWrapper
                      onClick={() => navigate('/settings')}
                    >
                      <PersonSettingSharpIcon />
                      <span>Settings</span>
                    </MenuItemWrapper>
                  </>
                ) : <></>
              }
              {
                isOperator === true && <MenuItemWrapper
                  onClick={() => handleExpandIcons()}
                >
                  <MoreIcon />
                  <span>{isExpand === true? 'Less': 'More'}</span>
                </MenuItemWrapper>
              }
            </>
          )}

        </NavigationBarContent>
      </NavigationBarContainer>
    </>
  )
}