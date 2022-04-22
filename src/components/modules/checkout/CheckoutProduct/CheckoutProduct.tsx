import React from "react";

const books = [
  {
    id: 1,
    name: "圖像資訊表達課",
    cover_url:
      "https://s3.ap-northeast-1.amazonaws.com/s3.sat/course/1648608896_re-lab%E8%A6%96%E8%A6%BA_%E5%B7%A5%E4%BD%9C%E5%8D%80%E5%9F%9F%201.jpg",
    price: 500,
  },
  {
    id: 2,
    name: "Redis 實戰手冊",
    cover_url:
      "https://s3.ap-northeast-1.amazonaws.com/s3.sat/course/1647924019_%E5%8A%89%E5%8D%9A%E4%BB%81%EF%BD%9C%E4%B8%BB%E8%A6%96%E8%A6%BA%E6%8E%92%E7%89%88%20_%20872%20x%20480_v7.jpg",
    price: 369,
  },
];

export default function CheckoutProduct() {
  return (
    <div className="bg-white shadow rounded">
      <div className="text-xl font-medium px-8 pt-3 h-13">訂單商品</div>
      <div className="mt-1">
        <div className="flex items-center overflow-hidden h-10 text-md font-medium text-gray-800 px-8 border-b border-gray-300">
          <div className="flex-[12_1_0%]">商品</div>
          <div className="flex-[4_1_0%]">售價</div>
          <div className="flex-[4_1_0%]"></div>
          <div className="flex-[4_1_0%] flex justify-end">總價</div>
        </div>
        <div className="border-b-2 border-dashed">
          {books.map((book) => (
            <div
              className="flex items-center py-3 px-8 text-[#212529]"
              key={book.id}
            >
              <div className="flex-[12_1_0%]">{book.name}</div>
              <div className="flex-[4_1_0%]">NT${book.price}</div>
              <div className="flex-[4_1_0%]"></div>
              <div className="flex-[4_1_0%] flex justify-end">
                NT${book.price}
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center py-5 px-8">
          <div className="flex-[12_1_0%] flex justify-end text-sm text-gray-500">
            商品總金額(2 商品): &nbsp;&nbsp;
          </div>
          <div className="flex-[1_1_0%] text-xl">NT$869</div>
        </div>
      </div>
    </div>
  );
}
