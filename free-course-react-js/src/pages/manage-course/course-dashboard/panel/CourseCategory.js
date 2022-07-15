import { Box, Chip, Paper, Stack } from "@mui/material";
import RenderTable from "components/render-table/RenderTable";
import React, { useCallback, useMemo } from "react";
import { Link } from "react-router-dom";
import { Visibility, Edit } from "@mui/icons-material";
import Button from "components/button/Button";
import DeleteAction from "../table-cell/delete-action";
import { GET_MY_CREATED_COURSES_REQUEST } from "store/types/data-types/manage-course-types";
import { useDispatch } from "react-redux";
import { getRandomItem } from "utils/array-utils";
import colors from "utils/colors";
import Image from "components/image/Image";

const ListTag = ({ row }) => {
  const colorArr = useMemo(
    () => row.tags?.map((item) => getRandomItem(colors)),
    [row.tags]
  );
  return (
    <Stack direction="row" gap={0.5}>
      {row.tags?.map((tag, index) => (
        <Chip
          key={index}
          sx={{ color: "#fff", backgroundColor: colorArr[index] }}
          label={tag.name}
        />
      ))}
    </Stack>
  );
};

const columns = [
  {
    headerName: "Ảnh nền",
    field: "background",
    width: 210,
    renderCell: ({ row }) => (
      <Image className="aspect-video w-full p-2" src={row.background} />
    ),
  },
  {
    headerName: "Tên khóa học",
    field: "title",
    width: 350,
  },
  {
    headerName: "Danh mục",
    field: "category",
    valueGetter: ({ row }) => row.category?.name,
    width: 180,
    editable: true,
  },
  {
    headerName: "Cấp độ",
    field: "level",
    valueGetter: ({ row }) => row.level?.name,
    width: 130,
    editable: true,
  },
  {
    headerName: "Nhãn",
    field: "tag",
    sortable: false,
    flex: 1,
    minWidth: 320,
    renderCell: ListTag,
  },
  {
    headerName: "Học viên",
    field: "participants",
    valueGetter: ({ row }) => row.participants.length,
    type: "number",
  },
  {
    headerName: "Hành động",
    field: "action",
    width: 250,
    renderCell: (params) => (
      <Box>
        <Link to={"/manage-course/detail-course/" + params.row._id}>
          <Button variant="contained" startIcon={<Visibility />} />
        </Link>
        <Link to={{ pathname: "/manage-course/edit/" + params.row._id }}>
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

const CourseCategory = () => {
  const dispatch = useDispatch();

  const getData = useCallback(async () => {
    const { data, total: totalRows } = await new Promise((resolve, reject) => {
      try {
        dispatch({
          type: GET_MY_CREATED_COURSES_REQUEST,
          callback: (data) => resolve(data),
        });
      } catch (error) {
        reject(error);
      }
    });
    console.log({ data, totalRows });
    return { data, totalRows };
  }, [dispatch]);

  const params = useMemo(() => ({ page: 0, page_size: 10 }), []);
  return (
    <Stack gap={1} className="h-full">
      <Paper className="grow flex flex-col min-h-[700px] p-1">
        <RenderTable
          params={params}
          columns={columns}
          rowIdField="_id"
          rowHeight={100}
          rowsPerPageOptions={[10, 25, 50]}
          getData={getData}
        />
      </Paper>
    </Stack>
  );
};

export default CourseCategory;
