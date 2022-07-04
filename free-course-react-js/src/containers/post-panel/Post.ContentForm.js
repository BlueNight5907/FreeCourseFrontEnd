import { EditRounded } from "@mui/icons-material";
import { useTheme } from "@mui/material";
import Button, { buttonBg } from "components/button/Button";
import Wrapper from "components/wrapper/Wrapper";
import React, { useState, useEffect, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import ReactHtmlParser from "react-html-parser";
import Prism from "prismjs";

const ContentForm = ({ content, setContent }) => {
  const theme = useTheme();
  // const [openContentDialog, setOpenContentDialog] = useState(false);
  const editorRef = useRef(null);
  useEffect(() => {
    Prism.highlightAll();
  }, [content]);

  useEffect(() => {
    setContent(content || "");
  }, [content, setContent]);
  return (
    <>
      {/* <Wrapper
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
      </Wrapper> */}
      <Editor
        apiKey="jv4isigvbusa53vjr4qg9ec2lxc9heu9jc0gp08r618c4zsy"
        onInit={(evt, editor) => (editorRef.current = editor)}
        cloudChannel="6-dev"
        value={content}
        scriptLoading={{ async: true }}
        onEditorChange={(newValue, editor) => {
          // setValue(newValue);
          setContent(newValue);
        }}
        init={{
          height: "100%",
          menubar: true,
          placeholder: "Text here",
          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "code",
            "codesample",
            "help",
            "wordcount",
            "emoticons",
          ],

          toolbar:
            "undo redo | image media | blocks fontsize fontfamily | " +
            " bold italic underline strikethrough forecolor backcolor | emoticons link table |alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | anchor fullscreen preview | help",
          // images_upload_url: "postAcceptor.php",
          /* we override default upload handler to simulate successful upload*/
          images_upload_handler: function (blobInfo, success, failure) {
            console.log("hello world");
          },
          text_patterns: [
            { start: "*", end: "*", format: "italic" },
            { start: "**", end: "**", format: "bold" },
            { start: "_", end: "_", format: "underline" },
            { start: "--", end: "--", format: "strikethrough" },
            { start: ">", end: "<", format: "blockquote" },
            { start: "<", end: ">", format: "code" },
            { start: "#", format: "h1" },
            { start: "##", format: "h2" },
            { start: "###", format: "h3" },
            { start: "####", format: "h4" },
            { start: "#####", format: "h5" },
            { start: "######", format: "h6" },
            // The following text patterns require the `lists` plugin
            { start: "1. ", cmd: "InsertOrderedList" },
            { start: "* ", cmd: "InsertUnorderedList" },
            { start: "- ", cmd: "InsertUnorderedList" },
          ],
          content_style: `body { font-family:${theme.typography.fontFamily}; font-size:${theme.typography.body1.fontSize} }`,
        }}
      />
    </>
  );
};

export default ContentForm;
