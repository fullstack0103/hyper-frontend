import React from 'react'
import { Input } from '../../Shared/InputBox'
import GradientButton from "../../Shared/GradientButton";

import {
  ImoprtNFTContainer,
  InputWrapper
} from './styles'

export const ImoprtNFT = (props) => {
  return (
    <ImoprtNFTContainer>
      <h1>Import file from other side</h1>
      <InputWrapper>
        <label>NFT Address</label>
        <Input
          placeholder='Enter NFT Address'
        />
      </InputWrapper>
      <InputWrapper>
        <label>NFT ID</label>
        <Input
          placeholder='Enter NFT ID'
        />
      </InputWrapper>
      <p>Accept file types (JPG, PNG, MOV, MP4, GIF) Max upload size 50MB</p>
      <GradientButton
        label='Import File'
        width='106px'
        height='41px'
      />
    </ImoprtNFTContainer>
  )
}