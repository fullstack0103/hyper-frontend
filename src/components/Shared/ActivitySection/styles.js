import styled from 'styled-components'

export const ActivitySectionContainer = styled.div`
    padding: 26px;
`;

export const ActivitySectionHeader = styled.div`
    display: flex;
    align-items: center;
    margin-top: 38px;
    margin-left: 20px;

    svg {
      fill: #AAFF26;
    }

    .header-text {
      font-style: normal;
      font-weight: normal;
      font-size: 15px;
      line-height: 17px;
      text-align: right;
      color: #FFFFFF;
      margin-left: 12px;
    }
`;

export const ActivitySectionFilter = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  > div:first-child {
    min-width: 130px;
  }

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

export const ActivitySectionBody = styled.div``;

export const ActivityTable = styled.div`
  margin-top: 10px;

  table {
    width: 100%;
    color: #FFFFFF;
    border-collapse: collapse;
  }

  table th, table td{
    text-align: center;
    padding: 12px;
  }

  table th {
    background: #191B24;
  }

  .price-div {
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      margin-right: 6px;
    }
  }
`;


export const EventCreatorProfile = styled.div`
    display: flex;
    align-items: center;
    justify-content: left;

    img {
      width: 48px;
      height: 48px;
      object-fit: cover;
      margin-right: 10px;
    }

    .title {
      font-weight: 500;
      font-size: 12px;
      line-height: 15px;
      color: #C4C4C4;
      text-align: left;
    }

    .value {
      font-weight: 600;
      font-size: 16px;
      line-height: 20px;
      color: #FFFFFF;
      text-align: left;
    }
`;

export const EventUserProfile = styled.div`
    display: flex;
    align-items: center;
    justify-content: left;

    img {
      width: 24px;
      height: 24px;
      object-fit: cover;
      margin-right: 10px;
      border-radius: 50%;
    }

    .title {
      font-weight: 500;
      font-size: 12px;
      line-height: 15px;
      color: #C4C4C4;
      text-align: left;
    }

    .value {
      font-weight: 600;
      font-size: 16px;
      line-height: 20px;
      color: #FFFFFF;
      text-align: left;
    }
`;

export const FilterWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: 20px;
  > div {
    width: auto;
    margin: 5px 0px 5px 15px;
  }
`
