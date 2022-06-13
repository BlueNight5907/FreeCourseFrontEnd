import { useState } from 'react';
import {
    Box,
    IconButton,
    Tooltip,
    Avatar,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Drawer,
    Divider,
    Typography,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    styled,
    useTheme
} from '@mui/material';
// import { formatDistance, subMinutes } from 'date-fns';
import CallTwoToneIcon from '@mui/icons-material/CallTwoTone';
import VideoCameraFrontTwoToneIcon from '@mui/icons-material/VideoCameraFrontTwoTone';
import InfoTwoToneIcon from '@mui/icons-material/InfoTwoTone';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import ColorLensTwoToneIcon from '@mui/icons-material/ColorLensTwoTone';
import NotificationsOffTwoToneIcon from '@mui/icons-material/NotificationsOffTwoTone';
import EmojiEmotionsTwoToneIcon from '@mui/icons-material/EmojiEmotionsTwoTone';
import CancelTwoToneIcon from '@mui/icons-material/CancelTwoTone';
import BlockTwoToneIcon from '@mui/icons-material/BlockTwoTone';
import WarningTwoToneIcon from '@mui/icons-material/WarningTwoTone';
import DescriptionTwoToneIcon from '@mui/icons-material/DescriptionTwoTone';
import { formatDistance, subMinutes } from 'date-fns';

const RootWrapper = styled(Box)(
    ({ theme }) => `
        @media (min-width: ${theme.breakpoints.values.md}px) {
          display: flex;
          align-items: center;
          justify-content: space-between;
      }
`
);

const ListItemIconWrapper = styled(ListItemIcon)(
    ({ theme }) => `
        min-width: 36px;
        color: ${theme.palette.foreground.main};
`
);

const AccordionSummaryWrapper = styled(AccordionSummary)(
    ({ theme }) => `
        &.Mui-expanded {
          min-height: 48px;
        }
        .MuiAccordionSummary-content.Mui-expanded {
          margin: 12px 0;
        }
        &.MuiButtonBase-root {
          margin-bottom: ${theme.spacing(0.5)};
          &:last-child {
            margin-bottom: 0;
          }
          &.Mui-expanded,
          &:hover {
          }
        }
`
);

