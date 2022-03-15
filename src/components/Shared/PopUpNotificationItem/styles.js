import styled from 'styled-components'

export const PopUpNotificationItemContainer = styled.div`
  .notification-empty {
    padding-top: 15px;
    padding-bottom: 10px;

    .notification-empty-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 10px;
    }

    .title {
      font-weight: 600;
      font-size: 16px;
      line-height: 20px;
      text-align: center;
      color: #FFFFFF;
    }

    .description {
      font-weight: 500;
      font-size: 12px;
      line-height: 15px;
      text-align: center;
      color: #C4C4C4;
    }
  }

  > p {
    color: ${props => props.theme.colors.primary};
    user-select: none;
    text-align: center;
    cursor: pointer;
    margin-top: 10px;
    margin-bottom: 0px;
    text-transform: uppercase;
  }
`;