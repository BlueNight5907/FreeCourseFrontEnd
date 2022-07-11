import {
  Box,
  Collapse,
  Paper,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useMemo, useState } from "react";
import Button from "components/button/Button";
import {
  AddCircleOutline,
  AddTask,
  FormatListNumbered,
  SettingsApplications,
} from "@mui/icons-material";
import GroupList from "components/module/GroupList";
import { useFieldArray, useFormContext } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_NEW_MODULE_REQUEST,
  CREATE_NEW_STEP,
  DELETE_LESSON_REQUEST,
  EDIT_MODULE_REQUEST,
  GET_LESSON_DATA_REQUEST,
  REMOVE_MODULE_REQUEST,
  UPDATE_LESSON_REQUEST,
} from "store/types/data-types/manage-course-types";

const AddModuleForm = ({ open }) => {
  const theme = useTheme();
  const [value, setValue] = useState("");
  const dispatch = useDispatch();
  const { courseData } = useSelector((state) => state.manageCourse);
  const resetValue = () => setValue("");

  const addNew = () => {
    if (courseData) {
      dispatch({
        type: ADD_NEW_MODULE_REQUEST,
        body: { title: value },
        courseId: courseData._id,
        callback: resetValue,
      });
    }
  };

  return (
    <Collapse in={open}>
      <Paper
        sx={{ bgcolor: theme.palette.background.main, p: 1 }}
        elevation={0}
      >
        <Typography gutterBottom>Tạo chủ đề khóa học</Typography>
        <TextField
          label="Tên chương(*)"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          helperText="Vd: Cấu trúc dữ liệu và giải thuật, ..."
          variant="outlined"
          fullWidth
          InputProps={{ sx: { bgcolor: "foreground.main" } }}
        />
        <Stack className="flex-row justify-end" gap={1}>
          <Button disableElevation variant="outlined" onClick={resetValue}>
            Hủy bỏ
          </Button>
          <Button
            onClick={addNew}
            disabled={value.length === 0}
            disableElevation
            startIcon={<AddCircleOutline />}
            variant="contained"
          >
            Lưu
          </Button>
        </Stack>
      </Paper>
    </Collapse>
  );
};

const ModuleList = ({ editMode, modules }) => {
  const { control, getValues } = useFormContext();
  const dispatch = useDispatch();
  const { swap, move } = useFieldArray({
    control,
    name: "modules",
  });
  const update = (module) => {
    const { id: moduleId, name: title, courseId } = module;
    dispatch({ type: EDIT_MODULE_REQUEST, moduleId, courseId, title });
  };
  const remove = (module) => {
    const { id: moduleId, courseId } = module;
    dispatch({ type: REMOVE_MODULE_REQUEST, moduleId, courseId });
  };

  const stepProps = useMemo(
    () => ({
      getStepData: (moduleId, stepId) => {
        dispatch({ type: GET_LESSON_DATA_REQUEST, moduleId, stepId });
      },
      deleteStep: (courseId, moduleId, stepId) => {
        dispatch({ type: DELETE_LESSON_REQUEST, moduleId, stepId, courseId });
      },
      updateStep: (moduleId, stepId, body) => {
        dispatch({ type: UPDATE_LESSON_REQUEST, moduleId, stepId, body });
      },
    }),
    [dispatch]
  );

  const fields = getValues("modules");
  return (
    <Stack className="w-full mt-4" gap={1} mb={32}>
      {modules?.map((item, index) => (
        <GroupList
          key={index}
          isEnded={index === fields.length - 1}
          editMode={editMode}
          move={move}
          createStep={() => {
            dispatch({ type: CREATE_NEW_STEP });
          }}
          remove={remove}
          update={update}
          index={index}
          data={item}
          stepProps={stepProps}
        />
      ))}
    </Stack>
  );
};

function ModuleForm() {
  const [editMode, setEditMode] = useState(false);
  const [addModule, setAddModule] = useState(false);
  const { modules } = useSelector((state) => state.manageCourse);

  const courseModules = useMemo(() => {
    if (!modules) {
      return [];
    }
    return modules.reduce((arr, module) => {
      const name = module.title;
      const id = module._id;
      const courseId = module.courseId;
      const steps = module.steps.map((step) => ({
        name: step.title,
        id: step._id,
        href: editMode
          ? `/manage-course/learning/${module.courseId}/${step._id}`
          : "./",
        type: step.type === "lesson" ? "video" : "test",
        time: step.time,
      }));
      arr.push({ id, name, steps, courseId });
      return arr;
    }, []);
  }, [modules, editMode]);

  return (
    <Box className="flex h-full flex-col" gap={2}>
      <Stack className="flex-row" gap={2} px={1}>
        <Button
          disableElevation
          onClick={() => setAddModule((s) => !s)}
          startIcon={<AddTask />}
          variant={addModule ? "contained" : "outlined"}
        >
          Thêm Chương
        </Button>
        <Button
          disableElevation
          startIcon={<SettingsApplications />}
          onClick={() => setEditMode((s) => !s)}
          variant={editMode ? "contained" : "outlined"}
        >
          Chỉnh sửa
        </Button>
      </Stack>
      <AddModuleForm open={addModule} />
      <Box pt={1}>
        <Typography className="ml-2 font-medium flex flex-row items-center gap-1">
          <FormatListNumbered /> Danh sách các chương
        </Typography>
        <ModuleList editMode={editMode} modules={courseModules} />
      </Box>
    </Box>
  );
}

export default ModuleForm;
