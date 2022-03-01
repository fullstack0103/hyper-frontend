import React from 'react'
import GradientButton from '../../../Shared/GradientButton'
import {
  CreatetorContainer
} from './styles'

export const Creator = (props) => {
  const {
    handleGo
  } = props
  return (
    <CreatetorContainer>
      <h1>Want to become a creator?</h1>
      <p>If you are a Game developer, e-sporter, influencer or NFT artist and want to become a creator on our NFT marketplace please apply by filling in the form below.</p>
      <GradientButton
        label='Let’s go'
        isNoPadding
        height='41px'
        width='160px'
        handleClick={() => handleGo()}
      />
    </CreatetorContainer>
  )
}
