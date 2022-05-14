import React from "react";
import Tippy from "@tippyjs/react";
import "tippy.js/animations/shift-away-subtle.css";

import { BsFillCaretDownFill } from "react-icons/bs";
const transactions = [
  {
    id: "1",
    order_code: "AAPS0L2",
    order_completed_at: "2022/05/01",
    item_name: "原子習慣：細微改變帶來巨大成就的實證法則",
    payment_method: "信用卡",
    order_status: "已完成",
    order_amount: "NT$500",
    transaction_fee: "-NT$12",
    tax_fee: "-NT$12",
    commission_fee: "-NT$150",
    order_income: "NT$349",
  },
  {
    id: "2",
    order_code: "AAPS0L3",
    order_completed_at: "2022/05/01",
    item_name: "原子習慣：細微改變帶來巨大成就的實證法則",
    payment_method: "信用卡",
    order_status: "已完成",
    order_amount: "NT$500",
    transaction_fee: "-NT$12",
    tax_fee: "-NT$12",
    commission_fee: "-NT$150",
    order_income: "NT$349",
  },
  {
    id: "3",
    order_code: "AAPS0L4",
    order_completed_at: "2022/05/01",
    item_name: "原子習慣：細微改變帶來巨大成就的實證法則",
    payment_method: "超商代碼",
    order_status: "已完成",
    order_amount: "NT$500",
    transaction_fee: "-NT$12",
    tax_fee: "-NT$12",
    commission_fee: "-NT$150",
    order_income: "NT$339",
  },
  // More transactions...
];

const RevenueDataTable = () => {
  const renderIncomeDetails = (transaction) => (
    <div className="flex flex-col p-4 shadow-3 bg-white  min-w-[230px] md:min-w-[255px] rounded">
      <div className="flex justify-between items-center py-2">
        <div className="">訂單金額</div>
        <div className="">{transaction.order_amount}</div>
      </div>
      <div className="flex justify-between items-center py-2">
        <div className="">金流手續費</div>
        <div className="">{transaction.transaction_fee}</div>
      </div>
      <div className="flex justify-between items-center py-2">
        <div className="">營業稅</div>
        <div className="">{transaction.tax_fee}</div>
      </div>
      <div className="flex justify-between items-center py-2">
        <div className="">成交手續費</div>
        <div className="">{transaction.commission_fee}</div>
      </div>
      <div className="flex justify-between items-center py-2">
        <div className="">訂單進帳</div>
        <div className="font-bold text-2xl">{transaction.order_income}</div>
      </div>
    </div>
  );

  return (
    <>
      <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <table className="min-w-full divide-y divide-gray-300">
            <thead>
              <tr>
                <th
                  scope="col"
                  className="whitespace-nowrap py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-brand-black sm:pl-6"
                >
                  訂單編號
                </th>
                <th
                  scope="col"
                  className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-brand-black"
                >
                  交易日期
                </th>
                <th
                  scope="col"
                  className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-brand-black"
                >
                  內容名稱
                </th>
                <th
                  scope="col"
                  className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-brand-black"
                >
                  付款方式
                </th>
                <th
                  scope="col"
                  className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-brand-black"
                >
                  訂單狀態
                </th>
                <th
                  scope="col"
                  className="whitespace-nowrap px-4 py-3.5 text-left text-sm font-semibold text-brand-black"
                >
                  訂單進帳
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {transactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td className="whitespace-nowrap py-2 pl-4 pr-3 text-sm text-brand-black sm:pl-6">
                    {transaction.order_code}
                  </td>
                  <td className="whitespace-nowrap px-2 py-2 text-sm text-brand-black">
                    {transaction.order_completed_at}
                  </td>
                  <td className="whitespace-nowrap px-2 py-2 text-sm text-brand-black">
                    {transaction.item_name}
                  </td>
                  <td className="whitespace-nowrap px-2 py-2 text-sm text-brand-black">
                    {transaction.payment_method}
                  </td>
                  <td className="whitespace-nowrap px-2 py-2 text-sm text-brand-black">
                    {transaction.order_status}
                  </td>
                  <td className="whitespace-nowrap px-2 py-2 text-sm text-brand-black">
                    <Tippy
                      role="popover"
                      content={renderIncomeDetails(transaction)}
                      placement={"bottom-start"}
                      animation={"shift-away-subtle"}
                      arrow={false}
                      trigger={"click"}
                      interactive={true}
                      duration={150}
                    >
                      <button
                        type="button"
                        className="inline-flex items-center px-2 py-3 hover:bg-gray-150 rounded active:ring-1 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-brand-green"
                      >
                        {transaction.order_income}
                        <BsFillCaretDownFill className="ml-2" />
                      </button>
                    </Tippy>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default RevenueDataTable;
