import React, { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { VscClose } from "react-icons/vsc";
import Button from "../../Button";
import { ComplexAction } from "../../../types";

export interface ModalProps {
  title: string;
  visible: boolean;
  children: React.ReactNode;
  /** Primary action */
  primaryAction?: ComplexAction;
  onClose: () => void;
}

export default function Modal({
  title,
  visible,
  children,
  onClose,
  primaryAction,
}: ModalProps) {
  const cancelButtonRef = useRef(null);

  const titleMarkup = (
    <Dialog.Title
      as="h3"
      className="text-lg leading-6 font-normal text-brand-black"
    >
      {title}
    </Dialog.Title>
  );

  const cancelButtonMarkup = (
    <button
      type="button"
      className="inline-flex justify-center px-1 py-1 text-sm font-medium text-slate-900 hover:bg-gray-150 hover:rounded-full focus:outline-none"
      onClick={onClose}
      ref={cancelButtonRef}
    >
      <VscClose className="w-6 h-6" />
    </button>
  );

  const headerMarkup = (
    <div className="w-full px-5 py-4 border-b border-gray-200">
      <div className="flex items-center mt-3  sm:mt-0 sm:text-left">
        <div className="flex-1">{titleMarkup}</div>
        <div className="flex-0">{cancelButtonMarkup}</div>
      </div>
    </div>
  );

  const bodyMarkup = (
    <div className="w-full overflow-y-auto">
      <div className="px-5 py-4">{children}</div>
    </div>
  );

  const primaryActionButton = primaryAction ? (
    <Button
      variant={"primary"}
      onClick={primaryAction.onAction}
      loading={primaryAction.loading}
      destructive={primaryAction.destructive}
    >
      {primaryAction.content}
    </Button>
  ) : null;

  const footerMarkup = (
    <div
      className="flex justify-end items-center min-h-[4rem] w-full 
    p-4 border-t border-t-gray-200 space-x-2"
    >
      <Button
        type="button"
        variant="tertiary"
        onClick={onClose}
        ref={cancelButtonRef}
      >
        取消
      </Button>
      {primaryActionButton}
    </div>
  );

  return (
    <Transition.Root show={visible} as={Fragment} appear={true}>
      <Dialog
        as="div"
        className="fixed z-50 inset-0 overflow-y-auto"
        onClose={onClose}
        initialFocus={cancelButtonRef}
      >
        <div className="flex items-end justify-center min-h-screen p-0 text-center sm:block">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 transition-opacity  bg-black bg-opacity-50" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="fixed z-10 inset-0 overflow-y-auto">
              <div className="flex items-end sm:items-center justify-center min-h-full p-0 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <Dialog.Panel
                    className="relative bg-white rounded-lg  w-full 
                  text-left overflow-hidden shadow-lg transform transition-all sm:my-8 sm:max-w-xl sm:p-0"
                  >
                    {headerMarkup}
                    {bodyMarkup}
                    {footerMarkup}
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
