import React, { useState, useEffect } from 'react';
import {
  MainContentContainer,
  SettingFormContainer,
  SettingBanner,
  SettingForm,
  FormGroup,
  VerificationSection,
  NotificationSection,
  MenuWrapper,
  Tab,
  ProjectInfoWrapper
} from './styles'

import settingCover from '../../../assets/images/setting-banner.png';
import profileLogo from '../../../assets/images/profile-banner2.png';
import FormInputBox from '../../Shared/FormInputBox';
import FileUploader from '../../Shared/FileUploader';
import { ChangeIcon } from '../../Shared/SvgIcons';
import { SettingPageSections } from './../index';
import ToggleGroupItem from '../../Shared/ToggleGroupItem';
import { Creator } from './Creator';
import { ProjectInfo } from '../../CreateSignup/ProjectInfo';
import { ProjectTags } from '../../CreateSignup/ProjectTags';
import { useAuth } from '../../../contexts/AuthContext';
import { useGlobal } from '../../../contexts/GlobalContext';
import useToast from '../../../hooks/useToast';
import { useCustomWallet } from '../../../contexts/WalletContext';
import GradientButton from '../../Shared/GradientButton';
import { Input, TextArea } from '../../Shared/InputBox';
import { Alert } from '../../Shared/Confirm';

