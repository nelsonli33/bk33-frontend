import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useQueryClient } from "react-query";
import { LOADING_DURATION_NORMAL } from "../../../../../../global/constants";
import { authorBookKeys } from "../../../../../../hooks/api/author/book";
import { useSavePage } from "../../../../../../hooks/api/author/page";
import { useAppDispatch, useAppSelector } from "../../../../../../store/hooks";

import { hideModal } from "../../../../../../store/modal/slice";

import Modal from "../../../../../elements/studio/Modal";
import TextField from "../../../../../elements/TextField";
import { ActiveItem } from "../../../page-edit/PageEditLeftPanel/components/Catalog/types";

type FormData = {
  title: string;
};

export interface RenamePageModalProps {
  page: ActiveItem;
}

const RenamePageModal = ({ page }: RenamePageModalProps) => {
  const dispatch = useAppDispatch();
  const modal = useAppSelector((state) => state.modal);

  const { mutate: savePage, isLoading, isSuccess } = useSavePage(page.id);

  const { register, handleSubmit, setFocus } = useForm();
  const queryClient = useQueryClient();
  const updatePageName = handleSubmit((formData: FormData) => {
    savePage(
      {
        title: formData.title,
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
  });

  useEffect(() => {
    if (isSuccess && !isSaving) {
      dispatch(hideModal());
    }
  }, [isSuccess, isSaving]);

  useEffect(() => {
    setFocus("title");
  }, []);

  return (
    <Modal
      visible={modal.modalVisibility}
      onClose={() => dispatch(hideModal())}
      title="重新命名"
      primaryAction={{
        content: "重新命名",
        onAction: updatePageName,
        loading: isSaving,
      }}
    >
      <form method="post" autoComplete="off" onSubmit={updatePageName}>
        <TextField
          id="title"
          type="text"
          label="頁面新名稱"
          labelLight={true}
          defaultValue={page.title}
          focused={true}
          selectTextOnFocus={true}
          register={register}
        />
      </form>
    </Modal>
  );
};

export default RenamePageModal;
