import React from "react";
import { BsCheck2 } from "react-icons/bs";

const takeawaySkills = [
  "了解記憶如何運作",
  "提升記憶力的方法",
  "如何改善健忘",
  "完整健腦指南",
  "如何避免阿茲海默症",
];

export default function TakeawaySkill() {
  return (
    <div>
      <h3 className="text-lg font-bold mb-3 ">你會學到</h3>
      <div className="lg:columns-2 mr-44 space-y-4">
        {takeawaySkills.map((item, index) => (
          <div className="flex flex-row space-x-2" key={index}>
            <BsCheck2 className="mt-1" />
            <span className="text-md">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
