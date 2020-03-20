import React, { useState } from "react";
import styles from "./styles.module.css";
import commonStyles from "../../utils/styles.module.css";
import ReactModal from "react-modal";
import { useSelector, useDispatch } from "react-redux";
import Axios from "axios";

import { openLoginControl, authActions } from "../../reducer/authSlice";
import { baseURL } from "../../utils/http";

Axios.defaults.withCredentials = true;

export const LoginModal = () => {
  const [tel, setTel] = useState("");
  const [password, setPassword] = useState("");
  const control = useSelector(openLoginControl);
  const dispatch = useDispatch();

  function login(e) {
    e.preventDefault();

    const loginParams = {
      tel: tel,
      password: password
    };

    Axios.post(baseURL + "auth/login", loginParams, { withCredentials: true })
      .then(function(response) {
        if (response.data.code === 200) {
          //   dispatch({
          //     type: SET_TOKEN,
          //     value: response.data.token
          //   });

          dispatch(authActions.login(true));
        }
      })
      .catch(function(errors) {
        console.log(errors);
      });
  }

  return (
    <ReactModal
      isOpen={control}
      onRequestClose={() => {
        dispatch(authActions.toLogin(false));
      }}
      className={styles.modal}
      overlayClassName={styles.overlay}
    >
      <div className={styles.formContainer}>
        <div style={{ fontSize: "28px", fontWeight: "bold" }}>欢迎回来</div>
        <div
          style={{
            fontSize: "18px",
            color: "var(--text-muted)"
          }}
        >
          星链，把志趣相投的朋友连在一起
        </div>

        <form className={styles.form} onSubmit={login}>
          <h5 style={{ marginBottom: "4px" }}>手机号</h5>
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
          <h5 style={{ marginBottom: "4px" }}>密码</h5>
          <input
            className={commonStyles.input_normal}
            type="password"
            value={password}
            onChange={e => {
              setPassword(e.target.value);
            }}
          ></input>
          <div className={commonStyles.link_normal}>忘记密码?</div>

          <button
            className={commonStyles.button_common}
            style={{ fontSize: "16px", height: "38px", marginTop: "20px" }}
            type="submit"
          >
            登录
          </button>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              fontSize: "14px",
              marginTop: "10px"
            }}
          >
            <span>需要新的账号？</span>
            <div
              className={commonStyles.link_normal}
              onClick={() => {
                dispatch(authActions.toLogin(false));
                dispatch(authActions.toRegister(true));
              }}
            >
              点击注册
            </div>
          </div>
        </form>
      </div>
    </ReactModal>
  );
};
