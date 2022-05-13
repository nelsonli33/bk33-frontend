import React from "react";
import { twMerge } from "tailwind-merge";
import Link from "../../../../elements/Link";

interface ContentEditStepTabsProps {
  step: number;
  bookId?: number;
}

const ContentEditStepTabs = ({ step, bookId }: ContentEditStepTabsProps) => {
  const tabs = [
    {
      step: 1,
      name: "基本資訊",
      href:
        bookId > 0
          ? `/studio/contents/${bookId}/basic`
          : "/studio/contents/basic",
      current: step === 1,
      stepDone: bookId > 0,
    },
    {
      step: 2,
      name: "編寫您的內容",
      href: bookId > 0 ? `/studio/contents/${bookId}/detail` : `#`,
      current: step === 2,
      hidden: !bookId || bookId === 0,
      stepDone: bookId > 0 || step > 3,
    },
    {
      step: 3,
      name: "內容介紹頁",
      href: bookId > 0 ? `/studio/contents/${bookId}/intro` : `#`,
      current: step === 3,
      hidden: !bookId || bookId === 0,
    },
  ];

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
          className="block w-full border-gray-300 rounded"
          defaultValue={tabs.find((tab) => tab.current).name}
        >
          {tabs.map((tab) => (
            <option key={tab.name}>{tab.name}</option>
          ))}
        </select>
      </div>
      <div className="hidden sm:block">
        <div className="border-b border-gray-300">
          <nav className="-mb-px flex" aria-label="Tabs">
            {tabs.map((tab) => (
              <Link
                key={tab.name}
                url={tab.href}
                className={twMerge(
                  tab.current
                    ? "border-brand-black text-brand-black"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
                  !!bookId && "text-brand-black",
                  "w-1/3 py-2 px-1 text-center border-b-2 font-medium",
                  tab.hidden && "hidden"
                )}
                aria-current={tab.current ? "page" : undefined}
              >
                <span
                  className={twMerge(
                    `inline-flex justify-center items-center
                 h-6 w-6 rounded-[100%]`,
                    tab.current || tab.stepDone
                      ? "bg-brand-black text-white"
                      : "border border-gray-300 text-gray-500",
                    tab.step === 1 && !bookId && "hidden"
                  )}
                >
                  {tab.step}
                </span>
                <span className="ml-2">{tab.name}</span>
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default ContentEditStepTabs;
