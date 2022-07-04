import { useState, ChangeEvent } from "react";
import {
  Box,
  Typography,
  FormControlLabel,
  Switch,
  Tabs,
  Tab,
  TextField,
  IconButton,
  InputAdornment,
  Avatar,
  List,
  Button,
  Tooltip,
  Divider,
  AvatarGroup,
  ListItemButton,
  ListItemAvatar,
  ListItemText,
  lighten,
  styled,
  Stack,
  useTheme,
} from "@mui/material";
import { formatDistance, subMinutes, subHours } from "date-fns";
import SettingsTwoToneIcon from "@mui/icons-material/SettingsTwoTone";
import SearchTwoToneIcon from "@mui/icons-material/SearchTwoTone";
import HomeIcon from "@mui/icons-material/Home";
import FeedIcon from "@mui/icons-material/Feed";
import CheckTwoToneIcon from "@mui/icons-material/CheckTwoTone";
import AlarmTwoToneIcon from "@mui/icons-material/AlarmTwoTone";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import Fade from "@mui/material/Fade";
import MiniSearch from "components/search/MiniSearch";
import Label from "components/label/Label";
import avt from "../../../assets/avatar/u29.jfif";

const AvatarSuccess = styled(Avatar)(
  ({ theme }) => `
        background-color: ${/*theme.colors.success.lighter*/ "#0075EB11"};
        color: ${theme.palette.primary.main};
        width: ${theme.spacing(8)};
        height: ${theme.spacing(8)};
        margin-left: auto;
        margin-right: auto;
    `
);

// const MeetingBox = styled(Box)(
//     ({ theme }) => `
//           background-color: ${/*lighten(theme.palette.foreground.main, 0.5)*/"green"};
//           margin: ${theme.spacing(2)} 0;
//           border-radius: ${/*theme.general.borderRadius*/"10px"};
//           padding: ${theme.spacing(2)};
//     `
// );

const RootWrapper = styled(Box)(
  ({ theme }) => `
        padding: ${theme.spacing(1.2)};
  `
);

const ListItemWrapper = styled(ListItemButton)(
  ({ theme }) => `
        &.MuiButtonBase-root {
            margin: ${theme.spacing(0.5)} 0;
            border-radius: 5px;
        }
  `
);

const TabsContainerWrapper = styled(Box)(
  ({ theme }) => `
        .MuiTabs-indicator {
            min-height: 4px;
            height: 4px;
            box-shadow: none;
            border: 0;
        }
        .MuiTab-root {
            &.MuiButtonBase-root {
                padding: 0;
                margin-right: ${theme.spacing(2)};
                font-size: ${theme.typography.pxToRem(16)};
                color: $black;
                .MuiTouchRipple-root {
                    display: none;
                }
            }
            &.Mui-selected:hover,
        }
  `
);

const chats = [
  {
    avatar: avt,
    name: "User63548644",
    last: "Nice to meet you too",
    unread: 3,
  },
  {
    avatar: avt,
    name: "User3546940",
    last: "😂",
  },
  {
    avatar: avt,
    name: "User89778432",
    last: "Hi",
  },
  {
    avatar: avt,
    name: "User65454748",
    last: "bRUH",
  },
];

