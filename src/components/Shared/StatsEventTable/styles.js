import styled from 'styled-components'

export const StatsEventTableContainer = styled.div`

`;

export const StatsEventTableSectionBody = styled.div`
    
`;

export const StatsEventTableSection = styled.div`
  
  table {
    width: 100%;
    color: #FFFFFF;
    border-collapse: collapse;
    table-layout: fixed;
  }

  table th, table td{
    text-align: left;
    padding: 12px;
  }

  table th {
    background: #222430;
  }

  .width-6 {
    width: 6%;
  }

  .width-10 {
    width: 10%;
  }

  .width-15 {
    width: 15%;
  }

  .width-20 {
    width: 20%;
  }

  .width-25 {
    width: 25%;
  }

  .width-30 {
    width: 30%;
  }

  .price-div {
    display: flex;
    align-items: center;
    justify-content: left;

    img {
      margin-right: 20px;
      width: 28px;
      height: 28px;
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

export const EventTimeFieldDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: left;

  .value {
    margin-right: 15px;
  }

  svg {
    cursor: pointer;

    &:hover {
      path {
        fill: #AAFF26;
      }
    }
  }
`;