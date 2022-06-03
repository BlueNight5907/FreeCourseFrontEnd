import { Alert, Box, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { DataGrid } from "@mui/x-data-grid";

function RenderTable(props) {
  const {
    width,
    height,
    onSelection,
    params,
    rowIdField,
    getData,
    columns,
    rowsPerPageOptions = [15, 25, 50],
  } = props;
  const [selected, setSelected] = useState([]);
  const [searchParams, setSearchParams] = useState(params);
  const [totalRows, setTotalRows] = useState(0);
  const [rows, setRows] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    setSearchParams(params);
  }, [params]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data, totalRows } = await getData(searchParams);
        setTotalRows(totalRows);
        setRows(data);
        setError("");
      } catch (error) {
        setTotalRows(0);
        setRows([]);
        setError(error.message);
      }
    };
    fetch();
  }, [getData, searchParams]);

  useEffect(() => {
    onSelection && onSelection(selected);
  }, [onSelection, selected]);

  return (
    <Box width={width} flexGrow={1} height={height}>
      <DataGrid
        columns={columns || []}
        rows={rows}
        {...(onSelection && {
          checkboxSelection: true,
          selectionModel: selected,
          onSelectionModelChange: (selectRange) =>
            setSelected([...selectRange]),
        })}
        sx={{
          "& .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-columnHeader:focus-within":
            {
              outlineOffset: -2,
            },
        }}
        page={searchParams.page}
        onPageChange={(value) =>
          setSearchParams({ ...searchParams, page: value })
        }
        components={{
          NoRowsOverlay: () => (
            <Stack className="justify-center items-center absolute inset-0">
              {error ? (
                <Alert severity="error"> {error}</Alert>
              ) : (
                <Alert severity="warning">
                  Không có dữ liệu - Vui lòng thử lại sau!!
                </Alert>
              )}
            </Stack>
          ),
        }}
        componentsProps={{
          baseSelect: { sx: { "& .MuiInput-input": { height: 40 } } },
          baseTextField: { sx: { "& .MuiInput-input": { height: 40 } } },
        }}
        pageSize={searchParams.pageSize}
        onPageSizeChange={(pageSize) =>
          setSearchParams({ ...searchParams, pageSize: pageSize })
        }
        rowsPerPageOptions={rowsPerPageOptions}
        rowCount={totalRows}
        getRowId={(row) => {
          if (row[rowIdField]) return row[rowIdField];
          return row.id ? row.id : row[Object.keys(row)[0]];
        }}
      />
    </Box>
  );
}

RenderTable.propTypes = {
  width: PropTypes.any,
  height: PropTypes.any,
  onSelection: PropTypes.func,
  params: PropTypes.shape({
    page: PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired,
  }),
  rowIdField: PropTypes.string.isRequired,
  getData: PropTypes.func.isRequired,
  columns: PropTypes.array.isRequired,
  rowsPerPageOptions: PropTypes.array,
};

export default RenderTable;
