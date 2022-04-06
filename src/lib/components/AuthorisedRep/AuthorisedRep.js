import React, { useEffect, useState } from "react";
import { Paper, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";

const AuthorisedRep = (props) => {
  
  const [fields, setFields] = useState([]);

  useEffect(() => {
    fnCreateFields();
  }, []);

  const fnCreateFields = async () => {
    if (props.value && props.value.length) {
      const newFields = generateFields(props.value.length);

      setFields(newFields);
    } else {
      setFields([props.fields]);
    }
  };

  function generateFields(n) {
    return Array(n)
      .fill({})
      .map((each) => props.fields);
  }

  return (
    <Paper>
      <Table aria-label="customized table">
        <TableHead>
          {/* {props.fields.map((field) => ( */}
          <TableRow>
            <TableCell className="register_table-head-field">
              {props.tableHeaders.name}
            </TableCell>
            <TableCell className="register_table-head-field">
              {props.tableHeaders.surname}
            </TableCell>
            <TableCell className="register_table-head-field">
              {props.tableHeaders.id}
            </TableCell>
            <TableCell className="register_table-head-field">
              {props.tableHeaders.email}
            </TableCell>
            <TableCell className="register_table-head-field">
              {props.tableHeaders.tel}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {fields.length
            ? fields.map((rows, i) => {
                return (
                  <TableRow data-testid="input-table-row" key={"row_" + i}>
                    {rows.map((field, x) => {
                      if (field.type === "address") {
                        return null;
                      }
                      if (!Object.keys(props.value).length) return null;

                      const [id, key] = field.id.split(".");
                      let value;
                      if(props.value.hasOwnProperty(field.id) || props.value.hasOwnProperty([id]) ){
                        value = key
                        ? props.value[id][key]
                        : props.value[field.id];
                      }
                      
                      return (
                        <TableCell
                          className={`${x ? "" : "table-body-1st-column"}`}
                          data-testid="input-table-cell"
                          key={field.id}
                        >
                          <input
                            key={field.label + "_field." + x + "." + i}
                            id={field.id}
                            name={field.id}
                            type={field.type}
                            value={value}
                            required={field.required ? field.required : false}
                            placeholder={`${field.label} ${props.errors && props.errors[field.id + "." + i]
                            ? props.errors[field.id + "." + i]
                            : ""
                          }`}
                            onChange={key ? props.handleIndexed : props.handle}
                            data-testid="input-table-field"
                            pattern={field.pattern ? field.pattern : null}
                            readOnly={props.isAdmin ? !props.regOnBehalf : props.readOnly}
                          />
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })
            : null}
        </TableBody>
      </Table>
    </Paper>
  );
};


export default AuthorisedRep;

// export default DocumentUpload;
