import { Alert, CircularProgress, Slide, Snackbar } from "@mui/material";
import React, { useEffect, useState } from "react";
import { usePromiseTracker } from "react-promise-tracker";

function SlideTransition(props) {
  return <Slide {...props} direction="up" />;
}

const BlockLoading = () => {
  const { promiseInProgress } = usePromiseTracker({
    area: "blog",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (promiseInProgress) {
      setLoading(true);
      setTimeout(() => setLoading(false), 2000);
    }
  }, [promiseInProgress]);

  return (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      open={loading}
      TransitionComponent={SlideTransition}
      key="blog-loading"
    >
      <Alert
        icon={<CircularProgress size={30} />}
        sx={{
          "& .MuiAlert-message": {
            display: "flex",
            alignItems: "center",
          },
        }}
        severity="success"
      >
        Đang tải thêm bài viết, vui lòng đợi trong giây lát
      </Alert>
    </Snackbar>
  );
};

export default BlockLoading;
