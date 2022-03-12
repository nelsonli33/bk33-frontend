import React from "react";
import ChapterList from "./components/ChapterList";
import LessonContent from "./components/LessonContent";
import LessonToolbar from "./components/LessonToolbar";

export default function Book() {
  return (
    <>
      <div className="flex justify-between">
        <main className="flex-auto">
          <div className="flex justify-center">
            <div className="max-w-2xl mx-8">
              <LessonContent />
            </div>
          </div>
          <LessonToolbar />
        </main>
        <div className="block w-[325px]">
          <aside className="fixed top: 0; bottom: 0; bg-zinc-50 border-l border-l-zinc-300">
            <div className="h-screen overflow-y-auto">
              <div className="">
                <ChapterList />
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}

/* <div className="container mx-auto">
      
    </div> */
