import {
    ClearAllRounded,
    ExpandMore,
    Filter,
    TuneRounded,
    ViewList,
    ViewModule,
} from "@mui/icons-material";
import {
    Container,
    Grid,
    Stack,
    Typography,
    useTheme,
    useMediaQuery,
    Pagination,
    Paper,
    Box,
} from "@mui/material";
import React from "react";
import Button from "../../components/button/Button";
//   import CourseCard from "./course-card/CourseCard";
//   import ActionBox from "./action-box/ActionBox";
//   import CategoryFilter from "./filter/Filter";
import FeatureCourseSlide from "../../containers/courses-slide/FeatureCourseSlide";
import { useSelector } from "react-redux";
import TabsCourseSlide from "../../containers/courses-slide/TabsCourseSlide";
const Community = (props) => {
    const { sideOpen } = useSelector((state) => state.setting);
    const [view, setView] = React.useState("list");
    const [openFilter, setOpenFilter] = React.useState(false);
    const theme = useTheme();
    const matchLg = useMediaQuery(theme.breakpoints.up("lg"));

    return (
        <Container maxWidth="xl" sx={{ padding: "0!important" }}>
            <Grid container spacing={1}>
                <Grid item xs={12}>hello</Grid>
                <Grid item xs={12}>
                    <TabsCourseSlide />
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h6" fontFamily="Roboto">
                        Danh sách khóa học
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                </Grid>
                <Grid item xs={12}>
                    <Stack
                        flexDirection="row"
                        gap={1}
                        justifyContent="flex-end"
                        alignItems="stretch"
                        overflow="hidden"
                    >
                        <Stack
                            sx={{
                                ...(matchLg
                                    ? {
                                        width: `calc(100% - ${theme.spacing(1)} + ${openFilter ? "0px" : theme.spacing(3)
                                            } - ${openFilter ? 350 : 0}px)`,
                                        transition: "all 0.3s ease",
                                    }
                                    : { width: "100%" }),
                            }}
                            gap={0.5}
                        >
                            <Paper
                                elevation={0}
                                className="flex flex-row justify-center"
                                sx={{ padding: 1, width: "100%" }}
                            >
                                <Pagination count={10} color="primary" />
                            </Paper>
                        </Stack>
                    </Stack>
                </Grid>
                <Grid item xs={12}></Grid>
                <Grid item xs={12}></Grid>
            </Grid>
        </Container>
    );
};

export default Community;
