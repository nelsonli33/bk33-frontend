import React from "react";
import { useForm } from "react-hook-form";
import Divider from "../../../../elements/Divider";
import TakeawaySkillEdit from "../TakeawaySkillEdit";
import TextField from "../../../../elements/TextField";
import ContentDescriptionEditor from "./components/ContentDescriptionEditor";
import CoverUpload from "./components/CoverUpload";

const ContentEditIntroForm = () => {
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

  return (
    <form className="space-y-12">
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
            <ContentDescriptionEditor />
          </div>
          <div className="sm:col-span-6">
            <CoverUpload />
          </div>
        </div>
      </div>
      <Divider />
      <div>
        <h3 className="mb-6">定價</h3>
        <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
          <div className="sm:col-span-2">
            <TextField
              label="售價"
              type="number"
              id="price"
              prefix={"NT$"}
              register={register}
              autoComplete="off"
            />
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
    </form>
  );
};

export default ContentEditIntroForm;
