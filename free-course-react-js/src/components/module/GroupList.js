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
  Button,
  TextField,
  Stack,
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
import ConfirmDialog from "components/dialog/confirm-dialog";
import Dialog from "components/dialog/dialog";
import StepFormDialog from "containers/step-form/step-form-dialog";
import { maxLines } from "utils/classUltis";
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
  const {
    editMode,
    data,
    index,
    move,
    remove,
    update,
    learnLayout,
    isEnded,
    stepProps,
    createStep,
  } = props;
  const [expanded, setExpanded] = React.useState(!!learnLayout);
  const [openConfirm, setOpenConfirm] = React.useState(false);
  const [openEditDialog, setOpenEditDialog] = React.useState(false);
  const [openStepForm, setOpenStepForm] = React.useState(false);
  const [value, setValue] = React.useState(data.name || "");
  const theme = useTheme();
  const matchMd = useMediaQuery(theme.breakpoints.up("md"));
  const handleChange = () => {
    setExpanded((s) => !s);
  };
  const movePrev = () => move(index, index - 1);
  const moveNext = () => move(index, index + 1);

  const deleteItem = () => {
    remove(data);
  };

  React.useEffect(() => {
    setValue(data.name);
  }, [data]);

  return (
    <>
      <Box className="flex flex-col gap-2">
        <Accordion
          expanded={expanded === true}
          {...(!editMode && { onChange: handleChange })}
        >
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
                  variant="body2"
                  className="absolute left-0 w-full pr-3 whitespace-pre-wrap"
                  sx={maxLines(2)}
                  {...(editMode && { onClick: handleChange })}
                >
                  {`${index + 1}.  ${data.name}`}
                </Typography>
              </div>

              {editMode ? (
                <div className="flex flex-row items-center gap-3">
                  {matchMd && (
                    <>
                      <Button
                        disableElevation
                        variant="contained"
                        onClick={() => {
                          createStep();
                          setOpenStepForm(true);
                        }}
                      >
                        Thêm bài học
                      </Button>
                      <IconButton disabled={index === 0} onClick={movePrev}>
                        <ArrowUpwardRounded />
                      </IconButton>
                      <IconButton onClick={moveNext} disabled={isEnded}>
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
                      <DropdownItem disabled={index === 0} onClick={movePrev}>
                        <ListItemIcon>
                          <ArrowUpwardRounded />
                        </ListItemIcon>
                        <ListItemText>Di chuyển lên trên</ListItemText>
                      </DropdownItem>
                      <DropdownItem onClick={moveNext} disabled={isEnded}>
                        <ListItemIcon>
                          <ArrowDownwardRounded />
                        </ListItemIcon>
                        <ListItemText>Di chuyển xuống dưới</ListItemText>
                      </DropdownItem>
                      <DropdownItem onClick={() => setOpenStepForm(true)}>
                        <ListItemIcon>
                          <AddRounded />
                        </ListItemIcon>
                        <ListItemText>Thêm một bài học mới</ListItemText>
                      </DropdownItem>
                      <DropdownItem onClick={() => setOpenEditDialog(true)}>
                        <ListItemIcon>
                          <DriveFileRenameOutline />
                        </ListItemIcon>
                        <ListItemText>Chỉnh sửa</ListItemText>
                      </DropdownItem>
                      <DropdownItem onClick={() => setOpenConfirm(true)}>
                        <ListItemIcon>
                          <ClearRounded />
                        </ListItemIcon>
                        <ListItemText>Xóa nhóm module</ListItemText>
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </div>
              ) : (
                <Typography variant="body2">
                  {data.steps?.length || 0} bài học
                </Typography>
              )}
            </div>
          </AccordionSummary>
          <AccordionDetails>
            <List disablePadding>
              {data.steps?.map((item, index) => (
                <Module
                  editMode={editMode}
                  key={index}
                  type={item.type}
                  title={item.name}
                  id={item.id}
                  courseId={data.courseId}
                  moduleId={data.id}
                  href={item.href}
                  time={item.time}
                  active={item.active}
                  disabled={item.disabled}
                  setOpenStepForm={setOpenStepForm}
                  {...stepProps}
                />
              ))}
            </List>
          </AccordionDetails>
        </Accordion>
      </Box>
      <ConfirmDialog
        deleted
        open={openConfirm}
        setOpen={setOpenConfirm}
        title="Xóa chủ đề khóa học"
        onAccept={deleteItem}
      >
        <Typography>
          Bạn có chắc muốn xóa chương{" "}
          <Typography component="span" fontWeight={500} color="error.light">
            {data.name}
          </Typography>{" "}
          ?
        </Typography>
      </ConfirmDialog>
      <Dialog
        open={openEditDialog}
        setOpen={setOpenEditDialog}
        title="Thay đổi chủ đề khóa học"
        actions={
          <Stack className="flex-row justify-end gap-2">
            <Button
              sx={{ height: 42 }}
              onClick={() => {
                setOpenEditDialog(false);
                setValue(data.name);
              }}
            >
              Hủy
            </Button>
            <Button
              sx={{ height: 42 }}
              variant="contained"
              disableElevation
              disabled={value.length === 0}
              onClick={() => {
                setOpenEditDialog(false);
                update({ ...data, name: value });
              }}
            >
              Lưu lại
            </Button>
          </Stack>
        }
      >
        <TextField
          className="mt-3"
          label="Chủ đề khóa học(*)"
          value={value}
          fullWidth
          onChange={(e) => setValue(e.target.value)}
        />
      </Dialog>
      <StepFormDialog
        open={openStepForm}
        setOpen={setOpenStepForm}
        moduleData={data}
      />
    </>
  );
}
