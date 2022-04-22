import React, { useState, useEffect } from "react";
import { API_GET_TOPICS } from "../../../../global/constants";
import { classNames } from "../../../../utilities/css";

async function fetchData(setTopics) {
  const res = await fetch(API_GET_TOPICS);
  const data = await res.json();
  setTopics(data);
}

export default function CategoryFilter() {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    fetchData(setTopics);
  }, []);

  return (
    <div className="space-y-1" aria-label="Sidebar">
      {topics.map((item) => (
        <a
          key={item.name}
          href="#"
          className={classNames(
            item.id === 1
              ? "bg-slate-900 text-white"
              : "text-gray-600 hover:bg-gray-300",
            "group flex items-center px-3 py-2 text-sm font-medium rounded"
          )}
          aria-current={item.current ? "page" : undefined}
        >
          <span className="truncate">{item.name}</span>
        </a>
      ))}
    </div>
  );
}
