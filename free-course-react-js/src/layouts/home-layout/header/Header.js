import {
  Alert,
  Box,
  ButtonBase,
  Container,
  IconButton,
  InputBase,
  Paper,
  Stack,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import MiniSearch from "../../../components/search/MiniSearch";
import MyCourseDropdown from "../../../containers/dropdowns/my-courses-dropdown/MyCoursesDropdown";
import UserDropdown from "../../../containers/dropdowns/user-dropdown/UserDropdown";
import { AppBar } from "../styled-components";
import {
  ArrowBackIosRounded,
  Menu,
  TravelExploreRounded,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import {
  SET_GO_BACK_NAV_BAR,
  TOGGLE_HOME_DRAWER,
} from "../../../store/types/page-types/setting-types";
import Button from "../../../components/button/Button";
import { Link, useNavigate } from "react-router-dom";
import Dialog from "components/dialog/dialog";
import { GET_SEARCH_REQUEST } from "store/types/data-types/category-types";
import CourseCard from "./course-card/CourseCard";

const MS = "Rất tiếc, hiện tại không tim thấy khóa học nào";

const Header = () => {
  const dispatch = useDispatch();
  const { goBack, headerTitle } = useSelector((state) => state.setting);
  const [openSearch, setOpenSearch] = useState(false);
  const [message, setMessage] = useState("");
  const theme = useTheme();
  const [value, setValue] = useState("");
  const [courses, setCourses] = useState([]);
  const matchSm = useMediaQuery(theme.breakpoints.up("sm"));
  const matchMd = useMediaQuery(theme.breakpoints.up("md"));
  const matchLg = useMediaQuery(theme.breakpoints.up("lg"));
  const navigate = useNavigate();

  const styles = {
    header: {
      backgroundColor: theme.palette.foreground.main,
    },
    title: {
      fontSize: 20,
      fontWeight: 500,
      color: (theme) => theme.palette.text.main,
    },
    menu: {
      width: 50,
      height: 50,
      mr: 2,
      color: theme.palette.primary.main,
      borderRadius: 1,
    },
    span: {
      fontSize: 16,
      fontWeight: 500,
      color: (theme) => theme.palette.text.main,
    },
  };

  useEffect(() => {
    if (!value) {
      setCourses([]);
    }
  }, [value]);

  useEffect(() => {
    if (!openSearch) {
      setCourses([]);
      setValue("");
    }
  }, [openSearch]);

  const toggleDrawer = () => {
    dispatch({ type: TOGGLE_HOME_DRAWER });
  };

  const handleGoBack = () => {
    dispatch({ type: SET_GO_BACK_NAV_BAR, payload: { value: false } });
    navigate(-1);
  };

  const searchCourse = () => {
    setMessage("");
    dispatch({
      type: GET_SEARCH_REQUEST,
      search: value,
      callback: (data) => {
        setCourses(data);
        if (data.length === 0) {
          setMessage(MS);
        }
      },
    });
  };

  return (
    <>
      <AppBar
        sx={styles.header}
        elevation={4}
        className="app-bar"
        position="fixed"
        matchMd={matchMd}
      >
        <Toolbar
          sx={{
            padding: {
              xs: theme.spacing(0, 1),
              md: theme.spacing(0, 3),
            },
            justifyContent: "space-between",
          }}
        >
          <ButtonBase sx={styles.menu} onClick={toggleDrawer}>
            <Menu fontSize="large" />
          </ButtonBase>

          {matchSm ? (
            goBack ? (
              <div className="grow">
                <Button
                  startIcon={<ArrowBackIosRounded />}
                  onClick={handleGoBack}
                >
                  Quay lại
                </Button>
              </div>
            ) : (
              <Typography variant="h2" sx={styles.title} className="title grow">
                {headerTitle}
              </Typography>
            )
          ) : null}

          <Box className="right-app-bar flex flex-row items-center md:gap-4 sm:gap-2">
            {matchLg && (
              <MiniSearch
                title="Tìm kiếm ..."
                onClick={() => {
                  setOpenSearch(true);
                }}
              />
            )}
            {!matchLg && (
              <IconButton
                sx={{
                  width: 45,
                  height: 45,
                }}
                onClick={() => {
                  setOpenSearch(true);
                }}
              >
                <TravelExploreRounded />
              </IconButton>
            )}

            {matchSm && <MyCourseDropdown />}
            <UserDropdown />
          </Box>
        </Toolbar>
      </AppBar>
      <Dialog
        title="Tìm kiếm"
        fullScreen
        open={openSearch}
        setOpen={setOpenSearch}
        PaperProps={{
          sx: {
            backgroundColor: theme.palette.background.main,
            "& .MuiDialogContent-root": { padding: 0 },
          },
        }}
      >
        <Container>
          <Paper
            sx={{
              padding: 1,
              borderRadius: 2,
              display: "flex",
              alignItems: "center",
            }}
            elevation={0}
          >
            <InputBase
              placeholder="Tìm kiếm..."
              value={value}
              onChange={(e) => setValue(e.target.value)}
              sx={{
                p: theme.spacing(0.5, 2),
                flexGrow: 1,
              }}
            />
            <Button
              variant="contained"
              disabled={!value}
              onClick={searchCourse}
            >
              Tìm kiếm
            </Button>
          </Paper>
          {courses.length > 0 && (
            <Paper sx={{ p: 1, mt: 2 }} elevation={0}>
              <Stack gap={0.5}>
                {courses.map((course, index) => (
                  <CourseCard
                    data={course}
                    key={index}
                    setOpenSearch={setOpenSearch}
                  />
                ))}
              </Stack>
            </Paper>
          )}
          {message && (
            <Paper>
              <Alert variant="outlined" severity="error" className="mt-5">
                {message}
              </Alert>
            </Paper>
          )}
        </Container>
      </Dialog>
    </>
  );
};

export default Header;
