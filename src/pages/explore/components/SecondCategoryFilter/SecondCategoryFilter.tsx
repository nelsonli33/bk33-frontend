import React from "react";
import { classNames } from "../../../../utilities/css";

const navigation = [
  { name: "驚悚", href: "#", current: true },
  { name: "懸疑", href: "#", current: false },
  { name: "推理", href: "#", current: false },
  { name: "愛情", href: "#", current: false },
  { name: "科幻", href: "#", current: false },
  { name: "溫馨/療癒", href: "#", current: false },
  { name: "浪漫愛情", href: "#", current: false },
];

export default function SecondCategoryFilter() {
  return (
    <div className="flex items-center space-x-3 mb-10">
      {navigation.map((item) => (
        <a
          key={item.name}
          href={item.href}
          className={classNames(
            item.current
              ? "border-gray-800 text-gray-900 "
              : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
            "group flex items-center py-1.5 px-4 text-sm font-medium border border-gray-300 rounded"
          )}
          aria-current={item.current ? "page" : undefined}
        >
          <span className="truncate">{item.name}</span>
        </a>
      ))}
    </div>
  );
}
