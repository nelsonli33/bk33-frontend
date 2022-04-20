import React from "react";
import { AiOutlineHome } from "react-icons/ai";
import { MdOutlineExplore } from "react-icons/md";
import { classNames } from "../../utilities/css";

const navigation = [
  { id: "1", name: "首頁", href: "#", icon: <AiOutlineHome /> },
  { id: "2", name: "探索", href: "#", icon: <MdOutlineExplore /> },
];

export interface TopBarProps {
  sticky?: boolean;
  title?: string;
}

export default function TopBar({ sticky, title }: TopBarProps) {
  return (
    <nav
      className={classNames(
        sticky && "sticky top-0 z-10",
        "bg-white w-full shadow "
      )}
    >
      <div className="max-w-6xl mx-auto px-2 sm:px-6 lg:px-8 ">
        <div className=" flex justify-between items-center sm:h-13">
          <div className="flex items-center">
            <span>LOGO</span>
            {title ? (
              <>
                <span className="ml-10 mr-5 inline-block w-[1.34px] h-[1.6em] border-none align-middle bg-gray-00"></span>
                <span className="text-xl">{title}</span>
              </>
            ) : (
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
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
