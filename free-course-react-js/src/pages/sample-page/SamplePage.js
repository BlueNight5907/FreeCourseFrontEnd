import { ArrowForwardIosRounded, PeopleAlt } from "@mui/icons-material";
import {
  Box,
  Container,
  Grid,
  ListItemText,
  MenuItem,
  Stack,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Answer from "../../components/answer/Answer";
import Button, { buttonBg } from "../../components/button/Button";
import Comment from "../../components/comment/Comment";
import CourseCard from "../../components/course-card/CourseCard";
import GroupList from "../../components/module/GroupList";
import QuestionIcon from "../../components/question-icon/QuestionIcon";
import MiniSearch from "../../components/search/MiniSearch";
import Tag from "../../components/tag/Tag";
import TextField from "../../components/text-field/TextField";
import CourseSlide from "../../containers/courses-slide/CourseSlide";
import FeatureCourse from "../../containers/courses-slide/CategorySlide";
import MyCourseDropdown from "../../containers/dropdowns/my-courses-dropdown/MyCoursesDropdown";
import UserDropdown from "../../containers/dropdowns/user-dropdown/UserDropdown";
import ChatGroupIntroduction from "../../containers/introduction/ChatGroupIntroduction";
import SocialNetworkIntroduction from "../../containers/introduction/SocialNetworkIntroduction";
import { TOGGLE_PAGE_MODE } from "../../store/types/page-types/setting-types";
import Dialog from "../../components/dialog/dialog";
import AlertDialog from "../../components/dialog/alert-dialog";
import ConfirmDialog from "./../../components/dialog/confirm-dialog";

function SamplePage() {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch({ type: TOGGLE_PAGE_MODE });
  };
  const [open, setOpen] = useState(false);
  return (
    <Container maxWidth="xl">
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Box
            sx={{
              width: "100%",
              height: 500,
              backgroundColor: (theme) => theme.palette.foreground.main,
            }}
          >
            <Button onClick={() => setOpen(true)}>Open</Button>
          </Box>
          <ConfirmDialog
            title="Hủy tham gia lớp học"
            open={open}
            setOpen={setOpen}
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias
            deserunt magni fugiat harum rerum! Quia vel quo sunt temporibus rem
            totam maiores animi inventore, qui possimus nemo earum illo numquam!
          </ConfirmDialog>
        </Grid>
        <Grid item xs={12}>
          <Stack direction="row" gap={1} alignItems="center">
            <Button
              specialBg={buttonBg.red}
              variant="contained"
              onClick={handleClick}
              startIcon={<ArrowForwardIosRounded />}
              width={300}
            >
              Click
            </Button>

            <MyCourseDropdown />

            <QuestionIcon>2</QuestionIcon>

            <QuestionIcon flag>2</QuestionIcon>

            <QuestionIcon lack>2</QuestionIcon>

            <QuestionIcon fill>2</QuestionIcon>

            <Tag>Hello</Tag>

            <UserDropdown />
          </Stack>
        </Grid>

        <Grid item xs={12}>
          <Stack direction="column" gap={1} alignItems="center">
            <CourseSlide title="ABC XYS" />
            <CourseSlide title="ABC XYS" learned />
            <FeatureCourse title="ABC XYS" />
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={1}>
            <Grid item xs={12} md={7} className="flex flex-col gap-2">
              <SocialNetworkIntroduction />
              <ChatGroupIntroduction />
            </Grid>
            <Grid item xs={12} md={5}>
              <div className="flex flex-col gap-3">
                <Answer error />
                <Answer success />
                <Answer type="checkbox" />
                <Answer value="123" answer="123" />
              </div>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={8}>
          <Comment />
        </Grid>
        <Grid item xs={12} md={4}></Grid>
        <Grid item xs={12}></Grid>

        <Grid item xs={12}>
          <Box
            sx={{
              width: "100%",
              height: 1500,
              padding: 2,
              backgroundColor: (theme) => theme.palette.foreground.main,
            }}
          >
            <Grid item xs={12} md={4}>
              <MiniSearch title="Tim kiem" />
              <TextField
                label="abcd"
                placeholder="Enter text ..."
                fullWidth
                helper="Lorem djks"
                icon={<PeopleAlt />}
              />

              <TextField
                label="abcd"
                placeholder="Enter text ..."
                fullWidth
                helper="Lorem djks"
                multiline
                minRows={6}
              />

              <TextField
                label="abcd"
                placeholder="Enter text ..."
                fullWidth
                helper="Lorem djks"
                select
              >
                <MenuItem key="123" value="123">
                  <ListItemText primary="12344" />
                </MenuItem>
                <MenuItem key="1234" value="1234">
                  <ListItemText primary="1234456" />
                </MenuItem>
              </TextField>
            </Grid>
            <GroupList />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default SamplePage;
