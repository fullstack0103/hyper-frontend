import styled from 'styled-components'

export const GradientButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({isNoPadding}) => isNoPadding ? '0' : '16px'};
  width: 100%;
  
  button.btn-unnaked {
    width: 220px;
    font-size: ${({fontSize}) => fontSize ? fontSize : '16px'};
    font-weight: 600;
    line-height: 20px;
    background: ${({ isDarkMode, isBlackMode }) => isDarkMode ? "#4C4E55" : isBlackMode ? "#00000040" : "#AAFF26"};
    color: ${({ isDarkMode, isBlackMode }) => (isDarkMode || isBlackMode) ? "#FFFFFF" : "#222430"};
    height: 41px;
    border-radius: 10px;
    padding: 8px 16px 7px;
    border: 0;
    cursor: pointer;
    outline: none;
    transition: all 0.5s;

    &:hover {
      background: transparent;
      border: 1px solid #AAFF26;
      color: #ffffff;
    }
  }

  button.btn-naked {
    width: 220px;
    font-size: ${({fontSize}) => fontSize ? fontSize : '16px'};
    font-weight: 600;
    line-height: 20px;
    background: transparent;
    color: #FFFFFF;
    height: 41px;
    border-radius: 10px;
    padding: 0;
    cursor: pointer;
    outline: none;
    border: 1px solid #AAFF26;
    transition: all 0.5s;

    &:hover {
      background: #AAFF26;
      border: 1px solid #AAFF26;
      color: #222430;
    }
  }
`;