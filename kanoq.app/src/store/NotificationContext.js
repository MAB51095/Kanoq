import React, { useState } from "react";

const NotificationContext = React.createContext({
  showNotification: false,
  toggleShowNotification: () => {},
  notificationItems: [],
  AddNotificationItem: (notificationItem) => {},
  RemoveNotificationItem: (id) => {},
});

export default NotificationContext;

export const NotificationContextProvider = (props) => {
  const [showNotification, setShowNotification] = useState(false);
  const [notificationItems, setNotificationItems] = useState([]);

  const AddNotificationItem = (notificationItem) => {
    setNotificationItems((prev) => {
      return [notificationItem, ...prev];
    });
  };

  const RemoveNotificationItem = (id) => {
    setNotificationItems((prev) => {
      return prev.filter((n) => n.id !== id);
    });
  };

  const toggleShowNotification = (val) => {
    if (val) setShowNotification(val);
    else setShowNotification((prev) => !prev);
  };

  return (
    <NotificationContext.Provider
      value={{
        showNotification,
        toggleShowNotification,
        notificationItems,
        AddNotificationItem,
        RemoveNotificationItem,
      }}
    >
      {props.children}
    </NotificationContext.Provider>
  );
};
