import React from "react";
import styles from "./styles.module.css";
import commonStyles from "../../utils/styles.module.css";
import { useDispatch } from "react-redux";
import { authActions } from "../../reducer/authSlice";

import { LoginModal } from "./loginModal";
import { RegisterModal } from "./registerModal";

export const LoginControl = () => {
  const dispatch = useDispatch();

  return (
    <div className={styles.loginControl}>
      <button
        className={commonStyles.button_common}
        style={{ height: "32px", fontWeight: "bold" }}
        onClick={() => {
          dispatch(authActions.toRegister(true));
        }}
      >
        注册
      </button>
      <button
        className={commonStyles.button_green}
        style={{ height: "32px", fontWeight: "bold", marginLeft: "10px" }}
        onClick={() => {
          dispatch(authActions.toLogin(true));
        }}
      >
        登录
      </button>

      <LoginModal></LoginModal>
      <RegisterModal></RegisterModal>
    </div>
  );
};
