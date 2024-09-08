import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import Projects from "./pages/projects";
import Education from "./pages/education";
import { createHashRouter, RouterProvider } from "react-router-dom";

const Router = createHashRouter([
   {
      path: "/Portfolio/",
      element: <Dashboard />,
   },
   {
      path: "/Portfolio/projects",
      element: <Projects />,
   },
   {
      path: "/Portfolio/education",
      element: <Education />,
   }
]);

const App = () => {
  return (
    <>
      <RouterProvider router={Router} />
    </>
  );
};

export default App;
