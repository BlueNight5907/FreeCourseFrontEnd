import {
  Box,
  Collapse,
  Paper,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Button from "components/button/Button";
import {
  AddCircleOutline,
  AddTask,
  FormatListNumbered,
  SettingsApplications,
} from "@mui/icons-material";
import GroupList from "components/module/GroupList";
import * as yup from "yup";
import {
  FormProvider,
  useFieldArray,
  useForm,
  useFormContext,
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { ADD_NEW_MODULE_REQUEST } from "store/types/data-types/manage-course-types";

const modulesSchema = yup.object().shape({
  modules: yup.array(
    yup.object({
      name: yup.string().max(255).required("Đây là trường bắt buộc !!!"),
      steps: yup.array(
        yup.object({
          name: yup.string().max(255).required("Đây là trường bắt buộc !!!"),
          type: yup.string().max(255).required("Đây là trường bắt buộc !!!"),
        })
      ),
    })
  ),
});

const AddModuleForm = ({ open }) => {
  const theme = useTheme();
  const [value, setValue] = useState("");
  const { control } = useFormContext();
  const { append } = useFieldArray({ control, name: "modules" });
  const dispatch = useDispatch();
  const { courseData } = useSelector((state) => state.manageCourse);
  const resetValue = () => setValue("");

  const addNew = () => {
    dispatch({
      type: ADD_NEW_MODULE_REQUEST,
      body: { title: value },
      courseId: courseData._id,
    });
    append({
      name: value,
      steps: [],
    });
    resetValue();
  };

  return (
    <Collapse in={open}>
      <Paper
        sx={{ bgcolor: theme.palette.background.main, p: 1 }}
        elevation={0}
      >
        <Typography gutterBottom>Tạo chủ đề khóa học</Typography>
        <TextField
          label="Tên module(*)"
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

const ModuleList = ({ editMode }) => {
  const { control, getValues } = useFormContext();
  const { swap, move, remove, update } = useFieldArray({
    control,
    name: "modules",
  });
  const fields = getValues("modules");
  return (
    <Stack className="w-full mt-4" gap={1} mb={32}>
      {fields?.map((item, index) => (
        <GroupList
          key={index}
          isEnded={index === fields.length - 1}
          editMode={editMode}
          move={move}
          remove={remove}
          update={update}
          index={index}
          data={item}
        />
      ))}
    </Stack>
  );
};

function ModuleForm({ modules, setModules }) {
  const [editMode, setEditMode] = useState(false);
  const [addModule, setAddModule] = useState(false);

  const methods = useForm({
    mode: "onChange",
    resolver: yupResolver(modulesSchema),
    defaultValues: { modules: modules },
  });

  const onSubmit = async (data) => console.log(data);

  useEffect(() => {
    const subscription = methods.watch((value) => {
      setModules(value.modules);
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [methods, setModules]);

  const fields = methods.getValues("modules");

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Box className="flex h-full flex-col" gap={2}>
          <Stack className="flex-row" gap={2} px={1}>
            <Button
              disableElevation
              onClick={() => setAddModule((s) => !s)}
              startIcon={<AddTask />}
              variant={addModule ? "contained" : "outlined"}
            >
              Thêm Module
            </Button>
            <Button
              disableElevation
              startIcon={<SettingsApplications />}
              onClick={() => setEditMode((s) => !s)}
              variant={editMode ? "contained" : "outlined"}
            >
              Chỉnh sửa
            </Button>

            <Button type="submit" variant="contained" onClick={() => {}}>
              Submit
            </Button>
          </Stack>
          <AddModuleForm open={addModule} />
          <Box pt={1}>
            <Typography className="ml-2 font-medium flex flex-row items-center gap-1">
              <FormatListNumbered /> Danh sách các Module
            </Typography>
            <ModuleList editMode={editMode} />
          </Box>
        </Box>
      </form>
    </FormProvider>
  );
}

export default ModuleForm;
