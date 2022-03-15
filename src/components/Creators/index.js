import React, { useEffect, useState } from 'react'
import { Creator } from './Creator'
import GradientButton from '../Shared/GradientButton'
import {
  CreatorsContainer,
  Header,
  MenuListWrapper,
  MenuItem,
  CreatorListWrapper,
  CreateButtonWrapper
} from './styles'
import { useNavigate } from 'react-router-dom'
import { useGlobal } from '../../contexts/GlobalContext'
import { useCustomWallet } from '../../contexts/WalletContext'
import { useAuth } from '../../contexts/AuthContext'
import useToast from '../../hooks/useToast'
import STATUS from '../../global/const'

export const Creators = (props) => {
  const [selectedMenu, setSelectedMenu] = useState('all')
  const [creatorList, setCreatorList] = useState([])
  const [filteredList, setFilteredList] = useState([])
  const { invokeServer } = useGlobal();
  const { auth } = useAuth();
  const { wallet } = useCustomWallet();
  const { toastError, toastInfo } = useToast();
  const [collectionLoaded, setLoadCreator] = useState([]);

  const navigate = useNavigate();

  const menuList = [
    { key: 'all', name: 'All' },
    { key: 'popular', name: 'Popular' }
  ]

  useEffect(() => {
    let ac = new AbortController();

    invokeServer('get', '/api/user/creators?info=all')
      .then(r => {
        if (ac.signal.aborted === false) {
          if (r.data.status === STATUS.OK) {
            setCreatorList(t => r.data.data);
          }
        }
      })

    return () => ac.abort();
  }, [invokeServer])

  useEffect(() => {
    if (selectedMenu === 'all') {
      setFilteredList(t => [...creatorList]);

    } else if (selectedMenu === 'popular') {
      let tt = JSON.parse(JSON.stringify(creatorList));
      tt.sort((first, second) => {
        return second.volumeTrade - first.volumeTrade;
      });
      setFilteredList(t => [...tt]);
    }
  }, [creatorList, selectedMenu])

  return (
    <CreatorsContainer>
      <Header>
        <h1>Creators Explorer</h1>
        <MenuListWrapper>
          {menuList.map(menu => (
            <MenuItem
              key={menu.key}
              active={selectedMenu === menu.key}
              onClick={() => setSelectedMenu(menu.key)}
            >
              {menu.name}
            </MenuItem>
          ))}
        </MenuListWrapper>
      </Header>
      <CreatorListWrapper>
        {filteredList.length > 0 && filteredList.map((creator, i) => (
          <Creator
            key={i}
            creator={creator}
          />
        ))}
      </CreatorListWrapper>
    </CreatorsContainer>
  )
}
