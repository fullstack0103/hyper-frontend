import styled, { css } from 'styled-components'

export const SideBarFilterSectionContainer = styled.div`
  height: 100%;
  overflow: hidden;
`;

export const FilterContent = styled.div`
  height: calc(100% - 134px);
  overflow-x: hidden;
  overflow-y: auto;

  .sort-div, .collection-div, .rarity-div {
    padding: 0 12px;
  }

  @media (min-width: 768px) {
    height: calc(100% - 95px);
  }
`;
export const ResetButtonWrapper = styled.div`
  margin: 10px 0;
  > div {
    padding: 16px 30px;
    > button {
      width: 100% !important;
    }
  }
`
export const CategoryFilterContainer = styled.div`
`
export const SelectContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 25px;

  > label {
    color: #FFF;
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 10px;
  }
  #select-input {
    background: transparent;
    > div:first-child {
      border-radius: 6px;
      padding: 12px;
      background: #191B24;
    }
    > div:last-child {
      position: relative;
    }
    .select-arrow  {
      color: #C4C4C4;
      margin-left: 12px;
    }
    .item {
      padding: 10px 12px;
      white-space: nowrap;
    }
  }

  ${({ isTop }) => isTop && css`
    #select-input {
      > div:first-child {
        background: #222430;
        padding: 16px 12px;
        font-weight: 600;
        color: #FFF;
      }
    }
  `}
`
export const Option = styled.div`
  display: flex;
  align-items: center;
  font-size: 16px;
`
