import React, { useContext, useEffect, useState } from "react";
import { Toast } from "react-bootstrap";
import NotificationContext from "../../store/NotificationContext";

function NotificationItem(props) {
  const ctxNotification = useContext(NotificationContext);

  const toggleShowA = () => {
    ctxNotification.RemoveNotificationItem(props.notify.id);
  };

  return (
    <Toast
      onClose={toggleShowA}
      bg={props.notify.bg}
      className="m-1 p-1"
      onClick={toggleShowA}
      style={{ cursor: "pointer" }}
    >
      <Toast.Header>
        <strong className="m-auto">{props.notify.Page}</strong>
      </Toast.Header>
      <Toast.Body>
        <strong className="m-auto">{props.notify.Action}</strong>
        <p>{props.notify.Message}</p>
      </Toast.Body>
    </Toast>
  );
}

export default NotificationItem;
