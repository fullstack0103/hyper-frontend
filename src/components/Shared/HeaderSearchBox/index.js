import React, { useState } from 'react';
import { HeaderSearchBoxContainer, Input } from './styles';
import { useLocation } from 'react-router-dom'
import AiOutlineSearch from '@meronex/icons/ai/AiOutlineSearch';
import { useData } from '../../../contexts/DataContext';

const HeaderSearchBox = (props) => {
  const {
    onChange
  } = props

  const location = useLocation()
  const { handleSearchNFTs } = useData();

  const [text, setText] = useState("");
  const [isFocus, setIsFocus] = useState(false);

  const handleChange = (event) => {
    setText(event.target.value)
    handleSearchNFTs(event.target.value)
  };

  const placeholder = location.pathname.includes('/profile') ? 'Search items, collections' : 'Search items, collections, and accounts'
  
  return (
    <HeaderSearchBoxContainer>
      <Input
        type="text"
        value={text}
        onChange={handleChange}
        placeholder={isFocus ? "" : placeholder}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onSubmit={e => {
          e.preventDefault();
        }}
      />
      <div className="left-icon">
        <AiOutlineSearch />
      </div>
    </HeaderSearchBoxContainer>
  )
}

export default HeaderSearchBox;
