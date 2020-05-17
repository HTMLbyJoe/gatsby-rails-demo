/** @jsx jsx */
import { jsx, Label, Input } from "theme-ui"

import React from "react"
import { useField } from "formik"

const TextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props)
  return (
    <React.Fragment>
      <Label
        sx={{ color: "primary", backgroundColor: "background" }}
        htmlFor={props.id || props.name}
      >
        {label}
      </Label>
      <Input
        sx={{
          color: "text",
          backgroundColor: "background",
        }}
        className="text-input"
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </React.Fragment>
  )
}

export default TextInput
