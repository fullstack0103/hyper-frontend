import styled, { css } from 'styled-components'

export const MainContentContainer = styled.div`
  position: relative;
  height: calc(100vh - 64px);
  overflow: hidden;
  padding: 24px;
  padding-bottom: 80px;

  @media (min-width: 800px) {
    padding: 34px 20px 34px 104px;
  }
`;

export const SettingFormContainer = styled.div`
  border-radius: 15px;
  height: 100%;
  overflow: hidden;

  @media(min-width: 800px) {
    max-width: 507px;
    max-width: 400px;
    margin-left: auto;
  }

  @media(min-width: 1200px) {
    max-width: 507px;
    margin-left: auto;
    margin-right: auto;
  }
`;

export const SettingBanner = styled.div`
  position: relative;
  display: flex;

  .cover-image {
    position: relative;
    height: 165px;
    width: 100%;

    &:hover {
      >.overlay {
        opacity: 0.8;
      }
    }

    >img{
      width: 100%;
      height: 165px;
      object-fit: cover;
    }
  }

  .logo-image {
    position: absolute;
    top: 125px;
    left: calc( 100% / 2 - 50px);

    .overlay {
      border-radius: 50%;
    }

    &:hover {
      >.overlay {
        opacity: 0.8;
      }
    }

    >img{
      width: 100px;
      height: 100px;
      object-fit: cover;
      border-radius: 50%;
    }
  }

  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    background: #222222;
    transition: all 0.4s;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .overlay-text {
      font-weight: 600;
      font-size: 13px;
      line-height: 17px;
      color: #FFFFFF;
      text-align: center;
      cursor: pointer;
      user-select: none;

      &:hover {
        color: #AAFF26;
      }
    }
  }
`;

export const SettingForm = styled.div`
  padding: 62px 38px 38px 38px;
  background: #222430;
  height: calc(100% - 165px) !important;
  overflow: auto;

  ::-webkit-scrollbar {
    width: 5px;
  }
  ::-webkit-scrollbar-thumb {
    background: #AAFF26;
    border-radius: 6px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #AAFF26;
  }
  ::-webkit-scrollbar-thumb:active {
    background: #AAFF26;
  }
`;

export const FormGroup = styled.div`
  margin-bottom: 23px;
  display: flex;
  flex-direction: column;

  label {
    font-weight: 600;
    font-size: 16px;
    line-height: 20px;
    color: #FFFFFF;
    margin-bottom: 13px;
  }

  p {
    font-weight: 600;
    font-size: 16px;
    line-height: 20px;
    color: #FFFFFF;
    margin-bottom: 13px;
  }
`;

export const VerificationSection = styled.div`
  background: #222430;
  border-radius: 15px;
  height: 100%;
  overflow: auto;
  padding: 30px 15px;

  @media (min-width: 576px) {
    padding: 50px 38px;
  }
`;

export const NotificationSection = styled.div`
  background: #222430;
  border-radius: 15px;
  padding: 50px 38px;
  height: 100%;
  overflow: auto;

  .title {
    font-weight: 600;
    font-size: 24px;
    line-height: 31px;
    color: #FFFFFF;
  }

  .description {
    font-weight: normal;
    font-size: 13px;
    line-height: 17px;
    color: #FFFFFF;
    margin-top: 13px;
  }

  .content {
    margin-top: 45px;

    .content-item {
      margin-bottom: 18px;
    }
  }
`;

export const MenuWrapper = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid #40475D;
  margin-bottom: 40px;
`

export const Tab = styled.div`
  padding: 9px 8px;
  font-weight: 600;
  font-size: 15px;
  line-height: 23px;
  color: #FFFFFF;
  position: relative;
  cursor: pointer;

  ${({ active }) => active && css`
    color: #AAFF26;
    &::after {
      content: "";
      background-color: #A3FF12;
      height: 1px;
      width: 100%;
      position: absolute;
      top: 100%;
      left: 0;
    }
  `}

  @media (min-width: 340px) {
    font-size: 16px;
    padding: 9px 10px;
  }

  @media (min-width: 576px) {
    font-size: 18px;
  }
`

export const ProjectInfoWrapper = styled.div`
  > div { 
    padding: 0;
  }
`