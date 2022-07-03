import {
  ClearAllRounded,
  TuneRounded,
  ViewList,
  ViewModule,
} from "@mui/icons-material";
import {
  Divider,
  Paper,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";
import Button from "../../../components/button/Button";
import Dropdown from "../../../components/dropdown/Dropdown";
import DropdownItem from "../../../components/dropdown/DropdownItem";
import DropdownMenu from "../../../components/dropdown/DropdownMenu";
import DropdownToggle from "../../../components/dropdown/DropdownToggle";

const sorts = [
  {
    name: "Gần đây nhất",
    value: "createdAt",
    order: "desc",
  },
  {
    name: "Mới cập nhật",
    value: "updatedAt",
    order: "desc",
  },
  {
    name: "Đăng ký nhiều nhất",
    value: "participants",
    order: "desc",
  },
  {
    name: "Tên A - Z",
    value: "title",
    order: "asc",
  },
  {
    name: "Tên Z - A",
    value: "title",
    order: "desc",
  },
];

const ActionBox = (props) => {
  const {
    setOpenFilter,
    view,
    setView,
    updateSort,
    updateOrder,
    total,
    params,
    findCourses,
    clearParams,
  } = props;
  const theme = useTheme();
  const matchSm = useMediaQuery(theme.breakpoints.up("sm"));
  const styles = {
    actionBtn: {
      backgroundColor: theme.palette.foreground.main,
      border: "0.1px solid " + theme.palette.text2.main,
      color: theme.palette.text.main,
      "&:hover": {
        backgroundColor: theme.palette.hover.main,
      },
    },
  };
  const handleViewChange = (event, nextView) => {
    setView((s) => (nextView ? nextView : s));
  };
  return (
    <Paper elevation={0} sx={{ padding: 1 }}>
      <Stack
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Stack flexDirection="row" gap={1}>
          <Button
            sx={styles.actionBtn}
            variant="contained"
            startIcon={<TuneRounded />}
            disableElevation
            onClick={() => setOpenFilter((s) => !s)}
          >
            {matchSm && "Bộ lọc"}
          </Button>
          <Dropdown>
            <DropdownToggle
              variant="contained"
              disableElevation
              sx={{
                ...styles.actionBtn,
                color: (theme) => theme.palette.text.main,
                backgroundColor: (theme) => theme.palette.foreground.main,
                "&:hover": {
                  backgroundColor: (theme) => theme.palette.foreground.main,
                },
              }}
            >
              {
                sorts.find(
                  (item) =>
                    item.value === params.queries.sort &&
                    item.order === params.queries.order
                )?.name
              }
            </DropdownToggle>
            <DropdownMenu
              direction="left"
              disabledPadding
              shadow={8}
              width={{
                md: 200,
                xs: 120,
              }}
            >
              {sorts.map((item, index) => (
                <DropdownItem
                  onClick={() => {
                    updateSort(item.value);
                    updateOrder(item.order);
                  }}
                  square
                  key={index}
                >
                  {item.name}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
          {params?.queries.tags.length > 0 && (
            <Button
              sx={styles.actionBtn}
              variant="contained"
              startIcon={<ClearAllRounded />}
              disableElevation
              onClick={clearParams}
            >
              {matchSm && "Xóa bộ lọc"}
            </Button>
          )}
        </Stack>
        {matchSm && <Typography className="mr-2">{total} kết quả</Typography>}
        {!matchSm && (
          <Button variant="contained" onClick={findCourses}>
            Lọc kết quả
          </Button>
        )}
      </Stack>
      <Divider className="my-2" />
      <Stack
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <ToggleButtonGroup
          orientation="horizontal"
          value={view}
          exclusive
          onChange={handleViewChange}
        >
          <ToggleButton
            sx={{ paddingX: 1, gap: 0.5 }}
            size="small"
            value="list"
            aria-label="list"
          >
            <ViewList />
            {matchSm && " Xem theo danh sách"}
          </ToggleButton>
          <ToggleButton
            sx={{ paddingX: 1, gap: 0.5 }}
            size="small"
            value="grid"
            aria-label="grid"
          >
            <ViewModule />
            {matchSm && " Chế độ xem lưới"}
          </ToggleButton>
        </ToggleButtonGroup>
        {!matchSm && <Typography className="mr-2">{total} kết quả</Typography>}
        {matchSm && (
          <Button variant="contained" onClick={findCourses}>
            Lọc kết quả
          </Button>
        )}
      </Stack>
    </Paper>
  );
};

export default ActionBox;
