import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

const RootStyle = styled('div')({
    flexGrow: 1,
    height: '100%',
    marginRight: '0.1em',
    overflowY: 'auto',
    '&::-webkit-scrollbar': {
        width: '0.4em',
    },
    '&::-webkit-scrollbar-track': {
        boxShadow: 'inset 0 0 6px rgba(1,1,0,0.00)',
        webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
    },
    '&::-webkit-scrollbar-thumb': {
        backgroundColor: '#E8EAED',
        borderRadius: '12px',
    },
    '&::-webkit-scrollbar-thumb:hover': {
        backgroundColor: '#BCC1CB',
    }
});

Scrollbar.propTypes = {
    children: PropTypes.node.isRequired,
    sx: PropTypes.object
};

export default function Scrollbar({ children, sx, ...other }) {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
    );

    if (isMobile) {
        return (
            <Box sx={{ overflowX: 'auto', ...sx }} {...other}>
                {children}
            </Box>
        );
    }

    return (
        <RootStyle>
            {children}
        </RootStyle>
    );
}
