import {
  Container,
  Grid,
  Stack,
  Typography,
  useTheme,
  useMediaQuery,
  Pagination,
  Paper,
} from "@mui/material";
import queryString from "query-string";
import React, { useCallback, useEffect } from "react";
import CourseCard from "./course-card/CourseCard";
import ActionBox from "./action-box/ActionBox";
import CategoryFilter from "./filter/Filter";
import { useSelector, useDispatch } from "react-redux";
import TabsCourseSlide from "../../containers/courses-slide/TabsCourseSlide";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { GET_COURSES_REQUEST } from "store/types/data-types/category-types";

const Category = (props) => {
  const { urlPath } = useParams();
  const [searchParams] = useSearchParams();
  const { sideOpen } = useSelector((state) => state.setting);
  const {
    categories,
    tags: reduxTags,
    total,
    courses,
  } = useSelector((state) => state.category);
  const [view, setView] = React.useState("list");
  const [params, setParams] = React.useState({
    category: "all",
    queries: {
      tags: [],
      sort: "createdAt",
      order: "desc",
    },
  });

  const [pageState, setPageState] = React.useState({
    category: "all",
    queries: {
      tags: [],
      sort: "createdAt",
      order: "desc",
      page: 1,
    },
  });

  const [openFilter, setOpenFilter] = React.useState(false);
  const theme = useTheme();
  const matchLg = useMediaQuery(theme.breakpoints.up("lg"));
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const findCourses = useCallback(() => {
    const search = { ...params.queries };
    search.tags = search.tags.join(",");
    navigate(
      "/courses/" +
        params.category +
        "?" +
        queryString.stringify({
          ...search,
          page: 1,
        })
    );
  }, [navigate, params]);

  const updateParams = useCallback(
    (field1, field2) => (value) => {
      if (field2) {
        params[field1][field2] = value;
      } else {
        params[field1] = value;
      }
      setParams({ ...params });
    },
    [params]
  );

  const clearParams = useCallback(
    () =>
      setParams((s) => ({
        ...s,
        queries: {
          tags: [],
          sort: "createdAt",
          order: "desc",
        },
      })),
    []
  );

  useEffect(() => {
    if (urlPath === "all") {
      setPageState((s) => ({ ...s, category: urlPath }));
      setParams((s) => ({ ...s, category: urlPath }));
    } else if (categories?.length > 0) {
      const isExist =
        categories.findIndex((item) => item.urlPath === urlPath) >= 0;
      if (!isExist) {
        navigate("/courses/all");
      }
    }
  }, [categories, navigate, urlPath]);

  useEffect(() => {
    const {
      tags,
      sort,
      order,
      page = 1,
      page_size = 12,
    } = Object.fromEntries([...searchParams]);

    if (urlPath && reduxTags.length > 0) {
      const searchTags = tags
        ?.split(",")
        .map((item) => {
          return reduxTags.find((tag) => tag.name === item)?._id;
        })
        .join(",");
      dispatch({
        type: GET_COURSES_REQUEST,
        params: { tags: searchTags, sort, order, page, page_size },
        category: urlPath,
      });
    }
    setPageState((s) => ({
      category: urlPath,
      queries: {
        tags: tags ? tags.split(",") : [],
        sort: sort || "createdAt",
        order: order || "desc",
        page: page || 1,
      },
    }));

    setParams((s) => ({
      category: urlPath,
      queries: {
        tags: tags ? tags.split(",") : [],
        sort: sort || "createdAt",
        order: order || "desc",
      },
    }));
  }, [dispatch, reduxTags, searchParams, urlPath]);

  return (
    <Container maxWidth="xl" sx={{ padding: "0!important" }}>
      <Grid container spacing={1}>
        <Grid item xs={12}></Grid>
        <Grid item xs={12}>
          <TabsCourseSlide />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" fontFamily="Roboto">
            Danh sách khóa học
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <ActionBox
            view={view}
            setView={setView}
            setOpenFilter={setOpenFilter}
            updateSort={updateParams("queries", "sort")}
            updateOrder={updateParams("queries", "order")}
            clearParams={clearParams}
            params={params}
            findCourses={findCourses}
            total={total}
          />
        </Grid>
        <Grid item xs={12}>
          <Stack
            flexDirection="row"
            gap={1}
            justifyContent="flex-end"
            alignItems="stretch"
            overflow="hidden"
          >
            <CategoryFilter
              open={openFilter}
              setOpen={setOpenFilter}
              updateCategory={updateParams("category")}
              updateTags={updateParams("queries", "tags")}
              params={params}
            />
            <Stack
              sx={{
                ...(matchLg
                  ? {
                      width: `calc(100% - ${theme.spacing(1)} + ${
                        openFilter ? "0px" : theme.spacing(3)
                      } - ${openFilter ? 350 : 0}px)`,
                      transition: "all 0.3s ease",
                    }
                  : { width: "100%" }),
              }}
              gap={0.5}
            >
              <Paper
                elevation={0}
                sx={{
                  width: "100%",
                  padding: {
                    xs: 1,
                    md: theme.spacing(2, 3),
                  },
                }}
              >
                {view === "list" &&
                  courses.map((course, index) => (
                    <CourseCard data={course} key={index} />
                  ))}
                {view === "grid" && (
                  <Grid container spacing={0.5}>
                    {courses.map((course, index) => (
                      <Grid
                        item
                        xs={6}
                        md={sideOpen ? 6 : 4}
                        lg={sideOpen && openFilter ? 6 : 4}
                        xl={sideOpen && openFilter ? 4 : 3}
                        key={index}
                      >
                        <CourseCard gridView data={course} />
                      </Grid>
                    ))}
                  </Grid>
                )}
              </Paper>
              <Paper
                elevation={0}
                className="flex flex-row justify-center"
                sx={{ padding: 1, width: "100%" }}
              >
                <Pagination
                  count={Math.ceil(total / 12)}
                  page={parseInt(pageState.queries.page)}
                  onChange={(e, value) => {
                    pageState.queries.page = value;
                    const search = { ...pageState.queries };
                    search.tags = search.tags.join(",");
                    navigate(
                      "/courses/" +
                        pageState.category +
                        "?" +
                        queryString.stringify({
                          ...search,
                        })
                    );
                  }}
                  color="primary"
                />
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

export default Category;
