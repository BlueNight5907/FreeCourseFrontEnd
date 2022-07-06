import {
  LinearProgress,
  linearProgressClasses,
  styled,
  Typography,
} from "@mui/material";
import React from "react";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  flex: 1,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor:
      theme.palette.mode === "light"
        ? "rgba(255, 1, 1, 0.8)"
        : theme.palette.tomato.main,
  },
}));

const LearningProgress = (props) => {
  const { total, learned, showLabel, progressSx, variant } = props;
  const value = (learned / total) * 100;
  console.log(value);
  if (!showLabel) {
    return <BorderLinearProgress value={value} variant={variant} />;
  }
  return (
    <div className="flex flex-row w-full items-center gap-1">
      <BorderLinearProgress sx={progressSx} value={value} variant={variant} />
      <Typography
        sx={{
          fontSize: 12,
          fontWeight: 500,
        }}
      >
        {learned}/{total}
      </Typography>
    </div>
  );
};

export default LearningProgress;
