import React from "react";
import styles from "./styles.module.css";
import logo from "./logo.jpg";
import { Link } from "react-router-dom";

export const Logo = () => {
  return (
    <Link
      to="/"
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        textDecoration: "none"
      }}
    >
      <img className={styles.logo} src={logo} alt=""></img>
      <div className={styles.logoName}>星链 StarLink</div>
    </Link>
  );
};
