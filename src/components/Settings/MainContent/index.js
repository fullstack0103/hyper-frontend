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
import STATUS from "../../../global/const";

export const MainContent = (props) => {

  const {
    activeSection,
    setActiveSection
  } = props

  const { auth, setAuth, creatorSignupInfo, setCreatorSignupInfo, handleSubmitCreatorInfo } = useAuth();
  const { wallet } = useCustomWallet();
  const { addFileToIPFS, getIPFSUrl, invokeServer } = useGlobal();
  const { showLoading, hideLoading, toastInfo, toastError, toastSuccess } = useToast();

  const [name, setName] = useState('');
  const [username, setUserName] = useState('');
  const [twitterLink, setTwitterLink] = useState('');
  const [accountBio, setAccountBio] = useState('');
  const [email, setEmail] = useState('');

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
    if (uploaded === undefined) return;

    let objectUrl = URL.createObjectURL(uploaded);
    setCoverImage(objectUrl);
    setCoverFile(uploaded);
  }

  const changeProfileImage = (uploaded) => {
    if (uploaded === undefined) return;

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
    showLoading('Updating profile information...');

    try {
      let res;

      if (coverFile !== null) {
        res = await addFileToIPFS(coverFile)
        var coverImageURI = getIPFSUrl(res.path);
      }

      if (profileFile !== null) {
        console.log('here profileFile');
        res = await addFileToIPFS(profileFile)
        var profileImageURI = getIPFSUrl(res.path);
      }

      res = await invokeServer('post', '/api/user/profile', {
        address: wallet.address,
        cover: coverImageURI,
        avatar: profileImageURI,
        businessName: name,
        userName: username,
        twitterLink: twitterLink,
        accountBio: accountBio,
        email: email,
      })

      hideLoading();

      if (res.data.status === STATUS.OK) {
        setAuth(t => {
          return {
            ...t,
            loggedUserName: username,
            loggedEmailName: email,
            avatarURI: profileImageURI,
            coverURI: coverImageURI,
          }
        })

        toastInfo('Update Profile', res.data.msg);
      } else {
        toastError('Update Profile', res.data.msg);
      }
    }
    catch (err) {
      hideLoading();

      console.log(err.message);
      toastError('Updating Fail!', err.message);
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

  const onSubmitCreatorInfo = () => {
    if (!creatorSignupInfo.projectName || !creatorSignupInfo.projectDescription || !creatorSignupInfo.category) {
      setAlertState({
        open: true,
        content: 'Please, input all items of Project Info, first.'
      })
      return
    }

    handleSubmitCreatorInfo();
  }

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
    if (activeSection !== SettingPageSections.verification) return

    if (!email) {
      setAlertState({
        open: true,
        content: 'Please fill your email first'
      })
    }
  }, [activeSection])

  useEffect(async () => {
    if (wallet.address) {
      let res = await invokeServer('get', `/api/user/profile?address=${wallet.address}`)

      if (res.data.status === STATUS.OK) {
        setName(res.data.data.businessName);
        setUserName(res.data.data.name);
        setTwitterLink(res.data.data.twitterLink);
        setAccountBio(res.data.data.bio);
        setEmail(res.data.data.email);
        if (res.data.data.avatarURI) {
          setProfileImage(res.data.data.avatarURI);
        }
        if (res.data.data.coverURI) {
          setCoverImage(res.data.data.coverURI);
        }
        
        setCreatorSignupInfo(t => {
          return {
            ...t,
            projectName: res.data.data.projectName? res.data.data.projectName : '',
            projectDescription: res.data.data.projectDescription? res.data.data.projectDescription : '',
            category: res.data.data.category? res.data.data.category : '',
            tags: res.data.data.tags? res.data.data.tags : '',
          }
        })
      }
    }
  }, [wallet.address])

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
                    placeholder='You can enter your full name, business name, or brand name'
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
                    value={username}
                    onChange={e => setUserName(e.target.value)}
                    required
                  />
                </FormGroup>
                {/* {auth?.loggedUserRole === 'creator' && (
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
                )} */}
                <FormGroup>
                  <label>Twitter</label>
                  <Input
                    placeholder='Twitter url'
                    name='twitter'
                    type='text'
                    value={twitterLink}
                    onChange={e => setTwitterLink(e.target.value)}
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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