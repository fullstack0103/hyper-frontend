import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Collection } from './Collection'
import GradientButton from '../Shared/GradientButton'
import { CreateNewIcon } from '../Shared/SvgIcons'
import { Input, TextArea } from '../Shared/InputBox'
import { UploadFile } from './UploadFile'
import MainModal from '../Shared/MainModal'
import data from '../../data.json'

import {
  CollectionCreatorContainer,
  CollectionHeroContainer,
  CreateFormContainer,
  CreateFormHeader,
  CustomLabel,
  CreateFormDetails,
  CustomDescription,
  BannerImageContainer,
  BannerImageWrapper,
  LogoImageContainer,
  LogoImageWrapper,
  ConfirmButtonWrapper,
  ConfirmContainer,
  InputWrapper,
  ErrorMsg
} from './styles'

import { useGlobal } from '../../contexts/GlobalContext'
import useToast from '../../hooks/useToast'
import { useContract } from '../../contexts/ContractContext'
import { useAuth, UserRole } from '../../contexts/AuthContext'
import { useCustomWallet } from '../../contexts/WalletContext'

export const CollectionCreator = () => {

  const getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
  }

  const { handleSubmit } = useForm()
  const [collection, setCollection] = useState({});

  const [photo, setPhoto] = useState(null)
  const [logo, setLogo] = useState(null)
  const [name, setName] = useState('')
  const { auth } = useAuth();

  const [description, setDescription] = useState('')

  const { invokeServer, addFileToIPFS, getIPFSUrl } = useGlobal();
  const { toastError, toastSuccess, showLoading, hideLoading } = useToast();
  const { createNewCollection } = useContract()
  const { wallet } = useCustomWallet();
  const [isConfirmModal, setIsConfirmModal] = useState(false)
  const [isValidate, setIsValidate] = useState(true)

  const onSubmit = data => {
    if (!name || !logo || !photo) {
      setIsValidate(false)
      return
    }
    setIsValidate(true)
    setIsConfirmModal(true)
  }

  const onCreateNewCollection = async () => {

    if (auth.isLoggedIn !== true) {
      toastError("Fail", "Please sign in as a creator");
      return;
    }

    if (auth.loggedUserRole !== UserRole.Creator) {
      toastError("Fail", "You are not a creator");
      return;
    }

    let photoHash = '', logoHash = '';

    if (logo != null) {
      await showLoading('Adding logo image to ipfs...');
      try {
        const hash = await addFileToIPFS(logo.file);
        await toastSuccess('logo hash', getIPFSUrl(hash.path));
        logoHash = hash.path;
      } catch (err) {
        await toastError('Error adding to IPFS', err.toString());
        await hideLoading();
        return;
      }
    }

    if (photo != null) {
      await showLoading('Adding banner image to ipfs...');
      try {
        const hash = await addFileToIPFS(photo.file);
        await toastSuccess('banner hash', getIPFSUrl(hash.path));
        photoHash = hash.path;
      } catch (err) {
        await toastError('Error adding to IPFS', err.toString());
        await hideLoading();
        return;
      }
    }

    await showLoading('creating on blockchain...');
    let ret = await createNewCollection({ banner: photoHash, logo: logoHash, name: name, description: description });

    if (ret !== undefined) {
      let newContractAddress = ret.events.CreatedERC1155TradableContract.returnValues.newContract;
      invokeServer('post', '/api/collection/new', {
        name: name,
        description: description,
        bannerURI: getIPFSUrl(photoHash),
        logoURI: getIPFSUrl(logoHash),
        contractAddress: newContractAddress,
        user: auth.loggedUserName,
        walletAddress: wallet.address,
      })
        .then(r => {
          if (r.data.result == 1) {
            toastSuccess('Success', 'server: ' + r.data.msg);
          } else {
            toastError('Fail', 'server: ' + r.data.msg);
          }
        }).catch(err => {
          toastError('Fail', err.toString());
        })
    }

    await hideLoading();
  }

  useEffect(() => {
    const rval = getRandomInt(data.collections.length);
    setCollection(t => { return data.collections[rval] });
  }, [])

  return (
    <CollectionCreatorContainer>
      <CreateFormContainer>
        <CreateFormHeader>
          <CreateNewIcon />
          <span>Create a Collection</span>
        </CreateFormHeader>
        <CreateFormDetails onSubmit={handleSubmit(onSubmit)}>
          <CustomLabel><span>*</span>Logo Image</CustomLabel>
          <CustomDescription>350 x 350 recommended</CustomDescription>
          <LogoImageContainer>
            <LogoImageWrapper>
              <UploadFile setPhoto={setLogo} />
            </LogoImageWrapper>
            {!isValidate && !logo && <ErrorMsg>This field is required!</ErrorMsg>}
          </LogoImageContainer>

          <BannerImageContainer>
            <CustomLabel><span>*</span>Banner image</CustomLabel>
            <CustomDescription>1400 x 400 recommended </CustomDescription>
            <BannerImageWrapper>
              <UploadFile setPhoto={setPhoto} />
            </BannerImageWrapper>
            {!isValidate && !photo && <ErrorMsg>This field is required!</ErrorMsg>}
          </BannerImageContainer>

          <CustomLabel><span>*</span>Name</CustomLabel>
          <InputWrapper>
            <Input
              placeholder='Enter name for your collection'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {!isValidate && !name && <ErrorMsg>This field is required!</ErrorMsg>}
          </InputWrapper>

          <CustomLabel>Description</CustomLabel>
          <TextArea
            placeholder='Enter name for your collection'
            rows='5'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <GradientButton
            label='Create'
            isSubmit
          />
        </CreateFormDetails>
      </CreateFormContainer>

      <CollectionHeroContainer>
        <h2>Preview</h2>
        <Collection
          collection={collection}
          photo={photo?.url}
          logo={logo?.url}
          name={name}
          description={description}
        />
      </CollectionHeroContainer>
      {isConfirmModal && (
        <MainModal
          icon={<CreateNewIcon />}
          title='Create collection'
          width='556px'
          height='300px'
          handleClose={() => setIsConfirmModal(false)}
        >
          <ConfirmContainer>
            <h1>Are you sure you want to continue?</h1>
            <p>Info and images of collections can not be changed in the future!</p>
            <ConfirmButtonWrapper>
              <GradientButton
                label='CREATE'
                handleClick={onCreateNewCollection}
              />
            </ConfirmButtonWrapper>
          </ConfirmContainer>
        </MainModal>
      )}
    </CollectionCreatorContainer>
  )
}