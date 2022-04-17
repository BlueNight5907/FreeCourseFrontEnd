import React from "react";
import App from "./App";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

import rootSaga from "./store/sagas";
import store, { sagaMiddleware } from "./store";

//Run saga
sagaMiddleware.run(rootSaga);

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App tab="home" />
    </Provider>
  </React.StrictMode>
);
