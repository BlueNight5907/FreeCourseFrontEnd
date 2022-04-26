import { Add } from "@mui/icons-material";
import { Box, Container, Divider, Grid, Typography } from "@mui/material";
import React from "react";
import AvatarWrapper from "./avatar-wrapper/AvatarWrapper";
import TextControl from "./../../../components/text-control/TextControl";

const AccountSetting = () => {
  return (
    <Container maxWidth="md" sx={{ padding: 0 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography>Ảnh nền, đại diện</Typography>
        </Grid>
        <Grid item xs={12}>
          <Divider
            flexItem
            orientation="horizontal"
            className="w-full border-2 mb-2"
          />
        </Grid>
        <Grid item xs={12}>
          <AvatarWrapper />
        </Grid>
        <Grid item xs={12}>
          <Typography>Thông tin cá nhân</Typography>
        </Grid>
        <Grid item xs={12}>
          <Divider
            flexItem
            orientation="horizontal"
            className="w-full border-2  mb-2"
          />
        </Grid>
        <Grid item xs={12}>
          <TextControl
            label="Tên hiển thị"
            value="Nguyễn Văn Huy"
            onSave={() => {}}
          />
        </Grid>
        <Grid item xs={12}>
          <TextControl label="Tên tài khoản" value="henrypoter22@gmail.com" />
        </Grid>
        <Grid item xs={12}>
          <TextControl
            label="Ngày sinh"
            value="26/4/2022"
            type="date"
            onChange={() => {}}
            onSave={() => {}}
          />
        </Grid>
        <Grid item xs={12}>
          <TextControl
            label="Mã số sinh viên"
            value="51800783"
            onSave={() => {}}
          />
        </Grid>

        <Grid item xs={12}>
          <TextControl label="Khoa" value="Công nghệ thông tin" />
        </Grid>

        <Grid item xs={12}>
          <TextControl
            label="Giới thiệu bản thân"
            value="Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa sit tenetur odio ab at cumque. Recusandae, cupiditate deleniti doloremque sapiente atque hic impedit qui dignissimos sed. Saepe, laborum. Officia, reiciendis?"
            placeholder="Nhâp giới thiệu về bản thân ..."
            fullWidth
            multiline
            minRows={4}
            onSave={() => {}}
          />
        </Grid>

        <Grid item xs={12}>
          <Box
            sx={{
              padding: 2,
              borderRadius: 1.5,
              border: (theme) => "1px dashed " + theme.palette.text.main,
              display: "flex",
              alignItems: "center",
              gap: 2,
              mb: 4,
              cursor: "pointer",
              "&:hover": {
                backgroundColor: (theme) => theme.palette.hover.main,
              },
            }}
          >
            <Add /> Thêm một thông tin khác về bản thân
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AccountSetting;
