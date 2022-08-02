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
} from "@mui/material";
import Image from "components/image/Image";
import logo from "assets/icons/logo.png";
import googleIcon from "assets/icons/google.svg";
import githubIcon from "assets/icons/github.svg";
import loginBg from "assets/background/login.jpg";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LOGIN_REQUEST } from "store/types/data-types/auth-types";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const theme = useTheme();
  const { accessToken, error } = useSelector((state) => state.auth);
  const navigate = useNavigate();

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

  const login = async () => {
    dispatch({ type: LOGIN_REQUEST, email, password });
  };

  useEffect(() => {
    if (accessToken) {
      navigate("/");
    }
  }, [accessToken, navigate]);

  useEffect(() => {}, [error]);

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
            <Grid item xs={12} md={6}>
              <Box padding={{ xs: 0, sm: 4, md: 4, lg: 10 }}>
                <Stack gap={3}>
                  <Stack className="flex-row gap-3 items-center">
                    <Image src={logo} alt="logo" sx={{ width: 50 }} />
                    <Typography variant="h6" fontWeight={600}>
                      TDT Learning
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
                  <Divider>Hoặc</Divider>
                  <Stack gap={1}>
                    <TextField
                      sx={styles.textField}
                      label="Email/Tên tài khoản"
                      variant="standard"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                      sx={styles.textField}
                      label="Mật khẩu"
                      variant="standard"
                      type="password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <Stack className="flex-row gap-3 items-center flex-wrap justify-between">
                      <FormControlLabel
                        control={<Checkbox size="small" />}
                        label={
                          <Typography variant="caption">
                            Nhớ mật khẩu
                          </Typography>
                        }
                      />
                      <Link
                        component={RouterLink}
                        to="/forgot-password"
                        variant="caption"
                      >
                        Quên mật khẩu
                      </Link>
                    </Stack>
                  </Stack>
                  <Stack className="flex-row gap-3 items-center flex-wrap ">
                    <Button
                      sx={styles.authBtn}
                      variant="contained"
                      disableElevation
                      onClick={login}
                    >
                      Đăng nhập
                    </Button>
                    <Button
                      sx={styles.authBtn}
                      variant="outlined"
                      onClick={() => navigate("/register")}
                    >
                      Đăng ký
                    </Button>
                  </Stack>
                </Stack>
              </Box>
            </Grid>
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
                className="absolute inset-0"
                sx={{
                  height: "100%",
                  opacity: 0.4,
                  zIndex: 1,
                  background: " linear-gradient(to right, #6190e8, #a7bfe8)",
                }}
              />
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default Login;
