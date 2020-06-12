import React from "react";
import styles from "./styles.module.css";
import {
  IoIosPaper,
  IoIosImage,
  IoMdVideocam,
  IoIosLink,
  IoMdStats
} from "react-icons/io";
import { Submit } from "../submit";
import { useSelector, useDispatch } from "react-redux";
import { optionSelector, submitActions } from "../../reducer/submitSlice";
import { GuildList } from "./guildList";

export const SubmitOptions = () => {
  return (
    <div className={styles.submitOptions}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "5px 20px ",
          borderBottom: "1px solid var(--border-tertiary)"
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row"
          }}
        >
          <SubmitButton option="blog"></SubmitButton>
          <SubmitButton option="image"></SubmitButton>
          <SubmitButton option="video"></SubmitButton>
          <SubmitButton option="link"></SubmitButton>
          <SubmitButton option="vote"></SubmitButton>
        </div>

        <GuildList></GuildList>
      </div>

      <Submit></Submit>
    </div>
  );
};

export const SubmitButton = ({ option }) => {
  const active = useSelector(optionSelector);
  const dispatch = useDispatch();

  if (option === "blog")
    return (
      <div
        className={styles.submitButton}
        to="submit"
        style={
          active === "blog"
            ? {
                borderBottom: "2px solid #de7119"
              }
            : {}
        }
        onClick={() => {
          dispatch(submitActions.setOption("blog"));
        }}
      >
        <IoIosPaper
          size={20}
          style={{ paddingRight: "5px", color: "#de7119" }}
        ></IoIosPaper>
        博客
      </div>
    );

  if (option === "image")
    return (
      <div
        className={styles.submitButton}
        style={
          active === "image"
            ? {
                borderBottom: "2px solid #3490de"
              }
            : {}
        }
        onClick={() => {
          dispatch(submitActions.setOption("image"));
        }}
      >
        <IoIosImage
          size={20}
          style={{ paddingRight: "5px", color: "#3490de" }}
        ></IoIosImage>
        图片
      </div>
    );

  if (option === "video")
    return (
      <div
        className={styles.submitButton}
        style={
          active === "video"
            ? {
                borderBottom: "2px solid #6639a6"
              }
            : {}
        }
        onClick={() => {
          dispatch(submitActions.setOption("video"));
        }}
      >
        <IoMdVideocam
          size={20}
          style={{ paddingRight: "5px", color: "#6639a6" }}
        ></IoMdVideocam>
        视频
      </div>
    );

  if (option === "link")
    return (
      <div
        className={styles.submitButton}
        style={
          active === "link"
            ? {
                borderBottom: "2px solid #ffbd39"
              }
            : {}
        }
        onClick={() => {
          dispatch(submitActions.setOption("link"));
        }}
      >
        <IoIosLink
          size={18}
          strokeWidth={20}
          style={{ paddingRight: "5px", color: "#ffbd39" }}
        ></IoIosLink>
        链接
      </div>
    );

  if (option === "vote")
    return (
      <div
        className={styles.submitButton}
        style={
          active === "vote"
            ? {
                borderBottom: "2px solid #1fab89"
              }
            : {}
        }
        onClick={() => {
          dispatch(submitActions.setOption("vote"));
        }}
      >
        <IoMdStats
          size={20}
          style={{ paddingRight: "5px", color: "#1fab89" }}
        ></IoMdStats>
        投票
      </div>
    );
};
