import { Edit } from "@mui/icons-material";
import { Box, Chip, Paper, Stack, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Button from "components/button/Button";
import LearningProgress from "components/learning-progress/LearningProgress";
import RenderTable from "components/render-table/RenderTable";
import DeleteAction from "pages/manage-course/course-dashboard/table-cell/delete-action";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { GET_ALL_STUDENT_REQUEST } from "store/types/data-types/course-detail-types";
import ViewStudentAction from "../table-cell/ViewStudentAction";
const columns = [
  {
    field: "fullName",
    headerName: "Họ và tên",
    minWidth: 150,
    flex: 1,
  },
  {
    field: "registerDay",
    headerName: "Ngày đăng kí",
    minWidth: 100,
    flex: 1,
  },
  {
    field: "endDate",
    headerName: "Ngày học gần nhất",
    minWidth: 150,
    flex: 1,
  },
  {
    field: "studentId",
    headerName: "Mã học sinh",
    minWidth: 110,
    flex: 1,
  },
  {
    field: "learningProgress",
    headerName: "Tiến độ học tập",
    minWidth: 200,
    flex: 2,
    renderCell: (params) => (
      <LearningProgress
        total={params.row.total}
        learned={params.row.learned}
        showLabel
        variant="determinate"
      />
    ),
  },
  {
    field: "status",
    headerName: "Trạng thái",
    minWidth: 150,
    flex: 1,
    renderCell: (params) => (
      <Chip color="primary" variant="outlined" label={params.row.status} />
    ),
  },
  {
    field: "action",
    headerName: "Action",
    minWidth: 300,
    flex: 1,
    renderCell: (params) => (
      <Box>
        <ViewStudentAction params={params} />
      </Box>
    ),
  },
];

const Student = () => {
  const [students, setStudents] = useState([]);
  const [total, setTotal] = useState(0);
  const { courseDetail } = useSelector((state) => state.courseDetail);
  const dispatch = useDispatch();

  useEffect(() => {
    if (courseDetail) {
      dispatch({
        type: GET_ALL_STUDENT_REQUEST,
        courseId: courseDetail._id,
        callback: (data) => {
          setStudents(data);
          setTotal(data?.length || 0);
        },
      });
    }
  }, [courseDetail, dispatch]);

  const getData = useCallback(
    async ({ page, page_size }) => {
      page = page + 1;
      const allSteps = courseDetail?.modules.reduce((steps, module) => {
        return [...steps, ...module.steps] || [];
      }, []);
      const data = students
        .filter(
          (_, index) =>
            index < page * page_size && index >= (page - 1) * page_size
        )
        .map((item) => {
          return {
            _id: item._id,
            registerDay: new Date(
              item.learningProccess.createdAt
            ).toLocaleDateString(),
            endDate: new Date(
              item.learningProccess.updatedAt
            ).toLocaleDateString(),
            learned: item.learningProccess.learned.length,
            total: allSteps.length,
            status:
              item.learningProccess.learned.length === allSteps.length
                ? "Hoàn thành"
                : "Chưa hoàn thành",
            fullName: item.userInformation.fullName,
            studentId: item.userInformation.sid,
            data: item,
            avatar: item.userInformation.avatar,
            desc: item.userInformation.desc,
          };
        });

      console.log({ total, data, students, page, page_size });
      return { total, data };
    },
    [students, total]
  );

  return (
    <Stack gap={1} className="h-full">
      <Paper className="grow flex flex-col min-h-[700px] p-1">
        <RenderTable
          rowIdField="_id"
          params={{ page: 0, page_size: 10 }}
          getData={getData}
          columns={columns}
          rowsPerPageOptions={[10, 20, 50]}
          disableSelectionOnClick
        />
      </Paper>
    </Stack>
  );
};

export default Student;
