import {
  Box,
  CssBaseline,
  StyledEngineProvider,
  ThemeProvider,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import "./app.scss";
import SamplePage from "./pages/sample-page/SamplePage";

import theme from "./theme";

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

  const boxStyle = {
    backgroundColor: (theme) => theme.palette.background.main,
    minHeight: "100vh",
  };

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={appTheme}>
        <CssBaseline />
        <Box sx={boxStyle} className="app">
          <SamplePage />
        </Box>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App;
