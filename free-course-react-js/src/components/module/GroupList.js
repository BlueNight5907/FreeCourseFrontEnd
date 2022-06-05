import * as React from "react";
import { styled } from "@mui/material/styles";
import {
  Accordion as MuiAccordion,
  AccordionSummary as MuiAccordionSummary,
  AccordionDetails as MuiAccordionDetails,
  Typography,
  Box,
  IconButton,
  List,
  ListItemIcon,
  ListItemText,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  ArrowForwardIosSharp,
  AddRounded,
  ArrowUpwardRounded,
  ArrowDownwardRounded,
  MoreVertRounded,
  DriveFileRenameOutline,
  ClearRounded,
} from "@mui/icons-material";
import Module from "./Module";
import Dropdown from "../dropdown/Dropdown";
import DropdownToggle from "../dropdown/DropdownToggle";
import DropdownMenu from "../dropdown/DropdownMenu";
import DropdownItem from "../dropdown/DropdownItem";
import Button from "components/button/Button";
const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  borderRadius: 1,
  backgroundColor: theme.palette.foreground.main,
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharp sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .1)"
      : "rgba(0, 0, 0, .1)",
  borderRadius: theme.spacing(1),
  [theme.breakpoints.up("md")]: {
    padding: theme.spacing(0, 2),
  },
  padding: theme.spacing(0, 1),
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
    color: theme.palette.primary.main,
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(0.5, 0),
}));

export default function GroupList(props) {
  const { editMode } = props;
  const [expanded, setExpanded] = React.useState(false);
  const theme = useTheme();
  const matchMd = useMediaQuery(theme.breakpoints.up("md"));
  const handleChange = () => {
    setExpanded((s) => !s);
  };

  return (
    <Box className="flex flex-col gap-2">
      <Accordion expanded={expanded === true}>
        <AccordionSummary
          sx={{
            minHeight: 55,
          }}
          aria-controls="panel1d-content"
          id="panel1d-header"
        >
          <div className="flex flex-row w-full items-center justify-between">
            <div className="grow h-full flex items-center relative">
              <Typography
                className="absolute left-0 w-full pr-3"
                noWrap
                onClick={() => handleChange()}
              >
                Collapsible Group Item #1 fdskj sfdk jhfdskj hfkdsj hkjvdsh
                ksjdh
              </Typography>
            </div>

            {editMode ? (
              <div className="flex flex-row items-center gap-3">
                {matchMd && (
                  <>
                    <Button disableElevation variant="contained">
                      Thêm bài học
                    </Button>
                    <IconButton onClick={() => console.log("hello")}>
                      <ArrowUpwardRounded />
                    </IconButton>
                    <IconButton>
                      <ArrowDownwardRounded />
                    </IconButton>
                  </>
                )}
                <Dropdown>
                  <DropdownToggle
                    render={({ toggleDropdown }) => {
                      return (
                        <IconButton onClick={toggleDropdown}>
                          <MoreVertRounded />
                        </IconButton>
                      );
                    }}
                  />
                  <DropdownMenu direction="right" width={300} shadow={10}>
                    <DropdownItem>
                      <ListItemIcon>
                        <ArrowUpwardRounded />
                      </ListItemIcon>
                      <ListItemText>Di chuyển lên trên</ListItemText>
                    </DropdownItem>
                    <DropdownItem>
                      <ListItemIcon>
                        <ArrowDownwardRounded />
                      </ListItemIcon>
                      <ListItemText>Di chuyển xuống dưới</ListItemText>
                    </DropdownItem>
                    <DropdownItem>
                      <ListItemIcon>
                        <AddRounded />
                      </ListItemIcon>
                      <ListItemText>Thêm một module mới</ListItemText>
                    </DropdownItem>
                    <DropdownItem>
                      <ListItemIcon>
                        <DriveFileRenameOutline />
                      </ListItemIcon>
                      <ListItemText>Chỉnh sửa</ListItemText>
                    </DropdownItem>
                    <DropdownItem>
                      <ListItemIcon>
                        <ClearRounded />
                      </ListItemIcon>
                      <ListItemText>Xóa nhóm module</ListItemText>
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
            ) : (
              <Typography>8 bài học</Typography>
            )}
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <List disablePadding>
            <Module type="video" title="Hello world" />
            <Module type="default" title="Hello world" />
            <Module type="test" title="Hello world" />
            <Module type="document" title="Hello world" />
          </List>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}
