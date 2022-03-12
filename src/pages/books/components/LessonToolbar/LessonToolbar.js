import React from "react";
import { FiThumbsUp, FiList } from "react-icons/fi";

export default function LessonToolbar() {
  return (
    <footer className="lg:sticky lg:bottom-0 h-12 max-h-12 box-content flex items-center lg:border-t lg:border-t-zinc-300 bg-white">
      <div className="flex-auto-no-shrink">
        <div className="flex justify-center">
          <div className="max-w-2xl mx-8 w-full">
            <div className="flex justify-between">
              <div className="flex flex-row items-center">
                <div className="block">
                  <FiThumbsUp className="stroke-slate-600 stroke-1 w-[23px] h-[23px]" />
                </div>
              </div>
              <div className="flex flex-row items-center">
                <div className="block">
                  <FiList className="stroke-slate-600 w-[23px] h-[23px]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
