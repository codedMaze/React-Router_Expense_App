import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { logoutAction } from "./action/logout";
import Main, { mainLoader } from "./layout/Main";
import DashBoard, { dashboardAction, dashboardLoader } from "./pages/DashBoard";
import Error from "./pages/Error";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    loader: mainLoader,
    errorElement: <Error />,

    children: [
      {
        index: true,
        element: <DashBoard />,
        loader: dashboardLoader,
        action: dashboardAction,
      },
      {
        path: "logout",
        action: logoutAction,
      },
    ],
  },
]);

const App = () => {
  return (
    <div className="App">
      <RouterProvider router={router} />
      <ToastContainer />
    </div>
  );
};

export default App;
