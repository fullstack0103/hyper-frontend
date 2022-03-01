import React from 'react'
import {
  PersonSettingSharpIcon,
  UserCircleSharpIcon,
  AlramSharpIcon,
  ArrowLeftIcon,
  ProgressUploadIcon,
  UserCircleFillSharpIcon,
} from '../../Shared/SvgIcons'
import { SettingPageSections } from '..';
import {
  NavigationBarContainer,
  NavigationBarContent,
  MenuItemWrapper
} from './styles'
import { UserRole, useAuth } from '../../../contexts/AuthContext';

export const SettingsNavigationBar = (props) => {
  const {
    activeSection,
    handleActiveSection
  } = props

  const { auth } = useAuth();

  return (
    <>
      <NavigationBarContainer>
        <NavigationBarContent>
          <MenuItemWrapper
            active={SettingPageSections.profile === activeSection}
            onClick={() => handleActiveSection(SettingPageSections.profile)}
          >
            <UserCircleFillSharpIcon />
            <span>Profile</span>
          </MenuItemWrapper>
          {
            auth.loggedUserRole !== UserRole.Creator? <MenuItemWrapper
              active={SettingPageSections.verification === activeSection}
              onClick={() => handleActiveSection(SettingPageSections.verification)}
            >
              <ProgressUploadIcon />
              <span>Verification</span>
            </MenuItemWrapper> : <></>
          }
          <MenuItemWrapper
            active={SettingPageSections.notification === activeSection}
            onClick={() => handleActiveSection(SettingPageSections.notification)}
          >
            <AlramSharpIcon />
            <span>Notifications</span>
          </MenuItemWrapper>
        </NavigationBarContent>
      </NavigationBarContainer>
    </>
  )
}