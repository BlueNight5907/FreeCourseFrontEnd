/* eslint-disable import/no-unresolved */
import React from "react";
import App from "./App";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import rootSaga from "./store/sagas";
import store, { sagaMiddleware } from "./store";
import { BrowserRouter } from "react-router-dom";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "prismjs/themes/prism-tomorrow.css";

//Run saga
sagaMiddleware.run(rootSaga);

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App tab="home" />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
