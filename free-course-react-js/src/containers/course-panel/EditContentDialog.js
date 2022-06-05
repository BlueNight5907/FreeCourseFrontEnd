import { Close, Save } from "@mui/icons-material";
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
  useTheme,
} from "@mui/material";
import Button from "components/button/Button";
import Transition from "components/transition/Transition";
import React, { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";

const EditContentDialog = ({ open, setOpen }) => {
  const handleClose = () => setOpen(false);
  const theme = useTheme();
  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };
  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      disableEnforceFocus
      disableAutoFocus
      TransitionComponent={Transition}
      TransitionProps={{ direction: "up" }}
      PaperProps={{
        sx: {
          backgroundColor: "background.main",
        },
      }}
    >
      <AppBar
        sx={{
          position: "sticky",
          backgroundColor: "background.main",
          color: "text.primary",
          boxShadow: "none",
        }}
      >
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <Close />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            Nội dung
          </Typography>
          <Button
            autoFocus
            disableElevation
            onClick={handleClose}
            className="mr-3"
          >
            Hủy bỏ
          </Button>
          <Button
            startIcon={<Save />}
            autoFocus
            disableElevation
            variant="contained"
          >
            Lưu
          </Button>
        </Toolbar>
      </AppBar>
      <Paper sx={{ flexGrow: 1, m: 1, position: "relative" }} elevation={0}>
        <Editor
          apiKey="jv4isigvbusa53vjr4qg9ec2lxc9heu9jc0gp08r618c4zsy"
          onInit={(evt, editor) => (editorRef.current = editor)}
          cloudChannel="6-dev"
          initialValue="<p>This is the initial content of the editor.</p>"
          init={{
            height: "100%",
            menubar: true,
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
              "undo redo | blocks fontsize fontfamily | " +
              " bold italic underline strikethrough forecolor backcolor | emoticons link table |alignleft aligncenter " +
              "alignright alignjustify | bullist numlist outdent indent | " +
              "removeformat | anchor fullscreen preview | help",
            content_style: `body { font-family:${theme.typography.fontFamily}; font-size:${theme.typography.body1.fontSize} }`,
          }}
        />
      </Paper>
    </Dialog>
  );
};

export default EditContentDialog;
