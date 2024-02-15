import React from "react";
import routes from "./routes";
import { createHashRouter, RouterProvider } from "react-router-dom";

import HomePage from "../page/HomePage/HomePage";
import ErrorPage from "../page/ErrorPage/ErrorPage";

const Router = () => {
  const router = createHashRouter([
    {
      path: routes.root,
      element: <HomePage />,
      errorElement: <ErrorPage />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default Router;
