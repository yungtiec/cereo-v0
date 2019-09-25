import React, { useState, useEffect, useRef } from "react";
import styles from "./RotatedFloatingActionBtn.module.scss";
import FloatingActionBtn from "./FloatingActionBtn";

const RotatedFloatingActionBtn = ({ icon, text, onClick }) => {
  const [offset, setOffset] = useState("-100px");
  const btn = useRef(null);

  useEffect(() => {
    const offset = btn.current.clientWidth / 2 - btn.current.clientHeight / 2;
    setOffset(offset);
  }, []);

  return (
    <div
      className={styles.inner}
      style={{ marginLeft: `-${offset}px` }}
      ref={btn}
    >
      <FloatingActionBtn text={text} icon={icon} onClick={onClick} />
    </div>
  );
};

export default RotatedFloatingActionBtn;
