import React from "react";
import Button from "components/button/Button";
import { DeleteOutline } from "@mui/icons-material";
import ConfirmDialog from "components/dialog/confirm-dialog";
import { useDispatch } from "react-redux";
import { REMOVE_COURSE } from "store/types/data-types/category-types";

const DeleteAction = ({ params, onDelete }) => {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const onAccept = async () => {
    dispatch({
      type: REMOVE_COURSE,
      courseId: params.row._id,
      callback: onDelete,
    });
  };

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
        onAccept={onAccept}
      >
        Bạn có chắc chắn muốn xóa khóa học {params.row.lastName} này không?
      </ConfirmDialog>
    </>
  );
};

export default DeleteAction;
