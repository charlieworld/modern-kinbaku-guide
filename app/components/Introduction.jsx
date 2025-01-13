/* eslint-disable react/prop-types */

function P({children}) {
  return <p className="mb-4">{children}</p>
}

export default function Introduction({ className }) {
  return (
    <div className={className}>
      <P className="">我們正在進行青山夏樹老師寫作的《現代緊縛入門》中文翻譯專案！</P>
      <P>
        這本書籍是台灣第一本有關繩縛安全的書籍，而你的支持，將成為這項專案最重要的推動力！{" "}
      </P>
      <P>
        <div>贊助者專屬回饋： </div>
        <div>🎁 即時進度追蹤：第一時間獲知翻譯與出版進展。 </div>
        <div>
          🎁
          致謝名錄：你的名字將被收錄於出版感謝名單中，見證此本書籍出版的重要時刻。
        </div>
      </P>
      <P>立即贊助！讓台灣 BDSM 社群可以有更多安全相關的知識支援！</P>
    </div>
  );
}
