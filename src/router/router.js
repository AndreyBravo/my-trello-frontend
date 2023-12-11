import { createBrowserRouter } from "react-router-dom";

import { Registration, Login, Admin } from "../pages";
import App from "../App";
import { KPI } from "../pages/Admin/KPI.jsx";
import { MTable } from "../components";
import Stats from "../pages/Admin/Stats";

const router = createBrowserRouter([
  {
    path: "/admin",
    element: <Admin />,
    children: [
      {
        path: "kpi",
        element: <KPI />,
      },
      {
        path: "stats",
        element: <Stats />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Registration />,
  },
  {
    path: "/",
    element: <App />,
  },
]);

export { router };
