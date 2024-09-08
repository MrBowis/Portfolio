import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { NextUIProvider } from "@nextui-org/react";
import "./index.css";
import Dashboard from "./pages/dashboard";
import Projects from "./pages/projects";
import Education from "./pages/education";
import { createHashRouter, RouterProvider } from "react-router-dom";

const Router = createHashRouter([
   {
      path: "/",
      element: <Dashboard />,
   },
   {
      path: "/projects",
      element: <Projects />,
   },
   {
      path: "/education",
      element: <Education />,
   }
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={Router} />
    <NextUIProvider>
      <BrowserRouter>
      </BrowserRouter>
    </NextUIProvider>
  </React.StrictMode>
);
