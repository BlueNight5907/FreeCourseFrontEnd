import React from "react";
import Wrapper from "components/wrapper/Wrapper";
import { Stack, Typography } from "@mui/material";
import QuestionIcon from "components/question-icon/QuestionIcon";
import Button, { buttonBg } from "components/button/Button";
import { ArrowRight, Public, Publish } from "@mui/icons-material";

const QuestionList = (props) => {
  const { questions, activedQuestion, setActivedQuestion, onSubmit } = props;

  const setTypeButton = (status, isActived) => {
    const result = { default: true };
    switch (status) {
    }
  };

  return (
    <Wrapper
      elevation={0}
      sx={{ flexGrow: 0, maxWidth: "100%" }}
      titleVariant="body1"
    >
      <Typography mb={2} fontWeight={500}>
        Danh sách câu hỏi
      </Typography>
      <Stack flexDirection="row" gap={1} flexWrap="wrap" mb={2}>
        {questions.map((question, index) => (
          <QuestionIcon
            key={index}
            status={question.status}
            flag={question.flag}
            actived={activedQuestion === index}
            onClick={() => setActivedQuestion(index)}
          >
            {index + 1}
          </QuestionIcon>
        ))}
      </Stack>
      <Button
        specialBg={buttonBg.blue}
        width={{ xs: "100%", sm: 120 }}
        endIcon={<ArrowRight />}
        sx={{ color: "#fff" }}
      >
        Nộp bài
      </Button>
    </Wrapper>
  );
};

export default QuestionList;
