import React from "react";
import classnames from "classnames";
import styles from "./FloatingActionBtn.module.scss";
import { Icon } from "antd";

const FloatingActionBtn = ({ icon, text, onClick }) => {
  return (
    <div onClick={onClick} className={styles.btn}>
      {icon ? <Icon type={icon} /> : null}
      {text ? <span>{text}</span> : null}
    </div>
  );
};

export default FloatingActionBtn;
