import React, { useLayoutEffect, useRef } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Div from "../../../components/elements/TiptapEditor/extensions/div";
import CustomClass from "../../../components/elements/TiptapEditor/extensions/custom-class";

export default function Page() {
  const editorContainerRef = useRef(null);
  const editor = useEditor({
    editable: false,
    content: `
      <h2>1-1 想法的起源</h2>
      <p>
        多數人想到69歲，會聯想到敬老票和記憶力變。但日本退休原口證，卻把圓周率這個無限不循環的無理數背到第111,700位數。比3.14159再
        多出小數點後111,695個數宇，而且是用背的！我同意這聽起來很驚人。你一定會想，原口以前肯定是神童，也許是數學天才或記憶達人，但他不是。他是一個普通人，有著健康、隨年紀衰退的大腦，這也許代表著更難以置信的事質你的大腦也有能力記住
        111,700位數的圓周率。
        我們可以學習並記住任何事，你的孩子獨特的聲音、新朋友的面孔、停車的位置、你4歲時一個人去超市買酸奶油的情景、泰勒絲最新單曲的歌詞。成年人平均記得二到十萬個單宇的讀音、寫法和意思；國際西洋棋大師可以記住約十萬種棋步；職業鋼琴家可以彈奏拉赫曼尼諾夫第三鋼琴協奏曲，把近三萬個音符的組合記在腦中，而且可以不看樂譜直接彈奏巴哈、蕭邦或舒曼的作品。
      </p>
      <p>
        我們的記憶可以保存充滿意義或毫無意義的資訊、簡單或複雜的資訊，而且容量似乎是無限的。我們可以記住任何事情，而且在適當的條件下，這是做得到的。記憶為什麼能做到所有這些事？神經學上，記憶到底是什麼？記憶是如何產生的？記憶儲存在哪裡？我們又是如何提取記憶的？
      </p>
      <p>
              一個記憶形成時，會改變你的大腦。你擁有的每一個記憶，都是大腦根據你所經歷的事情，持續產生物理變化的結果。你從不知道一件事，變成了知道這件事；從還沒有經歷過今天，到又過了一天。明天要能記住今天發生的事情，代表你的大腦必須有所變化。
            </p>

            <p>
              如何變化？首先，你經歷到的感官、倩緒和事實體驗，會透過你的感覺器官來感知，你才會看到、聽到、聞到、嚐到和感覺到東西。
            </p>
            <p>
              假設在初夏的晚上，你和最要好的朋友及他們的家人在你最喜歡的海灘上。在發生的所有事情中，你注意到小朋友們在沙灘上踢足球，還有天空絢麗的夕陽。你聽到隨身喇叭正在播放女神卡卡的《天生完美》(Borm
              ThisWay），那是你最愛的歌曲之一。女兒跑到你面前，哭哭啼啼地指著她紅腫的腳踝，她被水母螫到了。幸運的是，你的朋友特別為了因應這種情況隨身帶了一罐嫩化劑。你把嫩化劑調成糊狀，塗抹在被螫到的地方，很快就舒緩了女兒的疼痛（這個方法確實有效）。你聞到鹹鹹的海風和營火飄出的煙，品嚐了沁涼的白葡萄酒、新鮮的生蠔和黏糊糊的烤棉花糖。你覺得很幸福。
            </p>
            <p>
              孩子踢足球的畫面與女神卡卡、水母、牡蠣的味道都無關，除非這些短暫、獨立的經歷串連在一起。要成為你以後能回想起來的記憶
              ——
              <strong>
                還記得那個夏天的晚上，我們吃著生蠔和烤棉花糖，聽著女神卡卡的歌，孩子們在沙灘上踢足球，小蘇西還被水母螫到嗎？
              </strong>
              ——
              所有以前不相關的神經活動會變成串連在一起的神經活動模式。然後，這種模式透過神經元之問產生的結構變化而延續下去。這種神經結構和連結的持續改變，相連之後的神經迥路透過刺激，就能被重新體驗或想起來，這就是記憶。
            </p>
            <p>
              記憶的形成需要四個基本步驟：（1）<strong>編碼（Encoding)</strong>
              。資訊、情緒和意義，並將這些訊息轉化成神經語言。（2）
              <strong>固化 (Consolidacion)</strong>
              。你的大腦把以前不相關的神經活動，集合成單一相關的模式。(3)
              <strong>儲存(Storage)</strong>
              。這個新的模式會透過神經元持纘的結構和化學變化，而能長期延續下去。（4）
              <strong>提取(Retrieval)</strong>
              。現在，透過活化這些相關的連結，你就可以重溫、回憶、了解和辨識你所學到的經驗。要形成你可以有意識地提取的長期記憶，四個步驟都必須完成。你必須先把資訊輸入大腦、再把這些資訊編織在一起、透過大腦穩定的變化把經過編織的訊息儲存在大腦中，最後，當你需要存取記憶時，再提取這些編織過的的訊息。
            </p>
            <h3>記憶的編織者-海馬迴</h3>

            <p>
              以前不相關的神經活動，如何集合成一個互相連接的神經網絡，變成我們的單一記憶？我們並不很清楚這個過程是如何發生的，但是關於這個過程發生的地方，我們卻相當了解。經驗中包含的資訊，如知覺、語言、哪些人、什麼事、什麼地方、什麼時間，以及為什麼，都是由大腦中的海馬迴(hippocampus）所連接起來的。
            </p>

            <p>
              海馬迴是位於大腦深處的海馬狀結構，是記憶固化的關鍵。這代表什麼？海馬迴把你的記憶串起來，是記憶的編織者。
              <strong>
                發生了什麼事？在哪裡、什麼時候發生的？這是什麼意思？
              </strong>
              我對此有何感覺？海馬迴把腦中不同部位獨立的資訊片段連接在一起，將它們編織成可提取的相關資訊片段，當這個神經網絡受到刺激，人們就有了記憶。因此，要形成任何你之後能夠提取的新記憶，海馬迥都是必要的。如果海馬迴受損，你形成新記憶的能力也會受損。阿茲海默症開始發作時，首先受損的就是海馬迥，遺就是為什麼阿茲海默症患者最初的症狀通常是不記得今天稍早發生的事情，或是幾分鐘前別人剛說過的話或是不断重複同樣的故事或問題。由於海馬迥受損，阿茲海默症患者難以形成新的記憶。
            </p>
            <p>
            而且，由海馬迥控制的記憶固化過程需要花時間，因此中間也可能會被打斷。要成為明天、下週或20年後可以被提取的記憶，需要一系列分子層面的事件，這是-個要花時間的過程。在這段時間內，如果有東西干擾了海馬迥處理尚在萌芽中的記憶，該記憶可能會不完整，甚至可能遺失。
          </p>
    `,
    extensions: [StarterKit, Div, CustomClass],
  });

  useLayoutEffect(() => {
    if (editor && editor.view) {
      editor.view.dom.classList.remove("ProseMirror");
      editor.view.dom.classList.add(`w-[665px]`, "p-12");

      // console.log(editor?.view?.dom.getBoundingClientRect());

      let result = [];
      let from = 0;
      let to = -1;
      let currentHeight = 0;
      for (let i = 0; i < editor?.view?.dom.childNodes.length; i++) {
        let node = editor?.view?.dom.childNodes[i] as any;
        let clientHeight = node.clientHeight;
        let marginTop = window
          .getComputedStyle(node)
          .getPropertyValue("margin-top")
          .match(/\d+/)[0];
        let elementHeight = +clientHeight + +marginTop;
        currentHeight += elementHeight;

        if (currentHeight < 700) {
          to = node.pmViewDesc.posAtEnd;
        } else {
          result.push({
            from: from,
            to: to,
          });
          currentHeight = elementHeight;
          from = node.pmViewDesc.posAtStart;
          to = node.pmViewDesc.posAtEnd;
        }

        if (
          i === editor?.view?.dom.childNodes.length - 1 &&
          from > 0 &&
          to > 0
        ) {
          result.push({
            from: from,
            to: to,
          });
        }
      }

      result.forEach((item, index) => {
        editor
          .chain()
          .setTextSelection({ from: item.from + index * 2, to: item.to })
          .toggleWrap("div", {
            class: `bg-white w-[665px] sticky top-0 flex-[1_0_auto] p-12 page`,
            style: `left: ${index * 30}px; right:-610px;`,
          })
          .run();
      });

      editor
        .chain()
        .selectAll()
        .toggleWrap("div", {
          class: "flex flex-grow divide-x divide-gray-200",
        })
        .run();

      editor.view.dom.classList.remove(`w-[665px]`, "p-12");

      editorContainerRef.current.scrollTo(0, 0);

      // intersection
      const pages = document.querySelectorAll(".page");

      const intersectionCallback = (entries) => {
        entries.forEach((entry) => {
          console.log(entry);
          if (entry.isIntersecting) {
            entry.target.classList.add("shadow-[0_0_15px_3px_rgba(0,0,0,0.1)]");
          } else {
            entry.target.classList.remove(
              "shadow-[0_0_15px_3px_rgba(0,0,0,0.1)]"
            );
          }
        });
      };

      pages.forEach((page, index) => {
        let marginRight = `${-145 + index * 30 < 0 ? -145 + index * 30 : 0}px`;

        let options = {
          threshold: [0.986765],
          rootMargin: `0px ${marginRight} 0px 0px`,
        };

        let observer = new IntersectionObserver(intersectionCallback, options);
        observer.observe(page);
      });
    }
  }, [editor]);

  return (
    <div className="flex flex-col h-screen">
      <header
        className="w-full min-h-[44px] bg-white border-b border-gray-200 flex 
      items-center flex-wrap py-2 md:px-12"
      >
        <h1 className="text-xl leading-5">第一章：記憶如何形成</h1>
      </header>

      <div
        className="flex flex-grow overflow-y-hidden overflow-x-auto  page-container"
        ref={editorContainerRef}
      >
        <EditorContent editor={editor} className="article2 flex flex-grow" />
      </div>

      <style global jsx>{`
        body {
          background-color: #fafafc;
          padding: 0;
          margin: 0;
          height: 100vh;
        }
      `}</style>
    </div>
  );
}

{
  // shadow-[0_0_15px_3px_rgba(0,0,0,0.1)]
  // .toggleWrap("div", {
  //   class: "bg-white w-[625px] sticky top-0 flex-[1_0_auto] p-8",
  // })
}