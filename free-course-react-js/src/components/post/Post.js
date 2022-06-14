import { Grid, Paper, useTheme } from "@mui/material";
import React from "react";

const Post = (props) => {
    const {} = props;
    const theme = useTheme();

    return (
        <Paper sx={{ padding: 1 }} elevation={0}>
            <Grid container spacing={1}>
                <Grid item xs={12}>

                </Grid>
            </Grid>
        </Paper>
    );
};

export default Post;