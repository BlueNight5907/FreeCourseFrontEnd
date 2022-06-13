import {
  Box,
  styled,
  Divider,
  Drawer,
  IconButton,
  useTheme
} from '@mui/material';

export const RootWrapper = styled(Box)(
  ({ theme }) => `
         height: 100vh;
         display: flex;
  `
);

export const Sidebar = styled(Box)(
  ({ theme }) => `
          width: 360px;
          background: ${theme.palette.foreground.main};
          border-right: ${"rgba(34, 51, 84, 0.1) solid 1.2px"};
  `
);

export const ChatWindow = styled(Box)(
  () => `
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          flex: 1;
  `
);

export const ChatTopBar = styled(Box)(
  ({ theme }) => `
          background: ${theme.palette.foreground.main};
          border-bottom: ${theme.palette.select.main} solid 1px;
          padding: ${theme.spacing(1.2)};
          align-items: center;
  `
);

export const IconButtonToggle = styled(IconButton)(
  ({ theme }) => `
    width: ${theme.spacing(4)};
    height: ${theme.spacing(4)};
    background: ${/*theme.colors.alpha.white[100]*/theme.palette.select.main};
  `
);

export const DrawerWrapperMobile = styled(Drawer)(
  () => `
      width: 340px;
      flex-shrink: 0;
    & > .MuiPaper-root {
          width: 350px;
          z-index: 3;
    }
  `
);