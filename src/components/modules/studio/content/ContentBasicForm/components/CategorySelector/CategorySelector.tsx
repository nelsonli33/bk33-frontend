import React, { useMemo } from "react";
import { classNames } from "../../../../../../../utilities/css";
import { ChevronRightIcon } from "@heroicons/react/outline";
import Label from "../../../../../../elements/Label";
import { twMerge } from "tailwind-merge";

import { CategoryTreeData } from "../../../../../../../api/models/types";
import Spinner from "../../../../../../elements/Spinner";

interface CategorySelectorProps {
  allCategories: CategoryTreeData[];
  selectedCategories: CategoryTreeData[];
  onSelectedCategoriesChange: (categories: CategoryTreeData[]) => void;
  isLoading?: boolean;
}

const CategorySelector = ({
  allCategories,
  selectedCategories,
  onSelectedCategoriesChange,
  isLoading,
}: CategorySelectorProps) => {
  const buildCategoryMarkup = (
    cats: CategoryTreeData[],
    activeCat: CategoryTreeData | null,
    handleClick: any
  ) => {
    if (!cats) return null;

    return cats.map((cat) => (
      <li
        key={cat.id}
        onClick={() => handleClick(cat)}
        className={classNames(
          `flex items-center justify-between py-0 px-4 leading-8
        text-brand-black  text-sm cursor-pointer hover:bg-gray-100`,
          activeCat && activeCat.id === cat.id && "text-brand-green font-bold"
        )}
      >
        <span className="text-overflow">{cat.name}</span>
        {cat && cat.children && cat.children.length !== 0 && (
          <ChevronRightIcon
            className={twMerge(
              "w-5 h-5 text-gray-500",
              activeCat &&
                activeCat.id === cat.id &&
                "text-brand-green font-bold"
            )}
          />
        )}
      </li>
    ));
  };

  let rootCategories;

  if (allCategories) {
    rootCategories = buildCategoryMarkup(
      allCategories,
      selectedCategories[0],
      (val: any) => {
        let activeCats = [];
        activeCats[0] = val;
        onSelectedCategoriesChange(activeCats);
      }
    );
  }

  const firstCat = selectedCategories[0];
  const secondCategories =
    firstCat && firstCat.children.length > 0
      ? buildCategoryMarkup(
          firstCat.children,
          selectedCategories[1],
          (val: any) => {
            let activeCats = [];
            activeCats[0] = firstCat;
            activeCats[1] = val;

            onSelectedCategoriesChange(activeCats);
          }
        )
      : null;

  const secondCat = selectedCategories[1];

  const thirdCategories =
    secondCat && secondCat.children.length > 0
      ? buildCategoryMarkup(
          secondCat.children,
          selectedCategories[2],
          (val: any) => {
            let activeCats = [];
            activeCats[0] = selectedCategories[0];
            activeCats[1] = selectedCategories[1];
            activeCats[2] = val;
            onSelectedCategoriesChange(activeCats);
          }
        )
      : null;

  const thirdCat = selectedCategories[2];

  const currentActiveCategoriesName = useMemo(() => {
    return (
      <span className="inline-block">
        {firstCat && firstCat.name}
        {secondCat && " > ".concat(secondCat.name)}
        {thirdCat && " > ".concat(thirdCat.name)}
      </span>
    );
  }, [firstCat, secondCat, thirdCat]);

  const loadingMarkup = (
    <div className="w-full flex ml-52 items-center min-h-[200px]">
      <Spinner size="large" />
    </div>
  );

  return (
    <>
      <Label name="內容分類" />
      {isLoading ? (
        loadingMarkup
      ) : (
        <>
          <div className="relative overflow-auto">
            <div className="flex w-[500px] sm:w-full border border-gray-350 rounded divide-x divide-gray-350 shadow-sm sm:text-sm">
              <ul className="flex-1 h-64  p-0">{rootCategories}</ul>
              <ul className="flex-1 h-64 p-0">{secondCategories}</ul>
              <ul className="flex-1 h-64 p-0">{thirdCategories}</ul>
            </div>
          </div>
          <div className="flex items-center mt-4">
            <span className="inline-block text-sm"> 目前已選擇的分類：</span>
            <span className="inline-block text-sm text-brand-green font-bold">
              {currentActiveCategoriesName}
            </span>
          </div>
        </>
      )}
    </>
  );
};

export default CategorySelector;
