import React, { useEffect, useState } from "react";
import AlertDialog from "components/dialog/alert-dialog";
import { Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RESET_ERROR } from "store/types/data-types/common-types";

const ErrorPage = (props) => {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const { error: authError } = useSelector((state) => state.auth);
  const { error: categoryError } = useSelector((state) => state.category);
  const { error: courseError } = useSelector((state) => state.courseDetail);
  const { error: learningError } = useSelector(
    (state) => state.learningProcess
  );
  const { error: blogError } = useSelector((state) => state.blog);
  const { error: manageError } = useSelector((state) => state.manageCourse);

  useEffect(() => {
    if (
      authError ||
      categoryError ||
      courseError ||
      learningError ||
      blogError ||
      manageError
    ) {
      setError(
        authError ||
          categoryError ||
          courseError ||
          learningError ||
          blogError ||
          manageError
      );
      setOpen(true);
    }
  }, [
    authError,
    blogError,
    categoryError,
    courseError,
    learningError,
    manageError,
  ]);

  const handleClose = () => {
    dispatch({ type: RESET_ERROR });
  };

  return (
    <AlertDialog
      title="Thông báo"
      onClose={handleClose}
      open={open}
      setOpen={setOpen}
    >
      <Typography>{error}</Typography>
    </AlertDialog>
  );
};

export default ErrorPage;
