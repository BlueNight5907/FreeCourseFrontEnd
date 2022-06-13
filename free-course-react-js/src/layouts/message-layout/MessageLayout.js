import React, { useState } from "react";

import { Box, Divider, useTheme } from "@mui/material";
import { RootWrapper, DrawerWrapperMobile, Sidebar, ChatWindow, ChatTopBar, IconButtonToggle } from "./styled-components";

import MenuTwoToneIcon from '@mui/icons-material/MenuTwoTone';
import Footer from "./footer/Footer";
import Header from "./header/Header";
import Drawer from "./drawer/Drawer";

const MessageLayout = () => {
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    return (
        <>
            <RootWrapper className="Mui-FixedWrapper">
                <DrawerWrapperMobile
                    sx={{
                        display: { lg: 'none', xs: 'inline-block' }
                    }}
                    variant="temporary"
                    anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                >
                    <Drawer />

                </DrawerWrapperMobile>
                <Sidebar
                    sx={{
                        display: { xs: 'none', lg: 'inline-block' }
                    }}
                >
                    <Drawer />

                </Sidebar>
                <ChatWindow>
                    <ChatTopBar
                        sx={{
                            display: { xs: 'flex', lg: 'inline-block' }
                        }}
                    >
                        <IconButtonToggle
                            sx={{
                                display: { lg: 'none', xs: 'flex' },
                                mr: 2
                            }}
                            color="primary"
                            onClick={handleDrawerToggle}
                            size="small"
                        >
                            <MenuTwoToneIcon />
                        </IconButtonToggle>
                        {/* <Header /> */}
                    </ChatTopBar>
                    <Box flex={1}>
                    </Box>
                    <Divider />
                    <Footer />
                </ChatWindow>
            </RootWrapper>
        </>
    );
}

export default MessageLayout;