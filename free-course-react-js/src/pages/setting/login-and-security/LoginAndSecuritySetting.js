import { KeyRounded, LogoutRounded, VpnKeyRounded } from "@mui/icons-material";
import {
  Box,
  Container,
  Divider,
  Grid,
  Typography,
  Avatar,
  Stack,
  ListItemButton,
  Alert,
} from "@mui/material";
import React from "react";
import TextControl from "./../../../components/text-control/TextControl";
import DropdownItem from "./../../../components/dropdown/DropdownItem";
import Button from "./../../../components/button/Button";
import { Link } from "react-router-dom";
import { useState } from "react";
import TextField from "../../../components/text-field/TextField";
import { useDispatch, useSelector } from "react-redux";
import {
  CHANGE_PASSWORD_REQUEST,
  LOGOUT,
} from "store/types/data-types/auth-types";
const LoginAndSecuritySetting = () => {
  const [changePassMode, setChangePassMode] = useState(false);
  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [regisState, setRegisState] = useState({
    success: "",
    error: "",
  });
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const toggleChangePassMode = () => {
    setChangePassMode((s) => !s);
  };

  const changePassword = () => {
    dispatch({
      type: CHANGE_PASSWORD_REQUEST,
      body: form,
      callback: ({ success = null, error = null }) => {
        setRegisState({ success, error });
        if (success) {
          setForm({
            oldPassword: "",
            newPassword: "",
            confirmPassword: "",
          });
        }
      },
    });
  };

  return (
    <Container maxWidth="md" sx={{ padding: 0 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography>Thông tin bảo mật</Typography>
        </Grid>
        <Grid item xs={12}>
          <Divider
            flexItem
            orientation="horizontal"
            className="w-full border-2 mb-2"
          />
        </Grid>
        <Grid item xs={12}>
          <TextControl label="Tên tài khoản" value={user?.email} />
        </Grid>
        {!changePassMode ? (
          <>
            <Grid item xs={12}>
              <TextControl
                label="Mật khẩu"
                value="***********************************"
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                onClick={toggleChangePassMode}
              >
                Đổi mật khẩu mới
              </Button>
            </Grid>
          </>
        ) : (
          <>
            <Grid item xs={12}>
              <TextField
                label="Mật khẩu cũ"
                placeholder="Nhập mật khẩu cũ"
                fullWidth
                helper=""
                margin="none"
                value={form.oldPassword}
                type="password"
                onChange={(e) =>
                  setForm({ ...form, oldPassword: e.target.value })
                }
                icon={<VpnKeyRounded />}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Mật khẩu mới"
                placeholder="Nhập mật khẩu mới"
                fullWidth
                type="password"
                helper=""
                margin="none"
                value={form.newPassword}
                onChange={(e) =>
                  setForm({ ...form, newPassword: e.target.value })
                }
                icon={<KeyRounded />}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Xác nhận mật khẩu mơi"
                placeholder="Nhập lại mật khẩu mới"
                fullWidth
                helper=""
                margin="none"
                type="password"
                value={form.confirmPassword}
                onChange={(e) =>
                  setForm({ ...form, confirmPassword: e.target.value })
                }
                icon={<KeyRounded />}
              />
            </Grid>
            <Grid item xs={12}>
              {regisState.error && (
                <Alert severity="error">{regisState.error}</Alert>
              )}

              {regisState.success && (
                <Alert severity="success">{regisState.success}</Alert>
              )}
            </Grid>
            <Grid item xs={12}>
              <Stack direction="row" gap={2}>
                <Button
                  onClick={toggleChangePassMode}
                  variant="contained"
                  color="tomato"
                  sx={{
                    color: "#fff",
                  }}
                >
                  Hủy
                </Button>
                <Button
                  width={160}
                  variant="contained"
                  onClick={changePassword}
                >
                  Đổi mật khẩu
                </Button>
              </Stack>
            </Grid>
          </>
        )}
        <Grid item xs={12}>
          <Divider
            flexItem
            orientation="horizontal"
            className="w-full border-2 mb-2"
          />
        </Grid>
        <Grid item xs={12}>
          <ListItemButton
            sx={{ width: "100%", borderRadius: 1 }}
            onClick={() => dispatch({ type: LOGOUT })}
          >
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
          </ListItemButton>
        </Grid>
      </Grid>
    </Container>
  );
};

export default LoginAndSecuritySetting;
