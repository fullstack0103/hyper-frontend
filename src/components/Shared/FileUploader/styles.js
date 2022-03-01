import styled from 'styled-components'

export const FileUploaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const UploadButton = styled.button`
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 18px;
  text-align: center;
  color: #222430;
  width: 106px;
  height: 36px;
  background: #A3FF12;
  border-radius: 10px;
  cursor: pointer;
  outline: none;
  border: none;
  transition: all 0.3s;

  &:hover {
    background: transparent;
    color: #A3FF12;
    border: 1px solid #A3FF12;
  }
`;

export const UploadIcon = styled.div`
  cursor: pointer;
  
  &:hover {

    >svg {
      path {
        fill: #A3FF12
      }
    }
  }
`;