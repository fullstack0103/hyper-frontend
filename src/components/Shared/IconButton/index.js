import React from 'react';
import { IconButtonContainer, ButtonGroup, ButtonIcon, ButtonLabel, DisplayPopular } from './styles';

const IconButton = (props) => {

  const {
    label,
    icon,
    isPopular,
    handleOnClick
  } = props

  return (
    <IconButtonContainer onClick={handleOnClick}>
      <ButtonGroup>
        <ButtonIcon>
          <img src={icon} alt={label} />
          <ButtonLabel>
            {label}
          </ButtonLabel>
        </ButtonIcon>
        {isPopular && (
          <DisplayPopular>Popular</DisplayPopular>
        )}
      </ButtonGroup>
    </IconButtonContainer>
  )
}

export default IconButton;
