import { Box, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import React, { useState } from "react";
import QuestionList from "./question-list/QuestionList";
import Question from "./question/Question";
import { useSelector } from "react-redux";
import { questions } from "./mock-data";
import Wrapper from "components/wrapper/Wrapper";
const Test = () => {
  const { courseOpen } = useSelector((state) => state.setting);
  const theme = useTheme();
  const matchLg = useMediaQuery(theme.breakpoints.up("lg"));
  const matchMd = useMediaQuery(theme.breakpoints.up("md"));

  // state
  const [listQuestion, setListQuestion] = useState(questions);
  const [activedQuestion, setActivedQuestion] = useState(0);

  const setNext = () => {
    if (activedQuestion < listQuestion.length - 1) {
      setActivedQuestion((s) => s + 1);
    }
  };

  const setPrev = () => {
    if (activedQuestion > 0) {
      setActivedQuestion((s) => s - 1);
    }
  };

  const setAnswer = (index, type) => (value) => {
    const newList = [...listQuestion];
    if (type === "radio") {
      newList[index].value = value;
    } else {
      if (typeof newList[index].value === "object") {
        const valueIndex = newList[index].value.indexOf(value);
        if (valueIndex !== -1) {
          newList[index].value.splice(valueIndex, 1);
        } else {
          newList[index].value.push(value);
        }
        newList[index].value = [...newList[index].value];
      } else {
        newList[index].value = [];
        newList[index].value.push(value);
      }
    }
    newList[index].status = "fill";
    setListQuestion(newList);
  };

  const setFlag = (index) => () => {
    const newList = [...listQuestion];
    newList[index].flag = !newList[index].flag;
    setListQuestion(newList);
  };

  return (
    <Box>
      <Wrapper elevation={0} sx={{ mb: 1 }}>
        <Typography variant="h6">Bài kiểm tra số 6</Typography>
      </Wrapper>
      <Stack
        flexDirection={
          matchLg
            ? "row"
            : matchMd
            ? courseOpen
              ? "column-reverse"
              : "row"
            : "column-reverse"
        }
        gap={1}
        mb={2}
      >
        <Wrapper elevation={0}>
          {listQuestion.map((question, index) => (
            <Question
              key={index}
              setAnswer={setAnswer(activedQuestion, question.type)}
              question={question}
              value={activedQuestion}
              index={index}
              setNext={index < listQuestion.length - 1 ? setNext : null}
              setPrev={index > 0 ? setPrev : null}
              setFlag={setFlag(activedQuestion)}
            />
          ))}
        </Wrapper>

        <Box
          width={{
            md: courseOpen ? "100%" : 350,
            lg: 350,
            xl: 480,
          }}
          flexShrink={0}
        >
          <QuestionList
            setActivedQuestion={setActivedQuestion}
            activedQuestion={activedQuestion}
            questions={listQuestion}
          />
        </Box>
      </Stack>
    </Box>
  );
};

export default Test;
