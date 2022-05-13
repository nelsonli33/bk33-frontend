import React, { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { Book, CategoryTreeData } from "../../../../../api/models/types";
import {
  useCreateBook,
  useUpdateBook,
} from "../../../../../hooks/api/author/book";

import Button from "../../../../elements/Button";
import TextField from "../../../../elements/TextField";
import CategorySelector from "./components/CategorySelector";

interface ContentBasicFormProps {
  book?: Book;
  allBookCategories?: CategoryTreeData[];
  isGetBookCategoriesLoading?: boolean;
}

const formValidation = {
  title: {
    required: "內容標題為必填",
    maxLength: {
      value: 60,
      message: "電子郵件最多 60 個字",
    },
  },
};

const ContentBasicForm = ({
  book,
  allBookCategories,
  isGetBookCategoriesLoading,
}: ContentBasicFormProps) => {
  const [categories, setCategories] = React.useState<CategoryTreeData[]>([]);

  if (book) {
    var { mutate: updateBook, isLoading: updateBookLoading } = useUpdateBook(
      book.id
    );
  } else {
    var { mutate: createBook, isLoading: createBookLoading } = useCreateBook();
  }

  const onSubmit = (values) => {
    if (book) {
      updateBook({
        title: values.title,
        category_ids: categories.map((cat) => cat.id),
      });
    } else {
      createBook({
        title: values.title,
        category_ids: categories.map((cat) => cat.id),
      });
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
  });

  const isValidForm =
    isValid &&
    categories.length > 0 &&
    categories[categories.length - 1].children.length === 0;

  useEffect(() => {
    if (
      book &&
      book.categories &&
      book.categories.length > 0 &&
      allBookCategories
    ) {
      const firstCat = allBookCategories.find(
        (cat) => cat.id === book.categories[0].id
      );
      const secondCat =
        book.categories[1] && firstCat && firstCat.children.length > 0
          ? firstCat.children.find((cat) => cat.id === book.categories[1].id)
          : null;

      const thirdCat =
        book.categories[2] && secondCat && secondCat.children.length > 0
          ? secondCat.children.find((cat) => cat.id === book.categories[2].id)
          : null;

      let selectedCats = [firstCat, secondCat, thirdCat].filter(Boolean);
      setCategories(selectedCats);
    }
  }, [book, allBookCategories]);

  return (
    <form method="post" onSubmit={handleSubmit(onSubmit)} autoComplete="off">
      <div className="mt-8 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
        <div className="sm:col-span-4">
          <TextField
            id="title"
            type="text"
            label="內容標題"
            error={errors?.title && errors.title.message}
            register={register}
            registerOptions={formValidation.title}
            defaultValue={(book && book.title) || ""}
            maxLength={60}
          />
        </div>
        <div className="sm:col-span-6">
          <CategorySelector
            allCategories={allBookCategories}
            selectedCategories={categories}
            onSelectedCategoriesChange={setCategories}
            isLoading={isGetBookCategoriesLoading}
          />
        </div>
        <div className="sm:col-span-6">
          <div className="mt-4 flex justify-start">
            <Button
              variant="primary"
              className="w-32 py-2.5"
              disabled={!isValidForm}
              loading={createBookLoading || updateBookLoading}
            >
              儲存並下一步
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ContentBasicForm;
