import {
  Box,
  Collapse,
  Paper,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import Button from "components/button/Button";
import {
  AddCircleOutline,
  AddTask,
  FormatListNumbered,
  SettingsApplications,
} from "@mui/icons-material";
import GroupList from "components/module/GroupList";

const AddModuleForm = ({ open }) => {
  const theme = useTheme();
  return (
    <Collapse in={open}>
      <Paper
        sx={{ bgcolor: theme.palette.background.main, p: 1 }}
        elevation={0}
      >
        <Typography gutterBottom>Tạo chủ đề khóa học</Typography>
        <TextField
          label="Tên module(*)"
          helperText="Vd: Cấu trúc dữ liệu và giải thuật, ..."
          variant="outlined"
          fullWidth
          InputProps={{ sx: { bgcolor: "foreground.main" } }}
        />
        <Stack className="flex-row justify-end" gap={1}>
          <Button disableElevation variant="outlined">
            Hủy bỏ
          </Button>
          <Button
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

function ModuleForm() {
  const [editMode, setEditMode] = useState(false);
  const [addModule, setAddModule] = useState(false);
  return (
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
      </Stack>
      <AddModuleForm open={addModule} />
      <Box pt={1}>
        <Typography className="ml-2 font-medium flex flex-row items-center gap-1">
          <FormatListNumbered /> Danh sách các Module
        </Typography>
        <Stack className="w-full mt-4" gap={1} mb={32}>
          {Array(12)
            .fill(0)
            .map((_, index) => (
              <GroupList key={index} editMode={editMode} />
            ))}
        </Stack>
      </Box>
    </Box>
  );
}

export default ModuleForm;
