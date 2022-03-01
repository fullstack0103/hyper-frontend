import React from 'react';
import { useParams } from 'react-router-dom';
import { useNFTItem } from '../../../contexts/NFTContext';
import { DetailsTabItemContainer, DetailsItem } from './styles';

const DetailsTabItem = () => {

  const {collection, tokenId} = useParams();

  return (
    <DetailsTabItemContainer>
      <DetailsItem>
        <div className="detail-name">Contract address</div>
        <div className="detail-value">{collection.toLowerCase()}</div>
      </DetailsItem>
      <DetailsItem>
        <div className="detail-name">Token ID</div>
        <div className="detail-value">{tokenId}</div>
      </DetailsItem>
      <DetailsItem>
        <div className="detail-name">Token standart</div>
        <div className="detail-value">ERC-1155</div>
      </DetailsItem>
      <DetailsItem>
        <div className="detail-name">Blockchain</div>
        <div className="detail-value">BSC</div>
      </DetailsItem>
    </DetailsTabItemContainer>
  )
}

export default DetailsTabItem;
