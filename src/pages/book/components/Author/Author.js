import React from "react";
import Avatar from "../../../../components/Avatar";

export default function Author() {
  return (
    <div>
      <h3 className="my-6">作者介紹</h3>
      <div className="sm:flex mb-3">
        <div className="mb-4 flex-shrink-0 sm:mb-0 sm:mr-4">
          <img
            className="inline-block h-12 w-12 rounded-full"
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt=""
          />
        </div>
        <div>
          <h4 className="text-lg font-bold">王磊</h4>
          <span className="inline-block mt-1 text-sm text-gray-500">
            Thoughtworks 中國區 CTO
          </span>
        </div>
      </div>
      <div>
        <p>
          大家好，我是Ken Cen，
          是一名手機程序工程師和網站工程師，我曾經在英資銀行(匯豐銀行)IT部門工作6年，我希望建立一些課程可以幫助任何一個沒有程序開發經驗的朋友較輕鬆地學習IT相關的語言和工具。
          而我希望製作一些較完整，具有多個實際操作例子的課程，幫助學員在短時間內全面地了解整個課題的知識，同時，能讓新學到的知識運用到實際的操作和工作中去。
          而在Udemy平台，
          我的課程也成為了最暢銷的中文課程之一，我希望創作更多大家認同的課程，創作更多內容詳盡，實例豐富的課程，期待在課程裡見到大家！並感謝所有支持我的學員！
        </p>
      </div>
    </div>
  );
}
