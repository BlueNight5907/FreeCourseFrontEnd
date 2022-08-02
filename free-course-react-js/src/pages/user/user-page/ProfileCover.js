// import PropTypes from 'prop-types';
import {
  Box,
  Typography,
  Card,
  Tooltip,
  Avatar,
  CardMedia,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import bg from "assets/background/network-intro.png";
import ArrowBackTwoToneIcon from "@mui/icons-material/ArrowBackTwoTone";

const Input = styled("input")({
  display: "none",
});

const AvatarWrapper = styled(Box)(
  ({ theme }) => `
    position: relative;
    overflow: visible;
    display: inline-block;
    margin-top: -${theme.spacing(11)};
    margin-left: ${theme.spacing(2)};
    .MuiAvatar-root {
      width: ${theme.spacing(16)};
      height: ${theme.spacing(16)};
    }
`
);

const CardCover = styled(Card)(
  ({ theme }) => `
    position: relative;
    .MuiCardMedia-root {
      height: ${theme.spacing(30)};
    }
`
);

const CardCoverAction = styled(Box)(
  ({ theme }) => `
    position: absolute;
    right: ${theme.spacing(2)};
    bottom: ${theme.spacing(2)};
`
);

const ProfileCover = ({ user }) => {
  return (
    <>
      <Box display="flex" mb={3}>
        <Tooltip arrow placement="top" title="Go back">
          <IconButton color="primary" sx={{ p: 2, mr: 2 }}>
            <ArrowBackTwoToneIcon />
          </IconButton>
        </Tooltip>
        <Box>
          <Typography variant="h3" component="h3" gutterBottom>
            Profile của {user?.userInformation.fullName}
          </Typography>
          <Typography variant="subtitle2">
            Người dùng của TDT - Learning
          </Typography>
        </Box>
      </Box>
      <CardCover>
        <CardMedia image={user?.userInformation.background || bg} />
        <CardCoverAction>
          <Input accept="image/*" id="change-cover" multiple type="file" />
          <label htmlFor="change-cover">
            {/* <Button
              startIcon={<UploadTwoToneIcon />}
              variant="contained"
              component="span"
            >
              Change cover
            </Button> */}
          </label>
        </CardCoverAction>
      </CardCover>
      <AvatarWrapper>
        <Avatar
          sx={{
            border: (theme) => "3px solid " + theme.palette.foreground.main,
          }}
          alt={user?.userInformation.fullName}
          src={user?.userInformation.avatar}
        />
      </AvatarWrapper>
      <Box py={1} pl={2}>
        <Typography gutterBottom variant="h4">
          {user?.userInformation.fullName}
        </Typography>
        <Typography variant="subtitle2">
          {user?.userInformation.desc}
        </Typography>
      </Box>
    </>
  );
};

export default ProfileCover;
