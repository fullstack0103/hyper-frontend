import React from 'react';
import { NotificationItemContainer, NotificationItemDetail } from './styles';

const NotificationItem = (props) => {
  const {
    notification
  } = props

  return (
    <NotificationItemContainer>
      <div className="user-logo">
        <img src={notification.avatarURI} alt='' />
      </div>
      <NotificationItemDetail>
        <div className="user-name">
          {notification.username}
          <span className="user-comment">{' '}{notification.text}</span>
        </div>
        <div className="sale-date">{notification.timespan}</div>
      </NotificationItemDetail>
    </NotificationItemContainer>
  )
}

export default NotificationItem;
