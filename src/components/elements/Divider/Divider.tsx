import React from "react";

interface DivideProps {
  text?: string;
}

export default function Divider({ text }: DivideProps) {
  return (
    <div className="relative my-4">
      <div className="absolute inset-0 flex items-center" aria-hidden="true">
        <div className="w-full border-t border-gray-300" />
      </div>
      <div className="relative flex justify-center">
        {text && (
          <span className="px-2 bg-white text-sm text-gray-500">{text}</span>
        )}
      </div>
    </div>
  );
}
