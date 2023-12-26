import React, { Fragment } from "react";
import Avatar from "../../../Avatar";
import { classNames } from "../../../../../utilities/css";
import { Menu, Transition } from "@headlessui/react";
import Link from "../../../Link";
import { UserBasic } from "../../../../../api/models/types";

export interface UserProfileMenuProps {
  user: UserBasic;
}
const UserProfileMenu = ({ user }: UserProfileMenuProps) => {
  return (
    <>
      {/* Profile dropdown */}
      <Menu as="div" className="ml-3 relative">
        <div>
          <Menu.Button className="bg-white rounded-full flex text-sm ">
            <span className="sr-only">Open user menu</span>
            <Avatar
              avatarClassName="w-10 h-10"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-125"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
            <Menu.Item>
              {({ active }) => (
                <Link
                  url={"/user/account/profile"}
                  className={classNames(
                    active ? "bg-gray-100" : "",
                    "block px-4 py-2 text-sm text-gray-700"
                  )}
                >
                  我的帳號
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <Link
                  url={"/studio"}
                  className={classNames(
                    active ? "bg-gray-100" : "",
                    "block px-4 py-2 text-sm text-gray-700"
                  )}
                  external={true}
                >
                  創作者中心
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  className={classNames(
                    active ? "bg-gray-100" : "",
                    "block px-4 py-2 text-sm text-gray-700"
                  )}
                >
                  登出
                </a>
              )}
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
    </>
  );
};

export default UserProfileMenu;
