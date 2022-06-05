import {
  Box,
  CssBaseline,
  StyledEngineProvider,
  ThemeProvider,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import "./app.scss";
import theme from "./theme";
import Routes from "./pages/routes";
import PageLoading from "./containers/loading/PageLoading";

const boxStyle = {
  backgroundColor: (theme) => theme.palette.background.main,
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
};

function App() {
  const setting = useSelector((state) => state.setting);
  const [mode, setMode] = useState("light");

  //Site effect
  useEffect(() => {
    setMode(setting.mode);
  }, [setting]);

  //Change app theme
  const appTheme = useMemo(() => {
    if (mode === "light") {
      return theme.lightMode;
    }
    return theme.darkMode;
  }, [mode]);
  appTheme.components = {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: appTheme.palette.foreground.main,
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        input: {
          height: "unset",
          fontSize: appTheme.typography.body1.fontSize,
        },
      },
    },
  };
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={appTheme}>
        <CssBaseline />
        <Box sx={boxStyle} className="app">
          <Routes />
          <PageLoading />
        </Box>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App;
