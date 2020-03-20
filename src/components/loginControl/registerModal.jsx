import React, { useState } from "react";
import styles from "./styles.module.css";
import commonStyles from "../../utils/styles.module.css";
import ReactModal from "react-modal";
import { useSelector, useDispatch } from "react-redux";

import { openRegisterControl, authActions } from "../../reducer/authSlice";

export const RegisterModal = () => {
  const [tel, setTel] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsernamme] = useState("");

  const control = useSelector(openRegisterControl);
  const dispatch = useDispatch();

  return (
    <ReactModal
      isOpen={control}
      onRequestClose={() => {
        dispatch(authActions.toRegister(false));
      }}
      className={styles.modal}
      overlayClassName={styles.overlay}
    >
      <div className={styles.formContainer}>
        <div style={{ fontSize: "28px", fontWeight: "bold" }}>
          注册成为新用户吧！
        </div>

        <form className={styles.form}>
          <h5 style={{ marginBottom: "4px", marginTop: "10px" }}>手机号</h5>
          <input
            className={commonStyles.input_normal}
            name="username"
            type="tel"
            autoFocus={true}
            value={tel}
            onChange={e => {
              setTel(e.target.value);
            }}
          ></input>

          <h5 style={{ marginBottom: "4px", marginTop: "10px" }}>验证码</h5>
          <div
            style={{
              width: "100%",
              position: "relative"
            }}
          >
            <input
              className={commonStyles.input_normal}
              placeholder="请输入4位验证码"
            ></input>
            <div className={styles.verifyCode} onClick={() => {}}>
              获取短信验证码
            </div>
          </div>

          <h5 style={{ marginBottom: "4px", marginTop: "10px" }}>用户名</h5>
          <input
            className={commonStyles.input_normal}
            name="name"
            type="text"
            value={username}
            autoComplete="off"
            onChange={e => {
              setUsernamme(e.target.value);
            }}
          ></input>

          <h5 style={{ marginBottom: "4px", marginTop: "10px" }}>密码</h5>
          <input
            className={commonStyles.input_normal}
            name="password"
            type="password"
            value={password}
            onChange={e => {
              setPassword(e.target.value);
            }}
          ></input>

          <button
            className={commonStyles.button_common}
            style={{ fontSize: "16px", height: "38px", marginTop: "20px" }}
            type="submit"
          >
            注册
          </button>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              fontSize: "14px",
              marginTop: "10px"
            }}
          >
            <span>已经拥有账号了？</span>
            <div
              className={commonStyles.link_normal}
              onClick={() => {
                dispatch(authActions.toRegister(false));
                dispatch(authActions.toLogin(true));
              }}
            >
              返回登陆
            </div>
          </div>
        </form>
      </div>
    </ReactModal>
  );
};
