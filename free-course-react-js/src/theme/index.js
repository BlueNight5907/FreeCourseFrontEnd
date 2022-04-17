import { createTheme } from "@mui/material/styles";
import { darkPalette, lightPalette } from "./palette";
import typography from "./typography";
import breakpoints from "./breakpoints";
const lightMode = createTheme({
  palette: {
    mode: "light",
    ...lightPalette,
  },
  typography: typography,
  spacing: 10,
  breakpoints: breakpoints,
});

const darkMode = createTheme({
  palette: {
    mode: "dark",
    ...darkPalette,
  },
  typography: typography,
  spacing: 10,
  breakpoints: breakpoints,
});

const theme = {
  lightMode,
  darkMode,
};
export default theme;
