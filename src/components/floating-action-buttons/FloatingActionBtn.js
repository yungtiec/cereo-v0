import React from "react";
import styles from "./FloatingActionBtn.module.scss";
import { Icon } from "antd";
import classnames from "classnames";

const FloatingActionBtn = ({ icon, text, onClick, styleOverrides }) => {
  return (
    <div
      onClick={onClick}
      className={classnames(styles.btn, { [styleOverrides]: !!styleOverrides })}
    >
      {icon ? <Icon type={icon} /> : null}
      {text ? <span>{text}</span> : null}
    </div>
  );
};

export default FloatingActionBtn;
