import React, { Fragment } from "react";
import { Controller } from "react-hook-form";
import { Listbox, Transition } from "@headlessui/react";
import { twMerge } from "tailwind-merge";
import NumberFormat from "react-number-format";
import Label from "../../../../../../elements/Label";
import { CheckIcon } from "@heroicons/react/outline";
import { range } from "lodash-es";

const prices = range(149, 2500, 50).map((val) => ({
  id: "price-" + val,
  value: val,
}));
prices.splice(0, 0, {
  id: "price-0",
  value: 0,
});

const Price = ({ control }) => {
  return (
    <>
      <Controller
        name="price"
        control={control}
        render={({ field }) => (
          <Listbox {...field} as="div">
            {({ open }) => (
              <>
                <Label id="price" name="售價" />
                <div className="relative">
                  <Listbox.Button className="listbox-btn">
                    <span className="block truncate">
                      <NumberFormat
                        value={field.value}
                        displayType={"text"}
                        thousandSeparator={true}
                        thousandsGroupStyle="thousand"
                        prefix={"NT$"}
                      />
                    </span>
                  </Listbox.Button>

                  <Transition
                    show={open}
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options className="listbox-options">
                      {prices.map((price) => (
                        <Listbox.Option
                          key={price.id}
                          className={({ active }) =>
                            twMerge(
                              active
                                ? "text-white bg-brand-black"
                                : "text-brand-black",
                              "listbox-option"
                            )
                          }
                          value={price.value}
                        >
                          {({ selected, active }) => (
                            <>
                              <span
                                className={twMerge(
                                  selected ? "font-semibold " : "font-normal",
                                  "block truncate"
                                )}
                              >
                                <NumberFormat
                                  value={price.value}
                                  displayType={"text"}
                                  thousandSeparator={true}
                                  thousandsGroupStyle="thousand"
                                  prefix={"NT$"}
                                />
                              </span>
                              {selected ? (
                                <span
                                  className={twMerge(
                                    active ? "text-white" : "text-brand-black",
                                    "absolute inset-y-0 right-0 flex items-center pr-4"
                                  )}
                                >
                                  <CheckIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                </span>
                              ) : null}
                            </>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </>
            )}
          </Listbox>
        )}
      />
    </>
  );
};

export default Price;
