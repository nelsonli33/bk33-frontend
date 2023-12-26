import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useQueryClient } from "react-query";
import { Page } from "../../../../../../../../../api/models/types";
import { LOADING_DURATION_NORMAL } from "../../../../../../../../../global/constants";
import { authorBookKeys } from "../../../../../../../../../hooks/api/author/book";
import { useSavePage } from "../../../../../../../../../hooks/api/author/page";
import Button from "../../../../../../../../elements/Button";
import TextField from "../../../../../../../../elements/TextField";

type FormData = {
  pageTitle: string;
};

export interface PageRenameItemProp {
  page: Page;
  onCancel: () => void;
}
const PageRenameItem = ({ page, onCancel }: PageRenameItemProp) => {
  const { mutate: savePage, isLoading, isSuccess } = useSavePage(page.id);

  const {
    register,
    handleSubmit,
    setFocus,
    formState: { isDirty, isValid },
  } = useForm({
    mode: "onBlur",
  });
  const queryClient = useQueryClient();
  const updatePageName = handleSubmit((formData: FormData) => {
    if (isValid && isDirty) {
      savePage(
        {
          title: formData.pageTitle,
        },
        {
          onSuccess: (response) => {
            setTimeout(() => {
              queryClient.invalidateQueries(
                authorBookKeys.detail(response.page.book_id)
              );
            }, LOADING_DURATION_NORMAL);
          },
        }
      );
    } else {
      onCancel();
    }
  });

  useEffect(() => {
    if (isSuccess && !isLoading) {
      onCancel();
    }
  }, [isSuccess, isLoading]);

  useEffect(() => {
    setFocus("pageTitle");
  }, []);

  return (
    <div className="relative w-full h-full">
      <div className="w-full flex items-center text-brand-black rounded-md py-2 pl-11">
        &nbsp;
      </div>
      <div className="absolute w-full h-full top-0 left-0 z-50">
        <div className="flex items-center">
          <div className="w-full pl-8 pr-5">
            <form
              method="post"
              autoComplete="off"
              onSubmit={updatePageName}
              onBlur={updatePageName}
            >
              <div className="flex items-center">
                <div className="flex-1 mr-4">
                  <TextField
                    id="pageTitle"
                    type="text"
                    label=""
                    labelHidden
                    labelLight={true}
                    defaultValue={page.title}
                    focused={true}
                    register={register}
                  />
                </div>
                <div className="flex space-x-2">
                  <Button type="submit" variant="primary" loading={isLoading}>
                    儲存
                  </Button>
                  <Button type="button" variant="tertiary" onClick={onCancel}>
                    取消
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="overlay " />
    </div>
  );
};

export default PageRenameItem;
