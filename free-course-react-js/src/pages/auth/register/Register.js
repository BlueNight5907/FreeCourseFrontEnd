import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Paper,
  Stack,
  Typography,
  Button,
  Divider,
  TextField,
  Link,
  FormControlLabel,
  Checkbox,
  useTheme,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Alert,
} from "@mui/material";
import Image from "components/image/Image";
import logo from "assets/icons/logo.png";
import googleIcon from "assets/icons/google.svg";
import githubIcon from "assets/icons/github.svg";
import loginBg from "assets/background/login.jpg";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { REGISTER_REQUEST } from "store/types/data-types/auth-types";

function Register() {
  const [form, setForm] = useState({
    email: "",
    fullName: "",
    password: "",
    confirmPassword: "",
    type: "",
  });
  const [regisState, setRegisState] = useState({
    success: "",
    error: "",
  });
  const theme = useTheme();
  const { accessToken, error } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  // const navigate = useNavigate();
  const dispatch = useDispatch();

  const styles = {
    textField: {
      "& .MuiInput-root": {
        height: 40,
      },
    },
    authBtn: {
      minWidth: 140,
      height: 42,
    },
  };

  const register = async () => {
    dispatch({
      type: REGISTER_REQUEST,
      body: form,
      callback: ({ success = null, error = null }) => {
        setRegisState({ success, error });
        if (success) {
          setForm({
            email: "",
            fullName: "",
            password: "",
            confirmPassword: "",
            type: "",
          });
        }
      },
    });
  };

  useEffect(() => {
    if (accessToken) {
      navigate("/");
    }
  }, [accessToken, navigate]);

  useEffect(() => {
    if (error) {
    }
  }, [error]);

  const disabledRegister = () => {
    const formValues = Object.values(form);
    return formValues.findIndex((i) => i === "") >= 0;
  };

  return (
    <Grid container className="items-center justify-center flex-1">
      <Grid
        item
        xs={12}
        sm={9}
        md={12}
        lg={11}
        xl={9}
        padding={{ xs: theme.spacing(2, 1), md: theme.spacing(2, 4), lg: 2 }}
      >
        <Paper
          sx={{
            padding: { xs: 2, sm: 1, md: 0 },
            height: { xs: "100%", sm: "unset" },
            overflow: "hidden",
            margin: "auto",
            maxWidth: 1500,
          }}
        >
          <Grid container>
            <Grid
              item
              xs={12}
              md={6}
              style={{
                backgroundImage: `url(${loginBg})`,
                backgroundSize: "cover",
                backgroundPosition: "top",
                backgroundRepeat: "no-repeat",
              }}
              sx={{ position: "relative" }}
            >
              <Box
                display={{ xs: "none", md: "block" }}
                className="absolute"
                sx={{
                  padding: 2,
                  margin: theme.spacing(4, 3),
                  zIndex: 2,
                  top: 0,
                  left: 0,
                  right: 0,
                  borderRadius: 1,
                  backgroundColor: "rgba(255,255,255,0.6)",
                }}
              >
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae
                quaerat expedita totam similique, quisquam consectetur deleniti
                aspernatur est porro ut laudantium exercitationem ullam,
                repudiandae placeat quos pariatur soluta a provident.
              </Box>
              <Box
                className="absolute inset-0"
                sx={{
                  height: "100%",
                  opacity: 0.4,
                  zIndex: 1,
                  background: " linear-gradient(to right, #6190e8, #a7bfe8)",
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Box padding={{ xs: 0, sm: 4, md: 4, lg: 10 }}>
                <Stack gap={3}>
                  <Stack className="flex-row gap-3 items-center">
                    <Image src={logo} alt="logo" />
                    <Typography variant="h6" fontWeight={600}>
                      TDT Learn - Đăng ký
                    </Typography>
                  </Stack>
                  <Typography maxWidth={500}>
                    Chào mừng bạn quay trở lại. Bạn có thể đăng nhập vào tài
                    khoản bằng Google hoặc Github
                  </Typography>
                  <Stack className="flex-row gap-3 items-center flex-wrap">
                    <Button
                      startIcon={
                        <Image
                          src={googleIcon}
                          alt="icon"
                          sx={{ width: 30, height: 30 }}
                        />
                      }
                      sx={{
                        textTransform: "inherit",
                        width: { xs: "100%", sm: "unset" },
                      }}
                      variant="outlined"
                      color="text"
                    >
                      Đăng nhập bằng Google
                    </Button>
                    <Button
                      startIcon={
                        <Image
                          src={githubIcon}
                          alt="icon"
                          sx={{ width: 30, height: 30 }}
                        />
                      }
                      sx={{
                        textTransform: "inherit",
                        width: { xs: "100%", sm: "unset" },
                      }}
                      variant="outlined"
                      color="text"
                    >
                      Đăng nhập bằng Github
                    </Button>
                  </Stack>
                  <Divider>Hoặc đăng ký với</Divider>
                  <Stack gap={1}>
                    <TextField
                      sx={styles.textField}
                      label="Họ và tên"
                      variant="standard"
                      value={form.fullName}
                      onChange={(e) =>
                        setForm({ ...form, fullName: e.target.value })
                      }
                    />
                    <TextField
                      sx={styles.textField}
                      label="Email/Tên tài khoản"
                      variant="standard"
                      value={form.email}
                      onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                      }
                    />
                    <TextField
                      sx={styles.textField}
                      label="Mật khẩu"
                      variant="standard"
                      type="password"
                      value={form.password}
                      onChange={(e) =>
                        setForm({ ...form, password: e.target.value })
                      }
                    />
                    <TextField
                      sx={styles.textField}
                      label="Nhập lại mật khẩu"
                      variant="standard"
                      type="password"
                      value={form.confirmPassword}
                      onChange={(e) =>
                        setForm({ ...form, confirmPassword: e.target.value })
                      }
                    />
                    <FormControl variant="standard" sx={{ width: "100%" }}>
                      <InputLabel>Loại tài khoản</InputLabel>
                      <Select
                        value={form.type}
                        label="Loại tài khoản"
                        onChange={(e) =>
                          setForm({ ...form, type: e.target.value })
                        }
                      >
                        <MenuItem value="student">Người học</MenuItem>
                        <MenuItem value="teacher">Giáo viên</MenuItem>
                      </Select>
                      <FormHelperText>
                        Loại tài khoản mà bạn muốn đăng ký
                      </FormHelperText>
                    </FormControl>
                    {regisState.error && (
                      <Alert severity="error">{regisState.error}</Alert>
                    )}

                    {regisState.success && (
                      <Alert severity="success">{regisState.success}</Alert>
                    )}
                  </Stack>
                  <Stack className="flex-row gap-3 items-center flex-wrap ">
                    <Button
                      sx={styles.authBtn}
                      variant="contained"
                      disableElevation
                      onClick={register}
                      className="px-[50px]"
                      disabled={disabledRegister()}
                    >
                      Đăng ký tài khoản
                    </Button>
                    <Button
                      sx={styles.authBtn}
                      variant="outlined"
                      onClick={() => navigate("/login")}
                    >
                      Đăng nhập
                    </Button>
                  </Stack>
                </Stack>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default Register;
