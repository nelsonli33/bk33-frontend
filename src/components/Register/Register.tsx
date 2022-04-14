import React, { useState, Fragment, useRef } from "react";
import Link from "next/link";
import { Dialog, Transition } from "@headlessui/react";
import SignupForm from "./components/SignupForm";
import SocialSignup from "./components/SocialSignup";
import { VscClose } from "react-icons/vsc";

export default function Register() {
  const [open, setOpen] = useState(true);
  const cancelButtonRef = useRef(null);

  const dividerMarkup = (
    <div className="relative my-4">
      <div className="absolute inset-0 flex items-center" aria-hidden="true">
        <div className="w-full border-t border-gray-300" />
      </div>
      <div className="relative flex justify-center">
        <span className="px-2 bg-white text-sm text-gray-500">或</span>
      </div>
    </div>
  );

  const modalBodyMarkup = (
    <>
      <SocialSignup />
      {dividerMarkup}
      <SignupForm />
      <div className="mt-3">
        <span className="text-sm">
          已經註冊了嗎？
          <Link href="/login">
            <a className="underline ml-2">立即登入</a>
          </Link>
        </span>
      </div>
    </>
  );

  const cancelButtonMarkup = (
    <button
      type="button"
      className="inline-flex justify-center px-1 py-1 text-sm font-medium text-slate-900 hover:bg-gray-100 hover:rounded-full focus:outline-none absolute top-2 right-1"
      onClick={() => setOpen(false)}
      ref={cancelButtonRef}
    >
      <VscClose className="w-6 h-6" />
    </button>
  );

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        onClose={setOpen}
        initialFocus={cancelButtonRef}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>
          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div
              className="relative inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all 
            sm:align-middle sm:max-w-lg sm:w-full sm:py-9 sm:px-7 sm:-mt-20"
            >
              <div className="flex mb-6 w-full">
                <Dialog.Title as="h1" className="text-2xl">
                  註冊
                </Dialog.Title>
                {cancelButtonMarkup}
              </div>
              <div>{modalBodyMarkup}</div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
