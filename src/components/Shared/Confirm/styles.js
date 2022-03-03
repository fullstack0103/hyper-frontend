import styled from 'styled-components'

// export const PopupBackDrop = styled.div`
//   background-color: rgba(0, 0, 0, 0.4);
//   position: fixed;
//   top: 0;
//   bottom: 0;
//   left: 0;
//   right: 0;
//   z-index: 1000;
// `

export const PopupWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 1001;
  outline: none;
`

export const PopupDialog = styled.div`
  background: #222430;
  color: #fff;
  width: ${({ width }) => width || '70%'};
  border-radius: 15px;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
`

export const PopupActions = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 30px 0px 0px;
  button {
    width: 100%;
    border-radius: 32px;
    opacity: 1;
    height: 45px;
    &:nth-child(1) {
      margin-right: 25px;
    }
    &:last-child {
      margin-right: 0;
    }
  }
`

export const ModalHeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 16px;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);

  .modal-title {
    display: flex;
    font-weight: 700;
    font-size: 20px;
    line-height: 25px;
    color: #fff;
    text-align: center;
    white-space: pre-wrap;

    .modal-title-icon {
      display: flex;
      align-items: center;
      > svg {
        width: 30px;
        height: 30px;
        color: #AAFF26;
        path {
          stroke: #AAFF26;
        }
      }
    }

    .modal-title-text {
      display: flex;
      align-items: center;
      margin-left: 20px;
      font-style: normal;
      font-weight: 600;
      font-size: 22px;
      line-height: 28px;
      color: #FFFFFF;
    }
  }

  .modal-close {
    cursor: pointer;
    svg {
      color: #fff;
    }
  }
`

export const ModalBody = styled.div`
  max-height: calc(100vh - 220px);
  overflow-x: hidden;
  padding: 40px 16px;
  @media (min-width: 768px) {
    max-height: calc(100vh - 160px);
  }
`

export const PopupContent = styled.div`
`
