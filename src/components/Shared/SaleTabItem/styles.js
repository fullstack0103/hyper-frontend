import styled from 'styled-components'

export const SaleTabItemContainer = styled.div`
  padding: 15px 30px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;

  .btn-buy {
    > div {
      justify-content: flex-end;
    }
  }

  @media (min-width: 576px) {
    padding: 24px 55px;
    flex-direction: row;
  }
`;

export const DetailWrapper = styled.div`
  display: flex;

  .user-logo {
    margin-right: 20px;
  }
`

export const SaleDetail = styled.div`
  .user-name {
    font-style: normal;
    font-weight: 600;
    font-size: 15px;
    line-height: 19px;
    display: flex;
    align-items: center;
    text-align: right;
    color: #AAFF26;
    margin-bottom: 9px;

    .type {
      color: #FFFFFF;
    }
  }

  .user-comment {
    font-style: normal;
    font-weight: normal;
    font-size: 15px;
    line-height: 19px;
    display: flex;
    align-items: center;
    color: #FFFFFF;
    margin-bottom: 9px;
  }

  .bought-by {
    font-style: normal;
    font-weight: normal;
    font-size: 15px;
    line-height: 19px;
    display: flex;
    align-items: center;
    color: #C4C4C4;
    margin-bottom: 9px;
    margin: 0 8px 0 8px;
  }

  .sale-date {
    font-style: normal;
    font-weight: 500;
    font-size: 15px;
    line-height: 19px;
    display: flex;
    align-items: center;
    color: #C4C4C4;
  }
`;