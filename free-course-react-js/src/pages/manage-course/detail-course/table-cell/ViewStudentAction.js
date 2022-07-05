import { useTheme } from "@emotion/react";
import { Add, ArrowBackIos, Visibility } from "@mui/icons-material";
import { Avatar, Box, Modal, Typography } from "@mui/material";
import Button from "components/button/Button";
import LearningProgress from "components/learning-progress/LearningProgress";
import Wrapper from "components/wrapper/Wrapper";
import React from "react";

const style = {
  position: "absolute",
  top: "0",
  right: "0",
  width: 400,
  height: "100%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: "0px",
};

const ViewStudentAction = ({ params }) => {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  return (
    <>
      <Button
        variant="contained"
        startIcon={<Visibility />}
        onClick={() => setOpen(true)}
      />
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Wrapper
          sx={style}
          title="Chi tiết sinh viên"
          titleVariant="h3"
          titleIcon={
            <ArrowBackIos color="primary" onClick={() => setOpen(false)} />
          }
        >
          <Box className="w-full">
            <Avatar
              alt="Remy Sharp"
              src="https://d5nunyagcicgy.cloudfront.net/external_assets/hero_examples/hair_beach_v391182663/original.jpeg"
              sx={{ width: 100, height: 100, margin: "auto" }}
            />
          </Box>
          <Box className="w-full mt-2">
            <Typography ml={0.5} gutterBottom className="font-bold">
              Tên học sinh
            </Typography>
            <Box
              className="pl-2 pr-[80px] py-2"
              sx={{
                borderRadius: 1,
                background: theme.palette.subbackground.main,
                color: "#000",
                width: "100%",
              }}
            >
              <Typography variant="body1">Nguyễn Thành Luân</Typography>
            </Box>
          </Box>
          <Box className="w-full mt-2">
            <Typography ml={0.5} gutterBottom className="font-bold">
              Mã học sinh
            </Typography>
            <Box
              className="pl-2 pr-[80px] py-2"
              sx={{
                borderRadius: 1,
                background: theme.palette.subbackground.main,
                color: "#000",
                width: "100%",
              }}
            >
              <Typography variant="body1">51900707</Typography>
            </Box>
            <Box
              sx={{ display: "flex", justifyContent: "space-between" }}
              className="mt-2"
            >
              <Box>
                <Typography ml={0.5} gutterBottom className="font-bold">
                  Ngày bắt đầu
                </Typography>
                <Box
                  className="pl-2 pr-[80px] py-2"
                  sx={{
                    borderRadius: 1,
                    background: theme.palette.subbackground.main,
                    color: "#000",
                    width: "100%",
                  }}
                >
                  <Typography variant="body1">26/5/2021</Typography>
                </Box>
              </Box>
              <Box>
                <Typography ml={0.5} gutterBottom className="font-bold">
                  Ngày bắt đầu
                </Typography>
                <Box
                  className="pl-2 pr-[80px] py-2"
                  sx={{
                    borderRadius: 1,
                    background: theme.palette.subbackground.main,
                    color: "#000",
                    width: "100%",
                  }}
                >
                  <Typography variant="body1">26/5/2021</Typography>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box className="w-full mt-2">
            <Typography ml={0.5} gutterBottom className="font-bold">
              Tiến độ học tập
            </Typography>
            <LearningProgress
              total={params.row.learningProgress.total}
              learned={params.row.learningProgress.learned}
              showLabel
              variant="determinate"
            />
          </Box>
          <Box className="w-full mt-2">
            <Typography ml={0.5} gutterBottom className="font-bold">
              Mô tả
            </Typography>
            <Box
              className="pl-2 pr-2 py-2"
              sx={{
                borderRadius: 1,
                background: theme.palette.subbackground.main,
                color: "#000",
                width: "100%",
              }}
            >
              <Typography variant="body1">
                Quickly manage the layout, alignment, and sizing of grid
                columns, navigation, components, and more with a full suite of
                responsive flexbox utilities.
              </Typography>
            </Box>
          </Box>
          <Box
            className="w-full mt-5 py-2"
            sx={{
              borderRadius: 1,
              background: theme.palette.subbackground.main,
              color: "#000",
              width: "100%",
            }}
          >
            <Box className="flex gap-2">
              <Add />
              <Typography variant="body1" className="mr-2">
                Lorem ipsum dolor sit amet
              </Typography>
            </Box>
          </Box>
        </Wrapper>
      </Modal>
    </>
  );
};

export default ViewStudentAction;
