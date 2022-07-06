import { EditRounded } from "@mui/icons-material";
import { useTheme } from "@mui/material";
import Button, { buttonBg } from "components/button/Button";
import Wrapper from "components/wrapper/Wrapper";
import React, { useState, useEffect } from "react";
import EditContentDialog from "./EditContentDialog";
import ReactHtmlParser from "react-html-parser";
import Prism from "prismjs";
import { useFormContext } from "react-hook-form";

const ContentForm = ({ content, setContent }) => {
  const theme = useTheme();
  const {
    setValue,
    formState: { errors },
    getValues,
  } = useFormContext();
  const [openContentDialog, setOpenContentDialog] = useState(false);
  useEffect(() => {
    if (getValues("content")) {
      Prism.highlightAll();
    }
  }, [getValues]);
  return (
    <>
      <Wrapper
        sx={{
          border: "1px solid " + theme.palette.divider,
          minHeight: 400,
          height: "100%",
        }}
        BoxProps={{ className: "content" }}
        elevation={0}
        title="Nội dung khóa học"
        titleVariant="body1"
        actions={
          <Button
            startIcon={<EditRounded />}
            specialBg={buttonBg.red}
            variant="contained"
            onClick={() => setOpenContentDialog(true)}
          >
            Thêm / Chỉnh sửa
          </Button>
        }
      >
        {ReactHtmlParser(getValues("content"))}
      </Wrapper>
      <EditContentDialog
        open={openContentDialog}
        setOpen={setOpenContentDialog}
        setContent={(value) => setValue("content", value)}
        initialValue={getValues("content") || ""}
      />
    </>
  );
};

export default ContentForm;
