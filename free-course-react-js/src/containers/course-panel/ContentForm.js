import { EditRounded } from "@mui/icons-material";
import { useTheme } from "@mui/material";
import Button, { buttonBg } from "components/button/Button";
import Wrapper from "components/wrapper/Wrapper";
import React, { useState, useEffect } from "react";
import EditContentDialog from "./EditContentDialog";
import ReactHtmlParser from "react-html-parser";
import Prism from "prismjs";

const ContentForm = ({ content, setContent }) => {
  const theme = useTheme();
  const [openContentDialog, setOpenContentDialog] = useState(false);
  useEffect(() => {
    Prism.highlightAll();
  }, [content]);
  return (
    <>
      <Wrapper
        sx={{
          border: "1px solid " + theme.palette.divider,
          minHeight: 400,
          height: "100%",
        }}
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
        {content && ReactHtmlParser(content)}
      </Wrapper>
      <EditContentDialog
        open={openContentDialog}
        setOpen={setOpenContentDialog}
        setContent={setContent}
        initialValue={content}
      />
    </>
  );
};

export default ContentForm;
