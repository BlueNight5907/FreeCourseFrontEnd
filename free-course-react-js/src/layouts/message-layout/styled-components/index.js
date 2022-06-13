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
         height: calc(100vh - ${/*theme.header.height*/0}px);
         display: flex;
  `
);

export const Sidebar = styled(Box)(
  ({ theme }) => `
          width: 360px;
          background: ${/*theme.colors.alpha.white[100]*/ "#0075EB11"};
          border-right: ${/*theme.colors.alpha.black[10]*/ "black"} solid 1px;
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
          background: ${/*theme.colors.alpha.white[100]*/theme.palette.foreground.main};
          border-bottom: ${/*theme.colors.alpha.black[10]*/ theme.palette.select.main} solid 1px;
          padding: ${theme.spacing(2)};
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