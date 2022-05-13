import React from "react";
import { useForm } from "react-hook-form";
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
        <div className="pt-8">
          <div>
            <h3 className="text-xl leading-6 font-medium text-brand-black">
              目錄
            </h3>
          </div>
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
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">NT$</span>
                </div>
                <input
                  type="text"
                  name="price"
                  id="price"
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full px-12 sm:text-sm border-gray-300 rounded-md"
                  placeholder="0.00"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-5">
        <div className="flex justify-end">
          <button type="button" className="py-2 px-4 btn-secondary">
            捨棄
          </button>
          <button
            type="submit"
            className="ml-3 inline-flex justify-center py-2 px-4 btn-primary"
          >
            儲存
          </button>
        </div>
      </div>
    </form>
  );
}
