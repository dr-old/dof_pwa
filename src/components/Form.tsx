import React from "react";
import { styled } from "@mui/material";
import { PasswordElement, TextFieldElement } from "react-hook-form-mui";

interface InputProps {
  name: string;
  label: string;
  type: string;
  [key: string]: any;
}

const BorderlessTextField = styled(TextFieldElement)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: theme.shape.borderRadius * 2.5,
    backgroundColor: theme.palette.background.paper,
    "& fieldset": {
      border: "none",
    },
    "&:hover fieldset": {
      border: "none",
    },
    "&.Mui-focused fieldset": {
      border: "none",
    },
    "& input": {
      fontSize: "0.75rem", // Set font size for input text
      padding: "12px 15px", // Adjust padding for input text
    },
  },
  "& .MuiInputLabel-root": {
    fontSize: "0.75rem", // Set font size for the label if needed
    color: theme.palette.text,
    paddingTop: "3px",
  },
}));

const BorderlessPassword = styled(PasswordElement)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: theme.shape.borderRadius * 2.5,
    backgroundColor: theme.palette.background.paper,
    "& fieldset": {
      border: "none",
    },
    "&:hover fieldset": {
      border: "none",
    },
    "&.Mui-focused fieldset": {
      border: "none",
    },
    "& input": {
      fontSize: "0.75rem", // Set font size for input text
      padding: "12px 15px", // Adjust padding for input text
    },
  },
  "& .MuiInputLabel-root": {
    fontSize: "0.75rem", // Set font size for the label if needed
    color: theme.palette.text,
    paddingTop: "3px",
  },
}));

export const Input: React.FC<InputProps> = ({ name, label, type, ...rest }) => {
  if (type === "password") {
    return (
      <BorderlessPassword
        name={name}
        label={label}
        type={type}
        size="small"
        margin="normal"
        {...rest}
      />
    );
  }

  return (
    <BorderlessTextField
      name={name}
      label={label}
      type={type}
      size="small"
      margin="normal"
      {...rest}
    />
  );
};
