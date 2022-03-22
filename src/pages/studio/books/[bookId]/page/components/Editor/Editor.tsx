import React, { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { Node } from "slate";

import SlateEditor from "../../../../../../../components/SlateEditor";

export default function Editor() {
  const [value, setValue] = useState<Node[]>([
    {
      type: "paragraph",
      children: [{ text: "" }],
    },
  ]);
  return (
    <div className="flex flex-col">
      <div>
        <div className="py-6 mx-20">
          <div>
            <TextareaAutosize
              rows={1}
              name="title"
              id="title"
              placeholder="文章標題"
              data-gramm="false"
              maxLength={50}
              className="shadow-none block w-full text-[42px] leading-[43px] font-serif h-[44px] p-0 resize-none 
              border-none border-transparent focus:border-transparent focus:ring-0"
              defaultValue={""}
            />
          </div>
          <div className="mt-4">
            <TextareaAutosize
              rows={1}
              name="description"
              id="description"
              placeholder="文章描述 (選填）"
              data-gramm="false"
              maxLength={150}
              className="shadow-none block w-full text-base font-serif h-[24px] p-0 resize-none 
              border-none border-transparent focus:border-transparent focus:ring-0 text-weak"
              defaultValue={""}
            />
          </div>
          <div className="mt-6">
            <SlateEditor
              value={value}
              onChange={(newValue) => setValue(newValue)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
