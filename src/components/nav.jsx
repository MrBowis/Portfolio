import React from "react";
import { Disclosure } from "@headlessui/react";
import perfil from "/src/assets/perfil.jpg";

const user = {
  name: "Alejandro Andrade",
  email: "02alejo20@gmail.com",
  imageUrl: perfil,
};

const navigation = [
  { name: "Dashboard", href: "/Portfolio/", current: true },
  { name: "Projects", href: "/Portfolio/projects", current: false },
  { name: "Education", href: "/Portfolio/education", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Nav() {
  return (
    <div>
      <Disclosure as="nav" className="bg-gray-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <div className="ml-10 flex items-baseline space-x-4">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    aria-current={item.current ? "page" : undefined}
                    className={classNames(
                      item.current
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                      "rounded-md px-3 py-2 text-sm font-medium"
                    )}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Disclosure>
    </div>
  );
}
