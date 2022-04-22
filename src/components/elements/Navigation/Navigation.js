import React from "react";
import { AiOutlineHome } from "react-icons/ai";
import { MdOutlineExplore } from "react-icons/md";

export default function Navigation() {
  return (
    <aside className="flex flex-col w-52 bg-white fixed left-0  h-[calc(100%_-_theme('spacing.14'))] border-r border-r-gray-200">
      <nav className="flex flex-col flex-1">
        <div className="pt-6">
          <ul>
            <li>
              <div className="flex items-center flex-nowrap w-full">
                <a
                  href="#home"
                  className="cursor-pointer px-9 flex items-center flex-grow"
                >
                  <span className="inline-block mr-3 text-xl">
                    <AiOutlineHome />
                  </span>
                  <span class="text-base flex-auto my-2">首頁</span>
                </a>
              </div>
            </li>
            <li>
              <div className="flex items-center flex-nowrap w-full">
                <a
                  href="#explore"
                  className="cursor-pointer px-9 flex items-center flex-grow"
                >
                  <span className="inline-block mr-3 text-xl">
                    <MdOutlineExplore />
                  </span>
                  <span class="text-base flex-auto my-2">探索</span>
                </a>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </aside>
  );
}
