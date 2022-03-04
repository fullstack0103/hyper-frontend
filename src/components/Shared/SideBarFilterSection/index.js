import React, { useState, useEffect, useCallback } from 'react'
import { useTheme } from 'styled-components'

import Accordion from '../Accordion'
import CheckBox from '../CheckBox'
import { IconDropDown } from '../IconDropDown'
import RangeSlider from '../RangeSlider'
import { ArrowLeftIcon, ArrowRightIcon, FilterSharpIcon } from '../SvgIcons'
import GradientButton from '../GradientButton'
import { Select } from '../Select'
import { useLocation } from 'react-router-dom'
import {
  SideBarFilterSectionContainer,
  FilterContent,
  ResetButtonWrapper,
  CategoryFilterContainer,
  SelectContainer,
  Option
} from './styles'

export const SideBarFilterSection = (props) => {

  const {
    position,
    closeSideMenu,
    listType,
    filterParams,
    setFilterParams,
  } = props

  const theme = useTheme();

  const location = useLocation();

  const [currencyIds, setCurrencyIds] = useState(filterParams?.currency?.map(t => t.id) || []);
  const [statusIds, setStatusIds] = useState(filterParams?.status?.map(t => t.id) || []);
  const [rarityIds, setRarityIds] = useState(filterParams?.rarity?.map(t => t.id) || []);

  const viewTypeList = [
    // {id: 0, name: 'Binance Token (BNB)', key: 'BNB', icon: theme.images.binanceTokenIcon},
    { id: 1, name: 'Binance USD (BUSD)', key: '$', icon: theme.images.binanceUsdIcon },
    // {id: 2, name: 'HyperX Chain Token (HyperX)', key: 'HyperX', icon: theme.images.chainTokenIcon},
  ]

  const [priceUnit, setPriceUnit] = useState(viewTypeList.filter(t => t.id === filterParams?.price?.unit));
  const [priceMinMax, setPriceMinMax] = useState([
    filterParams?.price?.min || filterParams?.price?.minSetting,
    filterParams?.price?.max || filterParams?.price?.maxSetting
  ]);
  const [idMintMinMax, setIDMintMinMax] = useState([
    filterParams?.mintID?.min || filterParams?.mintID?.minSetting,
    filterParams?.mintID?.max || filterParams?.mintID?.maxSetting
  ]);

  const [topLevelCategory, setTopLevelCategory] = useState('all')

  const sortTypeList = [
    { id: 0, name: 'Recently Listed', key: 'latest_list' },
    { id: 1, name: 'Recently Sold', key: 'latest_sold' },
    { id: 2, name: 'Most Viewed', key: 'most_viewed' },
    { id: 3, name: 'Most Favorited', key: 'most_favorite' },
    { id: 4, name: 'Oldest', key: 'oldest' }
  ]

  const [sortType, setSortType] = useState(filterParams?.sort || sortTypeList[0]);

  const defaultRarityList = [
    { id: 0, name: 'Common' },
    { id: 1, name: 'Uncommon' },
    { id: 2, name: 'Rare' },
    { id: 3, name: 'Ultra Rare' },
    { id: 4, name: 'Legendary' }
  ]

  const defaultCurrencyList = [
    { id: 0, name: 'BNB' },
    { id: 1, name: 'BUSD' },
    { id: 2, name: 'HyperX' }
  ]

  const defaultStatusList = [
    { id: 0, name: 'Fixed-Price', key: 'buy' },
    { id: 1, name: 'Auction', key: 'bid' }
  ]

  const topLevelOptions = [
    { value: 'all', content: <Option>All</Option> },
    { value: 'games', content: <Option>Games</Option> },
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

  const handleChangeIds = (id, idGroup, setIdGroup) => {
    let _resId = []
    const found = idGroup.find(sid => sid === id)
    if (found != undefined) {
      _resId = idGroup.filter(sid => sid !== id)
    } else {
      _resId = [...idGroup]
      _resId.push(id)
    }
    setIdGroup(_resId)
  }

  const handleChangePriceType = (priceInfo) => {
    setPriceUnit(t => priceInfo);
  }

  const handleChangeSortType = (sortInfo) => {
    setSortType(t => sortInfo);
  }

  const handlePriceMinMaxChanged = useCallback(({ min, max }) => {
    setPriceMinMax([min, max])
  }, [setPriceMinMax])

  const handleMintIDMinMaxChanged = useCallback(({ min, max }) => {
    setIDMintMinMax([min, max])
  }, [setIDMintMinMax])

  useEffect(() => {
    sortType && setFilterParams && setFilterParams(t => {
      return {
        ...t,
        sort: {
          ...t.sort,
          ...sortType,
        }
      }
    })
  }, [sortType, setFilterParams])

  useEffect(() => {
    let priceInfo = {
      unit: priceUnit?.id || 0,
      unitName: priceUnit?.key || viewTypeList[0].key,
      min: priceMinMax ? priceMinMax[0] : undefined,
      max: priceMinMax ? priceMinMax[1] : undefined,
    }

    setFilterParams && setFilterParams(t => {
      return {
        ...t,
        price: {
          ...t.price,
          ...priceInfo,
        }
      }
    })
  }, [priceUnit, priceMinMax, setFilterParams])

  useEffect(() => {
    let items = currencyIds.map(t => {
      let tt = defaultCurrencyList.find(st => st.id === t);
      return tt;
    });

    setFilterParams && setFilterParams(t => {
      return {
        ...t,
        currency: items
      }
    })

  }, [currencyIds, setFilterParams])

  useEffect(() => {
    let items = statusIds.map(t => {
      let tt = defaultStatusList.find(st => st.id === t);
      return tt;
    });

    setFilterParams && setFilterParams(t => {
      return {
        ...t,
        status: items
      }
    })

  }, [statusIds, setFilterParams])

  useEffect(() => {
    let items = rarityIds.map(t => {
      let tt = defaultRarityList.find(st => st.id === t);
      return tt;
    });

    setFilterParams && setFilterParams(t => {
      return {
        ...t,
        rarity: items
      }
    })

  }, [rarityIds, setFilterParams])

  useEffect(() => {
    let idMint = {
      min: idMintMinMax ? idMintMinMax[0] : undefined,
      max: idMintMinMax ? idMintMinMax[1] : undefined,
    }

    setFilterParams && setFilterParams(t => {
      return {
        ...t,
        mintID: {
          ...t.mintID,
          ...idMint,
        }
      }
    })
  }, [idMintMinMax, setFilterParams])

  return (
    <SideBarFilterSectionContainer>
      <div className="filter-modal-header"
        style={{ justifyContent: listType !== 'event' ? 'space-between' : 'center' }}
        onClick={closeSideMenu}
      >
        {listType !== 'event' && (
          position === 'right' ? (
            <ArrowRightIcon />
          ) : (
            <ArrowLeftIcon />
          )
        )}
        <div className="filter-modal-header-user">
          <FilterSharpIcon />
          <div className="filter-modal-header-text">Filters</div>
        </div>
      </div>
      <FilterContent>
        <Accordion title={listType === 'event' ? 'Event Type' : "Sort By"}>
          <div className="sort-div">
            <IconDropDown viewTypeList={sortTypeList} initialType={filterParams?.sort?.key || sortTypeList[0].key} onChange={handleChangeSortType} />
          </div>
        </Accordion>
        <Accordion title='Category'>
          <CategoryFilterContainer>
            <SelectContainer isTop>
              <Select
                notReload
                options={topLevelOptions}
                placeholder='Select category'
                defaultValue={topLevelCategory}
                onChange={val => setTopLevelCategory(val)}
              />
            </SelectContainer>
            {topLevelCategory !== 'all' && (
              <>
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
              </>
            )}
          </CategoryFilterContainer>
        </Accordion>
        <Accordion title="Price">
          <div className="priceType-div">
            <IconDropDown viewTypeList={viewTypeList} initialType={viewTypeList[0].key} onChange={handleChangePriceType} />
          </div>
          <div className="slider-div">
            <RangeSlider
              min={filterParams?.price.minSetting}
              max={filterParams?.price.maxSetting}
              minv={priceMinMax[0]}
              maxv={priceMinMax[1]}
              onChange={handlePriceMinMaxChanged}
              unit={priceUnit?.key}
            />
          </div>
        </Accordion>
        <Accordion title="Currency" isOpened={false}>
          <div className="collection-div">
            {defaultCurrencyList.map(cl => (
              <CheckBox
                key={cl.id}
                id={cl.id}
                label={cl.name}
                isChecked={currencyIds.includes(cl.id)}
                onChange={val => handleChangeIds(val, currencyIds, setCurrencyIds)}
              />
            ))}
          </div>
        </Accordion>
        {
          location?.pathname?.includes('/offer') ? <></> :
            <Accordion title="Status" isOpened={false}>
              <div className="collection-div">
                {defaultStatusList.map(st => (
                  <CheckBox
                    key={st.id}
                    id={st.id}
                    label={st.name}
                    isChecked={statusIds.includes(st.id)}
                    onChange={val => handleChangeIds(val, statusIds, setStatusIds)}
                  />
                ))}
              </div>
            </Accordion>
        }
        <Accordion title="Rarity" isOpened={false}>
          <div className="rarity-div">
            {defaultRarityList.map(rarity => (
              <CheckBox
                key={rarity.id}
                id={rarity.id}
                label={rarity.name}
                isChecked={rarityIds.includes(rarity.id)}
                onChange={val => handleChangeIds(val, rarityIds, setRarityIds)}
              />
            ))}
          </div>
        </Accordion>
        <Accordion title="ID Minted">
          <div className="slider-div">
            <RangeSlider
              min={filterParams?.mintID.minSetting || 0}
              max={filterParams?.mintID.maxSetting || 1000}
              minv={idMintMinMax[0]}
              maxv={idMintMinMax[1]}
              onChange={handleMintIDMinMaxChanged}
              unit=' '
            />
          </div>
        </Accordion>
        <ResetButtonWrapper>
          <GradientButton
            isNaked
            label='RESET ALL FILTERS'
            handleClick={() => {}}
          />
        </ResetButtonWrapper>
      </FilterContent>
    </SideBarFilterSectionContainer>
  )
}