import React from "react";

export default function Avatar({ src, width = 32, height = 32 }) {
  const svgMarkup = !src ? (
    <div
      className="flex justify-center items-center m-2 cursor-pointer"
      aria-label="open profile menu"
      role="button"
    >
      <svg
        className="rounded-full bg-neutral-200 flex-shrink-0 text-neutral-400"
        viewBox="0 0 40 40"
        width={width}
        height={height}
      >
        <path
          fill="currentColor"
          d="M8.28 27.5A14.95 14.95 0 0120 21.8c4.76 0 8.97 2.24 11.72 5.7a14.02 14.02 0 01-8.25 5.91 14.82 14.82 0 01-6.94 0 14.02 14.02 0 01-8.25-5.9zM13.99 12.78a6.02 6.02 0 1112.03 0 6.02 6.02 0 01-12.03 0z"
        />
      </svg>
    </div>
  ) : null;

  return <div>{svgMarkup}</div>;
}

// <img
//         className="h-9 w-9 rounded-full"
//         src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
//         alt=""
//       />
