import { Box, Paper, Stack } from "@mui/material";
import RenderTable from "components/render-table/RenderTable";
import Wrapper from "components/wrapper/Wrapper";
import React from "react";

const CourseCategory = () => {
  return (
    <Stack gap={1} className="h-full">
      <Wrapper className="grow-0 h-[unset]">Khoa hoc cua toi</Wrapper>
      <Paper className="grow flex flex-col min-h-[700px] p-1">
        <RenderTable
          params={{ page: 1, pageSize: 25 }}
          rowIdField="id"
          getData={async () => ({ totalRows: 0, data: [] })}
          columns={[
            { headerName: "abx", field: "abx" },
            { headerName: "abx", field: "aby" },
            { headerName: "abx", field: "abz" },
          ]}
        />
      </Paper>
    </Stack>
  );
};

export default CourseCategory;
