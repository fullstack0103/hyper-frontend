import React, { useEffect, useState } from 'react'
import { Collection } from './Collection'
import data from '../../data.json'
import GradientButton from '../Shared/GradientButton'
import {
  CollectionsContainer,
  Header,
  MenuListWrapper,
  MenuItem,
  CollectionListWrapper,
  CreateButtonWrapper
} from './styles'
import { useNavigate } from 'react-router-dom'
import { useGlobal } from '../../contexts/GlobalContext'
import { useCustomWallet } from '../../contexts/WalletContext'
import { useAuth } from '../../contexts/AuthContext'
import useToast from '../../hooks/useToast'
import STATUS from '../../global/const'

export const Collections = (props) => {
  const { filter } = props;
  const [selectedMenu, setSelectedMenu] = useState('most_sold')
  const { invokeServer } = useGlobal();
  const { auth } = useAuth();
  const { wallet } = useCustomWallet();
  const { toastError, toastInfo } = useToast();
  const [collectionLoaded, setLoadCollection] = useState([]);

  const navigate = useNavigate();

  const menuList = [
    { key: 'most_sold', name: 'Most sold' },
    { key: 'popular', name: 'Popular' }
  ]

  useEffect(() => {
    if (wallet.address === '')
      return;

    let str_api = ''
    if (filter === 'owner') {
      str_api = `/api/collection?owner=${wallet.address}&extra=onlyOwner`;
    } else if (filter === 'all') {
      str_api = `/api/collection?owner=${wallet.address}&extra=all`;
    }

    invokeServer('get', str_api)
    .then(res => {
      if (res.data.status === STATUS.OK) {
        setLoadCollection(res.data.data);
      } else {
        toastInfo('Warning', res.data.msg);
      }
    })
    .catch(err => {
      console.log(err);
      toastError('Fail', err.message);
    })

  }, [invokeServer, filter, wallet.address, auth])

  const handleSort = (menu) => {
    setSelectedMenu(menu.key)
    setLoadCollection(t => {
      t.sort((first, second) => {
        if (menu.key === 'most_sold') {
          return second.tradeVolume - first.tradeVolume;
        } else if (menu.key === 'popular') {
          return second.tradeCount - first.tradeCount;
        } else return 0;
      });
      return t;
    });
  }

  return (
    <CollectionsContainer>
      <Header>
        <h1>{filter == 'all' ? 'All Collections' : 'My Collections'}</h1>
        <MenuListWrapper>
          {menuList.map(menu => (
            <MenuItem
              key={menu.key}
              active={selectedMenu === menu.key}
              onClick={() => handleSort(menu)}
            >
              {menu.name}
            </MenuItem>
          ))}
        </MenuListWrapper>
      </Header>
      {filter == 'owner' ? (<CreateButtonWrapper>
        <GradientButton
          isNoPadding
          width='178px'
          height='48px'
          label='Create a Collection'
          className='create-btn'
          handleClick={() => navigate(`/my-collections/create`)}
        />
      </CreateButtonWrapper>) : <></>}
      <CollectionListWrapper>
        {collectionLoaded.length > 0 && collectionLoaded.map((collection, i) => (
          <Collection
            key={i}
            collection={collection}
          />
        ))}
      </CollectionListWrapper>
    </CollectionsContainer>
  )
}
