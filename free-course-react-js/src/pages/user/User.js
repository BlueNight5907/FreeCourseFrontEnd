import { Grid, Container } from "@mui/material";

import MyCourse from "pages/user/user-page/MyCourse";
import PopularTags from "pages/user/user-page/PopularTags";
import ProfileCover from "pages/user/user-page/ProfileCover";
import UserFeed from "pages/user/user-page/UserFeed";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { CHANGE_USER } from "store/types/data-types/blog-type";
import { GET_ACCOUNT_INFORMATION } from "store/types/data-types/common-types";

const UserProfile = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (id) {
      dispatch({
        type: GET_ACCOUNT_INFORMATION,
        accountId: id,
        callback: (data) => setUserData(data),
      });
      dispatch({
        type: CHANGE_USER,
      });
    }
  }, [dispatch, id]);

  return (
    <>
      <Container sx={{ my: 1 }} maxWidth="xl">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={2}
        >
          <Grid item xs={12}>
            <ProfileCover user={userData} />
          </Grid>
          <Grid item xs={12} /*md={8}*/>
            <UserFeed user={userData} userId={id} />
          </Grid>
          {/* <Grid item xs={12} md={4}>
            <PopularTags />
          </Grid> */}
        </Grid>
      </Container>
    </>
  );
};

export default UserProfile;
