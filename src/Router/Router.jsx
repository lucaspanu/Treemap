import React from "react";
import routes from "./routes";
import { createHashRouter, RouterProvider } from "react-router-dom";

import HomePage from "../page/HomePage/HomePage";
import ErrorPage from "../page/ErrorPage/ErrorPage";
import HiMarc from "../page/HomePage/HiMarc";

const Router = () => {
  const router = createHashRouter([
    {
      path: routes.root,
      element: <HomePage />,
      errorElement: <ErrorPage />,
    },
    {
      path: routes.hiMarc,
      element: <HiMarc />,
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
