import { Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import Button, { buttonBg } from "../../components/button/Button";
import chatGroupIntro from "../../assets/background/group-intro.png";

function ChatGroupIntroduction(props) {
  const { children, sx, ...others } = props;
  const style = {
    height: 180,
    borderRadius: 1,
    backgroundColor: "#E3D2FB",
    padding: 2.5,
    width: "100%",
  };
  return (
    <Paper
      sx={{
        ...style,
        ...sx,
      }}
      {...others}
      className="relative flex flex-col justify-between items-start overflow-hidden"
    >
      <Typography
        sx={{
          width: {
            xs: "100%",
            md: "60%",
          },
          fontSize: 16,
          fontWeight: 500,
          color: "#000",
        }}
        component="h4"
      >
        Nơi nhắn tin, trao đổi với bạn bè và liên hệ với Giáo Viên
      </Typography>
      <Button variant="contained" specialBg={buttonBg.puple}>
        Đến trang chủ nhóm Chat
      </Button>

      <Box
        component="img"
        src={chatGroupIntro}
        sx={{
          width: 210,
          top: 40,
          left: "60%",
          display: {
            xs: "none",
            md: "block",
          },
        }}
        className="absolute"
      />
    </Paper>
  );
}

export default ChatGroupIntroduction;
