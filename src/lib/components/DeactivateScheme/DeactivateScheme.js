import { Box, Button } from "@mui/material";
import { useSnackbar } from "notistack";
import React, { Fragment, Suspense, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { fetchDrop } from "../../../utils/FetchDrop";
import { fileUploadFunc } from "../../../utils/FileUploadFunc";
import FormHook from "../../../utils/FormHook";
import FormDialog from "../../UI/FormDialog";
import Modal from "../../UI/Modal";
import DocumentUpload from "../DocumentUpload/DocumentUpload";
import TextArea from "../TextArea/TextArea";

// let deactivateSchemeForm = {};
let labels = {};

const DeactivateSchemeContent = (props) => {
  console.log(props, "DEACTIVATE SCHEME PROPS");
  const [load, setLoad] = useState(false);
  let [formDataArray, setFormDataArray] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [approvedCode, setApprovedCode] = useState();
  const [canceledCode, setCanceledCode] = useState();
  const [dialogWording, setDialogWording] = useState();

  useEffect(() => {
    if (props.view) {
      fetchDrop(
        "/micro",
        {
          lookups: ["A_StatusSchReg"],
        },
        { topic: "REGCS", command: "load", userid: props.userid }
      )
        .then(function (data) {
          if (data.status === "OK") {
            for (let i in data.data.returns.A_StatusSchReg) {
              switch (data.data.returns.A_StatusSchReg[i].name) {
                case "APP":
                  setApprovedCode(data.data.returns.A_StatusSchReg[i].value);
                  break;
                case "CAN":
                  setCanceledCode(data.data.returns.A_StatusSchReg[i].value);
                  break;
                default:
                  break;
              }
            }
          }
        })
        .catch(function (response) {});
    }
    let deactivateSchemeFormTemp = {};
    let docArray = [];
    props.inputs[0].fields.map((input) => {
      docArray.push({ file_name: "", id: "", type: input.id });
    });
    deactivateSchemeFormTemp["docs"] = docArray;
    deactivateSchemeFormTemp["note"] = props.inputs[1];
    console.log(deactivateSchemeFormTemp, "FORM DEACT");
    props.inputs.map((input) => (labels[input.id] = input.label));
    setLoad(true);
  }, [props.inputs, props.userid, props.view]);

  const submitHandler = (event) => {
    event.preventDefault();
    setIsLoading(true);
    let notification = {
      message: "Request for Scheme Cancellation has been submitted",
      group: "Admin",
      recipient: "",
      id: "",
    };
    fileUploadFunc({
      body: {
        ...formState,
        schemeid: props.schemeid,
        notification: notification,
      },
      formDataArray: formDataArray,
      userid: props.userid,
      uploadCommand: "upload.deactivatescheme",
    })
      .then(function (response) {
        if (response.status === "OK") {
          setDialogWording([
            "Cancel Request for Community Scheme successfully submitted",
            <br />,
            <br />,
          ]);
          setOpenDialog(true);
          setIsLoading(false);
        } else if (response.status === "SYSFAIL") {
          props.setIsLoading(false);
          enqueueSnackbar([response.message], {
            variant: "error",
            autoHideDuration: 4000,
            anchorOrigin: {
              vertical: "top",
              horizontal: "right",
            },
          });
        }
      })
      .catch(function (response) {
        if (response.status === "USERFAIL") {
          setIsLoading(false);
          enqueueSnackbar([response.message], {
            variant: "error",
            autoHideDuration: 4000,
            anchorOrigin: {
              vertical: "top",
              horizontal: "right",
            },
          });
        } else {
          setIsLoading(false);
        }
      });
  };

  const handleAccept = (event) => {
    event.preventDefault();
    setIsLoading(true);
    let notification = {
      message: `Scheme with reference number ${props.schemeid} has been canceled`,
      group: "",
      recipient: props.userid,
      id: "",
    };
    let body = {
      ...formState,
      schemeid: props.schemeid,
      status: canceledCode,
      notification: notification,
    };

    fetchDrop(
      "/micro",
      {
        ...body,
      },
      {
        topic: "REGCS",
        command: "approve.deactivatescheme",
        userid: props.userid,
      }
    )
      .then(function (data) {
        if (data.status === "OK") {
          setDialogWording([
            "Cancel Request for Community Scheme successfully submitted",
            <br />,
            <br />,
          ]);
          setOpenDialog(true);
          setIsLoading(false);
        } else {
          enqueueSnackbar([data.message], {
            variant: "error",
            autoHideDuration: 4000,
            anchorOrigin: {
              vertical: "top",
              horizontal: "right",
            },
          });
          setIsLoading(false);
        }
      })
      .catch(function (response) {
        enqueueSnackbar([response.message], {
          variant: "error",
          autoHideDuration: 4000,
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        });
        setIsLoading(false);
      });
  };

  const handleDecline = (event) => {
    event.preventDefault();
    let notification = {
      message: `Scheme with reference number ${props.schemeid} has not been canceled`,
      group: "",
      recipient: props.userid,
      id: "",
    };
    let body = {
      ...formState,
      schemeid: props.schemeid,
      status: approvedCode,
      notification: notification,
    };
    fetchDrop(
      "/micro",
      {
        ...body,
      },
      {
        topic: "REGCS",
        command: "approve.deactivatescheme",
        userid: props.userid,
      }
    )
      .then(function (data) {
        if (data.status === "OK") {
          setDialogWording([
            "Cancel Request for Community Scheme successfully declined",
            <br />,
            <br />,
          ]);
          setOpenDialog(true);
          setIsLoading(false);
        } else {
          enqueueSnackbar([data.message], {
            variant: "error",
            autoHideDuration: 4000,
            anchorOrigin: {
              vertical: "top",
              horizontal: "right",
            },
          });
          setIsLoading(false);
        }
      })
      .catch(function (response) {
        enqueueSnackbar([response.message], {
          variant: "error",
          autoHideDuration: 4000,
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        });
        setIsLoading(false);
      });
  };
  const { formState, handleFileUpload, handleInputChange } = FormHook(
    props.state
  );

  const renderInputs = () => {
    if (load) {
      return (
        <Fragment>
          <Suspense
            fallback={<div>Loading IdentityAndAccessManagement...</div>}
          >
            <DocumentUpload
              value={formState}
              tableHeaders={props.inputs[0].tableHeaders}
              handle={handleFileUpload}
              fields={props.inputs[0].fields}
              schemeid={props.schemeid}
              userid={props.userid.toString()}
              view={props.view}
              formDataArray={formDataArray}
              setFormDataArray={setFormDataArray}
              creatorID={props.creatorID}
            />
          </Suspense>

          <Box
            id="adminActions-actionsContainer"
            className="schemeAction_parent"
          >
            <Box className="schemeReg_actionsTextAreaContainer">
              <TextArea
                key={"test"}
                id={"note"}
                type={"textarea"}
                value={formState["note"]}
                handle={handleInputChange}
                required={true}
                label={"Add reason"}
                //   error={formErrors[input.id]}
                isAdmin={props.isAdmin}
                readOnly={props.view}
              />
            </Box>
            <Box className="schemeReg_actionsBTNSContainer">
              {props.view ? (
                <Fragment>
                  <Button
                    data-testid="tabs-submit-form-button"
                    variant="contained"
                    onClick={handleAccept}
                  >
                    Accept
                  </Button>
                  <Button
                    data-testid="tabs-submit-form-button"
                    variant="contained"
                    onClick={handleDecline}
                  >
                    Decline
                  </Button>
                </Fragment>
              ) : (
                <Button
                  type="submit"
                  data-testid="tabs-submit-form-button"
                  variant="contained"
                >
                  Submit Form
                </Button>
              )}
            </Box>
          </Box>
        </Fragment>
      );
    }
  };

  return (
    <Fragment>
      <Modal open={isLoading} />
      <form onSubmit={submitHandler}>{renderInputs()}</form>
      <FormDialog
        open={openDialog}
        text={dialogWording}
        cancel={false}
        buttons={
          props.admin ? (
            <NavLink to="/admin">
              <Button key="home">Home</Button>
            </NavLink>
          ) : (
            <NavLink to="/portal">
              <Button key="home">Home</Button>
            </NavLink>
          )
        }
      />
    </Fragment>
  );
};

export default DeactivateSchemeContent;
