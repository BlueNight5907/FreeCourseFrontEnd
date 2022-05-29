import React from "react";
import PropTypes from "prop-types";
import Dialog from "./dialog";
import { Stack, Button } from "@mui/material";

const ConfirmDialog = ({
  open,
  setOpen,
  onAccept,
  onRefuse,
  title,
  children,
  sx,
  ...others
}) => {
  return (
    <Dialog
      title={title}
      sx={sx}
      open={open}
      setOpen={setOpen}
      actions={
        <Stack flexDirection="row" gap={1}>
          <Button
            width={80}
            color="text"
            onClick={() => {
              setOpen(false);
              onRefuse && onRefuse();
            }}
          >
            Hủy
          </Button>
          <Button
            width={80}
            onClick={() => {
              setOpen(false);
              onAccept && onAccept();
            }}
          >
            Xác nhận
          </Button>
        </Stack>
      }
      {...others}
    >
      {children}
    </Dialog>
  );
};

ConfirmDialog.propTypes = {
  title: PropTypes.any.isRequired,
  setOpen: PropTypes.func.isRequired,
};

export default ConfirmDialog;
