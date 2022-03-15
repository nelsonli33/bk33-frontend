import React, { useState, useEffect, useMemo } from "react";
import { API_GET_CHAPTERS } from "../../../../global/constants";
import Image from "next/image";
import Collapsible from "../../../../components/Collapsible";

async function fetchData(setChapters) {
  const res = await fetch(API_GET_CHAPTERS);
  const data = await res.json();
  setChapters(data);
}

export default function TableOfContent() {
  const [chapters, setChapters] = useState([]);

  useEffect(() => {
    fetchData(setChapters);
  }, []);

  const chapterMarkup = useMemo(
    () =>
      chapters.map((ch) => (
        <Collapsible key={ch.id} title={ch.title}>
          {ch.lessons.map((lesson) => (
            <div key={lesson.id} className="pl-6 pr-5 py-1 cursor-pointer">
              <div className="flex items-start py-1 px-2">
                <div className="pr-4">
                  <Image src="/icons/icons8-lock.svg" height={22} width={19} />
                </div>
                <span className="text-base font-normal">{lesson.title}</span>
              </div>
            </div>
          ))}
        </Collapsible>
      )),
    [chapters]
  );

  return (
    <div>
      <h3 className="mt-6 mb-3">目錄</h3>
      <div className="space-y-4">
        <div>{chapterMarkup}</div>
      </div>
    </div>
  );
}
