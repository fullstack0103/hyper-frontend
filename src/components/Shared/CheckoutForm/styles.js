import styled from 'styled-components'

export const CheckoutFormContainer = styled.div`
  padding: 0 84px;

  @media (max-width: 800px) {
    padding: 0 40px;
  }

  @media (max-width: 700px) {
    padding: 0px;
  }
`;

export const WelComeCheckout = styled.div`

  .welcome-text {
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 23px;
    color: #FFFFFF;
  }

  .user-name {
    font-style: normal;
    font-weight: bold;
    font-size: 36px;
    line-height: 46px;
    color: #A3FF20;

    >span {
      font-size: 24px;
      color: white;
    }
  }
`;

export const CheckoutDetail = styled.div`
  margin-top: 50px;

  .divider {
    border-bottom: 1px solid #000;
    margin: 15px -30px 20px -30px;
  }

  .flex-div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 5px;
    margin-top: 5px;

    .purchase-label {
      font-style: normal;
      font-weight: 600;
      font-size: 18px;
      line-height: 23px;
      text-align: center;
      color: #AAFF26;
    }

    .purchase-name {
      font-style: normal;
      font-weight: 600;
      font-size: 30px;
      line-height: 38px;
      text-align: center;
      color: #FFFFFF;
    }

    .purchase-desc {
      font-style: normal;
      font-weight: 600;
      font-size: 18px;
      line-height: 23px;
      text-align: center;
      color: #FFFFFF;
    }
  }
`;

export const CheckoutTerms = styled.div`
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 15px;
  text-align: justify;
  color: #C4C4C4;
  margin-top: 20px;
  margin-bottom: 87px;
`;

export const AmountContainer = styled.div`
  margin-top: 20px;
  input[type=number] {
    &::-webkit-inner-spin-button { 
    -webkit-appearance: none;
    cursor:pointer;
    display:block;
    width:8px;
    color: #333;
    text-align:center;
    position:relative;
    }
    &:hover::-webkit-inner-spin-button { 
      background: #00000040 url('/icons/number-arrow.png') no-repeat 50% 50%;  
      width: 14px;
      height: 14px;
      padding: 4px;
      position: relative;
      right: 4px;
      border-radius: 28px;
    }
  }

  display: flex;
  flex-direction: column;

  label {
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 12px;
  }

  > div {
    display: flex;
    align-items: center;
    input {
      height: 42px;
      flex: 1;
      margin-right: 20px;
      padding: 10px 15px;
    }
  }
`
export const OutlineBox = styled.div`
  border: 1px solid #40475D;
  border-radius: 10px;
  color: #C4C4C4;
  font-weight: 600;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 42px;
  padding: 0 25px;
`
