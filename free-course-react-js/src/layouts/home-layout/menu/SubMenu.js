import * as React from "react";
import MenuList from "@mui/material/MenuList";
import MenuItem from "./MenuItem";
import { Slide, useMediaQuery } from "@mui/material";
import { useTheme } from "@emotion/react";
import mainMenuList from "./menu-list";
import { ArrowBackRounded } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { CLOSE_HOME_DRAWER_SUB_MENU } from "../../../store/types/page-types/setting-types";

export default function SubMenu(props) {
  const { subMenu, container } = props;
  const theme = useTheme();
  const dispatch = useDispatch();
  const goBack = () => {
    dispatch({ type: CLOSE_HOME_DRAWER_SUB_MENU });
  };
  return (
    <Slide direction="left" in={subMenu != null} container={container}>
      <MenuList className="w-full">
        <MenuItem
          onClick={goBack}
          primary="Quay lại"
          icon={ArrowBackRounded}
          menuItemStyle={{
            backgroundColor: theme.palette.primary.main + "90",
            "&:hover": {
              backgroundColor: theme.palette.primary.main,
            },
            mb: 3,
          }}
          textStyle={{
            color: "#fff",
          }}
        />
        {subMenu.map((item, index) => (
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
          />
        ))}
      </MenuList>
    </Slide>
  );
}
