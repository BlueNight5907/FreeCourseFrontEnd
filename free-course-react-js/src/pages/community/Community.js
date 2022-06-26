import { Container } from "@mui/material";
import React from "react";
import Feed from "./feed/feed";

const Community = (props) => {
  return (
    <Container maxWidth="xl" sx={{ padding: "0!important" }}>
      <Feed />
    </Container>
  );
};

export default Community;
