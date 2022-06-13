import { useState, ChangeEvent } from 'react';
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
    styled
} from '@mui/material';
import { formatDistance, subMinutes, subHours } from 'date-fns';
import SettingsTwoToneIcon from '@mui/icons-material/SettingsTwoTone';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import Label from 'components/label/Label';

import CheckTwoToneIcon from '@mui/icons-material/CheckTwoTone';
import AlarmTwoToneIcon from '@mui/icons-material/AlarmTwoTone';
import { Link as RouterLink } from 'react-router-dom';
import MiniSearch from 'components/search/MiniSearch';

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

const MeetingBox = styled(Box)(
    ({ theme }) => `
          background-color: ${/*lighten(theme.palette.foreground.main, 0.5)*/"green"};
          margin: ${theme.spacing(2)} 0;
          border-radius: ${/*theme.general.borderRadius*/"10px"};
          padding: ${theme.spacing(2)};
    `
);

const RootWrapper = styled(Box)(
    ({ theme }) => `
        padding: ${theme.spacing(1.5)};
  `
);

const ListItemWrapper = styled(ListItemButton)(
    ({ theme }) => `
        &.MuiButtonBase-root {
            margin: ${theme.spacing(0.5)} 0;
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
            &.Mui-selected {
                color: red;
            }
        }
  `
);

const chats = [
    {
        avatar: avt,
        name: "TADA",
        last: "Hello nice to meet you",
        unread: 3
    },
    {
        avatar: avt,
        name: "TADA",
        last: "Hello nice to meet you"
    },
    {
        avatar: avt,
        name: "TADA",
        last: "Hello nice to meet you",
    },
    {
        avatar: avt,
        name: "TADA",
        last: "Hello nice to meet you",
    },
    {
        avatar: avt,
        name: "TADA",
        last: "Hello nice to meet you",
        unread: 1
    },
    {
        avatar: avt,
        name: "TADA",
        last: "Hello nice to meet you",
        unread: 10
    },

];

