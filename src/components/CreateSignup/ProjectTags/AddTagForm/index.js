import React, { useState } from 'react'
import { Input, TextArea } from '../../../Shared/InputBox'
import GradientButton from '../../../Shared/GradientButton'

import {
  AddTagFormContainer,
  InputWrapper,
  ButtonGroup,
} from './styles'

export const AddTagForm = (props) => {
  const {
    handleClose,
    handleSave
  } = props

  const [formState, setFormState] = useState({})

  const onSave = () => {
    handleSave(formState)
    handleClose()
  }
  return (
    <AddTagFormContainer>
      <InputWrapper>
        <label><span>*</span>Name:</label>
        <Input
          name='name'
          value={formState?.name ?? ''}
          onChange={e => setFormState({ ...formState, name: e.target.value })}
          placeholder='Enter tag name'
          autoComplete='off'
        />
      </InputWrapper>
      <InputWrapper>
        <label><span>*</span>Description:</label>
        <TextArea
          name='description'
          rows={5}
          placeholder='Enter description'
          value={formState?.description ?? ''}
          onChange={e => setFormState({ ...formState, description: e.target.value })}
        />
      </InputWrapper>
      <ButtonGroup isModal>
        <GradientButton
          label='Cancel'
          isNoPadding
          isDarkMode
          width='106px'
          height='41px'
          handleClick={() => handleClose()}
        />
        <GradientButton
          isNoPadding
          label='Save'
          width='106px'
          height='41px'
          handleClick={() => onSave()}
        />
      </ButtonGroup>
    </AddTagFormContainer>
  )
}
