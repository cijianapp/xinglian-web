import React from "react";
import styles from "./styles.module.css";

import { Logo, LogoName } from "./logo";
import { GuildList } from "./guildList";
import { Search } from "./search";

import { LoginControl } from "../loginControl";

const Header = () => {
  return (
    <header className={styles.header}>
      <Logo></Logo>
      <LogoName></LogoName>
      <GuildList></GuildList>
      <Search></Search>
      <LoginControl></LoginControl>
    </header>
  );
};

export default Header;
