import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import { SideBarContainer, SideBarDiv } from './styles'
import { SideToggleBar } from './styles';
import AiOutlineMenu from '@meronex/icons/ai/AiOutlineMenu';
import { SideBarFilterSection } from '../../Shared/SideBarFilterSection'
import {
  FilterSharpIcon,
  FourGridIcon,
  MistoryIcon,
  NineGridIcon,
  PersonSettingSharpIcon,
  ProgressUploadSharpIcon,
  UserCircleSharpIcon
} from '../../Shared/SvgIcons'
import { SideBarAllSection } from '../../Shared/SideBarAllSection';
import { useAuth, UserRole } from '../../../contexts/AuthContext';
import HyperTooltip from '../../Shared/HyperTooltip';
import { useCustomWallet } from '../../../contexts/WalletContext';
import walletConfig from '../../../contexts/WalletContext/config';

export const SideBar = (props) => {

  const {
    isMoreView,
    handleMoreView,
    isOpenSideMenu,
    setIsOpenSideMenu,
    closeSideMenu,
    filterParams,
    setFilterParams,
  } = props

  const { auth } = useAuth();
  const { wallet, getWalletAddressBySessionKey } = useCustomWallet();

  const navigate = useNavigate();
  const [selectedSection, setSelectedSection] = useState('');
  const [depths, setDepths] = useState({});

  const updateSelectedSection = (selSection) => {
    setIsOpenSideMenu(true);
    setSelectedSection(selSection)
  }

  return (
    <SideBarContainer>
      {isOpenSideMenu ? (
        <SideBarDiv>
          {selectedSection === 'all' && (
            <SideBarAllSection
              {...props}
              closeSideMenu={closeSideMenu}
              depths={depths}
              setDepths={setDepths}
              address={getWalletAddressBySessionKey()}
            />
          )}
          {selectedSection === 'filter' && (
            <SideBarFilterSection
              closeSideMenu={closeSideMenu}
              filterParams={filterParams}
              setFilterParams={setFilterParams}
            />
          )}
        </SideBarDiv>
      ) : (
        <SideToggleBar>
          <div className="all-sharp" onClick={() => updateSelectedSection('all')}>
            <HyperTooltip text="Main Menu">
              <AiOutlineMenu />
            </HyperTooltip>
          </div>
          <div className="mistory-sharp" onClick={() => navigate('/mystery')}>
            <HyperTooltip text="Mistery Box">
              <MistoryIcon />
            </HyperTooltip>
          </div>
          <div className="grid-sharp" onClick={() => handleMoreView()}>
            <HyperTooltip text="Grid View">
              {isMoreView ? (
                <FourGridIcon />
              ) : (
                <NineGridIcon />
              )}
            </HyperTooltip>
          </div>
          <div className="filter-sharp" onClick={() => updateSelectedSection('filter')}>
            <HyperTooltip text="Filters">
              <FilterSharpIcon />
            </HyperTooltip>
          </div>
          {wallet.address && (
            <>
              {auth.loggedUserRole === UserRole.Creator ?
                <div className="upload-sharp" onClick={() => navigate('/upload')}>
                  <HyperTooltip text="Upload NFT">
                    <ProgressUploadSharpIcon />
                  </HyperTooltip>
                </div> : <></>
              }
              <div className="profile-sharp" onClick={() => navigate('/profile/me')}>
                <HyperTooltip text="Profile">
                  <UserCircleSharpIcon />
                </HyperTooltip>
              </div>
              <div className="setting-sharp" onClick={() => navigate('/settings')}>
                <HyperTooltip text="Profile Settings">
                  <PersonSettingSharpIcon />
                </HyperTooltip>
              </div>
            </>
          )}
        </SideToggleBar>
      )}
    </SideBarContainer>
  );
};