export const MainContent = (props) => {

  const {
    activeSection,
    setActiveSection
  } = props

  const { auth, setAuth, creatorSignupInfo, setCreatorSignupInfo, handleSubmitCreatorInfo, updateSessionProfile } = useAuth();
  const { wallet } = useCustomWallet();
  const { addFileToIPFS, getIPFSUrl, invokeServer } = useGlobal();
  const { showLoading, hideLoading, toastInfo, toastError, toastSuccess } = useToast();

  const [name, setName] = useState('');
  const [accountBio, setAccountBio] = useState('');
  const [userFormState, setUserFormState] = useState({
    name: auth?.loggedUserName || '',
    email: auth.loggedEmailName || ''
  })
  const [alertState, setAlertState] = useState({ open: false, content: null })

  const [coverImage, setCoverImage] = useState(settingCover);
  const [coverFile, setCoverFile] = useState(null);
  const [profileImage, setProfileImage] = useState(profileLogo);
  const [profileFile, setProfileFile] = useState(null);
  const [selectedItem, setSelectedItem] = useState('creator')

  const [notificationSettings, setNotificationSettings] = useState({
    New_Item_Sold: true,
    New_Bid_Activity: true,
    Auction_Expiration: false,
    Owned_Asset_Upadates: false,
    Like_On_Post: false,
    Comment_Post: false,
    HyperchainX_Newsletter: false
  })

  const changeCoverImage = (uploaded) => {
    let objectUrl = URL.createObjectURL(uploaded);
    setCoverImage(objectUrl);
    setCoverFile(uploaded);
  }

  const changeProfileImage = (uploaded) => {
    let objectUrl = URL.createObjectURL(uploaded);
    setProfileImage(objectUrl);
    setProfileFile(uploaded);
  }

  const creatorList = [
    { key: 'creator', title: 'Creator' },
    { key: 'project_info', title: 'Project Info' },
    { key: 'project_tags', title: 'Project Tags' },
  ]

  const updateProfileInformation = async () => {
    if (coverFile !== null) {
      showLoading('Uploading cover image to IPFS...');

      try {
        let res = await addFileToIPFS(coverFile)
        let imageURI = getIPFSUrl(res.path);

        showLoading('Updating profile information...');

        let r = await invokeServer('post', '/api/signin/profile', {
          name: auth.loggedUserName,
          password: auth.loggedPassword,
          address: wallet.address,
          cover: imageURI
        })

        hideLoading();

        if (r.data.result === 1) {
          setAuth(t => {
            return {
              ...t,
              coverURI: imageURI
            }
          })

          updateSessionProfile({
            cover: imageURI
          });

          toastInfo('Cover Image', r.data.msg);
        } else {
          toastError('Cover Image', r.data.msg);
        }
      } catch (err) {
        hideLoading();

        console.log(err.message);
        toastError('Cover Image', err.message);
      }
    }

    if (profileFile !== null) {
      showLoading('Uploading avatar image to IPFS...');

      try {
        let res = await addFileToIPFS(profileFile)
        let imageURI = getIPFSUrl(res.path);

        showLoading('Updating profile information...');

        let r = await invokeServer('post', '/api/signin/profile', {
          name: auth.loggedUserName,
          password: auth.loggedPassword,
          address: wallet.address,
          avatar: imageURI
        })
        hideLoading();
        if (r.data.result === 1) {
          setAuth(t => {
            return {
              ...t,
              avatarURI: imageURI
            }
          })

          updateSessionProfile({
            avatar: imageURI
          })
          toastInfo('Profile Image', r.data.msg);
        } else {
          toastError('Profile Image', r.data.msg);
        }
      } catch (err) {
        hideLoading();

        console.log(err.message);
        toastError('Profile Image', err.message);
      }
    }

    if (name !== '') {

      try {
        showLoading('Updating profile business name...');

        let r = await invokeServer('post', '/api/signin/profile', {
          name: auth.loggedUserName,
          password: auth.loggedPassword,
          address: wallet.address,
          businessName: name
        })

        hideLoading();
        if (r.data.result === 1) {
          setAuth(t => {
            return {
              ...t,
              businessName: name
            }
          })
          updateSessionProfile({
            businessName: name
          })
          toastInfo('Profile Business Name', r.data.msg);
        } else {
          toastError('Profile Business Name', r.data.msg);
        }
      } catch (err) {
        hideLoading();

        console.log(err.message);
        toastError('Profile Business Name', err.message);
      }
    }

    if (accountBio !== '') {

      try {
        showLoading('Updating profile bio...');

        let r = await invokeServer('post', '/api/signin/profile', {
          name: auth.loggedUserName,
          password: auth.loggedPassword,
          address: wallet.address,
          bio: accountBio
        })

        hideLoading();
        if (r.data.result === 1) {
          setAuth(t => {
            return {
              ...t,
              bio: accountBio
            }
          })
          updateSessionProfile({
            bio: accountBio
          })
          toastInfo('Profile Biography', r.data.msg);
        } else {
          toastError('Profile Biography', r.data.msg);
        }
      } catch (err) {
        hideLoading();

        console.log(err.message);
        toastError('Profile Biography', err.message);
      }
    }
  }

  const updateNotificationInformation = async () => {
    let notif = JSON.stringify(notificationSettings);
    try {
      showLoading('Updating notification information...');

      let r = await invokeServer('post', '/api/signin/profile', {
        name: auth.loggedUserName,
        password: auth.loggedPassword,
        address: wallet.address,
        notification: notif
      })

      hideLoading();
      if (r.data.result === 1) {
        setAuth(t => {
          return {
            ...t,
            notification: notif
          }
        })
        updateSessionProfile({
            notification: notif
        })
        toastInfo('Profile Notification', r.data.msg);
      } else {
        toastError('Profile Notification', r.data.msg);
      }
    } catch (err) {
      hideLoading();

      console.log(err.message);
      toastError('Profile Notification', err.message);
    }
  }

  const handleChangeUserFormState = (e) => {
    setUserFormState({
      ...userFormState,
      [e.target.name]: e.target.value
    })
  }

  const onSubmitCreatorInfo = () => {
    if (!userFormState.name || !userFormState.email) {
      setAlertState({
        open: true,
        content: 'Please complete your profile first'
      })
      return
    }
    handleSubmitCreatorInfo()
  }

  useEffect(() => {
    if (auth.isLoggedIn === true) {
      auth.avatarURI && auth.avatarURI !== '' && setProfileImage(auth.avatarURI);
      auth.coverURI && auth.coverURI !== '' && setCoverImage(auth.coverURI);
      auth.businessName && auth.businessName !== '' && setName(auth.businessName);
      auth.bio && auth.bio !== '' && setAccountBio(auth.bio);
    } else {
      setName('');
      setAccountBio('');
    }
  }, [auth.avatarURI, auth.coverURI, auth.businessName, auth.bio, auth.isLoggedIn])

  useEffect(() => {
    let notif = JSON.parse(auth.notification);

    setNotificationSettings(t => {
      return {
        ...t,
        New_Item_Sold: notif.New_Item_Sold || false,
        New_Bid_Activity: notif.New_Bid_Activity || false,
        Auction_Expiration: notif.Auction_Expiration || false,
        Owned_Asset_Upadates: notif.Owned_Asset_Upadates || false,
        Like_On_Post: notif.Like_On_Post || false,
        Comment_Post: notif.Comment_Post || false,
        HyperchainX_Newsletter: notif.HyperchainX_Newsletter || false
      }
    })
  }, [auth.notification])

  useEffect(() => {
    setUserFormState({
      name: auth?.loggedUserName || '',
      email: auth.loggedEmailName || ''
    })
    setCreatorSignupInfo( t => {
      return {
        ...t,
        name: auth.loggedUserName,
        email: auth.loggedEmailName,
        password: auth.loggedPassword
      }
    });
  }, [auth.loggedUserName, auth.loggedEmailName, auth.loggedPassword])


  useEffect(() => {
    if (activeSection !== SettingPageSections.verification) return
    if (!userFormState.email) {
      setAlertState({
        open: true,
        content: 'Please fill your email first'
      })
    }
  }, [activeSection])


  return (
    <>
      <MainContentContainer>
        <SettingFormContainer>
          {activeSection === SettingPageSections.profile ? (
            <>
              <SettingBanner>
                <div className="cover-image">
                  <img src={coverImage} alt='profile_cover' />
                  <div className="overlay">
                    <FileUploader
                      label={'change'}
                      icon={<ChangeIcon />}
                      isOnlyIcon={true}
                      handleFile={changeCoverImage}
                    />
                    <div className="overlay-text">Change</div>
                  </div>
                </div>
                <div className="logo-image">
                  <img src={profileImage} alt='' />
                  <div className="overlay">
                    <FileUploader
                      label={'change'}
                      icon={<ChangeIcon />}
                      isOnlyIcon={true}
                      handleFile={changeProfileImage}
                    />
                    <div className="overlay-text">Change</div>
                  </div>
                </div>
              </SettingBanner>
              <SettingForm>
                <FormGroup>
                  <label>Name *</label>
                  <Input
                    placeholder='You can enter you full name, business name, or brand name'
                    name='name'
                    type='text'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    autoComplete='off'
                  />
                </FormGroup>
                <FormGroup>
                  <label>Username *</label>
                  <Input
                    placeholder='Choose a username for your profile'
                    name='name'
                    type='text'
                    value={userFormState.name}
                    onChange={e => handleChangeUserFormState(e)}
                    required
                  />
                </FormGroup>
                {auth?.loggedUserRole === 'creator' && (
                  <>
                    <FormGroup>
                      <label>Website</label>
                      <Input
                        placeholder='Website url'
                        name='website'
                        type='text'
                      />
                    </FormGroup>
                    <FormGroup>
                      <label>Facebook</label>
                      <Input
                        placeholder='Facebook url'
                        name='facebook'
                        type='text'
                      />
                    </FormGroup>
                  </>
                )}
                <FormGroup>
                  <label>Twitter</label>
                  <Input
                    placeholder='Twitter url'
                    name='twitter'
                    type='text'
                  />
                </FormGroup>

                <FormGroup>
                  <label>Account Bio</label>
                  <TextArea
                    name='account_bio'
                    rows={4}
                    value={accountBio}
                    onChange={(e) => setAccountBio(e.target.value)}
                  />
                </FormGroup>
                <FormGroup>
                  <label>Wallet Address</label>
                  <Input
                    name='wallet-address'
                    defaultValue={wallet.address}
                  />
                  <p>
                    Our account ownership is controlled by your wallet. The above wallet address currently controls access to you account
                  </p>
                </FormGroup>
                <FormGroup>
                  <label>Email Address *</label>
                  <Input
                    name='email'
                    placeholder='This is where push notifications and account updates will be sent.'
                    required={true}
                    value={userFormState?.email}
                    onChange={(e) => handleChangeUserFormState(e)}
                  />
                </FormGroup>
                <GradientButton
                  label={'Update profile information'}
                  height={'42px'}
                  width={'300px'}
                  fontSize={'18px'}
                  isNoPadding
                  handleClick={updateProfileInformation}
                />
              </SettingForm>`
            </>
          ) : activeSection === SettingPageSections.verification ? (
            <VerificationSection>
              <MenuWrapper>
                {creatorList.map(item => (
                  <Tab
                    key={item.key}
                    active={selectedItem === item.key}
                    onClick={() => setSelectedItem(item.key)}
                  >{item.title}</Tab>
                ))}
              </MenuWrapper>
              {selectedItem === 'creator' && (
                <Creator
                  handleGo={() => setSelectedItem('project_info')}
                />
              )}
              {selectedItem === 'project_info' && (
                <ProjectInfoWrapper>
                  <ProjectInfo
                    creatorInfo={creatorSignupInfo}
                    setCreatorInfo={setCreatorSignupInfo}
                    handleBack={() => setSelectedItem('creator')}
                    handleNext={() => setSelectedItem('project_tags')}
                  />
                </ProjectInfoWrapper>
              )}
              {selectedItem === 'project_tags' && (
                <ProjectInfoWrapper>
                  <ProjectTags
                    creatorInfo={creatorSignupInfo}
                    setCreatorInfo={setCreatorSignupInfo}
                    handleSubmit={onSubmitCreatorInfo}
                    handleBack={() => setSelectedItem('project_info')}
                  />
                </ProjectInfoWrapper>
              )}
            </VerificationSection>
          ) : activeSection === SettingPageSections.notification ? (
            <NotificationSection>
              <div className="title">Notifications</div>
              <div className="description">Edit your notification preferences</div>
              <div className="content">
                <div className="content-item">
                  <ToggleGroupItem
                    title={'New Item Sold'}
                    description={'When someone purchased one of your items'}
                    isChecked={notificationSettings.New_Item_Sold}
                    toggleChecked={() => setNotificationSettings(prev =>
                    ({
                      ...prev,
                      New_Item_Sold: !prev.New_Item_Sold
                    })
                    )}
                  />
                </div>
                <div className="content-item">
                  <ToggleGroupItem
                    title={'New Bid Activity'}
                    description={'When someone bids on one of your items'}
                    isChecked={notificationSettings.New_Bid_Activity}
                    toggleChecked={() => setNotificationSettings(prev =>
                    ({
                      ...prev,
                      New_Bid_Activity: !prev.New_Bid_Activity
                    })
                    )}
                  />
                </div>
                <div className="content-item">
                  <ToggleGroupItem
                    title={'Auction Expiration'}
                    description={'When an auction you created ends'}
                    isChecked={notificationSettings.Auction_Expiration}
                    toggleChecked={() => setNotificationSettings(prev =>
                    ({
                      ...prev,
                      Auction_Expiration: !prev.Auction_Expiration
                    })
                    )}
                  />
                </div>
                <div className="content-item">
                  <ToggleGroupItem
                    title={'Owned Asset Upadates'}
                    description={'When a siginificant update occurs for one of the item you have buyed'}
                    isChecked={notificationSettings.Owned_Asset_Upadates}
                    toggleChecked={() => setNotificationSettings(prev =>
                    ({
                      ...prev,
                      Owned_Asset_Upadates: !prev.Owned_Asset_Upadates
                    })
                    )}
                  />
                </div>
                <div className="content-item">
                  <ToggleGroupItem
                    title={'Like on Post'}
                    description={'When someone like on one of your items'}
                    isChecked={notificationSettings.Like_On_Post}
                    toggleChecked={() => setNotificationSettings(prev =>
                    ({
                      ...prev,
                      Like_On_Post: !prev.Like_On_Post
                    })
                    )}
                  />
                </div>
                <div className="content-item">
                  <ToggleGroupItem
                    title={'Comment Post'}
                    description={'When someone comment on one of your items'}
                    isChecked={notificationSettings.Comment_Post}
                    toggleChecked={() => setNotificationSettings(prev =>
                    ({
                      ...prev,
                      Comment_Post: !prev.Comment_Post
                    })
                    )}
                  />
                </div>
                <div className="content-item">
                  <ToggleGroupItem
                    title={'HyperchainX Newsletter'}
                    description={'Occasional updates from the HyperchainX team'}
                    isChecked={notificationSettings.HyperchainX_Newsletter}
                    toggleChecked={() => setNotificationSettings(prev =>
                    ({
                      ...prev,
                      HyperchainX_Newsletter: !prev.HyperchainX_Newsletter
                    })
                    )}
                  />
                </div>
              </div>
              <GradientButton
                label={'Update notification information'}
                height={'42px'}
                width={'320px'}
                fontSize={'18px'}
                isNoPadding
                handleClick={updateNotificationInformation}
              />
            </NotificationSection>
          ) : (<></>)}
        </SettingFormContainer>
      </MainContentContainer>
      <Alert
        width='600px'
        icon={
          <svg fill="none" viewBox="0 0 24 24" style={{ width: '2rem', height: '2rem' }} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        }
        title={'Error'}
        content={alertState.content}
        acceptText='Complete profile now'
        open={alertState.open}
        onClose={() => {
          setActiveSection('profile')
          setAlertState({ open: false, content: null })
        }}
        onAccept={() => {
          setActiveSection('profile')
          setAlertState({ open: false, content: null })
        }}
      />
    </>
  )
}