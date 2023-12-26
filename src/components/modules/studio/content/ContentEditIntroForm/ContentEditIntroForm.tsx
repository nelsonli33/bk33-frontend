import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import Divider from "../../../../elements/Divider";
import TakeawaySkillEdit from "../TakeawaySkillEdit";
import TextField from "../../../../elements/TextField";
import ContentDescriptionEditor from "./components/ContentDescriptionEditor";
import CoverUpload from "./components/CoverUpload";
import { Book } from "../../../../../api/models/types";
import Price from "./components/Price";
import Button from "../../../../elements/Button";
import {
  usePublishBook,
  useUpdateBook,
} from "../../../../../hooks/api/author/book";
import { Router, useRouter } from "next/router";

export interface ContentEditIntroFormProps {
  book: Book;
}

const ContentEditIntroForm = ({ book }: ContentEditIntroFormProps) => {
  const router = useRouter();
  const [synopsis, setSynopsis] = useState(book.synopsis);
  const [coverUrl, setCoverUrl] = useState(book.cover);

  const { mutate: updateBook, isLoading: updateBookLoading } = useUpdateBook(
    book.id
  );

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    watch,
    setFocus,
  } = useForm({
    defaultValues: {
      title: book.title,
      subtitle: book.subtitle,
      price: book.price,
      takeaway_skill: book.acquisition.map((item) => ({ value: item })),
    },
    mode: "onTouched",
  });

  const onSubmit = (values) => {
    const acquisition = values.takeaway_skill
      .filter((el) => el.value !== "")
      .map((el) => el.value);

    updateBook(
      {
        title: values.title,
        subtitle: values.subtitle,
        price: values.price,
        synopsis: synopsis,
        acquisition: acquisition,
        cover: coverUrl,
      },
      {
        onSuccess: () => {
          router.push("/studio/contents");
        },
      }
    );
  };

  const handleSynopsisUpdate = useCallback(({ editor }) => {
    setSynopsis(editor.getHTML());
  }, []);

  return (
    <form className="space-y-12" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <h3 className="mb-6">基本資訊</h3>
        <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
          <div className="sm:col-span-6">
            <TextField
              label="內容標題"
              type="text"
              id="title"
              register={register}
              watch={watch}
              showCharacterCount
              maxLength={50}
              autoComplete="off"
            />
          </div>
          <div className="sm:col-span-6">
            <TextField
              label="內容副標題"
              type="text"
              id="subtitle"
              register={register}
              watch={watch}
              showCharacterCount
              maxLength={120}
              autoComplete="off"
            />
          </div>
          <div className="sm:col-span-6">
            <ContentDescriptionEditor
              content={book.synopsis || ""}
              onUpdate={handleSynopsisUpdate}
            />
          </div>
          <div className="sm:col-span-6">
            <CoverUpload coverUrl={coverUrl} onUpdate={setCoverUrl} />
          </div>
        </div>
      </div>
      <Divider />
      <div>
        <h3 className="mb-6">定價</h3>
        <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
          <div className="sm:col-span-2">
            <Price control={control} />
          </div>
        </div>
      </div>
      <Divider />
      <div>
        <h3 className="mb-6">目標讀者</h3>
        <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
          <div className="sm:col-span-6 space-y-2">
            <label className="block font-medium">
              讀者將在您的內容學到什麼？
            </label>
            <TakeawaySkillEdit
              register={register}
              control={control}
              watch={watch}
              setFocus={setFocus}
            />
          </div>
        </div>
      </div>
      <Button type="submit" variant="primary" loading={updateBookLoading}>
        儲存並上架
      </Button>
    </form>
  );
};

export default ContentEditIntroForm;
