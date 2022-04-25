import React, { Fragment, useEffect } from "react";
import { MdOutlineDragIndicator } from "react-icons/md";
import { BiTrash } from "react-icons/bi";
import { AiOutlineConsoleSql, AiOutlineDrag } from "react-icons/ai";
import { useFieldArray } from "react-hook-form";

export default function TakeawaySkillEdit({
  register,
  control,
  watch,
  setFocus,
}) {
  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "takeaway_skill",
  });

  const watchFieldArray = watch("takeaway_skill");
  const controlledFields = fields.map((field, index) => {
    return {
      ...field,
      ...watchFieldArray[index],
    };
  });

  useEffect(() => {
    if (controlledFields[controlledFields.length - 1].value) {
      append({ value: "" }, { shouldFocus: false });
    }
  }, [controlledFields]);

  const handleEnter = (event, index) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      setFocus(`takeaway_skill.${index + 1}.value`);
    }
  };

  return (
    <div className="space-y-3">
      {controlledFields.map((field, index) => (
        <Fragment key={field.id}>
          <div className="grid grid-cols-[1fr_2rem_minmax(1.75rem,min-content)] gap-1.5 items-center">
            <div className="col-start-1">
              {index !== controlledFields.length - 1 ? (
                <input
                  type="text"
                  {...register(`takeaway_skill.${index}.value`)}
                  autoComplete="off"
                  onKeyDown={(e) => handleEnter(e, index)}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded"
                />
              ) : (
                <input
                  type="text"
                  {...register(`takeaway_skill.${index}.value`)}
                  autoComplete="off"
                  placeholder="新增其他值"
                  onKeyDown={(e) => handleEnter(e, index)}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded"
                />
              )}
            </div>
            {index !== controlledFields.length - 1 && (
              <>
                <button
                  type="button"
                  className="col-start-2 justify-self-center"
                >
                  <AiOutlineDrag className="w-5 h-5 text-gray-400 hover:text-gray-800" />
                </button>
                <button
                  type="button"
                  className="col-start-3 justify-self-center"
                  onClick={() => remove(index)}
                >
                  <BiTrash className="w-5 h-5 text-gray-400 hover:text-gray-800" />
                </button>
              </>
            )}
          </div>
        </Fragment>
      ))}
    </div>
  );
}
