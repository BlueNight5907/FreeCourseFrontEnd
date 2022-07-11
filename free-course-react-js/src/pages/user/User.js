import { Grid, Container } from "@mui/material";

import Addresses from "components/user-page/Addresses";
import MyCourse from "components/user-page/MyCourse";
import PopularTags from "components/user-page/PopularTags";
import ProfileCover from "components/user-page/ProfileCover";
import RecentActivity from "components/user-page/RecentActivity";
import UserFeed from "components/user-page/UserFeed";

const UserProfile = () => {
  const user = {
    savedCards: 7,
    name: "Catherine Pike",
    coverImg: "/static/images/placeholders/covers/5.jpg",
    avatar: "/static/images/avatars/4.jpg",
    description:
      "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage",
    jobtitle: "Web Developer",
    location: "Barcelona, Spain",
    followers: "465",
  };

  return (
    <>
      <Container sx={{ mt: 3 }} maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12} md={8}>
            <ProfileCover user={user} />
          </Grid>
          <Grid item xs={12} md={4}>
            <RecentActivity />
          </Grid>
          <Grid item xs={12} md={8}>
            <UserFeed />
          </Grid>
          <Grid item xs={12} md={4}>
            <PopularTags />
          </Grid>
          <Grid item xs={12} md={7}>
            <MyCourse />
          </Grid>
          <Grid item xs={12} md={5}>
            <Addresses />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default UserProfile;
