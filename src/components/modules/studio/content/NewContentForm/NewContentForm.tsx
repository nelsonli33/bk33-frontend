import React from "react";
import { useForm } from "react-hook-form";
import CategorySelector from "../CategorySelector";
import TakeawaySkillEdit from "../TakeawaySkillEdit";
export default function NewContentForm() {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    watch,
    setFocus,
  } = useForm({
    defaultValues: {
      takeaway_skill: [{ value: "" }],
    },
    mode: "onTouched",
  });

  const onSubmit = (data) => console.log(data);
  return (
    <form className="space-y-8 divide-y divide-gray-200">
      <div className="space-y-8 divide-y divide-gray-200">
        <div>
          <div>
            <h3 className="text-xl leading-6 font-medium text-brand-black">
              基本資訊
            </h3>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                標題
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="title"
                  id="title"
                  autoComplete="off"
                  className="shadow-sm focus:ring-brand-black focus:border-brand-black block w-full sm:text-sm border-gray-300 rounded"
                />
              </div>
            </div>
            <div className="sm:col-span-6">
              <label className="block text-sm font-medium text-gray-700">
                分類
              </label>
              <div className="mt-1">
                <CategorySelector />
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8">
          <div>
            <h3 className="text-xl leading-6 font-medium text-brand-black">
              目錄
            </h3>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6"></div>
        </div>

        <div className="pt-8">
          <div>
            <h3 className="text-xl leading-6 font-medium text-brand-black">
              銷售資訊
            </h3>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="first-name"
                className="block text-sm font-medium text-gray-700"
              >
                你會學到
              </label>
              <div className="my-4">
                <TakeawaySkillEdit
                  register={register}
                  control={control}
                  watch={watch}
                  setFocus={setFocus}
                />
              </div>
            </div>
            <div className="sm:col-span-3"></div>
            <div className="sm:col-span-3">
              <label
                htmlFor="about"
                className="block text-sm font-medium text-gray-700"
              >
                內容簡介
              </label>
              <div className="mt-1">
                <textarea
                  id="about"
                  name="about"
                  rows={3}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded"
                  defaultValue={""}
                />
              </div>
            </div>
            <div className="sm:col-span-3"></div>
            <div className="sm:col-span-1">
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700"
              >
                售價
              </label>
              <div className="mt-1">
                <input
                  id="price"
                  name="price"
                  type="text"
                  autoComplete="off"
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-5">
        <div className="flex justify-end">
          <button
            type="button"
            className="bg-white py-2 px-4 border border-gray-300 rounded shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Save
          </button>
        </div>
      </div>
    </form>
  );
}
