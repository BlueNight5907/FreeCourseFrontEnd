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

const ActionBox = (props) => {
  const { setOpenFilter, view, setView } = props;
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
              Gần đây nhất
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
              <DropdownItem square>Gần đây nhất</DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <Button
            sx={styles.actionBtn}
            variant="contained"
            startIcon={<ClearAllRounded />}
            disableElevation
          >
            {matchSm && "Hủy bộ lọc"}
          </Button>
        </Stack>
        {matchSm && <Typography className="mr-2">610 kết quả</Typography>}
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
        {!matchSm && <Typography className="mr-2">610 kết quả</Typography>}
      </Stack>
    </Paper>
  );
};

export default ActionBox;
