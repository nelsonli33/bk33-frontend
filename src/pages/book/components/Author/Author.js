import React from "react";
import Avatar from "../../../../components/Avatar";

export default function Author() {
  return (
    <div>
      <div className="flex flex-row items-center">
        <Avatar width={36} height={36} />
        <div className="ml-2">
          <span className="font-medium">王小明</span>
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
