import React, { useState, useCallback } from "react";

import StudioFrame from "../../../components/modules/studio/home/StudioFrame";
import RevenueDatePicker from "../../../components/modules/studio/revenue/RevenueDatePicker";

export default function Income() {
  return (
    <StudioFrame title="營利">
      <div className="px-4 sm:px-6 lg:px-8 mt-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-3xl font-semibold">營利</h1>
          </div>
        </div>
        <div className="mt-12 flex flex-col">
          <RevenueDatePicker />
        </div>
      </div>
    </StudioFrame>
  );
}
