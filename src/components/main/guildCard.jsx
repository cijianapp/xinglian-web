import React from "react";
import styles from "./styles.module.css";
import { FiUser } from "react-icons/fi";

import { ossURL } from "../../utils/http";
import { Link } from "react-router-dom";

export const GuildCard = ({ guild }) => {
  return (
    <Link to={guild._id} className={styles.guildCard}>
      <img
        alt="avatar"
        style={{
          height: "72px",
          width: "72px",
          borderRadius: "5px",
          margin: "10px"
        }}
        src={ossURL + guild.avatar}
      ></img>
      <div className={styles.guildInfo}>
        <div className={styles.infoContainer}>
          <div style={{ color: "var(--text-strong)", fontWeight: "bold" }}>
            {guild.name}
          </div>

          <div
            style={{
              color: "#000",
              display: "flex",
              alignItems: "center"
            }}
          >
            <FiUser></FiUser>
            <div
              style={{
                fontSize: "14px",
                lineHeight: "16px",
                paddingLeft: "5px"
              }}
            >
              {" "}
              {guild.membercount}
            </div>
          </div>
        </div>

        <div className={styles.description}>{guild.description}</div>
      </div>
    </Link>
  );
};
