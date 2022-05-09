import React from "react";
import { useForm } from "react-hook-form";
import CategorySelector from "../CategorySelector";
const NewContentBasicForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
  });

  return (
    <form>
      <div className="mt-8 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
        <div className="sm:col-span-3">
          <label htmlFor="title" className="block font-medium text-brand-black">
            內容標題
          </label>
          <div className="mt-1">
            <input
              type="text"
              name="title"
              id="title"
              autoComplete="off"
              maxLength={60}
              className="shadow-sm focus:ring-brand-black focus:border-brand-black block w-full sm:text-sm border-gray-700 rounded"
            />
          </div>
        </div>
        <div className="sm:col-span-6">
          <label className="block font-medium text-brand-black">內容分類</label>
          <div className="mt-1">
            <CategorySelector />
          </div>
        </div>
        <div className="sm:col-span-6">
          <div className="mt-2 flex justify-end">
            <button className="btn-primary w-40 py-2.5">儲存並下一步</button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default NewContentBasicForm;
