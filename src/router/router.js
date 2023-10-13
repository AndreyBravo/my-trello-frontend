import { createBrowserRouter } from "react-router-dom";

import { Registration, Login } from "../pages";
import App from "../App";



const router = createBrowserRouter([
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
