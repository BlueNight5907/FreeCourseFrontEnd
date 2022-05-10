import {
  ClearAllRounded,
  ExpandMore,
  Filter,
  TuneRounded,
  ViewList,
  ViewModule,
} from "@mui/icons-material";
import {
  Box,
  Container,
  Divider,
  FormControl,
  Button as MuiButton,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  useTheme,
  useMediaQuery,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Pagination,
  Rating,
} from "@mui/material";
import React from "react";
import Button from "../../components/button/Button";
import Dropdown from "../../components/dropdown/Dropdown";
import CourseSlide from "../../containers/courses-slide/CourseSlide";
import Image from "../../components/image/Image";
import courseImg from "../../assets/background/course-image.png";
import CourseCard from "./course-card/CourseCard";
const Category = (props) => {
  const [view, setView] = React.useState("list");
  const [openFilter, setOpenFilter] = React.useState(false);
  const theme = useTheme();
  const matchSm = useMediaQuery(theme.breakpoints.up("sm"));
  const matchLg = useMediaQuery(theme.breakpoints.up("lg"));
  const handleChange = (event, nextView) => {
    setView(nextView);
  };
  const [expanded, setExpanded] = React.useState(false);

  const handleExpaned = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const styles = {
    actionBtn: {
      backgroundColor: theme.palette.foreground.main,
      border: "0.1px solid " + theme.palette.text2.main,
      color: theme.palette.text.main,
      "&:hover": {
        backgroundColor: theme.palette.hover.main,
      },
    },
  };
  return (
    <Container maxWidth="xl" sx={{ padding: "0!important" }}>
      <Grid container spacing={1}>
        <Grid item xs={12}></Grid>
        <Grid item xs={12}>
          <Typography variant="h6" fontFamily="Roboto">
            {matchSm && "Danh sách khóa học"}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Paper elevation={0} sx={{ padding: 1 }}>
            <Stack
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Stack flexDirection="row" gap={1}>
                <Button
                  sx={styles.actionBtn}
                  variant="contained"
                  startIcon={<TuneRounded />}
                  disableElevation
                  onClick={() => setOpenFilter((s) => !s)}
                >
                  {matchSm && "Bộ lọc"}
                </Button>

                <Dropdown></Dropdown>

                <Button
                  sx={styles.actionBtn}
                  variant="contained"
                  startIcon={<ClearAllRounded />}
                  disableElevation
                >
                  {matchSm && "Hủy bộ lọc"}
                </Button>
              </Stack>
              <Typography>610 kết quả</Typography>
            </Stack>
            <Divider className="my-2" />
            <ToggleButtonGroup
              orientation="horizontal"
              value={view}
              exclusive
              onChange={handleChange}
            >
              <ToggleButton
                sx={{ paddingX: 1, gap: 0.5 }}
                size="small"
                value="list"
                aria-label="list"
              >
                <ViewList />
                {matchSm && " Xem theo danh sách"}
              </ToggleButton>
              <ToggleButton
                sx={{ paddingX: 1, gap: 0.5 }}
                size="small"
                value="module"
                aria-label="module"
              >
                <ViewModule />
                {matchSm && " Chế độ xem lưới"}
              </ToggleButton>
            </ToggleButtonGroup>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Stack
            flexDirection="row"
            gap={1}
            justifyContent="flex-end"
            overflow="hidden"
          >
            {matchLg && (
              <Paper
                square
                elevation={0}
                sx={{
                  width: 350,
                  marginLeft: !openFilter ? -36 : 0,
                  transition: "all 0.3s ease",
                  height: "fit-content",
                }}
              >
                <Accordion
                  square
                  elevation={0}
                  expanded={expanded === "panel1"}
                  onChange={handleExpaned("panel1")}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMore />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                  >
                    <Typography>Danh mục khóa học</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      Nulla facilisi. Phasellus sollicitudin nulla et quam
                      mattis feugiat. Aliquam eget maximus est, id dignissim
                      quam.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
                <Accordion
                  square
                  elevation={0}
                  expanded={expanded === "panel4"}
                  onChange={handleExpaned("panel4")}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMore />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                  >
                    <Typography>Thời gian học</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      Nulla facilisi. Phasellus sollicitudin nulla et quam
                      mattis feugiat. Aliquam eget maximus est, id dignissim
                      quam.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
                <Accordion
                  square
                  elevation={0}
                  expanded={expanded === "panel3"}
                  onChange={handleExpaned("panel3")}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMore />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                  >
                    <Typography>Đánh giá</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      Nulla facilisi. Phasellus sollicitudin nulla et quam
                      mattis feugiat. Aliquam eget maximus est, id dignissim
                      quam.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
                <Accordion
                  square
                  elevation={0}
                  expanded={expanded === "panel2"}
                  onChange={handleExpaned("panel2")}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMore />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                  >
                    <Typography>Cấp độ</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      Nulla facilisi. Phasellus sollicitudin nulla et quam
                      mattis feugiat. Aliquam eget maximus est, id dignissim
                      quam.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </Paper>
            )}
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
                    lg: theme.spacing(5, 3),
                  },
                }}
              >
                {Array(10)
                  .fill(0)
                  .map((_, index) => (
                    <CourseCard key={index} />
                  ))}
              </Paper>
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

export default Category;
