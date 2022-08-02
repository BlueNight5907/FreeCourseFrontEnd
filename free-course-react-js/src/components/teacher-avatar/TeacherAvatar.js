import { CheckBox } from "@mui/icons-material";
import { Avatar, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import avt from "../../assets/avatar/u40.jfif";
import { useNavigate } from "react-router-dom";

const TeacherAvatar = ({ userInformation, userId }) => {
  const navigate = useNavigate();
  return (
    <Stack className="flex-row items-center gap-3">
      <Box className="rounded-full p-1" sx={{ border: "2px solid #FB6D3A" }}>
        <Avatar
          sx={{
            width: {
              xs: 35,
              sm: 40,
            },
            height: {
              xs: 35,
              sm: 40,
            },
            cursor: "pointer",
          }}
          onClick={() => navigate(userId ? "/user/profile/" + userId : "./")}
          src={userInformation?.avatar}
        />
      </Box>
      <Box>
        <Typography
          variant="subtitle2"
          className="font-medium cursor-pointer"
          onClick={() => navigate(userId ? "/user/profile/" + userId : "./")}
        >
          {userInformation?.fullName}
        </Typography>
        <Typography
          variant="caption"
          color="GrayText"
          className="flex flex-row items-center gap-2"
        >
          Giảng viên <CheckBox sx={{ color: "#FB6D3A" }} size="small" />
        </Typography>
      </Box>
    </Stack>
  );
};

export default TeacherAvatar;
