import * as React from "react";
import MenuList from "@mui/material/MenuList";
import MenuItem from "./MenuItem";
import { Link } from "react-router-dom";
import {
  Avatar,
  Box,
  Divider,
  Slide,
  Typography,
  useMediaQuery,
} from "@mui/material";
import userAvatar from "../../../assets/avatar/u34.jfif";
import { useTheme } from "@emotion/react";
import mainMenuList, { teacherSubMenuList } from "./menu-list";
import { useDispatch } from "react-redux";
import { OPEN_HOME_DRAWER_SUB_MENU } from "../../../store/types/page-types/setting-types";

export default function MainMenu(props) {
  const { container, subMenu } = props;
  const theme = useTheme();
  const matchMd = useMediaQuery(theme.breakpoints.up("md"));
  const dispatch = useDispatch();

  const openSubMenu = (name) => {
    let menu;
    switch (name) {
      case "Quản lý khóa học":
        menu = teacherSubMenuList;
        break;
      default:
        menu = teacherSubMenuList;
        break;
    }
    return () => {
      dispatch({
        type: OPEN_HOME_DRAWER_SUB_MENU,
        payload: {
          subMenu: menu,
        },
      });
    };
  };

  return (
    <Slide direction="right" in={!subMenu} container={container}>
      <MenuList className="w-full">
        {!matchMd && (
          <MenuItem>
            <Box
              component={Link}
              sx={{
                display: "flex",
                width: "100%",
                alignItems: "center",
                gap: 2,
              }}
              to="./"
            >
              <Avatar
                src={userAvatar}
                sx={{
                  height: 50,
                  width: 50,
                }}
              />
              <Box className="user-information flex-col justify-center gap-1 flex">
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 500,
                    color: (theme) => theme.palette.text.main,
                  }}
                >
                  Nguyen Van Huy
                </Typography>
                <Typography
                  sx={{
                    fontSize: 12,
                    color: (theme) => theme.palette.text2.main,
                  }}
                >
                  Sinh viên
                </Typography>
              </Box>
            </Box>
          </MenuItem>
        )}

        {!matchMd && (
          <Box>
            <Divider
              flexItem
              sx={{
                my: 1,
              }}
            />
          </Box>
        )}

        {mainMenuList.map((item, index) => (
          <MenuItem
            type={item.type}
            title={item.title}
            primary={item.name}
            icon={item.icon}
            badge={item.badge}
            key={index}
            selected={item.selected}
            href={item.href}
            additional={item.additional}
            onClick={
              item.callFunction && item.callFunction(openSubMenu(item.name))
            }
          />
        ))}
      </MenuList>
    </Slide>
  );
}
