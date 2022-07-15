import { Grid, Container } from "@mui/material";

import MyCourse from "pages/user/user-page/MyCourse";
import PopularTags from "pages/user/user-page/PopularTags";
import ProfileCover from "pages/user/user-page/ProfileCover";
import UserFeed from "pages/user/user-page/UserFeed";
import { useSelector } from "react-redux";

const UserProfile = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <>
      <Container sx={{ my: 3 }} maxWidth="xl">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            <ProfileCover user={user} />
          </Grid>
          <Grid item xs={12} md={8}>
            <UserFeed />
          </Grid>
          <Grid item xs={12} md={4}>
            <PopularTags />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default UserProfile;
