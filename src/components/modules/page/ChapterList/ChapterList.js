import React, { useEffect, useState, useMemo } from "react";

import { API_GET_CHAPTERS } from "../../../../global/constants";

async function fetchData(setChapters) {
  const res = await fetch(API_GET_CHAPTERS);
  const data = await res.json();
  setChapters(data);
}
export default function ChapterList() {
  const [chapters, setChapters] = useState([]);

  useEffect(() => {
    fetchData(setChapters);
  }, []);

  const chapterMarkup = useMemo(
    () =>
      chapters.map((ch) => (
        <div key={ch.id}>
          <h5 className="px-5">{ch.title}</h5>
          {ch.lessons.map((lesson) => (
            <div key={lesson.id} className="pl-9 pr-5 py-3 cursor-pointer">
              <span key={lesson.id} className="font-sans tracking-tight">
                {lesson.title}
              </span>
            </div>
          ))}
        </div>
      )),
    [chapters]
  );

  return <div className="flex flex-col content-end mt-20">{chapterMarkup}</div>;
}
