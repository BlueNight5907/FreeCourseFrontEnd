import { Visibility } from "@mui/icons-material";
import { Box, Modal, Typography } from "@mui/material";
import Button from "components/button/Button";
import React from "react";

const style = {
  position: "absolute",
  top: "0",
  right: "0",
  width: 400,
  height: "100%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const ViewStudentAction = ({ params }) => {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <Button
        variant="contained"
        startIcon={<Visibility />}
        onClick={() => setOpen(true)}
      />
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>
    </>
  );
};

export default ViewStudentAction;
