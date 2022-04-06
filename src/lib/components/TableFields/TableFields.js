import React, { useEffect, useState } from "react";
import {
  Button,
  Paper,
  Tooltip,
  TableHead,
  Table,
  TableRow,
  TableCell,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

function TableFields(props) {
  const [fields, setFields] = useState([]);
  const [load, setLoad] = useState(false);
  const [showButtons, setShowButtons] = useState(true);
  console.log(props, "TABLE PROPS")

  useEffect(() => {

    setShowButtons(props.isAdmin ? props.regOnBehalf  : true)
    if (props.tabId === "excom") {
      let newFields;
      console.log(props, "TABLE VALUES");
      if (props.value && props.value["excoms"].length) {
        newFields = fnGenerateFields(props.value["excoms"].length);
        setFields(newFields);
      }
    }
    fnCreateFields();
  }, []);

  useEffect(() => {
    console.log(fields, "Use effect");
  }, [fields]);

  const fnCreateFields = async () => {
    let newFields;
    if (props.tabId === "excom") {
      if (props.value && props.value["excoms"].length) {
        newFields = fnGenerateFields(props.value["excoms"].length);

        setFields(newFields);
      } else {
        setFields(props.value["excoms"]);
      }
    } else if (props.value && props.value.length) {
      newFields = fnGenerateFields(props.value.length);

      setFields(newFields);
    } else {
      setFields([props.fields]);
    }
    // props.initState();
  };

  const fnAddFields = () => {
    props.addField();
    setFields([...fields, props.fields]);
  };

  function fnGenerateFields(n) {
    const ar = Array(n)
      .fill({})
      .map((each) => props.fields);
    setLoad(true);
    setFields(ar);
    return ar;
  }

  function fnHandleRemove(index) {
    fields.splice(index, 1);
    setFields([...fields]);
    props.handleRemoveTableField(index);
  }

  // console.log(fields, "TBALE CREATED FIELDS",)

  return (
    <React.Fragment>
      <Paper>
        <Table aria-label="customized table">
          <TableHead>
            {props.fields.map((field, index) => (
              <TableCell
                className={`register_table-head-field`}
                key={field.label + "_header"}
                data-testid="input-table-header-cell"
                padding={field.type}
              >
                {field.label}
              </TableCell>
            ))}
            <TableCell className={`register_table-head-field`}>
              Remove
            </TableCell>
          </TableHead>
          <tbody>
            {fields.length
              ? fields.map((rows, i) => {
                  return (
                    <TableRow data-testid="input-table-row" key={"row_" + i}>
                      {rows.map((field, x) => {
                        // console.log('rows.map((field, x) => ', field);
                        // console.log('rows.map((field, x) field.required => ', field.required);
                        // console.log('props => ', props);
                        // console.log(
                        //   props.value.excoms,
                        //   "TABLE VALUE FIELD",
                        //   fields
                        // );
                        if (!Object.keys(props.value).length) return;

                        const [id, key] = field.id.split(".");
                        let flag = false;
                        if (field.type === "checkbox") {
                          console.log(props, "EXCOM PROPS")
                          flag = true;
                        }
                        let value;
                        if (props.tabId === "excom") {
                          value = key
                            ? props.value.excoms[i][id][key]
                            : props.value.excoms[i][id];
                        } else {
                          value = key
                            ? props.value[i][id][key]
                            : props.value[i][id];
                        }

                        console.log(value, field.type, "TABLEFIELD VALUE PROP");
                        return (
                          <TableCell
                            className={`${x ? "" : "table-body-1st-column"}`}
                            data-testid="input-table-cell"
                            key={field.id}
                          >
                            <input
                              key={field.label + "_field." + x + "." + i}
                              id={field.id + "." + i}
                              name={field.id + "." + i}
                              type={field.type}
                              value={load && value}
                              placeholder={`${field.label} ${
                                props.errors && props.errors[field.id + "." + i]
                                  ? props.errors[field.id + "." + i]
                                  : ""
                              }`}
                              onChange={props.handle}
                              onInvalid={props.handle}
                              data-testid="input-table-field"
                              pattern={field.pattern ? field.pattern : null}
                              required={field.required ? field.required : false}
                              checked={flag && value}
                              readOnly={props.isAdmin ? (props.regOnBehalf ? props.readOnly : true): props.readOnly}
                              disabled={props.isAdmin ? (props.regOnBehalf ? props.readOnly : true): props.readOnly}
                            />
                          </TableCell>
                        );
                      })}

                      {props.tabId === "excom" && props.value.excoms[i] ? (
                        <TableCell>
                          <Tooltip
                            data-testid="input-table-row-delete-tootlTip"
                            title={`Remove ${
                              props.value[i] ? props.value[i].name : ""
                            }`}
                          >
                            <IconButton
                              data-testid="input-table-row-delete"
                              onClick={() => fnHandleRemove(i)}
                              color="error"
                              size="small"
                              edge="end"
                              aria-label="remove director"
                            >
                              <CloseIcon />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      ) : null}
                    </TableRow>
                  );
                })
              : null}
          </tbody>
        </Table>
      </Paper>
      
      {showButtons && <div className="schemeReg_tableButtonBar">
        <Button type="button" onClick={fnAddFields}>
          Add Member
        </Button>
      </div>}
      
    </React.Fragment>
  );
}

export default TableFields;
