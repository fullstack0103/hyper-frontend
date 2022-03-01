import styled, { css } from 'styled-components'

export const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  height: 64px;
  padding: 0 32px;
  box-sizing: border-box;
  background: linear-gradient(92.57deg, rgba(34, 36, 48, 0.1) 24.04%, rgba(34, 36, 48, 0.27) 69.5%);
  box-shadow: 0px 4px 5px rgba(0, 0, 0, 0.25);
  /* backdrop-filter: blur(20px); */

  @media (min-width: 1025px) {
    justify-content: space-between;
  }

  .header-logo {
    height: 55px;
    cursor: pointer;
  }

  .nav-container {
    display: flex;
    justify-content: center;
    align-items: center;

    .nav-search {
      margin-right: 65px;
      margin-left: 75px;

      @media (max-width: 1550px) {
        margin-right: 45px;
        margin-left: 55px;
      }

      @media (max-width: 1100px) {
        margin-right: 35px;
        margin-left: 45px;
      }

      @media (max-width: 800px) {
        margin-right: 25px;
        margin-left: 0px;
        width: 100%;
      }
    }

    .nav-lang {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .nav-links {
      display: flex;
      align-items: center;
      margin-right: 1rem;
    }
  }

  .nav-profile {

    .nav-user-section {
      display: flex;
      align-items: center;

      img {
        cursor: pointer;
        height: 21px;
        width: 24px;
        display: inline;
        margin-right: 16px;
      }

      .wallet-icon {
        margin-right: 15px;
        positoin: relative;

        .web3-status {
          position: absolute;
          bottom: 0px;
          right: 0px;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #AAFF26;
        }
      }
    }
  }

  .forgot-password-label {
    margin-bottom: 16px;
    color: #e9b405;
    font-weight: 400;
    font-size: 12px;
    line-height: 24px;
    align-self: flex-start;
    cursor: pointer;
  }

  .nav-logged-user-container {
    display: flex;
    align-items: center;
  }

  .nav-logged-user-section {
    margin-right: 44px;

    .creator-icon {
      width: 12px;
      height: 12px;
    }
  }

  .wallet-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer; 

    > svg {
      width: 25px;
      height: 25px;
      color: #88AA0C;

      @media (min-width: 576px) {
        color: #A3FF12;
        &:hover {
          color: #FFFFFF;
        }
      }
    }

    position: relative;
    .web3-status {
      position: absolute;
      bottom: 0px;
      right: 0px;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #AAFF26;
    }
  }
`

export const LinkItem = styled.a`
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  color: ${props => props.theme.colors.white};
  cursor: pointer;
  transition: all 0.3s;
  position: relative;

  &:hover {
    color: #AAFF26;
  }

  /* ${({ active }) => active && css`
    color: #AAFF26;

    &::after {
      content: "";
      position: absolute;
      background-color: white;
      height: 1px;
      width: 100%;
      top: 100%;
      left: 0px;
    }
  `} */

  @media (min-width: 992px) {
    padding: 20px 8px;
  }

  @media (min-width: 1440px) {
    padding: 20px 16px;
  }

  @media (min-width: 1600px) {
    padding: 20px 26px;
  }

  @media (min-width: 1800px) {
    padding: 20px 32px;
  }
`;

export const MobileMenuContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  .mobile-user-section {
    display: flex;
    align-items: center;

    img {
      cursor: pointer;
      height: 21px;
      width: 24px;
      display: inline;
    }
  }
`

export const MobileMenu = styled.div`
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  margin-left: 15px;
  display: flex;
  align-items: center;

  svg {
    cursor: pointer;
    margin-left: 10px;
    width: 25px;
    height: 25px;

    path {
      fill: #88AA0C;
    }
  }

  img {
    cursor: pointer;
    height: 21px;
    width: 24px;
    display: inline;
    margin-right: 16px;
  }

  @media (min-width: 576px) {
    svg {
      path {
        fill: #AAFF26;
      }
    }
  }
`

export const MobileMenuList = styled.div`
  position: fixed;
	top: 64px;
	left: 0px;
	right: inherit;
	z-index: 1100;
	width: 100%;
	height: 0%;
	transition: all 0.5s ease 0s;
	overflow: auto;
	background: #222430;

  > div {
    padding: 1.8em 1.8em 1.8em 1.8em;
	  font-size: 1.15em;
  }

  a {
    display: block;
    font-size: 18px;
    letter-spacing: 1.8px;
    line-height: 26px;
    margin: 20px 0 40px 0;
    text-align: center
  }

  .nav-user-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .nav-links-mobile {
    margin-top: 60px;
  }
`

export const MenuItem = styled.div`
	padding: 24px 24px 24px 0px;
  border-bottom: 1px solid #efefef;
	cursor: pointer;
	transition: all 0.3s linear;

  &:hover {
    color: #FFD029;
  }
`

export const OverLay = styled.div`
  position: fixed;
	z-index: 1000;
	width: 100%;
	height: 100%;
	background: #d8d8d84d;
	opacity: 1;
	transition: opacity 0.3s ease 0s;
	top: 0px;
	left: 0px;
`

export const LinkDiv = styled.div`
  background: #222430;
`

export const IconDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #222430;
  padding: 17px 16px;
  border-top: 1px solid #1C1D24;

  >svg {

    &:hover {
      >path {
        transition: all 0.3s;
        fill: #AAFF26;
      }
    }
  }
`

export const LinkItemDiv = styled.div`
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  color: #FFFFFF;
  background: #222430;
  padding: 17px 16px;
  text-align: left;
  transition: all 0.3s;

  &:hover {
    color: #A3FF12;
    background: #1C1D24;
  }

  ${({ active }) => active && css`
    color: #A3FF12;
  `}
`
export const CofirmModalContainer = styled.div`
  p {
    text-align: center;
  }
  div {
    display: flex;
    align-items: center;
    justify-content: center;
    button.btn-unnaked {
      width: 140px;
    }
  }

  @media (min-width: 768px) {
    > div {
      button.btn-unnaked {
        width: 173px;
      }
    }
  }
`
