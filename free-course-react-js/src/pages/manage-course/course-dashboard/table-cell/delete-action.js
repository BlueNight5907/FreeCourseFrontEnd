import React from "react";
import Button from "components/button/Button";
import { DeleteOutline } from "@mui/icons-material";
import ConfirmDialog from "components/dialog/confirm-dialog";

const DeleteAction = ({ params }) => {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Button
        variant="contained"
        style={{ marginLeft: 16 }}
        startIcon={<DeleteOutline />}
        onClick={() => setOpen(true)}
        specialBg="red"
      />
      <ConfirmDialog
        open={open}
        title={`Xóa khóa học`}
        setOpen={setOpen}
        deleted
        onAccept
        onRefuse
      >
        Bạn có chắc chắn muốn xóa khóa học {params.row.lastName} này không
      </ConfirmDialog>
    </>
  );
};

export default DeleteAction;
