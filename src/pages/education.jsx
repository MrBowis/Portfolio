import React from "react";
import Nav from "../components/nav";
import Footer from "../components/footer";
import { Card, CardHeader, CardFooter, Image, Button } from "@nextui-org/react";
import { useState } from "react";

export default function Education() {
  const [institutions, setInstitution] = useState([
    {
      name: "Universidad de las Fuerzas Armadas",
      name2: "ESPE",
      logo: "https://uth.espe.edu.ec/wp-content/uploads/2018/11/espe-banner-administrativo.jpg",
      urlPage: "https://www.espe.edu.ec/",
      inicio: "2021/10/01",
      fin: "In progress",
    },
    {
      name: "Unidad Educativa Particular Adventista",
      name2: "GEDEÓN",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRG35_RG34i3KeCfOBlJ6b-nUJzvUhyh6eM1Q&s",
      urlPage: "https://ueag.educacionadventista.com/",
      inicio: "2008/09/01",
      fin: "2021/06/25",
    },
  ]);

  return (
    <>
      <Nav></Nav>
      <main className="flex flex-grow justify-center items-center h-full">
        <div className="my-16 flex justify-center items-start overflow-y-auto h-96">
          <div className="grid grid-cols-2 gap-2 max-sm:grid-cols-1 max-sm:gap-1">
            {institutions.map((i) => (
              <Card
                isFooterBlurred
                className="max-w-[400px] m-5 h-[200px]"
              >
                <CardHeader className="absolute z-10 top-1 flex-col items-start">
                  <p className="text-tiny text-white/60 uppercase font-bold bg-neutral-900/85 p-2 rounded-r-lg">
                    {i.name}
                  </p>
                  <h4 className="text-white/90 font-medium text-xl bg-neutral-900/85 p-2 rounded-br-lg">
                    {i.name2}
                  </h4>
                </CardHeader>
                <Image
                  removeWrapper
                  alt="Relaxing app background"
                  className="z-0 w-full h-full object-cover object-bottom"
                  src={i.logo}
                />
                <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
                  <div className="flex flex-grow gap-2 items-center">
                    <div className="flex flex-col">
                      <p className="text-tiny text-white/60">
                        Start: {i.inicio}
                      </p>
                      <p className="text-tiny text-white/60">End: {i.fin}</p>
                    </div>
                  </div>
                  <a href={i.urlPage} target="_blank">
                    <Button radius="full" size="sm">
                      Visit
                    </Button>
                  </a>
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
