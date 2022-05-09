import React from "react";
import { UseFormRegister } from "react-hook-form";

type RadioItem = {
  id: string;
  title: string;
};

interface RadioProps {
  label?: string;
  name: string;
  items?: RadioItem[];
  defaultCheckedId?: string;
  register?: UseFormRegister<any>;
}

const Radio = ({
  label,
  name,
  items,
  defaultCheckedId,
  register,
}: RadioProps) => {
  const radioMarkup =
    items && items.length > 0 ? (
      <div className="space-y-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-8">
        {items.map((item) => (
          <div key={item.id} className="flex items-center">
            <input
              id={item.id}
              name={name}
              {...register(name)}
              type="radio"
              defaultChecked={item.id === defaultCheckedId}
              className="focus:ring-0 h-4 w-4 text-brand-black border-gray-350 cursor-pointer appearance-none"
            />
            <label
              htmlFor={item.id}
              className="pl-1.5 block font-medium text-gray-700 cursor-pointer"
            >
              {item.title}
            </label>
          </div>
        ))}
      </div>
    ) : null;

  return (
    <div>
      <label className="text-base font-medium text-gray-700">{label}</label>
      <fieldset className="mt-2">
        <legend className="sr-only">{name}</legend>
        {radioMarkup}
      </fieldset>
    </div>
  );
};

export default Radio;
