import React from "react";
import ReactDOM from "react-dom/client";

import { router } from "./router/router";

import { store } from "./store";
import { RouterProvider } from "react-router-dom";

import { Provider } from "react-redux";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);