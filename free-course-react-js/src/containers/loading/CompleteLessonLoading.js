import { Alert, CircularProgress, Slide, Snackbar } from "@mui/material";
import React, { useEffect, useState } from "react";
import { usePromiseTracker } from "react-promise-tracker";

function SlideTransition(props) {
  return <Slide {...props} direction="down" />;
}

const CompleteLessonLoading = () => {
  const { promiseInProgress } = usePromiseTracker({
    area: "lesson-complete",
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
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={loading}
      TransitionComponent={SlideTransition}
      key="lesson-complete"
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
        Đang kiểm tra kết quả bài học, vui lòng đợi trong giây lát
      </Alert>
    </Snackbar>
  );
};

export default CompleteLessonLoading;
