import React from "react";

import { AiOutlineFieldTime, AiOutlineStar } from "react-icons/ai";
import { MdOutlineQuiz } from "react-icons/md";
import { BsPeople } from "react-icons/bs";

import TakeawaySkill from "./components/TakeawaySkill";
import { LessonIcon } from "../../../elements/Icon";
import Price from "../../../elements/Price";

export default function BookHero() {
  return (
    <div className="bg-brand-linen py-12">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-12 gap-x-8">
          <div className="col-span-8">
            <h1 className=" font-bold mb-4">一生都能好好記憶</h1>
            <div className=" text-lg  mb-8">
              哈佛神經科學家寫給每個人的大腦記憶全書，遺忘不是敵人，簡單練習，訓練記憶陪你走的更遠
            </div>
            <div className=" text-md font-bold mb-6">
              王磊 (Thoughtworks 中國區 CTO)
            </div>
            <div className="flex flex-wrap justify-start gap-8 items-center font-bold mb-8 py-4 border-y border-gray-200">
              <div className="flex">
                <LessonIcon />
                <span className="ml-2">16 單元</span>
              </div>
              <div className="flex">
                <AiOutlineFieldTime className="h-6 w-6 stroke-2" />
                <span className="ml-2">40 分鐘</span>
              </div>
              <div className="flex">
                <MdOutlineQuiz className="h-6 w-6" />
                <span className="ml-2">22 題測驗</span>
              </div>
              <div className="flex">
                <AiOutlineStar className="h-6 w-6" />
                <span className="ml-2">4.8 / 5 (800)</span>
              </div>
              <div className="flex">
                <BsPeople className="h-6 w-6" />
                <span className="ml-2">909 人閱讀</span>
              </div>
            </div>
            <div>
              <TakeawaySkill />
            </div>
          </div>
          <div className="col-span-4">
            <div className="max-w-[215px] mx-auto">
              <img src="https://iodglobal.com/newweb/uploads/handsbook/cover_page/1566969561atthegoingdownofthesun_mockup.png" />
            </div>
            <div className="space-y-3">
              <div className="card-section flex flex-col my-3 space-y-5 px-8 py-2">
                <Price price="$179" />
                <button className="btn-secondary w-full text-sm">
                  加入購物車
                </button>
                <button className="btn-primary w-full text-sm">直接購買</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
