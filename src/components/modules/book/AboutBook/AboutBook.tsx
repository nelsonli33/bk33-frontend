import React, { useState, useLayoutEffect, useRef } from "react";
import styles from "./AboutBook.module.css";
import { VscChevronDown } from "react-icons/vsc";

export default function AboutBook() {
  const contentMaxHeight = 344;
  const [showMore, setShowMore] = useState(false);
  const contentRef = useRef(null);

  useLayoutEffect(() => {
    if (contentRef.current.scrollHeight > contentMaxHeight) {
      setShowMore(true);
    }
  }, []);

  const contentStyle = {
    maxHeight: showMore ? `${contentMaxHeight}px` : undefined,
  };

  return (
    <div>
      <h3 className="text-left mb-3">內容簡介</h3>
      <div className="flex flex-col items-start">
        <div>
          <div
            className={`relative overflow-hidden w-full`}
            style={contentStyle}
            ref={contentRef}
          >
            <div className={styles.aboutBook}>
              <p>年紀愈大，記憶一定會愈來愈差嗎？</p>
              <p>開始會忘記想說的話、想不起別人的名字，是大腦退化的前兆嗎？</p>
              <p>仰賴手機記事情，會不會因為動腦不夠多、更容易變笨？</p>
              <p>忘記參加會議、忘記另一半說的話，這種忘記代表不夠用心嗎？</p>
              <br />
              <p>
                <b>我們其實不了解記憶是怎麼一回事。</b>
              </p>
              <p>
                作者潔諾娃十多年來致力於對全球聽眾講述記憶與阿茲海默症。無論到哪裡，她都會碰到讀者提問，擔憂自己的健忘是不是疾病的前兆。她發現，大家的恐懼來自於不了解。於是，她決定寫一本書，幫助大家理解記憶的運作。書中以生活中常見的例子說明不同類型的記憶各有不同的特性，用對方法，就能提升記憶表現。書中更釐清我們對遺忘的許多誤解。
              </p>
              <br />
              <p>
                <b>忘記有時很惱人，但不是需要被打敗的敵人。</b>
              </p>
              <p>
                我們往往把遺忘視為偷走記憶的反派，但其實忘記不但不是病，還是大腦重新整理、去蕪存菁的重要功能。忘不掉反而會讓我們被過量資訊壓垮，無法正常生活。我們不用成為能背出圓周率小數點後十萬位數記憶冠軍，但我們有很多方法可以記住重要的事。了解記憶，我們可以更輕鬆看待遺忘、養成善待記憶的生活習慣。
              </p>
              <br />
              <p>
                <b className="font-bold">在本書中，你可以學到：</b>
              </p>
              <ul>
                <li>
                  <p>提升記憶力的方法</p>
                </li>
                <li>
                  <p>如何改善健忘</p>
                </li>
                <li>
                  <p>提升記憶力的方法</p>
                </li>
              </ul>
            </div>
            {showMore && (
              <div
                className="absolute bottom-0 left-0 w-full h-[100px] pointer-events-none block
            bg-gradient-to-b from-transparent to-white"
              ></div>
            )}
          </div>
          {showMore && (
            <div>
              <span
                className="inline-flex items-center text-left text-sm cursor-pointer
          font-medium pb-1 border-b border-transparent border-solid hover:border-black"
                onClick={() => {
                  setShowMore(false);
                }}
              >
                展開內容{" "}
                <span className="ml-1">
                  <VscChevronDown size={18} />
                </span>
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
