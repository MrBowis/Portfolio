import React from "react";
import { Disclosure } from "@headlessui/react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Nav() {
  const [navigation, setNavigation] = useState([
    { name: "Dashboard", href: "/"},
    { name: "Projects", href: "/projects"},
    { name: "Education", href: "/education"},
  ]);

  return (
    <div>
      <Disclosure as="nav" className="bg-gray-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium ease-in-out duration-250"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </Disclosure>
    </div>
  );
}
