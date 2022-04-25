import React from "react";
import ReactStars from "react-rating-stars-component";
import DOMPurify from "isomorphic-dompurify";

const comments = [
  {
    id: 1,
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    user_name: "Amber lili",
    rating: 5,
    rating_date: "2022/04/20 12:22:15",
    comment: `謝謝老師用心且細膩的線上課程規劃<br/>讓我從0開始學習Podcast規劃卻一點都不覺得難<br/>我已經手寫了將近10頁滿滿的筆記了！<br/>近期應該會開始要製作Podcast了，屆時會遵照老師的教學來規劃和發展<br/>希望老師的事業也能繼續鴻圖大展<br/>`,
  },
  {
    id: 2,
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    user_name: "玉米",
    rating: 4.5,
    rating_date: "2022/04/20 12:22:15",
    comment: `謝謝老師用心且細膩的線上課程規劃<br/>讓我從0開始學習Podcast規劃卻一點都不覺得難<br/>我已經手寫了將近10頁滿滿的筆記了！<br/>近期應該會開始要製作Podcast了，屆時會遵照老師的教學來規劃和發展<br/>希望老師的事業也能繼續鴻圖大展<br/>`,
  },
  {
    id: 3,
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    user_name: "Suting",
    rating: 4,
    rating_date: "2022/04/20 12:22:15",
    comment: `老師透過自身經驗的分享，以及工具的挑選、開始的步驟，一步一步帶領，非常實用的課程，如果是完全新手，很推薦這個課，真的可以開始跟著實作，產出屬於自己的podcast`,
  },
];

export default function CustomerReview() {
  const totalRatingMarkup = (
    <div className="flex flex-col">
      <div>
        <span className="inline-block text-4xl font-extrabold">4.8</span>
        <span className="inline-block text-xl">/5</span>
      </div>
      <div className="flex items-center mt-1">
        <ReactStars
          count={5}
          value={4.8}
          size={24}
          isHalf={true}
          edit={false}
          activeColor="#eab308"
        />
        <span className="inline-block text-gray-500">&nbsp; 438 則評價</span>
      </div>
    </div>
  );

  const commentsMarkup = (
    <div className="my-5 space-y-4">
      {comments.map((comment) => {
        return (
          <div className="flex bg-[#f4f4f4] p-4 rounded-md" key={comment.id}>
            <div className="w-16">
              <img
                className="inline-block h-10 w-10 rounded-full"
                src={comment.avatar}
                alt=""
              />
            </div>
            <div className="flex-1">
              <div className="flex flex-col space-y-2">
                <div>
                  <div>{comment.user_name}</div>
                  <div>
                    <ReactStars
                      count={5}
                      value={comment.rating}
                      size={16}
                      isHalf={true}
                      edit={false}
                      activeColor="#eab308"
                    />
                  </div>
                </div>
                <span className="inline-block text-xs text-gray-600">
                  {comment.rating_date}
                </span>
                <div
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(comment.comment),
                  }}
                  className="text-base leading-7 text-gray-700"
                ></div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );

  return (
    <div>
      <h3 className="my-6">評價</h3>
      <div>
        {totalRatingMarkup}
        {commentsMarkup}
      </div>
    </div>
  );
}
