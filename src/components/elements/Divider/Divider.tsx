import React from "react";
import { twMerge } from "tailwind-merge";

interface DivideProps {
  text?: string;
  margin?: string;
}

export default function Divider({ text, margin = "my-4" }: DivideProps) {
  return (
    <div className={twMerge("relative", margin)}>
      <div className="absolute inset-0 flex items-center" aria-hidden="true">
        <div className="w-full border-t border-gray-200" />
      </div>
      <div className="relative flex justify-center">
        {text && (
          <span className="px-2 bg-white text-sm text-gray-500">{text}</span>
        )}
      </div>
    </div>
  );
}