const Header = () => {
    const theme = useTheme();

    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const [expanded, setExpanded] = useState(false);

    const handleChange = (section) => (event, isExpanded) => {
        setExpanded(isExpanded ? section : false);
    };

    return (
        <>
            <RootWrapper>
                <Box display="flex" alignItems="center">
                    <Avatar
                        variant="circular"
                        sx={{
                            width: 48,
                            height: 48
                        }}
                        alt=""
                        src=""
                    />
                    <Box ml={1}>
                        <Typography variant="h6">Zain Baptista</Typography>
                        <Typography variant="caption">
                            {formatDistance(subMinutes(new Date(), 8), new Date(), {
                                addSuffix: true
                            })}
                        </Typography>
                    </Box>
                </Box>
                <Box
                    sx={{
                        display: { xs: 'none', lg: 'flex' }
                    }}
                >
                    <Tooltip placement="bottom" title="Voice call">
                        <IconButton color="primary">
                            <CallTwoToneIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip placement="bottom" title="Video call">
                        <IconButton color="primary">
                            <VideoCameraFrontTwoToneIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip placement="bottom" title="Information">
                        <IconButton color="primary" onClick={handleDrawerToggle}>
                            <InfoTwoToneIcon />
                        </IconButton>
                    </Tooltip>
                </Box>
            </RootWrapper>
            <Drawer
                sx={{
                    display: { xs: 'none', md: 'flex' }
                }}
                variant="temporary"
                anchor={'right'}
                open={mobileOpen}
                onClose={handleDrawerToggle}
                elevation={9}
            >
                <Box
                    sx={{
                        minWidth: 360
                    }}
                    p={2}
                >
                    <Box
                        sx={{
                            textAlign: 'center'
                        }}
                    >
                        <Avatar
                            sx={{
                                mx: 'auto',
                                my: 2,
                                width: theme.spacing(10),
                                height: theme.spacing(10)
                            }}
                            variant="circular"
                            alt="Foo"
                            src="Foo"
                        />
                        <Typography variant="h6">Foo</Typography>
                        <Typography variant="subtitle2">
                            Active{' '}
                            {formatDistance(subMinutes(new Date(), 7), new Date(), {
                                addSuffix: true
                            })}
                        </Typography>
                    </Box>
                    <Divider
                        sx={{
                            my: 3
                        }}
                    />

                    <Accordion
                        expanded={expanded === '1'}
                        onChange={handleChange('1')}
                    >
                        <AccordionSummaryWrapper expandIcon={<ExpandMoreIcon />}>
                            <Typography variant="h5">Customize Chat</Typography>
                        </AccordionSummaryWrapper>
                        <AccordionDetails
                            sx={{
                                p: 0
                            }}
                        >
                            <List component="nav">
                                <ListItem button>
                                    <ListItemIconWrapper>
                                        <SearchTwoToneIcon />
                                    </ListItemIconWrapper>
                                    <ListItemText
                                        primary="Search in Conversation"
                                        primaryTypographyProps={{ variant: 'h5' }}
                                    />
                                </ListItem>
                                <ListItem button>
                                    <ListItemIconWrapper>
                                        <ColorLensTwoToneIcon />
                                    </ListItemIconWrapper>
                                    <ListItemText
                                        primary="Change Theme Styling"
                                        primaryTypographyProps={{ variant: 'h5' }}
                                    />
                                </ListItem>
                                <ListItem button>
                                    <ListItemIconWrapper>
                                        <EmojiEmotionsTwoToneIcon />
                                    </ListItemIconWrapper>
                                    <ListItemText
                                        primary="Choose Default Emoji"
                                        primaryTypographyProps={{ variant: 'h5' }}
                                    />
                                </ListItem>
                            </List>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion
                        expanded={expanded === '2'}
                        onChange={handleChange('2')}
                    >
                        <AccordionSummaryWrapper expandIcon={<ExpandMoreIcon />}>
                            <Typography variant="h5">Privacy & Support</Typography>
                        </AccordionSummaryWrapper>
                        <AccordionDetails
                            sx={{
                                p: 0
                            }}
                        >
                            <List component="nav">
                                <ListItem button>
                                    <ListItemIconWrapper>
                                        <NotificationsOffTwoToneIcon />
                                    </ListItemIconWrapper>
                                    <ListItemText
                                        primary="Turn off notifications"
                                        primaryTypographyProps={{ variant: 'h5' }}
                                    />
                                </ListItem>
                                <ListItem button>
                                    <ListItemIconWrapper>
                                        <CancelTwoToneIcon />
                                    </ListItemIconWrapper>
                                    <ListItemText
                                        primary="Ignore all messages"
                                        primaryTypographyProps={{ variant: 'h5' }}
                                    />
                                </ListItem>
                                <ListItem button>
                                    <ListItemIconWrapper>
                                        <BlockTwoToneIcon />
                                    </ListItemIconWrapper>
                                    <ListItemText
                                        primary="Block user"
                                        primaryTypographyProps={{ variant: 'h5' }}
                                    />
                                </ListItem>
                                <ListItem button>
                                    <ListItemIconWrapper>
                                        <WarningTwoToneIcon />
                                    </ListItemIconWrapper>
                                    <ListItemText
                                        primary="Something's Wrong"
                                        primaryTypographyProps={{ variant: 'h5' }}
                                        secondary="Report the conversation and provide feedback"
                                        secondaryTypographyProps={{ variant: 'subtitle1' }}
                                    />
                                </ListItem>
                            </List>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion
                        expanded={expanded === '3'}
                        onChange={handleChange('3')}
                    >
                        <AccordionSummaryWrapper expandIcon={<ExpandMoreIcon />}>
                            <Typography variant="h5">Shared Files</Typography>
                        </AccordionSummaryWrapper>
                        <AccordionDetails
                            sx={{
                                p: 0
                            }}
                        >
                            <List component="nav">
                                <ListItem button>
                                    <ListItemIconWrapper>
                                        <DescriptionTwoToneIcon />
                                    </ListItemIconWrapper>
                                    <ListItemText
                                        primary="HolidayPictures.zip"
                                        primaryTypographyProps={{ variant: 'h5' }}
                                        secondary="You opened in the past year"
                                        secondaryTypographyProps={{ variant: 'subtitle1' }}
                                    />
                                </ListItem>
                                <ListItem button>
                                    <ListItemIconWrapper>
                                        <DescriptionTwoToneIcon />
                                    </ListItemIconWrapper>
                                    <ListItemText
                                        primary="2021Screenshot.jpg"
                                        primaryTypographyProps={{ variant: 'h5' }}
                                        secondary="You edited this file yesterday"
                                        secondaryTypographyProps={{ variant: 'subtitle1' }}
                                    />
                                </ListItem>
                                <ListItem button>
                                    <ListItemIconWrapper>
                                        <DescriptionTwoToneIcon />
                                    </ListItemIconWrapper>
                                    <ListItemText
                                        primary="PresentationDeck.pdf"
                                        primaryTypographyProps={{ variant: 'h5' }}
                                        secondary="Never opened"
                                        secondaryTypographyProps={{ variant: 'subtitle1' }}
                                    />
                                </ListItem>
                            </List>
                        </AccordionDetails>
                    </Accordion>
                </Box>
            </Drawer>
        </>
    );
}

export default Header;