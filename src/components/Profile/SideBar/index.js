import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import { SideBarContainer, SideBarDiv } from './styles'
import { SideToggleBar } from './styles';
// import AiOutlineMenu from '@meronex/icons/ai/AiOutlineMenu';
import { SideBarFilterSection } from '../../Shared/SideBarFilterSection'
import {
  BellInActiveIcon,
  // EyeHideIcon,
  FavoritesIcon,
  FilterSharpIcon,
  FourGridIcon,
  GraphIcon,
  HammerIcon,
  MakeOfferIcon,
  NineGridIcon,
  PersonSettingSharpIcon,
  ProgressUploadSharpIcon,
  TicketIcon
} from '../../Shared/SvgIcons'
import { SideBarAllSection } from '../../Shared/SideBarAllSection';
import HyperTooltip from '../../Shared/HyperTooltip';
import { useAuth, UserRole } from '../../../contexts/AuthContext';
import { ProfilePageSections } from '..';
import { useCustomWallet } from '../../../contexts/WalletContext';

export const SideBar = (props) => {
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
  const { wallet, getWalletAddressBySessionKey } = useCustomWallet()

  const navigate = useNavigate();
  const [selectedSection, setSelectedSection] = useState('');
  const [isOperator, setIsOperator] = useState(false)
  const [depths, setDepths] = useState({})

  const updateSelectedSection = (selSection) => {
    setIsOpenSideMenu(true);
    setSelectedSection(selSection)
  }

  const gridHandleOnClick = () => {
    if (activeSection === ProfilePageSections.grid) {
      handleMoreView()
    } else {
      handleActiveSection(ProfilePageSections.grid)
    }
  }

  useEffect(() => {
    setIsOperator(t => wallet.address.toLowerCase() === address.toLowerCase());
  }, [wallet.address, address])

  return (
    <SideBarContainer>
      {isOpenSideMenu ? (
        <SideBarDiv>
          {selectedSection === 'all' && (
            <SideBarAllSection
              {...props}
              position={'right'}
              closeSideMenu={closeSideMenu}
              depths={depths}
              setDepths={setDepths}
              address={address}
            />
          )}
          {selectedSection === 'filter' && (
            <SideBarFilterSection
              position={'right'}
              closeSideMenu={closeSideMenu}
              filterParams={filterParams}
              setFilterParams={setFilterParams}
            />
          )}
        </SideBarDiv>
      ) : (
        <SideToggleBar>
          {/* <div className="all-sharp" onClick={() => updateSelectedSection('all')}>
            <HyperTooltip text="Main Menu" direction="left">
              <AiOutlineMenu />
            </HyperTooltip>
          </div> */}
          <div
            className={activeSection === ProfilePageSections.grid ? "grid-sharp active" : "grid-sharp"}
            onClick={() => gridHandleOnClick()}
          >
            <HyperTooltip text="Grid View" direction="left">
              {isMoreView ? (
                <FourGridIcon />
              ) : (
                <NineGridIcon />
              )}
            </HyperTooltip>
          </div>
          <div
            className={activeSection === ProfilePageSections.notifications ? "chart-sharp active" : "chart-sharp"}
            onClick={() => handleActiveSection(ProfilePageSections.notifications)}
          >
            <HyperTooltip text="Notifications" direction="left">
              <BellInActiveIcon />
            </HyperTooltip>
          </div>
          <div
            className={activeSection === ProfilePageSections.activity ? "chart-sharp active" : "chart-sharp"}
            onClick={() => handleActiveSection(ProfilePageSections.activity)}
          >
            <HyperTooltip text="Stats" direction="left">
              <GraphIcon />
            </HyperTooltip>
          </div>
          {
            noFilter === undefined && <div className="filter-sharp" onClick={() => updateSelectedSection('filter')}>
              <HyperTooltip text="Filters" direction="left">
                <FilterSharpIcon />
              </HyperTooltip>
            </div>
          }
          {(auth.loggedUserRole !== UserRole.User && isOperator === true) ? (
            <>
              {/* <div
                className={activeSection === ProfilePageSections.hideNFT ? "hide-sharp active" : "hide-sharp"}
                onClick={() => handleActiveSection(ProfilePageSections.hideNFT)}
              >
                <HyperTooltip text="Hide Items" direction="left">
                  <EyeHideIcon />
                </HyperTooltip>
              </div> */}
              <div
                className={activeSection === ProfilePageSections.listing ? "favorite-sharp active" : "favorite-sharp"}
                onClick={() => handleActiveSection(ProfilePageSections.listing)}
              >
                <HyperTooltip text="Listing" direction="left">
                  <TicketIcon />
                </HyperTooltip>
              </div>
              <div
                className={activeSection === ProfilePageSections.auction ? "favorite-sharp active" : "favorite-sharp"}
                onClick={() => handleActiveSection(ProfilePageSections.auction)}
              >
                <HyperTooltip text="Auctions" direction="left">
                  <HammerIcon />
                </HyperTooltip>
              </div>
              <div
                className={activeSection === ProfilePageSections.favorite ? "favorite-sharp active" : "favorite-sharp"}
                onClick={() => handleActiveSection(ProfilePageSections.favorite)}
              >
                <HyperTooltip text="Favorites" direction="left">
                  <FavoritesIcon />
                </HyperTooltip>
              </div>
              <div
                className={activeSection === ProfilePageSections.offer ? "offer-sharp active" : "offer-sharp"}
                onClick={() => handleActiveSection(ProfilePageSections.offer)}
              >
                <HyperTooltip text="Make Offer" direction="left">
                  <MakeOfferIcon />
                </HyperTooltip>
              </div>
              <div className="upload-sharp" onClick={() => navigate('/upload')}>
                <HyperTooltip text="Upload NFT" direction="left">
                  <ProgressUploadSharpIcon />
                </HyperTooltip>
              </div>
              <div className="setting-sharp" onClick={() => navigate('/settings')}>
                <HyperTooltip text="Profile Settings" direction="left">
                  <PersonSettingSharpIcon />
                </HyperTooltip>
              </div>
            </>
          ) : <></>}
        </SideToggleBar>
      )}
    </SideBarContainer>
  );
};