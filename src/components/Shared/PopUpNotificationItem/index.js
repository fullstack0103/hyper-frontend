import React from 'react';
import NotificationItem from '../NotificationItem';
import { NotificationEmptyIcon } from '../SvgIcons';
import { 
  PopUpNotificationItemContainer
} from './styles';

const PopUpNotificationItem = (props) => {

  const {
    notificationList
  } = props

  return (
    <PopUpNotificationItemContainer>
      <div className="popup-title">
        Notifications
      </div>
      {notificationList.length === 0 && (
        <div className="notification-empty">
          <div className="notification-empty-icon">
            <NotificationEmptyIcon />
          </div>
          <div className="title">No notifications yet</div>
          <div className="description">Stay tuned! Notifications about your activity will show up here</div>
        </div>
      )}
      {notificationList.map(item => (
        <NotificationItem key={item._id} notification={item} />
      ))}
    </PopUpNotificationItemContainer>
  )
}

export default PopUpNotificationItem;
