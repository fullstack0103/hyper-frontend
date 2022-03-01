import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import {
  FilterSharpIcon,
  MistoryIcon,
  ExplorerIcon,
  ProgressUploadSharpIcon,
  PersonSettingSharpIcon,
  UserCircleSharpIcon
} from '../../Shared/SvgIcons'
import { useAuth, UserRole } from '../../../contexts/AuthContext';
import { useLocation } from 'react-router-dom'
import {
  NavigationBarContainer,
  NavigationBarContent,
  MenuItemWrapper,
  FilterContainer
} from './styles'
import { SideBarFilterSection } from '../../Shared/SideBarFilterSection';

export const HomeNavigationBar = (props) => {
  const { auth } = useAuth();
  const location = useLocation()
  const navigate = useNavigate()
  const [isFilter, setIsFilter] = useState(false)

  const openExplore = () => {
    setIsFilter(false)
    navigate('/')
  }

  return (
    <>
      <NavigationBarContainer>
        <NavigationBarContent>
          <MenuItemWrapper
            active={!isFilter && location.pathname.includes('/explorer')}
            onClick={openExplore}
          >
            <ExplorerIcon />
            <span>Explorer</span>
          </MenuItemWrapper>
          <MenuItemWrapper
            active={location.pathname === '/mystery'}
            onClick={() => navigate('/mystery')}
          >
            <MistoryIcon />
            <span>MysteryBox</span>
          </MenuItemWrapper>
          <MenuItemWrapper
            active={isFilter}
            onClick={() => setIsFilter(true)}
          >
            <FilterSharpIcon />
            <span>Filters</span>
          </MenuItemWrapper>
          {auth.isLoggedIn && (
            <>
              {auth.loggedUserRole === UserRole.Creator ?
                <MenuItemWrapper
                  active={location.pathname === '/upload'}
                  onClick={() => navigate('/upload')}
                >
                  <ProgressUploadSharpIcon />
                  <span>Upload</span>
                </MenuItemWrapper> : <></>
              }
              <MenuItemWrapper
                active={location.pathname === '/profile/me'}
                onClick={() => navigate('/profile/me')}
              >
                <UserCircleSharpIcon />
                <span>Profile</span>
              </MenuItemWrapper>
              <MenuItemWrapper
                active={location.pathname === '/settings'}
                onClick={() => navigate('/settings')}
              >
                <PersonSettingSharpIcon />
                <span>Settings</span>
              </MenuItemWrapper>
            </>
          )}

        </NavigationBarContent>
      </NavigationBarContainer>
      {isFilter && (
        <FilterContainer>
          <SideBarFilterSection
            {...props}
            closeSideMenu={() => setIsFilter(false)}
          />
        </FilterContainer>
      )}
    </>

  )
}