import React from "react";
import Nav from "../components/nav";
import Footer from "../components/footer";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
} from "@nextui-org/react";

export default function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios.get("https://api.github.com/users/mrbowis/repos").then((response) => {
      setProjects(response.data);
    });
  });

  return (
    <>
      <Nav></Nav>
      <main className="flex flex-grow justify-center items-center">
        {/* Presentar el nombre de los repositorios obtenidos */}
        <div className="w-100 my-16 flex justify-center items-center h-96 overflow-auto">
          <div className="grid grid-cols-2 gap-2 max-sm:grid-cols-1 max-sm:gap-1">
            {projects.map((project) => (
              <Card className="max-w-[400px] m-5">
                <CardHeader className="flex gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-folder"
                    viewBox="0 0 16 16"
                  >
                    <path d="M.54 3.87.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 14H2.826a2 2 0 0 1-1.991-1.819l-.637-7a2 2 0 0 1 .342-1.31zM2.19 4a1 1 0 0 0-.996 1.09l.637 7a1 1 0 0 0 .995.91h10.348a1 1 0 0 0 .995-.91l.637-7A1 1 0 0 0 13.81 4zm4.69-1.707A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981l.006.139q.323-.119.684-.12h5.396z" />
                  </svg>
                  <div className="flex flex-col">
                    <p className="text-md">{project.name}</p>
                    <p className="text-small text-default-500">
                      {project.owner.login}
                    </p>
                  </div>
                </CardHeader>
                <Divider />
                <CardBody>
                  {project.description ? (
                    <p>{project.description}</p>
                  ) : (
                    <p>{"Created at: " + project.created_at.slice(0, 10)}</p>
                  )}
                </CardBody>
                <Divider />
                <CardFooter>
                  <Link isExternal showAnchorIcon href={project.html_url}>
                    Visit source code on GitHub.
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer></Footer>
    </>
  );
}