const Drawer = () => {
  const user = {
    name: "Nguyễn Huỳnh Tất Đạt",
    avatar: avt,
    jobtitle: "Software Developer",
  };

  const [state, setState] = useState({
    invisible: true,
  });

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };

  const [currentTab, setCurrentTab] = useState("all");

  const tabs = [
    { value: "all", label: "All" },
    { value: "unread", label: "Unread" },
    { value: "archived", label: "Archived" },
  ];

  const handleTabsChange = (event, value) => {
    console.log(value);
    setCurrentTab(value);
  };

  const [chat, setChat] = useState(0);

  const handleChooseChat = (value) => {
    setChat(value);
  };
  const theme = useTheme();
  const navigate = useNavigate();
  return (
    <RootWrapper>
      <Stack direction="row" justifyContent="flex-end" sx={{ mb: 1 }}>
        <Tooltip
          TransitionComponent={Fade}
          TransitionProps={{ timeout: 400 }}
          title="Home"
        >
          <IconButton
            aria-label="Home"
            color="primary"
            onClick={() => navigate("/")}
          >
            <HomeIcon />
          </IconButton>
        </Tooltip>
        <Tooltip
          TransitionComponent={Fade}
          TransitionProps={{ timeout: 400 }}
          title="Community"
        >
          <IconButton
            aria-label="Community"
            color="primary"
            onClick={() => navigate("/community")}
          >
            <FeedIcon />
          </IconButton>
        </Tooltip>
      </Stack>

      <Box display="flex" alignItems="flex-start">
        <Avatar alt={user.name} src={user.avatar} />
        <Box
          sx={{
            ml: 1.5,
            flex: 1,
          }}
        >
          <Box
            display="flex"
            alignItems="flex-start"
            justifyContent="space-between"
          >
            <Box>
              <Typography variant="h6" noWrap>
                {user.name}
              </Typography>
              <Typography variant="subtitle1" noWrap>
                {user.jobtitle}
              </Typography>
            </Box>
            <IconButton
              sx={{
                p: 1,
              }}
              size="small"
              color="primary"
              title="Đang phát triển"
            >
              <SettingsTwoToneIcon fontSize="small" />
            </IconButton>
          </Box>

          {/* <FormControlLabel
                        control={
                            <Switch
                                checked={state.invisible}
                                onChange={handleChange}
                                name="invisible"
                                color="primary"
                            />
                        }
                        label="Invisible"
                    /> */}
        </Box>
      </Box>
      <MiniSearch title="Tìm kiếm ..." />
      <Typography
        sx={{
          mb: 1,
          mt: 2,
        }}
        variant="h3"
      >
        Chats
      </Typography>

      <TabsContainerWrapper>
        <Tabs
          onChange={handleTabsChange}
          value={currentTab}
          variant="scrollable"
          scrollButtons="auto"
          textColor="primary"
          indicatorColor="primary"
        >
          {tabs.map((tab) => (
            <Tab key={tab.value} label={tab.label} value={tab.value} />
          ))}
        </Tabs>
      </TabsContainerWrapper>
      {/* Tab view */}
      <Box mt={2}>
        {currentTab === "all" && (
          <List disablePadding component="div">
            {chats.map((item, index) => (
              <ListItemWrapper
                key={index}
                selected={chat === index}
                onClick={(e) => {
                  handleChooseChat(index);
                }}
              >
                <ListItemAvatar>
                  <Avatar src={item.avatar} />
                </ListItemAvatar>
                <ListItemText
                  sx={{
                    mr: 1,
                  }}
                  primaryTypographyProps={{
                    fontWeight: 500,
                    color: theme.palette.text.main,
                    variant: "subtitle1",
                    noWrap: true,
                  }}
                  secondaryTypographyProps={{
                    color: theme.palette.text2.main,
                    variant: "subtitle2",
                    noWrap: true,
                  }}
                  primary={item.name}
                  secondary={item.last}
                />
                {item.unread && (
                  <Label color="black">
                    <b>{item.unread}</b>
                  </Label>
                )}
              </ListItemWrapper>
            ))}
          </List>
        )}
        {currentTab === "unread" && (
          <List disablePadding component="div">
            {chats.map((item, index) => {
              item.unread && (
                <ListItemWrapper key={index}>
                  <ListItemAvatar>
                    <Avatar src={item.avatar} />
                  </ListItemAvatar>
                  <ListItemText
                    sx={{
                      mr: 1,
                    }}
                    primaryTypographyProps={{
                      color: "textPrimary",
                      variant: "subtitle1",
                      noWrap: true,
                    }}
                    secondaryTypographyProps={{
                      color: "textSecondary",
                      variant: "subtitle1",
                      noWrap: true,
                    }}
                    primary={item.name}
                    secondary={item.last}
                  />
                  {item.unread && (
                    <Label color="primary">
                      <b>{item.unread}</b>
                    </Label>
                  )}
                </ListItemWrapper>
              );
            })}
          </List>
        )}
        {currentTab === "archived" && (
          <Box pb={3}>
            <Divider
              sx={{
                mb: 3,
              }}
            />
            <AvatarSuccess>
              <CheckTwoToneIcon />
            </AvatarSuccess>
            <Typography
              sx={{
                mt: 2,
                textAlign: "center",
              }}
              variant="subtitle2"
            >
              Hurray! There are no archived chats!
            </Typography>
            <Divider
              sx={{
                mt: 3,
              }}
            />
          </Box>
        )}
      </Box>
    </RootWrapper>
  );
};

export default Drawer;
