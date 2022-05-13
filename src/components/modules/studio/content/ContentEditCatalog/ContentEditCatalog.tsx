import React, { useState, useEffect, useMemo } from "react";
import { Disclosure } from "@headlessui/react";
import { ChevronRightIcon } from "@heroicons/react/outline";

import { Book } from "../../../../../api/models/types";
import { twMerge } from "tailwind-merge";
import Link from "../../../../elements/Link";
import Button from "../../../../elements/Button";
import { FiEdit3 } from "react-icons/fi";
import { CgRename } from "react-icons/cg";
import { useForm } from "react-hook-form";
import TextField from "../../../../elements/TextField";

interface ContentEditTocProps {
  book: Book;
}

const ContentEditCatalog = ({ book }: ContentEditTocProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm();

  const onSubmit = (values, page) => {
    console.log(page);
    console.log(values);
  };

  const chapterMarkup = useMemo(() => {
    return book?.toc?.chapters.map((item) => (
      <Disclosure
        as="div"
        key={item.id}
        className="space-y-1"
        defaultOpen={true}
      >
        {({ open }) => (
          <>
            <Disclosure.Button
              as={"div"}
              className={twMerge(
                "bg-white text-brand-black hover:bg-gray-100 ",
                "group w-full flex items-center pl-2 pr-1 py-2 text-left font-medium rounded cursor-pointer"
              )}
            >
              <ChevronRightIcon
                className={twMerge(
                  open && "rotate-90",
                  "h-5 w-8 transform text-gray-600 transition-colors ease-in-out duration-150 stroke-1"
                )}
              />
              <span className="flex-1">{item.title}</span>
            </Disclosure.Button>
            <Disclosure.Panel className="space-y-1">
              {item.pages.map((subItem) =>
                subItem.id === 0 ? (
                  <form
                    method="post"
                    onSubmit={handleSubmit((values) =>
                      onSubmit(values, subItem)
                    )}
                    autoComplete="off"
                    className="flex w-full py-2 px-10 "
                  >
                    <div className="flex-1 pr-4">
                      <TextField
                        id="page_title"
                        type="text"
                        label=""
                        labelHidden
                        register={register}
                        defaultValue={subItem.title}
                        maxLength={60}
                      />
                    </div>
                    <button type="submit">OK</button>
                  </form>
                ) : (
                  <Link
                    key={subItem.id}
                    url={`/studio/contents/${book.id}/pages/${subItem.id}`}
                    className="group w-full flex justify-between items-center text-brand-black rounded-md
                hover:bg-gray-100  hover:border-1  whitespace-nowrap text-ellipsis overflow-hidden py-2 pl-11"
                  >
                    <span className="inline-block">{subItem.title}</span>
                    <div className="inline-flex space-x-2 pr-5">
                      <Button type="button" className="p-0">
                        <FiEdit3 className="w-5 h-5 hover:stroke-brand-green" />
                      </Button>
                    </div>
                  </Link>
                )
              )}
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    ));
  }, [book]);

  return (
    <>
      <div className="space-y-4 border border-gray-350 rounded p-4">
        <div className="max-w-[675px] mx-auto">{chapterMarkup}</div>
      </div>
    </>
  );
};

export default ContentEditCatalog;
