import React from "react";
// import styles from "./styles.module.css";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginMediaPreview from "filepond-plugin-media-preview";
import "filepond-plugin-media-preview/dist/filepond-plugin-media-preview.css";
import { baseURL } from "../../utils/http";
import { useSelector } from "react-redux";
import { headerConfigSelector } from "../../reducer/userSlice";

registerPlugin(
  FilePondPluginFileValidateSize,
  FilePondPluginFileValidateType,
  FilePondPluginMediaPreview
);

export const VideoElement = () => {
  const headerConfig = useSelector(headerConfigSelector);

  return (
    <div style={{ marginTop: "10px", position: "relative" }}>
      <FilePond
        allowMultiple={false}
        maxFileSize="500MB"
        labelMaxFileSizeExceeded="对不起，目前仅支持500MB以内mp4格式的视频文件"
        acceptedFileTypes={["video/mp4"]}
        labelIdle='拖放或<span class="filepond--label-action">选择要上传的视频</span>'
        server={{
          url: baseURL + "api/upload",
          process: {
            headers: headerConfig,
            onload: res => {
              console.log(res);
            }
          }
        }}
      ></FilePond>
    </div>
  );
};
