import React, { useState, useRef, useEffect } from "react";
import Wrapper from "./../../../components/wrapper/Wrapper";
import { AddCircle, Save } from "@mui/icons-material";
import CourseForm from "containers/course-panel/CourseForm";
import Button from "components/button/Button";
import { Stack, Tab, Tabs } from "@mui/material";
import TabPanel from "components/tab-panel/TabPanel";
import ModuleForm from "containers/course-panel/ModuleForm";
import ContentForm from "containers/course-panel/ContentForm";
import { useDispatch, useSelector } from "react-redux";
import {
  GET_CATEGORIES_REQUEST,
  GET_LEVELS_REQUEST,
  GET_TAGS_REQUEST,
} from "store/types/data-types/category-types";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { CREATE_COURSE_REQUEST } from "store/types/data-types/manage-course-types";

function a11yProps(index) {
  return {
    id: `course-tab-${index}`,
    "aria-controls": `course-slide-tabpanel-${index}`,
  };
}

const courseSchema = yup.object().shape({
  title: yup.string().max(100).required("Tiêu đề khóa học không được để trống"),
  content: yup.string().required("Nội dung khóa học không được để trống"),
  shortDesc: yup
    .string()
    .max(255)
    .required("Mô tả ngắn cho khóa học không được để trống"),
  level: yup.string().required("Cấp độ của khóa học không được để trống"),
  category: yup.string().required("Danh mục khóa học không được để trống"),
  background: yup.string().required("Ảnh nền không được để trống"),
  gains: yup.array().of(yup.string().required("Không được để trống nội dung")),
});

const CreateCourse = () => {
  const { courseData } = useSelector((state) => state.manageCourse);
  const [selected, setSelected] = useState(0);
  const [content, setContent] = useState();
  const [modules, setModules] = useState([]);
  const handleSelectedChange = (event, newValue) => {
    setSelected(newValue);
  };
  const [formData, setFormData] = useState({
    tags: [],
    title: "",
    shortDesc: "",
    content: "",
    level: "",
    category: "",
    background: "",
    gains: [],
  });
  const dispatch = useDispatch();
  const methods = useForm({
    mode: "onChange",
    resolver: yupResolver(courseSchema),
    defaultValues: formData,
  });
  useEffect(() => {
    dispatch({ type: GET_CATEGORIES_REQUEST });
    dispatch({ type: GET_TAGS_REQUEST });
    dispatch({ type: GET_LEVELS_REQUEST });
  }, [dispatch]);

  useEffect(() => {
    if (courseData) {
      methods.setValue("tags", courseData.tags);
      methods.setValue("title", courseData.title);
      methods.setValue("shortDesc", courseData.shortDesc);
      methods.setValue("content", courseData.content);
      methods.setValue("level", courseData.level);
      methods.setValue("category", courseData.category);
      methods.setValue("background", courseData.background);
      methods.setValue("gains", courseData.gains);
    }
  }, [courseData, methods]);

  useEffect(() => {
    const subscription = methods.watch((value) => setFormData(value));
    return () => {
      subscription.unsubscribe();
    };
  }, [methods]);

  const onSubmit = (data) => {
    if (!courseData) {
      dispatch({ type: CREATE_COURSE_REQUEST, body: data });
    }
  };
  const onError = (errors) => console.log(errors);

  return (
    <FormProvider {...methods}>
      <Wrapper
        component="form"
        onSubmit={methods.handleSubmit(onSubmit, onError)}
        marginY={1}
        title="Tạo khóa học"
        titleVariant="h3"
        BoxProps={{ className: "flex flex-col" }}
        titleIcon={<AddCircle color="primary" />}
        actions={
          <Stack className="flex-row justify-end gap-3">
            <Button>Hủy</Button>
            <Button
              variant="contained"
              type="submit"
              onClick={() => {}}
              startIcon={<Save />}
            >
              {courseData ? "Lưu và tiếp tục" : "Tạo khóa học mới"}
            </Button>
          </Stack>
        }
      >
        <Tabs
          orientation={"horizontal"}
          variant="scrollable"
          value={selected}
          onChange={handleSelectedChange}
          allowScrollButtonsMobile
          aria-label="Vertical tabs example"
          sx={{
            flexShrink: 0,
            marginX: 1,
            height: "fit-content",
            borderBottom: "1px solid #d1d7dc",
          }}
        >
          <Tab
            label="Thông tin cơ bản"
            className="capitalize items-start"
            {...a11yProps(0)}
          />
          <Tab
            label="Nội dung khóa học"
            className="capitalize items-start"
            {...a11yProps(1)}
          />
          <Tab
            label="Chủ đề khóa học"
            disabled={!courseData}
            className="capitalize items-start"
            {...a11yProps(2)}
          />
        </Tabs>

        <TabPanel index={0} value={selected}>
          <CourseForm />
        </TabPanel>
        <TabPanel index={1} value={selected}>
          <ContentForm content={content} setContent={setContent} />
        </TabPanel>
        <TabPanel index={2} value={selected}>
          <ModuleForm modules={modules} setModules={setModules} />
        </TabPanel>
      </Wrapper>
    </FormProvider>
  );
};

export default CreateCourse;
