//@ts-check

import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { Fragment, useState } from "react";

const DocumentUpload = (props) => {
  // console.log(props, "DOCUMENT PROPS");
  const [id, setId] = useState("");
  const [uploadedFile, setUploadedFile] = useState([]);

  const changeHandler = (event) => {
    event.preventDefault();
    const fsize = event.target.files[0].size;
    const file = Math.round(fsize / 1024);
    // if (file > 2048) {
    //   enqueueSnackbar(["The selected file is too large, maximum size is 2MB"], {
    //     variant: "error",
    //     autoHideDuration: 4000,
    //     anchorOrigin: {
    //       vertical: "top",
    //       horizontal: "right",
    //     },
    //   });
    //   return;
    // }

    setUploadedFile((state) => [
      ...state,
      { id: id, fileName: event.target.files[0] },
    ]);
    props.handle(event, id);
    let flag = false;

    for (let x in props.formDataArray) {
      //if the document type has already been uploaded, set flag to true
      if (props.formDataArray[x].documentType === id) {
        flag = true;
      }
    }

    //only allow documents that haven't been uploaded already to be set in the array
    if (!flag) {
      props.setFormDataArray((state) => [
        ...state,
        {
          file: event.target.files[0],
          newName: event.target.files[0].name.replace(/\s/g, "")
        },
      ]);
    }
  };

  const clickFile = (event) => {
    setId((id) => (id = event.target.id));
    document.getElementById(`${event.target.id}_input`).click();
  };

  const viewFile = (event) => {
    let viewId = event.target.id.split("_")[0];
    if (uploadedFile.length === 0) {
      let fileName = props.value.docs.find(({ type }) =>
        event.target.id.includes(type)
      ).file_name;

      let id = props.creatorID ? props.creatorID : props.userid;

      let fileUrl =
        "/micro/downloads/csos-openId/FU/" +
        id +
        "/" +
        props.schemeid +
        "/" +
        fileName;
      props.setIsLoading(true);

      fetch(fileUrl)
        .then((resp) => {
          if (resp.ok) {
            let respUrl = resp.url;
            let link = document.createElement("a");
            document.body.appendChild(link);
            // link.style = "display: none";
            link.href = respUrl;
            link.target = "_blank";
            link.click();
            props.setIsLoading(false);
          } else {
            throw new Error("Error downloading file. Please try again later");
          }
        })
        .catch((error) => {
          props.setIsLoading(false);
          // enqueueSnackbar([error.message], {
          //   variant: "error",
          //   autoHideDuration: 4000,
          //   anchorOrigin: {
          //     vertical: "top",
          //     horizontal: "right",
          //   },
          // });
        });
    } else {
      let objectURL;
      if (objectURL) {
        URL.revokeObjectURL(objectURL);
      }
      objectURL = URL.createObjectURL(
        uploadedFile.find(({ id }) => id === viewId).fileName
      );

      let link = document.createElement("a");
      document.body.appendChild(link);
      // link.style = "display: none";

      link.href = objectURL;
      link.target = "_blank";
      link.click();
    }
  };

  return (
    <Paper>
      <Table aria-label="customized table">
        <TableHead>
          <TableRow>
            <TableCell className="register_table-head-field">
              {props.tableHeaders.type}
            </TableCell>
            <TableCell className="register_table-head-field">
              {props.tableHeaders.browse}
            </TableCell>
            <TableCell className="register_table-head-field">
              {props.tableHeaders.view}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <Fragment key={"row_"}>
            {props.fields.map((field, i) => {
              let index = 0;
              let value;
              if (props.value["docs"].length > 0) {
                for (let j in props.value["docs"]) {
                  if (props.value["docs"][j] !== undefined) {
                    if (field.id === props.value["docs"][j].type) {
                      value = props.value["docs"][j].file_name;
                      // console.log(value, "DOCUMENT NAME");
                    }
                  } else {
                    value = undefined;
                  }
                }
              }
              if (!field.display) {
                return;
              } else {
                index = i;
              }
              return (
                <TableRow key={field.id}>
                  <TableCell className={field.required ? "required" : null}>
                    {field.label}
                  </TableCell>
                  <TableCell>
                    <div className="fileUpload_button">
                      {!props.view && (
                        <Fragment>
                          <Button
                            disabled={props.readOnly}
                            id={field.id}
                            onClick={clickFile}
                          >
                            Browse...
                          </Button>
                          <input
                            // ref={fileRef}
                            id={`${field.id}_input`}
                            type="file"
                            name="file"
                            onChange={changeHandler}
                            accept="application/pdf"
                          />
                        </Fragment>
                      )}

                      <div>
                        {value !== undefined ? (
                          <p className="fileUpload_text">
                            {!props.view ? `Uploaded File: ${value}` : value}
                          </p>
                        ) : (
                          <p className="fileUpload_text">No File Selected.</p>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="fileUpload_view_button">
                      <Button
                        disabled={value ? false : true}
                        id={`${field.id}_view`}
                        onClick={viewFile}
                      >
                        View
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </Fragment>
        </TableBody>
      </Table>
    </Paper>
  );
};

const mapStateToProps = (state) => {
  return {
    // schemeid: state.form.form.schemeid,
    // userid: state.form.userid,
    // isLoading: state.form.isLoading,
  };
};



export default DocumentUpload;
