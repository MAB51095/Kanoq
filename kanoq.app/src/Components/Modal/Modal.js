import React from "react";
import { Container } from "react-bootstrap";
import styles from "./Modal.module.css";

function Modal(props) {
  return (
    <div className={`${styles.container} ${!props.visible && styles.hide}`}>
      {props.children}
    </div>
  );
}

export default Modal;
