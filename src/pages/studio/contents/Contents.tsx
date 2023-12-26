import React from "react";
import StudioFrame from "../../../components/modules/studio/home/StudioFrame";
import { useRouter } from "next/router";
import StudioPage from "../../../components/layouts/studio/StudioPage";
import { useGetBooks } from "../../../hooks/api/author/book";
import Link from "../../../components/elements/Link";

// const books = [
//   {
//     id: 1,
//     title: "圖像資訊表達課",
//     author: "文森說書",
//     genre: "大腦科學",
//     short_description:
//       "我在十年內經營過兩個超過月瀏覽人次超過百萬的網站，花了十年時間萃取20個方法，並以終身更新的方式每個月提供內容更新，讓學習者可以跟著我終身學習成長。",
//     cover_url:
//       "https://iodglobal.com/newweb/uploads/handsbook/cover_page/1566969561atthegoingdownofthesun_mockup.png",
//     price: 500,
//     format_price: "NT$500",
//     reading_count: 1009,
//     published_date: "",
//     status: "draft",
//   },
// ];

export default function Books() {
  const router = useRouter();

  const { data, isLoading } = useGetBooks(
    +router.query?.page,
    +router.query?.limit
  );

  console.log(data);

  const bookStatusMarkup = (status) => {
    switch (status) {
      case 0:
        return (
          <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
            草稿
          </span>
        );
      case 1:
        return (
          <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
            已發布
          </span>
        );
      default:
        return;
    }
  };

  return (
    <StudioFrame title="內容">
      <StudioPage
        title="內容"
        primaryAction={{
          content: "新增內容",
          onAction: () => {
            router.push("/studio/contents/basic");
          },
        }}
      >
        <div className="mt-12 flex flex-col">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 md:pl-0"
                    ></th>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900"
                    >
                      內容標題
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900"
                    >
                      售價
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900"
                    >
                      發表日期
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900"
                    >
                      狀態
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {data &&
                    data.books.map((book) => (
                      <tr key={book.id}>
                        <td className="w-12 whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 md:pl-0">
                          <img className="w-full rounded" src={book.cover} />
                        </td>

                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 ">
                          <Link
                            url={`/studio/contents/${book.id}/detail`}
                            className="hover:underline"
                          >
                            {book.title}
                          </Link>
                        </td>

                        <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-900">
                          {book.price}
                        </td>
                        <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-900">
                          {book.published_at}
                        </td>
                        <td className="whitespace-nowrap px-2 py-4 text-sm text-gray-500">
                          {bookStatusMarkup(book.status)}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </StudioPage>
    </StudioFrame>
  );
}
