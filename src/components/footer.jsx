import React from "react";
import { User } from "@nextui-org/user";
import perfil from "../assets/perfil.jpg";

export default function Footer() {
  return (
    <>
      <footer className="bg-gray-800 text-white text-center py-10 flex flex-row justify-evenly items-center">
        <div>
          <User
            className="my-4"
            name="Alejandro Andrade"
            description="Software Engineering student"
            avatarProps={{
              src: perfil,
            }}
          />
          <p className="text-slate-400 my-4">&copy; 2024, All Rights Reserved</p>
        </div>
        <hr className="py-16 outline outline-1" />
        <div>
          <p>Contact</p>
        </div>
      </footer>
    </>
  );
}
