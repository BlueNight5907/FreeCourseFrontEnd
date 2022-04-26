import {
  Avatar,
  Box,
  Divider,
  FormControl,
  Link as MuiLink,
  styled,
  Switch,
  Typography,
} from "@mui/material";
import React from "react";
import Dropdown from "../../../components/dropdown/Dropdown";
import DropdownItem from "../../../components/dropdown/DropdownItem";
import DropdownMenu from "../../../components/dropdown/DropdownMenu";
import DropdownToggle from "../../../components/dropdown/DropdownToggle";

import userAvatar from "../../../assets/avatar/u38.jfif";
import { Link } from "react-router-dom";
import {
  AddRounded,
  LogoutRounded,
  NightlightRounded,
  SchoolRounded,
  Settings,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { TOGGLE_PAGE_MODE } from "../../../store/types/page-types/setting-types";

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  "& .MuiSwitch-switchBase": {
    margin: 1,
    padding: 0,
    transform: "translateX(6px)",
    "&.Mui-checked": {
      color: "#fff",
      transform: "translateX(22px)",
      "& .MuiSwitch-thumb:before": {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          "#fff"
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    backgroundColor: theme.palette.mode === "dark" ? "#003892" : "#001e3c",
    width: 32,
    height: 32,
    "&:before": {
      content: "''",
      position: "absolute",
      width: "100%",
      height: "100%",
      left: 0,
      top: 0,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        "#fff"
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
  },
  "& .MuiSwitch-track": {
    opacity: 1,
    backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
    borderRadius: 20 / 2,
  },
}));

function UserDropdown(props) {
  const { children, sx } = props;
  const dispatch = useDispatch();
  const { mode } = useSelector((state) => state.setting);
  const toggleDarkMode = () => {
    dispatch({ type: TOGGLE_PAGE_MODE });
  };
  return (
    <Dropdown>
      <DropdownToggle
        render={({ toggleDropdown }) => {
          return (
            <div
              className="user-dropdown flex flex-row items-center gap-2 cursor-pointer"
              onClick={toggleDropdown}
            >
              <Avatar
                src={userAvatar}
                sx={{
                  height: 45,
                  width: 45,
                }}
              />
              <Box className="user-information hidden lg:flex flex-col justify-center ">
                <Typography
                  variant="caption"
                  sx={{
                    fontWeight: 500,
                    color: (theme) => theme.palette.text.main,
                  }}
                >
                  Nguyen Van Huy
                </Typography>
                <Typography
                  sx={{
                    fontSize: 10,
                    color: (theme) => theme.palette.text2.main,
                  }}
                >
                  Sinh viên
                </Typography>
              </Box>
            </div>
          );
        }}
      />

      <DropdownMenu
        shadow={8}
        width={{
          xs: 280,
        }}
        direction="right"
      >
        <DropdownItem>
          <Box
            component={Link}
            className="user-dropdown flex-row items-center gap-3 cursor-pointer flex"
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
        </DropdownItem>
        <Box>
          <Divider flexItem className="my-2 hidden md:block" />
        </Box>
        <DropdownItem>
          <Box
            component={Link}
            className="user-dropdown flex-row items-center gap-3 cursor-pointer flex"
            to="./"
          >
            <Avatar
              sx={{
                height: 35,
                width: 35,
              }}
            >
              <AddRounded />
            </Avatar>
            <Typography
              sx={{
                color: (theme) => theme.palette.text.main,
                fontWeight: 500,
              }}
              variant="body2"
            >
              Tạo bài viết mới
            </Typography>
          </Box>
        </DropdownItem>
        <DropdownItem>
          <Box
            component={Link}
            className="user-dropdown flex-row items-center gap-3 cursor-pointer flex"
            to="./"
          >
            <Avatar
              sx={{
                height: 35,
                width: 35,
              }}
            >
              <SchoolRounded />
            </Avatar>
            <Typography
              sx={{
                color: (theme) => theme.palette.text.main,
                fontWeight: 500,
              }}
              variant="body2"
            >
              Khóa học của tôi
            </Typography>
          </Box>
        </DropdownItem>
        <DropdownItem>
          <Box
            component={Link}
            className="user-dropdown flex-row items-center gap-3 cursor-pointer flex"
            to="/settings"
          >
            <Avatar
              sx={{
                height: 35,
                width: 35,
              }}
            >
              <Settings />
            </Avatar>
            <Typography
              sx={{
                color: (theme) => theme.palette.text.main,
                fontWeight: 500,
              }}
              variant="body2"
            >
              Cài đặt tài khoản
            </Typography>
          </Box>
        </DropdownItem>
        <DropdownItem disabledClick>
          <Box
            onClick={toggleDarkMode}
            className="user-dropdown flex-row items-center gap-3 cursor-pointer flex"
          >
            <Avatar
              sx={{
                height: 35,
                width: 35,
              }}
            >
              <NightlightRounded />
            </Avatar>
            <Typography
              sx={{
                color: (theme) => theme.palette.text.main,
                fontWeight: 500,
              }}
              variant="body2"
            >
              Chế độ nền tối
            </Typography>
            <MaterialUISwitch checked={mode === "light" ? false : true} />
          </Box>
        </DropdownItem>

        <Box>
          <Divider flexItem className="my-2" />
        </Box>
        <DropdownItem>
          <Box
            component={Link}
            className="user-dropdown flex-row items-center gap-3 cursor-pointer  flex"
            to="./"
          >
            <Avatar
              sx={{
                height: 35,
                width: 35,
              }}
            >
              <LogoutRounded />
            </Avatar>
            <Typography
              sx={{
                color: (theme) => theme.palette.text.main,
                fontWeight: 500,
              }}
              variant="body2"
            >
              Đăng xuất
            </Typography>
          </Box>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}

export default UserDropdown;
