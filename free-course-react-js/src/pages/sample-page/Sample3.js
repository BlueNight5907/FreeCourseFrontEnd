import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const Sample3 = () => {
  return (
    <Grid container>
      <Grid item xs={8}>
        <Box height={2500}></Box>
      </Grid>
      <Grid item xs={4}>
        <div style={{ height: "100%" }}>
          <Box
            sx={{
              position: "sticky",
              backgroundColor: "#000",
              color: "#fff",
              height: 200,
              top: 0,
            }}
          >
            hello
          </Box>
          <Box
            sx={{
              backgroundColor: "#bbb",
              color: "#fff",
              height: 500,
            }}
          >
            hello
          </Box>
        </div>
      </Grid>
    </Grid>
  );
};

export default Sample3;
