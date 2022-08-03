import React, { useState } from "react";

import { Box, Divider, Typography, useTheme } from "@mui/material";
import {
  RootWrapper,
  DrawerWrapperMobile,
  Sidebar,
  ChatWindow,
  ChatTopBar,
  IconButtonToggle,
} from "./styled-components";

import MenuTwoToneIcon from "@mui/icons-material/MenuTwoTone";
import Footer from "./footer/Footer";
import Header from "./header/Header";
import Drawer from "./drawer/Drawer";
import Scrollbar from "components/scrollbar/Scrollbar";
import MessageContent from "./content/MessageContent";

const MessageLayout = (props) => {
  const { children } = props;
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box
      sx={{
        height: "100%",
        opacity: 0.4,
        zIndex: 1,
        background: " linear-gradient(to right, #6190e8, #a7bfe8)",
      }}
    >
      <Box
        sx={{
          zIndex: 2,
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          margin: "auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography zIndex={10} color={"black"} fontSize={50} fontWeight={500}>
          Đang phát triển ...
        </Typography>
      </Box>
      <RootWrapper className="Mui-FixedWrapper">
        <DrawerWrapperMobile
          sx={{
            display: { lg: "none", xs: "inline-block" },
          }}
          variant="temporary"
          anchor={theme.direction === "rtl" ? "right" : "left"}
          open={mobileOpen}
          onClose={handleDrawerToggle}
        >
          <Scrollbar>
            <Drawer />
          </Scrollbar>
        </DrawerWrapperMobile>
        <Sidebar
          sx={{
            display: { xs: "none", lg: "inline-block" },
          }}
        >
          <Scrollbar>
            <Drawer />
          </Scrollbar>
        </Sidebar>
        <ChatWindow>
          <ChatTopBar
            sx={{
              display: { xs: "flex", lg: "inline-block" },
            }}
          >
            <IconButtonToggle
              sx={{
                display: { lg: "none", xs: "flex" },
                mr: 2,
              }}
              color="primary"
              onClick={handleDrawerToggle}
              size="small"
            >
              <MenuTwoToneIcon />
            </IconButtonToggle>
            <Header />
          </ChatTopBar>
          <Box flex={1} height={"75vh"}>
            <Scrollbar>
              <MessageContent />
            </Scrollbar>
          </Box>
          <Divider />
          <Footer />
        </ChatWindow>
      </RootWrapper>
    </Box>
  );
};

export default MessageLayout;
