import React, { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { VscClose } from "react-icons/vsc";

interface ModalProps {
  visible: boolean;
  children: React.ReactNode;
  onClose: () => void;
}

export default function Modal({ visible, children, onClose }: ModalProps) {
  const cancelButtonRef = useRef(null);

  const cancelButtonMarkup = (
    <button
      type="button"
      className="inline-flex justify-center px-1 py-1 text-sm font-medium text-slate-900 hover:bg-gray-150 hover:rounded-full focus:outline-none absolute top-2 right-1"
      onClick={onClose}
      ref={cancelButtonRef}
    >
      <VscClose className="w-6 h-6" />
    </button>
  );

  return (
    <Transition.Root show={visible} as={Fragment} appear={true}>
      <Dialog
        as="div"
        className="fixed z-50 inset-0 overflow-y-auto"
        onClose={onClose}
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
            <Dialog.Overlay className="fixed inset-0 bg-white bg-opacity-95 transition-opacity" />
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
            enter="ease-out duration-200"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div
              className="relative inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-[0px_2px_10px_rgb(0,0,0,0.15)] transform transition-all 
            sm:align-middle sm:max-w-lg sm:w-full sm:py-9 sm:px-7 sm:-mt-20"
            >
              {cancelButtonMarkup}
              {children}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
