import React from "react";
import { classNames } from "../../../../../utilities/css";

const ContentEditStepTabs = ({ step }) => {
  const isStep1Done = step > 1;

  const tabs = [
    {
      step: 1,
      name: "基本資訊",
      href: "/studio/contents/basic",
      current: step === 1,
    },
    { step: 2, name: "編寫您的內容", href: "#", current: step === 2 },
    { step: 3, name: "內容介紹頁", href: "#", current: step === 3 },
  ];

  console.log(isStep1Done);

  return (
    <div>
      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">
          選擇步驟
        </label>
        {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
        <select
          id="tabs"
          name="tabs"
          className="block w-full focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
          defaultValue={tabs.find((tab) => tab.current).name}
        >
          {tabs.map((tab) => (
            <option key={tab.name}>{tab.name}</option>
          ))}
        </select>
      </div>
      <div className="hidden sm:block">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex" aria-label="Tabs">
            {tabs.map((tab) => (
              <a
                key={tab.name}
                href={tab.href}
                className={classNames(
                  tab.current
                    ? "border-brand-black text-brand-black"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
                  "w-1/3 py-4 px-1 text-center border-b-2 font-medium"
                )}
                aria-current={tab.current ? "page" : undefined}
              >
                <span
                  className={classNames(
                    `inline-flex justify-center items-center
                 h-6 w-6 rounded-[100%]`,
                    tab.current
                      ? "bg-brand-black text-white"
                      : "border border-gray-300 text-gray-500"
                  )}
                >
                  {tab.step}
                </span>
                <span className="ml-2">{tab.name}</span>
              </a>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default ContentEditStepTabs;
