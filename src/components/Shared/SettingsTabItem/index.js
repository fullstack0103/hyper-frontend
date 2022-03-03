import React from 'react';
import { Select } from '../Select';
import {
  SettinsContainer,
  SelectContainer,
  Option
} from './styles'

const SettingsTabItem = (props) => {
  const topOptions = [
    { value: 'games_1', content: <Option>Games</Option> },
    { value: 'games_2', content: <Option>Games 2</Option> },
    { value: 'games_3', content: <Option>Games 3</Option> },
    { value: 'games_4', content: <Option>Games 4</Option> }
  ]
  const depth1Options = [
    { value: 'depth1_1', content: <Option>Disito</Option> },
    { value: 'depth1_2', content: <Option>Disito 2</Option> },
    { value: 'depth1_3', content: <Option>Disito 3</Option> },
    { value: 'depth1_4', content: <Option>Disito 4</Option> }
  ]
  const depth2Options = [
    { value: 'depth2_1', content: <Option>Weapon</Option> },
    { value: 'depth2_2', content: <Option>Weapon 2</Option> },
    { value: 'depth2_3', content: <Option>Weapon 3</Option> },
    { value: 'depth2_4', content: <Option>Weapon 4</Option> }
  ]
  const depth3Options = [
    { value: 'depth3_1', content: <Option>Category 1</Option> },
    { value: 'depth3_2', content: <Option>Category 2</Option> },
    { value: 'depth3_3', content: <Option>Category 3</Option> },
    { value: 'depth3_4', content: <Option>Category 4</Option> }
  ]
  return (
    <SettinsContainer>
      <SelectContainer>
        <label>Select Top-Level Category</label>
        <Select
          notReload
          options={topOptions}
          placeholder='Select category'
          defaultValue='games_1'
          onChange={val => console.log(val)}
        />
      </SelectContainer>
      <SelectContainer>
        <label>Select Depth-1 Category</label>
        <Select
          notReload
          options={depth1Options}
          placeholder='Select depth-1 category'
          defaultValue='depth1_1'
          onChange={val => console.log(val)}
        />
      </SelectContainer>
      <SelectContainer>
        <label>Select Depth-2 Category</label>
        <Select
          notReload
          options={depth2Options}
          placeholder='Select depth-2 category'
          defaultValue='depth2_1'
          onChange={val => console.log(val)}
        />
      </SelectContainer>
      <SelectContainer>
        <label>Select Depth-3 Category</label>
        <Select
          notReload
          options={depth3Options}
          placeholder='Select depth-3 category'
          defaultValue='depth3_1'
          onChange={val => console.log(val)}
        />
      </SelectContainer>
    </SettinsContainer>
  )
}

export default SettingsTabItem;
