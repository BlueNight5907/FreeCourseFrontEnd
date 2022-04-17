import {
  Button,
  CssBaseline,
  StyledEngineProvider,
  ThemeProvider,
} from "@mui/material";
import { useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import "./app.scss";
import { POST } from "./constants/services-constant";
import request from "./services/axios-client/request";
import { LOGIN_REQUEST } from "./store/types/data-types/auth-types";
import theme from "./theme";

function App() {
  const [mode, setMode] = useState("light");
  const dispatch = useDispatch();
  //Change app theme
  const appTheme = useMemo(() => {
    if (mode === "light") {
      return theme.lightMode;
    }
    return theme.darkMode;
  }, [mode]);

  const fetch = async () => {
    try {
      await request(POST, "/", {
        params: { app: "abc", foo: "bar" },
        body: { app: "abc", foo: "bar" },
      });
    } catch (error) {
      console.log(error.message);
    }
  };
  fetch();

  const login = () => {
    dispatch({
      type: LOGIN_REQUEST,
      payload: {
        username: 123,
        password: 123,
      },
    });
  };

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={appTheme}>
        <CssBaseline />
        <BrowserRouter>
          <div className="app"></div>
        </BrowserRouter>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App;
