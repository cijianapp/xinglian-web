import React, { useEffect } from "react";
import styles from "./styles.module.css";
import { useSelector, useDispatch } from "react-redux";
import Axios from "axios";

import { Logo } from "./logo";
import { GuildList } from "./guildList";
import { Search } from "./search";
import { LoginControl } from "../loginControl";
import { loggedSelector } from "../../reducer/authSlice";
import { headerConfigSelector, userActions } from "../../reducer/userSlice";
import { authActions } from "../../reducer/authSlice";
import { baseURL } from "../../utils/http";
import { User } from "../user";

const Header = () => {
  const logged = useSelector(loggedSelector);
  const headerConfig = useSelector(headerConfigSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    const source = Axios.CancelToken.source();

    if (!logged) {
      const token = localStorage.getItem("token");
      if (token !== null) {
        dispatch(userActions.setToken(token));
        dispatch(authActions.login(true));
      }
    }

    if (logged)
      Axios.get(baseURL + "api/info", { headers: headerConfig })
        .then(response => {
          dispatch(userActions.setUserInfo(response.data));
        })
        .catch(err => {
          console.log(err);
        });

    return () => {
      source.cancel();
    };
  }, [logged, headerConfig, dispatch]);

  return (
    <header className={styles.header}>
      <Logo></Logo>

      <GuildList></GuildList>
      <Search></Search>
      {logged ? <User></User> : <LoginControl></LoginControl>}
    </header>
  );
};

export default Header;
