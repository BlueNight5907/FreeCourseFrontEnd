import React, { useEffect, useRef, useState } from "react";
import {
  AppBar,
  Dialog,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Paper,
  Toolbar,
  Typography,
  Box,
  useTheme,
} from "@mui/material";
import QuillEditor from "components/rich-text-editor/QuillEditor";
import { Editor } from "@tinymce/tinymce-react";

const PostCreate = (props) => {
  const { open, setOpen, setContent, initialValue } = props;
  // const [content, setContent] = useState("");
  // const [files, setFiles] = useState([]);

  // const onEditorChange = (value) => {
  //   setContent(value);
  //   console.log(content);
  // };

  // const onFilesChange = (files) => {
  //   setFiles(files);
  // };
  const theme = useTheme();
  const [value, setValue] = useState("");
  const editorRef = useRef(null);
  const handleClose = () => setOpen(false);
  const handleSaveContent = () => {
    console.log(value);
    if (setContent) {
      setContent(value);
    }
  };

  useEffect(() => {
    setValue(
      initialValue ||
        "<h1 id='post-title'>Your title here</h1><h3 id='post-subtitle' style='color: rgb(149, 165, 166);'>Your sub-title here</h3>"
    );
  }, [initialValue]);
  return (
    <Box
      sx={{
        margin: theme.spacing(1, 0, 0, 0),
        minHeight: 300,
      }}
    >
      <Box>
        <Typography>Tạo bài viết mới</Typography>
      </Box>
      <Editor
        apiKey="jv4isigvbusa53vjr4qg9ec2lxc9heu9jc0gp08r618c4zsy"
        onInit={(evt, editor) => (editorRef.current = editor)}
        cloudChannel="6-dev"
        value={value}
        scriptLoading={{ async: true }}
        onEditorChange={(newValue, editor) => {
          setValue(newValue);
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
    </Box>
  );
};

export default PostCreate;
