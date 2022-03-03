import styled from 'styled-components';

export const SettinsContainer = styled.div`
  padding: 15px 30px;
  margin-bottom: 150px;

  @media (min-width: 576px) {
    padding: 24px 55px;
  }
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
    > div:first-child {
      padding: 12px;
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
`
export const Option = styled.div`
  display: flex;
  align-items: center;
  font-size: 16px;
`