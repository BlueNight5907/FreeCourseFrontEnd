import {
    Box,
    Avatar,
    Typography
} from '@mui/material';

const SmallCard = (props) => {
    const { name, note, avatar, onClick } = props;
    return (
        <div
            className="user-dropdown flex flex-row items-center gap-2 cursor-pointer"
            onClick={onClick}
        >
            <Avatar
                alt={avatar}
                src={avatar}
                sx={{
                    height: 38,
                    width: 38,
                }}
            />
            <Box className="user-information hidden lg:flex flex-col justify-center ">
                <Typography
                    variant="subtitle1"
                    sx={{
                        fontWeight: 500,
                        color: (theme) => theme.palette.text.main,
                    }}
                >
                    {name}
                </Typography>
                <Typography
                    sx={{
                        fontSize: 10,
                        color: (theme) => theme.palette.text2.main,
                    }}
                >
                    {note}
                </Typography>
            </Box>
        </div>
    );
}

export default SmallCard;