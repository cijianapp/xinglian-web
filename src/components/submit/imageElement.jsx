import React from "react";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import "./filepond.css";
import { baseURL, ossURL } from "../../utils/http";
import { useSelector, useDispatch } from "react-redux";
import { headerConfigSelector } from "../../reducer/userSlice";
import {
  submitActions,
  optionSelector,
  blogSelector
} from "../../reducer/submitSlice";

registerPlugin(
  FilePondPluginFileValidateSize,
  FilePondPluginFileValidateType,
  FilePondPluginImagePreview,
  FilePondPluginImageExifOrientation
);

export const ImageElement = ({ index }) => {
  const headerConfig = useSelector(headerConfigSelector);
  const option = useSelector(optionSelector);
  const blog = useSelector(blogSelector);
  const dispatch = useDispatch();

  if (option === "blog") {
    if (blog[index].value !== "") {
      return (
        <div style={{ padding: "10px 0" }}>
          <img
            style={{ width: "100%" }}
            src={ossURL + blog[index].value}
            alt=""
          ></img>
        </div>
      );
    }
  }

  return (
    <div style={{ marginTop: "10px", position: "relative" }}>
      <FilePond
        allowMultiple={false}
        maxFileSize="100MB"
        labelMaxFileSizeExceeded="wtf,这tm真的是图片吗，怎么这么大，要不您压缩一下？"
        acceptedFileTypes={["image/*"]}
        labelIdle='拖放或<span class="filepond--label-action">选择要上传的图片</span>'
        imagePreviewMinHeight={256}
        imagePreviewMaxHeight={1024}
        onremovefile={() => {
          if (option === "blog") {
            dispatch(submitActions.updateElement({ index: index, value: "" }));
          } else {
            dispatch(submitActions.setImage(""));
          }
        }}
        server={{
          url: baseURL + "api/upload",
          process: {
            headers: headerConfig,
            onload: res => {
              if (option === "blog") {
                dispatch(
                  submitActions.updateElement({ index: index, value: res })
                );
              } else {
                dispatch(submitActions.setImage(res));
              }
            }
          }
        }}
      ></FilePond>
    </div>
  );
};
