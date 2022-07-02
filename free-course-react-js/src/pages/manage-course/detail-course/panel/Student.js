import { Edit } from "@mui/icons-material";
import { Box, Paper, Stack, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Button from "components/button/Button";
import LearningProgress from "components/learning-progress/LearningProgress";
import DeleteAction from "pages/manage-course/course-dashboard/table-cell/delete-action";
import React from "react";
import { Link } from "react-router-dom";
import ViewStudentAction from "../table-cell/ViewStudentAction";

const Student = () => {
  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "studentName",
      headerName: "Họ và tên",
      width: 150,
      editable: true,
    },
    {
      field: "registerDay",
      headerName: "Ngày đăng kí",
      width: 100,
      editable: true,
    },
    {
      field: "endDay",
      headerName: "Ngày kết thúc",
      width: 100,
      editable: true,
    },
    {
      field: "studentId",
      headerName: "mã học sinh",
      width: 110,
      editable: true,
    },
    {
      field: "learningProgress",
      headerName: "Tiến độ học tập",
      width: 200,
      renderCell: (params) => (
        <LearningProgress
          total={params.row.learningProgress.total}
          learned={params.row.learningProgress.learned}
          showLabel
          variant="determinate"
        />
      ),
    },
    {
      field: "status",
      headerName: "Trạng thái",
      width: 150,
      renderCell: (params) => (
        <Button variant="contained">{params.row.status}</Button>
      ),
    },
    {
      field: "action",
      headerName: "Action",
      width: 300,
      renderCell: (params) => (
        <Box>
          <ViewStudentAction params={params} />
          <Link to={{ pathname: "/manage-course/edit/" + params.row.id }}>
            <Button
              style={{ marginLeft: 16 }}
              variant="contained"
              startIcon={<Edit />}
            />
          </Link>
          <DeleteAction params={params} />
        </Box>
      ),
    },
  ];

  const rows = [
    {
      id: 1,
      studentName: "Snow",
      registerDay: "Jon",
      endDay: 35,
      studentId: "51900707",
      learningProgress: {
        total: 20,
        learned: 13,
      },
      status: "Đang học",
    },
    {
      id: 2,
      studentName: "Snow",
      registerDay: "Jon",
      endDay: 35,
      studentId: "51900707",
      learningProgress: {
        total: 20,
        learned: 13,
      },
      status: "Hoàn thành",
    },
    {
      id: 3,
      studentName: "Snow",
      registerDay: "Jon",
      endDay: 35,
      studentId: "51900707",
      learningProgress: {
        total: 20,
        learned: 13,
      },
      status: "Đang học",
    },
    {
      id: 4,
      studentName: "Snow",
      registerDay: "Jon",
      endDay: 35,
      studentId: "51900707",
      learningProgress: {
        total: 20,
        learned: 13,
      },
      status: "Đang học",
    },
    {
      id: 5,
      studentName: "Snow",
      registerDay: "Jon",
      endDay: 35,
      studentId: "51900707",
      learningProgress: {
        total: 20,
        learned: 13,
      },
      status: "Hoàn thành",
    },
  ];
  return (
    <Stack gap={1} className="h-full">
      <Paper className="grow flex flex-col min-h-[700px] p-1">
        <Typography fontWeight={500}> Danh sách học sinh </Typography>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          disableSelectionOnClick
        />
      </Paper>
    </Stack>
  );
};

export default Student;
