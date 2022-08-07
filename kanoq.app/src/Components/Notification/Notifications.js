import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-bootstrap";
import NotificationItem from "./NotificationItem";
import { useContext } from "react";
import NotificationContext from "../../store/NotificationContext";

function Notifications() {
  const ctxNotifications = useContext(NotificationContext);

  return (
    <ToastContainer className="shadow-bg">
      {ctxNotifications.notificationItems.map((n) => {
        return <NotificationItem key={n.id} notify={n} />;
      })}
    </ToastContainer>
  );
}

export default Notifications;
