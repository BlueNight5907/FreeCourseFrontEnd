import { Box, Avatar, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const UserCard = (props) => {
  const { name, subtitle, avatar, onClick, size, headLink, subLink } = props;
  return (
    <div
      className="user-dropdown flex flex-row items-center gap-2"
      onClick={onClick}
    >
      <Avatar
        className="cursor-pointer"
        alt={avatar}
        src={avatar}
        sx={{
          height: size === "small" ? 30 : 40,
          width: size === "small" ? 30 : 40,
        }}
      />
      <Box className="user-information lg:flex flex-col justify-center ">
        <Typography
          variant={size === "small" ? "caption" : "subtitle1"}
          sx={{
            fontWeight: size === "small" ? 400 : 500,
            color: (theme) => theme.palette.text.main,
          }}
        >
          {headLink ? <Link to={headLink}>{name}</Link> : name}
        </Typography>

        <Typography
          sx={{
            fontSize: size === "small" ? 10 : 12,
            color: (theme) => theme.palette.text2.main,
          }}
        >
          {subLink ? <Link to={subLink}>{subtitle}</Link> : subtitle}
        </Typography>
      </Box>
    </div>
  );
};

export default UserCard;
