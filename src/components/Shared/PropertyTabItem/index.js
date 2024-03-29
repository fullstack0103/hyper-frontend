import React, { useEffect, useState } from 'react';
import { PropertyTabItemContainer, PropertyItem } from './styles';
import BsGraphUp from '@meronex/icons/bs/BsGraphUp';
import { useGlobal } from '../../../contexts/GlobalContext';

const PropertyTabItem = ({data, creator}) => {

  const { invokeServer } = useGlobal();
  const [ percentage, setPercentage] = useState();
  
  useEffect(() => {
    invokeServer('get', `/api/nft/property?type=${data?.type}&name=${data?.name}&creator=${creator}`)
        .then(r => {
          if (r.data.result === 1) {
            setPercentage(pp => r.data.percentage);
          }
        })
        .catch(err => {
          console.log(`${err.message}`);
        })
  }, [data])

  return (
    <PropertyTabItemContainer>
      <PropertyItem>
        <div className="property-type">{data.type}</div>
        <div className="property-name">{data.name}</div>
        <div className="property-desc">Marketplace: {percentage?.marketplace.toFixed(2)}%</div>
        <div className="property-desc">Creator: {percentage?.creator.toFixed(2)}%</div>
      </PropertyItem>
    </PropertyTabItemContainer>
  )
}

export default PropertyTabItem;
