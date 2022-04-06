import React, { useState, useRef } from "react";

const FileUpload = (props) => {
  const [selectedFile, setSelectedFile] = useState();
  const [isSelected, setIsSelected] = useState(false);

  const changeHandler = (event) => {
    props.handle(event, props.id, props.schemeid);
    setSelectedFile(event.target.files[0]);
    setIsSelected(true);
    let flag = false;
    event.preventDefault();
    for (let x in props.formDataArray) {
      //if the document type has already been uploaded, set flag to true
      if (props.formDataArray[x].documentType === props.documentType) {
        flag = true;
      }
    }

    //only allow documents that haven't been uploaded already to be set in the array
    if (!flag) {
      props.setFormDataArray((state) => [
        ...state,
        {
          documentType: props.id,
          fileName: event.target.files[0].name,
          file: event.target.files[0],
        },
      ]);
    }
  };

  const fileRef = useRef(null);

  const clickFile = () => {
    fileRef.current.click();
  };
  return (
    <div className="file-upload-inputs" id={props.id}>
      <label className="schemeReg_tabInputLabel">{props.label}</label>
      <div className="fileUpload_button">
        <button onClick={clickFile}>Browse...</button>
        <input
          ref={fileRef}
          id="getFile"
          type="file"
          name="file"
          onChange={changeHandler}
        />
        {props.value.file_name !== "" ? (
          <p className="fileUpload_text">
            Uploaded File: {props.value.file_name}
          </p>
        ) : (
          <p className="fileUpload_text">No File Selected</p>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
