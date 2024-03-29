import React, { useEffect, useState } from 'react'
import { useGlobal } from '../../../contexts/GlobalContext'
import STATUS from '../../../global/const'
import GradientButton from '../../Shared/GradientButton'
import { Input, TextArea } from '../../Shared/InputBox'
import { Select } from '../../Shared/Select'

import {
  ProjectInfoContainer,
  InputWrapper,
  Option,
  SelectWrapper,
  ButtonGroup
} from './styles'

export const ProjectInfo = (props) => {
  const {
    creatorInfo,
    setCreatorInfo,
    handleBack,
    handleNext
  } = props

  const { invokeServer } = useGlobal();

  // const categoryOptions = [
  //   { value: 'category_1', content: <Option>Category 1</Option> },
  //   { value: 'category_2', content: <Option>Category 2</Option> },
  //   { value: 'category_3', content: <Option>Category 3</Option> },
  //   { value: 'category_4', content: <Option>Category 4</Option> }
  // ]

  const [categoryOptions, setCategoryOptions] = useState([]);

  useEffect(() => {
    let ac = new AbortController();

    invokeServer('get', '/api/user/category')
      .then(r => {
        if (ac.signal.aborted === false) {
          if (r.data.status === STATUS.OK) {
            setCategoryOptions(t => {
              return r.data.data.map(item => { return {
                value: item._id, content: <Option>{item.name}</Option>
              }})
            })
          }
        }
      })
      .catch(err => {
        console.log(`${err.message}`);
      })

    return () => ac.abort();
  }, [])

  // const categoryOptions = [
  //   { value: 'category_1', content: <Option>Games</Option> },
  //   { value: 'category_2', content: <Option>Sports</Option> },
  //   { value: 'category_3', content: <Option>ESports</Option> },
  //   { value: 'category_4', content: <Option>Artist</Option> },
  //   { value: 'category_5', content: <Option>Influencer</Option> },
  //   { value: 'category_6', content: <Option>Custom Category</Option> },
  // ]
  return (
    <ProjectInfoContainer>
      <InputWrapper>
        <label>*Project Name</label>
        <Input
          name='project_name'
          placeholder='Please, input a project name.'
          value={creatorInfo.projectName}
          onChange={e => {
            let tt = e.target.value;
            setCreatorInfo(t => { return {
              ...t,
              projectName: tt
            }})
          }}
        />
      </InputWrapper>
      <InputWrapper>
        <label>*Project Description</label>
        <TextArea
          rows={5}
          value={creatorInfo.projectDescription}
          onChange={e => {
            let tt = e.target.value;
            setCreatorInfo(t => { return {
              ...t,
              projectDescription: tt
            }})
          }}
        />
      </InputWrapper>
      <SelectWrapper>
        <label>*Project Category</label>
        <Select
          notReload
          isCustomArrow
          placeholder={<Option>Select Category</Option>}
          options={categoryOptions}
          defaultValue={creatorInfo.category}
          onChange={val => {
            setCreatorInfo(t => { return {
              ...t,
              category: val
            }})
          }}
        />
      </SelectWrapper>
      <ButtonGroup>
        <GradientButton
          label='Back'
          isNoPadding
          isDarkMode
          height='41px'
          handleClick={() => handleBack()}
        />
        <GradientButton
          isNoPadding
          label='Next'
          height='41px'
          handleClick={() => handleNext()}
        />
      </ButtonGroup>
    </ProjectInfoContainer>
  )
}
