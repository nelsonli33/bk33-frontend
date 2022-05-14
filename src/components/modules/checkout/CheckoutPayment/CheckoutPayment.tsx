import React, { useState } from "react";
import { classNames } from "../../../../utilities/css";
import { RadioGroup } from "@headlessui/react";

const paymentMethods = [
  {
    code: "CreditCardOnce",
    name: "信用卡",
    description: "Visa, Mastercard",
  },
  {
    code: "StorePay",
    name: "超商代碼",
    description: "將加收 NT$30 手續費",
  },
];

export default function CheckoutPayment() {
  const [paymentType, setPaymentType] = useState(paymentMethods[0]);
  return (
    <div className="bg-white shadow rounded">
      <div className="text-xl font-medium px-8 pt-3 h-13">付款方式</div>
      <div className="mt-1">
        <RadioGroup value={paymentType} onChange={setPaymentType}>
          <RadioGroup.Label className="sr-only">付款方式</RadioGroup.Label>
          <div className="bg-white rounded-md space-y-3 px-8 pb-4">
            {paymentMethods.map((item, itemIdx) => (
              <RadioGroup.Option
                key={item.name}
                value={item}
                className={({ checked }) =>
                  classNames(
                    checked
                      ? "bg-[#F5FBF8] border-[#52BD95] z-10"
                      : "border-gray-200",
                    "relative border rounded-lg p-4 flex cursor-pointer focus:outline-none"
                  )
                }
              >
                {({ active, checked }) => (
                  <>
                    <span
                      className={classNames(
                        checked
                          ? "bg-[#52BD95] border-transparent"
                          : "bg-white border-gray-300",
                        active ? "ring-2 ring-offset-2 ring-[#52BD95]" : "",
                        "h-4 w-4 mt-0.5 cursor-pointer rounded-full border flex items-center justify-center"
                      )}
                      aria-hidden="true"
                    >
                      <span className="rounded-full bg-white w-1.5 h-1.5" />
                    </span>
                    <div className="ml-3 flex flex-col">
                      <RadioGroup.Label
                        as="span"
                        className={classNames(
                          "block text-sm font-medium text-gray-900"
                        )}
                      >
                        {item.name}
                      </RadioGroup.Label>
                      <RadioGroup.Description
                        as="span"
                        className={classNames(
                          checked ? "text-brand-green" : "text-gray-500",
                          "block text-sm"
                        )}
                      >
                        {item.description}
                      </RadioGroup.Description>
                    </div>
                  </>
                )}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
      </div>
    </div>
  );
}
