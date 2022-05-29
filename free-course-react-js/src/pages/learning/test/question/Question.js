import React, { useEffect, useState } from "react";
import {
  Box,
  Checkbox,
  FormControlLabel,
  Grow,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import Wrapper from "components/wrapper/Wrapper";
import Answer from "components/answer/Answer";
import Button from "components/button/Button";
import {
  ArrowBackIosRounded,
  ArrowForwardIosRounded,
} from "@mui/icons-material";

const Question = (props) => {
  const { index, value, question, setAnswer, setPrev, setNext, setFlag } =
    props;
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setChecked(false);
    const timeOut = setTimeout(() => setChecked(true), 500);
    return () => {
      clearTimeout(timeOut);
    };
  }, [question]);

  const theme = useTheme();
  return (
    <Box>
      {value === index && (
        <Grow in={checked}>
          <Box>
            <Typography
              gutterBottom
              sx={{ color: theme.palette.primary.main, fontWeight: 500 }}
            >
              Câu hỏi {index + 1}
            </Typography>
            <Box className="question-content" mb={2} py={2}>
              <Typography>{question.content}</Typography>
            </Box>
            <Typography gutterBottom sx={{ fontWeight: 500 }}>
              Đáp án
            </Typography>
            <Stack my={2} gap={1}>
              {question.answer.map((item, index) => (
                <Answer
                  type={question.type}
                  key={index}
                  answer={item}
                  {...(question.rightAnswer && {
                    success:
                      question.value === question.rightAnswer &&
                      question.rightAnswer === item,
                    error:
                      question.value !== question.rightAnswer &&
                      question.rightAnswer === item,
                  })}
                  value={question.value}
                  onClick={setAnswer}
                />
              ))}
            </Stack>
            <Stack
              pt={2}
              className="flex-row justify-between"
              flexWrap="wrap"
              gap={1}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    checked={question.flag ? true : false}
                    onChange={() => setFlag()}
                    name="gilad"
                  />
                }
                label="Gắn cờ để xem lại kết quả"
              />
              <Stack className="flex-row" gap={1}>
                <Button
                  variant="outlined"
                  startIcon={<ArrowBackIosRounded />}
                  onClick={setPrev}
                  disabled={!setPrev}
                >
                  Câu trước
                </Button>
                <Button
                  variant="outlined"
                  endIcon={<ArrowForwardIosRounded />}
                  onClick={setNext}
                  disabled={!setNext}
                >
                  Câu tiếp theo
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Grow>
      )}
    </Box>
  );
};

export default Question;
