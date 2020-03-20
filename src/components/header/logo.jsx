import React from "react";
import styles from "./styles.module.css";
import logo from "./logo.jpg";

export const Logo = () => {
  return <img className={styles.logo} src={logo} alt=""></img>;
};

export const LogoName = () => {
  return <div className={styles.logoName}>星链 StarLink</div>;
};
