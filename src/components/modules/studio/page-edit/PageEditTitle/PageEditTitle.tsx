import React, { useCallback, memo, useState, useEffect } from "react";
import debounce from "debounce";
import TextareaAutosize from "react-textarea-autosize";
import {
  SavePageRequest,
  SavePageResponse,
} from "../../../../../api/models/types";
import { UseMutateFunction, useQueryClient } from "react-query";
import { AxiosError } from "axios";
import { authorBookKeys } from "../../../../../hooks/api/author/book";

export interface PageEditTitleProps {
  title?: string;
  description?: string;
  savePage: UseMutateFunction<
    SavePageResponse,
    AxiosError,
    SavePageRequest,
    unknown
  >;
}

const PageEditTitle = ({
  title,
  description,
  savePage,
}: PageEditTitleProps) => {
  const queryClient = useQueryClient();
  const [pageTitle, setPageTitle] = useState(title);
  const [pageDescription, setPageDescription] = useState(description);

  useEffect(() => {
    setPageTitle(title);
    setPageDescription(description);
  }, [title, description]);

  const debounceTitleChange = useCallback(
    debounce((event) => {
      savePage(
        {
          title: event.target.value,
        },
        {
          onSuccess: (response) => {
            queryClient.invalidateQueries(
              authorBookKeys.detail(response.page.book_id)
            );
          },
        }
      );
    }, 1000),
    []
  );

  const debounceDescriptionChange = useCallback(
    debounce((event) => {
      savePage({
        description: event.target.value,
      });
    }, 1000),
    []
  );

  return (
    <div>
      <label htmlFor="title" className="sr-only">
        標題
      </label>
      <TextareaAutosize
        id="title"
        name="title"
        className="block w-full border-0 px-0 py-2 resize-none placeholder-gray-500 focus:ring-0 text-[41px] leading-tight"
        placeholder="標題"
        maxLength={50}
        value={pageTitle}
        onChange={(e) => {
          setPageTitle(e.target.value);
          debounceTitleChange(e);
        }}
      />
      <label htmlFor="description" className="sr-only">
        頁面描述(選填)
      </label>
      <TextareaAutosize
        id="description"
        name="description"
        className="block w-full border-0 p-0 resize-none placeholder-gray-500 focus:ring-0 text-gray-900 font-normal leading-7 font-serif"
        placeholder="頁面描述(選填)"
        maxLength={150}
        value={pageDescription}
        onChange={(e) => {
          setPageDescription(e.target.value);
          debounceDescriptionChange(e);
        }}
      />
    </div>
  );
};

export default PageEditTitle;
