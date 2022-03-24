import React from "react";
import Avatar from "../Avatar";
import { AiOutlineHome } from "react-icons/ai";
import { MdOutlineExplore } from "react-icons/md";

const navigation = [
  { id: "1", name: "首頁", href: "#", icon: <AiOutlineHome /> },
  { id: "2", name: "探索", href: "#", icon: <MdOutlineExplore /> },
];

export default function TopBar() {
  return (
    <header className="bg-white sticky top-0 z-10 w-full shadow">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className=" flex justify-between items-center ">
          <div className="flex items-center">
            <span>LOGO</span>
            <ul className="flex items-center ml-10 space-x-6 list-none">
              {navigation.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.href}
                    className="cursor-pointer flex items-center flex-grow"
                  >
                    <span className="inline-block mr-2 text-lg">
                      {item.icon}
                    </span>
                    <span className="text-base">{item.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <Avatar />
          </div>
        </div>
      </div>
    </header>
  );
}
