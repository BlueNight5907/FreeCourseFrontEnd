import React from "react";
import PropTypes from "prop-types";
import Dialog from "./dialog";
import Button from "../button/Button";

const AlertDialog = ({
  open,
  setOpen,
  title,
  children,
  onClose,
  sx,
  ...others
}) => {
  return (
    <Dialog
      title={title}
      sx={sx}
      open={open}
      setOpen={() => {
        setOpen(false);
        onClose && onClose();
      }}
      actions={
        <Button
          width={80}
          onClick={() => {
            setOpen(false);
            onClose && onClose();
          }}
        >
          Đóng
        </Button>
      }
      {...others}
    >
      {children}
    </Dialog>
  );
};

AlertDialog.propTypes = {
  title: PropTypes.any.isRequired,
  setOpen: PropTypes.func.isRequired,
  onClose: PropTypes.func,
};

export default AlertDialog;
