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

const boxStyle = {
  backgroundColor: (theme) => theme.palette.background.main,
  minHeight: "100vh",
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

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={appTheme}>
        <CssBaseline />
        <Box sx={boxStyle} className="app">
          <Routes />
        </Box>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App;
