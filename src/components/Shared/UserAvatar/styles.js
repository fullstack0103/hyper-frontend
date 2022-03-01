import styled from 'styled-components'

export const UserAvatarContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: ${({mr}) => mr ? mr : '0'};
  
  >svg {
    width: ${({size}) => size ? size : '30px'};
    height: ${({size}) => size ? size : '30px'};
    color: ${({color}) => color ? color : '#AAFF26'};
    fill: ${({color}) => color ? color : '#AAFF26'};
  }
`;