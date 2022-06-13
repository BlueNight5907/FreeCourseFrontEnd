import { Box, Avatar, Typography, Card, styled, Divider } from '@mui/material';

import {
    formatDistance,
    format,
    subDays,
    subHours,
    subMinutes,
    formatDistanceToNow
} from 'date-fns';
import ScheduleTwoToneIcon from '@mui/icons-material/ScheduleTwoTone';

const DividerWrapper = styled(Divider)(
    ({ theme }) => `
      .MuiDivider-wrapper {
        border-radius: 12px;
        text-transform: none;
        background: ${"#FFFFFF00"};
        font-size: ${theme.typography.pxToRem(13)};
        color: ${theme.palette.text.primary};
      }
`
);

const CardWrapperPrimary = styled(Card)(
    ({ theme }) => `
      background: ${/*theme.palette.primary*/ "#0075EB"};
      color: ${theme.palette.primary.contrastText};
      padding: ${theme.spacing(1.2)};
      border-radius: 15px;
      border-top-right-radius: 15px;
      max-width: 380px;
      display: inline-flex;
      margin-right: 10px
`
);

const CardWrapperSecondary = styled(Card)(
    ({ theme }) => `
      background: ${"#DFDFDF"};
      color: ${"black"};
      padding: ${theme.spacing(1.2)};
      border-radius: 15px;
      border-top-left-radius: 15px;
      max-width: 380px;
      display: inline-flex;
      margin-left: 10px;
`
);

const BubbleChat = ({ data, ...props }) => {
    const { userID, username, avatar, message, time, owned = true } = data;
    console.log(data);
    return (
        <Box
            display="flex"
            alignItems="center" // "flex-start"
            justifyContent={owned ? "flex-end" : "flex-start"}
            py={1}
            key={userID}
        >

            {owned ? (
                <>
                    <CardWrapperPrimary
                        title={time}
                        ml={1}
                    >
                        {message}
                    </CardWrapperPrimary>
                    <Avatar
                        variant="circular"
                        sx={{
                            width: 30,
                            height: 30
                        }}
                        alt={username}
                        src={avatar}
                    />
                </>

            ) : (
                <>
                    <Avatar
                        variant="circular"
                        sx={{
                            width: 30,
                            height: 30
                        }}
                        title={username}
                        alt={username}
                        src={avatar}
                    />
                    <CardWrapperSecondary
                        title={time}
                        ml={1}
                    >
                        {message}
                    </CardWrapperSecondary>
                </>
            )}

        </Box>
    );
}

const mock = [
    {
        userID: 1,
        username: "Test1",
        avatar: "a",
        message: "Hello, what your name ?",
        time: "1/1/2022",
        owned: true
    },
    {
        userID: 2,
        username: "Test2",
        avatar: "a",
        message: "My name is Test 2, and you ?",
        time: "1/1/2022",
        owned: false
    },
    {
        userID: 1,
        username: "Test 1",
        avatar: "a",
        message: "I'm Test 1, nice to meet you",
        time: "1/1/2022",
        owned: true
    },
    {
        userID: 2,
        username: "Test 2",
        avatar: "a",
        message: "Nice to meet you too",
        time: "1/1/2022",
        owned: false
    }
]

function MessageContent() {
    return (
        <Box p={3}>
            <DividerWrapper>
                {format(subDays(new Date(), 3), 'MMMM dd yyyy')}
            </DividerWrapper>
            {mock.map((data, key) => <BubbleChat key={key} data={data} />)}
        </Box>
    );
}

export default MessageContent;