import {
  alpha,
  FormControl,
  FormHelperText,
  InputBase,
  Select,
  styled,
  Typography,
  TextField as MuiTextField,
} from "@mui/material";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import React from "react";

const TextWrapper = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  border: "1px solid " + theme.palette.text2.main,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  width: "100%",
  padding: theme.spacing(1, 0),
}));

const IconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  top: 0,
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const Input = styled(InputBase, {
  shouldForwardProp: (prop) => prop !== "hasIcon",
})(({ theme, hasIcon }) => ({
  "label + &": {
    marginTop: theme.spacing(3),
  },
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 2, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: hasIcon ? `calc(1em + ${theme.spacing(4)})` : theme.spacing(2),
    transition: theme.transitions.create("width"),
  },
}));

const TextField = (props) => {
  const {
    margin = "normal",
    border = true,
    onChange,
    id,
    placeholder,
    label,
    width,
    maxWidth,
    fullWidth,
    icon,
    value,
    error,
    helper,
    multiline,
    minRows,
    maxRows,
    select,
    type,
    children,
    ...others
  } = props;

  if (type === "date") {
    return (
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <FormControl variant="outlined" margin={margin} fullWidth={fullWidth}>
          {label && (
            <Typography
              sx={{
                fontWeight: 500,
                paddingLeft: 0.5,
                mb: 0.5,
              }}
              component="span"
              htmlFor={id}
            >
              {label}
            </Typography>
          )}
          <DesktopDatePicker
            inputFormat="dd/MM/yyyy"
            value={value}
            onChange={onChange && onChange}
            renderInput={(params) => (
              <MuiTextField
                sx={{
                  "& .MuiInputBase-root": {
                    padding: (theme) => theme.spacing(0.8, 2),
                  },
                }}
                {...params}
              />
            )}
          />

          {helper && <FormHelperText error={error}>{helper}</FormHelperText>}
        </FormControl>
      </LocalizationProvider>
    );
  }

  return (
    <FormControl variant="outlined" margin={margin} fullWidth={fullWidth}>
      {label && (
        <Typography
          sx={{
            fontWeight: 500,
            paddingLeft: 0.5,
            mb: 0.5,
          }}
          component="span"
          htmlFor={id}
        >
          {label}
        </Typography>
      )}
      {!select ? (
        <TextWrapper
          sx={{
            width: width,
            maxWidth: maxWidth,
            border: border ? "" : "none",
            padding: others?.padding,
          }}
        >
          {icon && <IconWrapper>{icon}</IconWrapper>}
          <Input
            hasIcon={icon}
            id={id}
            type={type}
            placeholder={placeholder}
            inputProps={{ "aria-label": { label } }}
            value={value}
            onChange={onChange && onChange}
            multiline={multiline}
            maxRows={maxRows}
            minRows={minRows}
            {...others}
          />
        </TextWrapper>
      ) : (
        <Select
          sx={{
            border: (theme) => "1px solid " + theme.palette.text2.main,
            borderRadius: 1,
          }}
          displayEmpty
          value={value || ""}
          renderValue={(selected) => {
            if (selected.length === 0) {
              return placeholder;
            }

            return selected.join(", ");
          }}
          input={<Input />}
          {...others}
        >
          {children}
        </Select>
      )}
      {helper && <FormHelperText error={error}>{helper}</FormHelperText>}
    </FormControl>
  );
};

export default TextField;