const Drawer = () => {
    const user = {
        name: 'Nguyễn Huỳnh Tất Đạt',
        avatar: avt,
        jobtitle: 'Software Developer'
    };

    const [state, setState] = useState({
        invisible: true
    });

    const handleChange = (event) => {
        setState({
            ...state,
            [event.target.name]: event.target.checked
        });
    };

    const [currentTab, setCurrentTab] = useState('all');

    const tabs = [
        { value: 'all', label: 'All' },
        { value: 'unread', label: 'Unread' },
        { value: 'archived', label: 'Archived' }
    ];

    const handleTabsChange = (event, value) => {
        console.log(value);
        setCurrentTab(value);
    };

    const [chat, setChat] = useState(0);

    const handleChooseChat = (value) => {
        setChat(value);
    }
    return (
        <RootWrapper>
            <Box display="flex" alignItems="flex-start">
                <Avatar alt={user.name} src={user.avatar} />
                <Box
                    sx={{
                        ml: 1.5,
                        flex: 1
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
                                p: 1
                            }}
                            size="small"
                            color="primary"
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
                align='center'
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
                {currentTab === 'all' && (
                    <List disablePadding component="div">
                        {chats.map((item, index) => (
                            <ListItemWrapper
                                key={index}
                                selected={chat === index}
                                onClick={(e) => {
                                    handleChooseChat(index);
                                }}>
                                <ListItemAvatar>
                                    <Avatar src={item.avatar} />
                                </ListItemAvatar>
                                <ListItemText
                                    sx={{
                                        mr: 1
                                    }}
                                    primaryTypographyProps={{
                                        color: 'textPrimary',
                                        variant: 'subtitle1',
                                        noWrap: true
                                    }}
                                    secondaryTypographyProps={{
                                        color: 'textSecondary',
                                        noWrap: true
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
                {currentTab === 'unread' && (
                    <List disablePadding component="div">
                        {chats.map((item, index) => {
                            item.unread &&
                                (
                                    <ListItemWrapper
                                        key={index}>
                                        <ListItemAvatar>
                                            <Avatar src={item.avatar} />
                                        </ListItemAvatar>
                                        <ListItemText
                                            sx={{
                                                mr: 1
                                            }}
                                            primaryTypographyProps={{
                                                color: 'textPrimary',
                                                variant: 'subtitle1',
                                                noWrap: true
                                            }}
                                            secondaryTypographyProps={{
                                                color: 'textSecondary',
                                                noWrap: true
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
                                )
                        })}
                    </List>
                )}
                {currentTab === 'archived' && (
                    <Box pb={3}>
                        <Divider
                            sx={{
                                mb: 3
                            }}
                        />
                        <AvatarSuccess>
                            <CheckTwoToneIcon />
                        </AvatarSuccess>
                        <Typography
                            sx={{
                                mt: 2,
                                textAlign: 'center'
                            }}
                            variant="subtitle2"
                        >
                            Hurray! There are no archived chats!
                        </Typography>
                        <Divider
                            sx={{
                                mt: 3
                            }}
                        />
                    </Box>
                )}
            </Box>
            <Box display="flex" pb={1} mt={2} alignItems="center">
                <Typography
                    sx={{
                        mr: 1
                    }}
                    variant="h3"
                >
                    Meetings
                </Typography>
                <Label color="success">
                    <b>2</b>
                </Label>
            </Box>
            <MeetingBox>
                <Typography variant="h4">Daily Design Meeting</Typography>

                <Box py={3} display="flex" alignItems="flex-start">
                    <AlarmTwoToneIcon />
                    <Box pl={1}>
                        <Typography
                            variant="subtitle2"
                            sx={{
                                lineHeight: 1
                            }}
                            color="text.primary"
                        >
                            10:00 - 11:30
                        </Typography>
                        <Typography variant="subtitle1">
                            {formatDistance(subMinutes(new Date(), 12), new Date(), {
                                addSuffix: true
                            })}
                        </Typography>
                    </Box>
                </Box>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                    <AvatarGroup>
                        <Tooltip arrow title="View profile for Remy Sharp">
                            <Avatar
                                sx={{
                                    width: 28,
                                    height: 28
                                }}
                                component={RouterLink}
                                to="#"
                                alt="Remy Sharp"
                                src="/static/images/avatars/1.jpg"
                            />
                        </Tooltip>
                        <Tooltip arrow title="View profile for Travis Howard">
                            <Avatar
                                sx={{
                                    width: 28,
                                    height: 28
                                }}
                                component={RouterLink}
                                to="#"
                                alt="Travis Howard"
                                src="/static/images/avatars/2.jpg"
                            />
                        </Tooltip>
                        <Tooltip arrow title="View profile for Craig Vaccaro">
                            <Avatar
                                sx={{
                                    width: 28,
                                    height: 28
                                }}
                                component={RouterLink}
                                to="#"
                                alt="Craig Vaccaro"
                                src="/static/images/avatars/3.jpg"
                            />
                        </Tooltip>
                    </AvatarGroup>

                    <Button variant="contained" size="small">
                        Attend
                    </Button>
                </Box>
            </MeetingBox>

            <MeetingBox>
                <Typography variant="h4">Investors Council Meeting</Typography>

                <Box py={3} display="flex" alignItems="flex-start">
                    <AlarmTwoToneIcon />
                    <Box pl={1}>
                        <Typography
                            variant="subtitle2"
                            sx={{
                                lineHeight: 1
                            }}
                            color="text.primary"
                        >
                            14:30 - 16:15
                        </Typography>
                        <Typography variant="subtitle1">
                            {formatDistance(subHours(new Date(), 4), new Date(), {
                                addSuffix: true
                            })}
                        </Typography>
                    </Box>
                </Box>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                    <AvatarGroup>
                        <Tooltip arrow title="View profile for Travis Howard">
                            <Avatar
                                sx={{
                                    width: 28,
                                    height: 28
                                }}
                                component={RouterLink}
                                to="#"
                                alt="Travis Howard"
                                src="/static/images/avatars/4.jpg"
                            />
                        </Tooltip>
                        <Tooltip arrow title="View profile for Craig Vaccaro">
                            <Avatar
                                sx={{
                                    width: 28,
                                    height: 28
                                }}
                                component={RouterLink}
                                to="#"
                                alt="Craig Vaccaro"
                                src="/static/images/avatars/5.jpg"
                            />
                        </Tooltip>
                    </AvatarGroup>

                    <Button variant="contained" size="small">
                        Attend
                    </Button>
                </Box>
            </MeetingBox>
        </RootWrapper>
    );
}

export default Drawer;