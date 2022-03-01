import React from 'react';
import GradientButton from '../GradientButton';
import { EmptyHideNftIcon } from '../SvgIcons';
import { 
  HideNFTSectionContainer
} from './styles';

const HideNFTSection = () => {

  const hideNftList = [];

  return (
    <HideNFTSectionContainer>
      {hideNftList.length > 0 ? (
        <>
        </>
      ) : (
        <div className="no-result">
          <EmptyHideNftIcon />
          <div className="empty-text">There Are No Hidedn NFT on your list yet</div>
          <div className="action-buttons">
            <GradientButton
              label={'Add new'} 
              height={'36px'} 
              width={'106px'}
              fontSize={'14px'}
              handleClick={() => null} 
            />
          </div>
        </div>
      )}
    </HideNFTSectionContainer>
  )
}

export default HideNFTSection;
