import React from "react";

const stats = [
  { name: "訂單數", stat: "3" },
  { name: "總進帳：2022/05/01 - 2022/05/01", stat: "NT$1047" },
];
const RevenueStats = () => {
  return (
    <div>
      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
        {stats.map((item) => (
          <div
            key={item.name}
            className="px-4 py-5 bg-white border border-gray-300 rounded-lg overflow-hidden sm:p-6"
          >
            <dt className="text-sm font-medium text-gray-500 truncate">
              {item.name}
            </dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">
              {item.stat}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
};

export default RevenueStats;
