/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import classNames from "classnames";

function P({ children }) {
  return <p className="mb-4">{children}</p>;
}

export default function Introduction({ className }) {
  return (
    <motion.div
      className={classNames("w-full", className)}
      initial={{ opacity: 0, x: 10 }}
      animate={{
        opacity: 1,
        x: 0,
        transition: { ease: "easeOut", duration: 0.7 },
      }}
    >
      <div>
        <P className="">
          我們正在進行青山夏樹老師寫作的《現代緊縛入門》中文翻譯專案！
        </P>
        <P>
          這本書籍是台灣第一本有關繩縛安全的書籍，而你的支持，將成為這項專案最重要的推動力！{" "}
        </P>
        <P>
          贊助者專屬回饋：
          <br />
          🎁 即時進度追蹤：第一時間獲知翻譯與出版進展。
          <br />
          🎁致謝名錄：你的名字將被收錄於出版感謝名單中，見證此本書籍出版的重要時刻。
        </P>
        <P>立即贊助！讓台灣 BDSM 社群可以有更多安全相關的知識支援！</P>
      </div>
      <div>
        <h3 className="">作者介紹：</h3>
        <div className="flex flex-col my-4  items-center md:items-start">
          <div
            className="w-40 h-40 bg-contain bg-no-repeat bg-center rounded-full"
            style={{ backgroundImage: 'url("/author.jpg")' }}
          />
          <a
            className=" underline text-primary-link"
            href="https://x.com/natsukiss1018"
            target="_blank"
            rel="noreferrer"
          >
            https://x.com/natsukiss1018
          </a>
        </div>
        <P>
          <b className=" text-lg">青山夏樹（あおやま・なつき）</b>
        </P>
        <ul className="list-disc ml-4">
          <li>1970年 出生於京都</li>
          <li>1991年 於福岡でSM club中以職業開始活動。</li>
          <li>同期，在久保書店發行的青年色情漫畫雜誌中連載色情漫畫1年。</li>
          <li>
            2001年 為精進SM而前往東京。同年成立SM同好會並每月舉辦play party。
          </li>
          <li>
            之後，為了學習具魅力的SM，在六本木SM bar表演及學習緊更加專業的繩縛。
          </li>
          <li>
            2004年 成立專業出版SM
            AV的製作公司「絶頂」。開始擔任AV導演，開始許多公司的製作。
            這段期間，與同為導演·緊縛師的亂田舞老師相遇，並成為師徒。而後承襲名號，以亂田二代目活動（現則以青山夏樹的名義活動）
          </li>
          <li>
            2012年 為推廣安全的緊縛為目標，發起「青縄会（せいじょうかい）」。
          </li>
          <li>
            2015年 開啟青縄会的緊縛指導課程「青学（せいがく）」。
            成立NPO法人BDSM安全支援協會設立、擔任代表理事。
          </li>
          <li>
            2016年
            3月共同執筆並自費出版「現代緊縛入門」，出版。「女孩子的戀愛方式筆記（飛鳥新社）」，出版
            電子書「M之門扉」原作
            出演各式舞台表演、繩縛表演。AV導演、及出演作品都超過200部
            擁有豐富的SM業界內外媒體工作經驗
          </li>
        </ul>
      </div>
    </motion.div>
  );
}
