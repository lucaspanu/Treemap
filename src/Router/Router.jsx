import React from "react";
import routes from "./routes";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomePage from "../page/HomePage/HomePage";
import ErrorPage from "../page/ErrorPage/ErrorPage";
import HiMarc from "../page/HomePage/HiMarc";

const Router = () => {
  const router = createBrowserRouter([
    {
      path: routes.root,
      element: <HomePage />,
      errorElement: <ErrorPage />,
    },
    {
      path: routes.hiMarc,
      element: <HiMarc />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default Router;
