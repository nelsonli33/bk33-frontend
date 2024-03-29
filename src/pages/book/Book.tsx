import React from "react";
import Frame from "../../components/elements/Frame";
import BookHero from "../../components/modules/book/BookHero";
import AboutBook from "../../components/modules/book/AboutBook";
import TableOfContent from "../../components/modules/book/TableOfContent";
import Author from "../../components/modules/book/Author";
import CustomerReview from "../../components/modules/book/CustomerReview";

export default function Book() {
  return (
    <Frame title="內容詳情">
      <BookHero />
      <div className="w-full relative">
        <div className="before:absolute before:top-0 before:left-0 before:content-[''] before:z-10 before:w-full before:h-36 before:bg-brand-linen">
          <div className="max-w-5xl mx-auto p-12 relative z-20 bg-white rounded-t-2xl">
            <div className="flex flex-col sm:flex-row">
              <div className="flex flex-col lg:mr-16 space-y-9 max-w-[calc(100%_-_theme('spacing.90'))] divide-y-2 divide-gray-100">
                <AboutBook />
                <TableOfContent />
                <Author />
                <CustomerReview />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Frame>
  );
}
