import React from "react";
import ReactDOM from "react-dom/client";
import { createHashRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Dashboard from "./pages/dashboard";
import Projects from "./pages/projects";

// Route configuration inside BowisWM workspace layouts
const Router = createHashRouter([
  {
    path: "/",
    element: <Dashboard defaultWorkspace={1} />,
  },
  {
    path: "/projects",
    element: <Projects />,
  }
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={Router} />
  </React.StrictMode>
);
