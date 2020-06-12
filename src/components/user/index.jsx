import React from "react";
import styles from "./styles.module.css";
import { useSelector } from "react-redux";

import { Avatar } from "../collections";
import { infoSelector } from "../../reducer/userSlice";

export const User = () => {
  const info = useSelector(infoSelector);

  return (
    <div className={styles.user}>
      <Avatar url={info.avatar} size={32}></Avatar>
      <div style={{ paddingLeft: "5px", fontSize: "14px" }}>
        {info.username}
      </div>
    </div>
  );
};
