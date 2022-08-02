import {
  Paper,
  Stack,
  Tab,
  Tabs,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Button from "../../components/button/Button";
import TabPanel from "../../components/tab-panel/TabPanel";
import Wrapper from "../../components/wrapper/Wrapper";
import { SET_GO_BACK_NAV_BAR } from "../../store/types/page-types/setting-types";
import AccountSetting from "./account/AccountSetting";
import LoginAndSecuritySetting from "./login-and-security/LoginAndSecuritySetting";

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const Setting = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const matchLg = useMediaQuery(theme.breakpoints.up("lg"));
  const [selected, setSelected] = useState(0);
  useEffect(() => {
    dispatch({
      type: SET_GO_BACK_NAV_BAR,
      payload: {
        value: true,
      },
    });
  }, []);

  const styles = {};

  const handleSelectedChange = (event, newValue) => {
    setSelected(newValue);
  };
  return (
    <Wrapper
      marginY={1}
      elevation={1}
      flex
      title="Cài đặt"
      rounded={1.5}
      flexDirection={!matchLg ? "column" : "row"}
    >
      <Tabs
        orientation={!matchLg ? "horizontal" : "vertical"}
        variant="scrollable"
        value={selected}
        onChange={handleSelectedChange}
        allowScrollButtonsMobile
        sx={{
          flexShrink: 0,
          mb: 2,
          height: "fit-content",
          ...(matchLg && {
            position: "sticky",
            top: 80,
          }),
        }}
      >
        <Tab
          label="Thông tin cá nhân"
          className="capitalize items-start"
          {...a11yProps(0)}
        />
        <Tab
          label="Bảo mật và đăng nhập"
          className="capitalize items-start"
          {...a11yProps(1)}
        />
      </Tabs>

      <TabPanel value={selected} index={0}>
        <AccountSetting />
      </TabPanel>
      <TabPanel value={selected} index={1}>
        <LoginAndSecuritySetting />
      </TabPanel>
    </Wrapper>
  );
};

export default Setting;
