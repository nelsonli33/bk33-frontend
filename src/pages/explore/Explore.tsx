import React from "react";
import Frame from "../../components/elements/Frame";
import SecondCategoryFilter from "../../components/modules/explore/SecondCategoryFilter";
import CategoryFilter from "../../components/modules/explore/CategoryFilter";
import CatalogList from "../../components/elements/CatalogList";

export default function Explore() {
  return (
    <Frame title="探索">
      <div className="my-10">
        <div className="max-w-5xl mx-auto px-2">
          <div className="flex">
            <div className="flex-[0_0_auto] w-48 pr-8">
              <CategoryFilter />
            </div>
            <div className="flex-1 flex-col pl-10">
              <SecondCategoryFilter />
              <CatalogList />
            </div>
          </div>
        </div>
      </div>
    </Frame>
  );
}
