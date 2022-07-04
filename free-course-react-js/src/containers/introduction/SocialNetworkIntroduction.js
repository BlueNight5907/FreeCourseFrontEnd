import { Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import Button, { buttonBg } from "../../components/button/Button";
import networkIntro from "../../assets/background/network-intro.png";

function SocialNetworkIntroduction(props) {
  const { children, sx, ...others } = props;
  const style = {
    height: 230,
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
        Nơi chia sẻ kiến thức của bạn đến với tất cả mọi người
      </Typography>
      <Button variant="contained" specialBg={buttonBg.red}>
        Đến trang chủ Mạng xã hội
      </Button>

      <Box
        component="img"
        src={networkIntro}
        sx={{
          width: 210,
          top: 24,
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

export default SocialNetworkIntroduction;
