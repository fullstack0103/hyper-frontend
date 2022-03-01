import styled from 'styled-components'

export const ConnectWalletFormContainer = styled.div`
  .welcome-wallet {
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 20px;
    color: #AAFF26;
    padding: 0 16px;
  }

  .wallet-list {
    margin-top: 30px;
  }

  .forgot-password-label {
    margin-bottom: 16px;
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 20px;
    color: #AAFF26;
    cursor: pointer;
  }

  .modal-divider-wrapper {
    position: relative;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 24px 0 16px;

    &::before {
      content: "";
      background-color: #C4C4C4;
      height: 1px;
      width: 100%;
      position: absolute;
      top: 50%;
      -webkit-transform: translateY(-50%);
      transform: translateY(-50%);
    }

    .modal-divider-text{
      font-weight: 400;
      font-size: 14px;
      line-height: 24px;
      color: #C4C4C4;
      background-color: #222430;
      padding: 0 16px;
      z-index: 10;
    }
  }

  .sign-up-mode {
    color: #AAFF26;
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 20px;
    text-align: center;
    margin-bottom: 8px;
    margin-top: 8px;
    white-space: pre-wrap;
  }
`;