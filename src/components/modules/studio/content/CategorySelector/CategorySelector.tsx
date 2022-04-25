import React, { useState, useRef, useMemo } from "react";
import { classNames } from "../../../../../utilities/css";
import { ChevronRightIcon } from "@heroicons/react/outline";
import { useToggle } from "../../../../../hooks/useToggle";
import { FiEdit3 } from "react-icons/fi";
export interface CategoryData {
  id: number;
  name: string;
  parentId: number;
  hasSub: boolean;
  children: CategoryData[];
}

const categories = [
  {
    id: 1,
    name: "女生衣著",
    parentId: 0,
    hasSub: true,
    children: [
      {
        id: 11,
        name: "上衣",
        parentId: 0,
        hasSub: true,
        children: [
          {
            id: 21,
            name: "其他上衣",
            parentId: 11,
            hasSub: true,
            children: [
              {
                id: 44,
                name: "上衣四分類",
                parentId: 21,
                hasSub: false,
                children: [],
              },
            ],
          },
          {
            id: 12,
            name: "雪紡上衣",
            parentId: 11,
            hasSub: false,
            children: [],
          },
        ],
      },
    ],
  },
  {
    id: 2,
    name: "男生衣著",
    parentId: 0,
    hasSub: true,
    children: [
      {
        id: 14,
        name: "褲子",
        parentId: 1,
        hasSub: false,
        children: [],
      },
    ],
  },
];

export default function CategorySelector() {
  const { open, setTrue, setFalse } = useToggle(true);
  const categorySelectorRef = useRef<HTMLDivElement>(null);
  const [firstCat, setFirstCat] = useState<CategoryData | null>(null);
  const [secondCat, setSecondCat] = useState<CategoryData | null>(null);
  const [thirdCat, setThirdCat] = useState<CategoryData | null>(null);

  const buildCategoryMarkup = (
    cats: CategoryData[],
    activeCat: CategoryData | null,
    handleClick: any
  ) => {
    if (!cats) return null;

    return cats.map((cat) => (
      <li
        key={cat.id}
        onClick={() => handleClick(cat)}
        className={classNames(
          `flex items-center justify-between py-0 px-4 leading-8
        text-gray-800  text-sm cursor-pointer hover:bg-gray-100`,
          activeCat &&
            activeCat.id === cat.id &&
            "text-brand-green-light font-medium"
        )}
      >
        <span className="text-overflow">{cat.name}</span>
        {cat && cat.children && cat.children.length !== 0 && (
          <ChevronRightIcon className="w-5 h-5" />
        )}
      </li>
    ));
  };

  const rootCategories = buildCategoryMarkup(
    categories,
    firstCat,
    (val: any) => {
      setFirstCat(val);
      setSecondCat(null);
      setThirdCat(null);
    }
  );

  const secondCategories =
    firstCat &&
    firstCat.hasSub &&
    buildCategoryMarkup(firstCat.children, secondCat, (val: any) => {
      setSecondCat(val);
      setThirdCat(null);
    });

  const thirdCategories =
    secondCat &&
    secondCat.hasSub &&
    buildCategoryMarkup(secondCat.children, thirdCat, (val: any) =>
      setThirdCat(val)
    );

  const currentActiveCategoriesName = useMemo(
    () => (
      <span className="inline-block">
        {firstCat && firstCat.name}
        {secondCat && " > ".concat(secondCat.name)}
        {thirdCat && " > ".concat(thirdCat.name)}
      </span>
    ),
    [firstCat, secondCat, thirdCat]
  );

  return (
    <>
      {!open && (
        <div className="flex items-center text-sm mt-2">
          <span>內容分類： {currentActiveCategoriesName} </span>
          <button type="button" onClick={setTrue}>
            <FiEdit3 className="w-5 h-5 ml-2 text-gray-500 hover:text-gray-900" />
          </button>
        </div>
      )}
      {open && (
        <>
          <div className="relative overflow-auto" ref={categorySelectorRef}>
            <div className="flex w-[500px] sm:w-full  border border-gray-300 divide-x divide-gray-300 rounded shadow-sm sm:text-sm">
              <ul className="flex-1 h-64  p-0">{rootCategories}</ul>
              <ul className="flex-1 h-64 p-0">{secondCategories}</ul>
              <ul className="flex-1 h-64 p-0">{thirdCategories}</ul>
            </div>
          </div>
          <div className="flex items-center mt-4">
            <div>
              目前已選擇的分類：
              <span className="inline-block text-brand-green-light font-bold">
                {currentActiveCategoriesName}
              </span>
            </div>
            <div className="ml-4">
              <button type="button" className="btn-tertiary" onClick={setFalse}>
                完成
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
