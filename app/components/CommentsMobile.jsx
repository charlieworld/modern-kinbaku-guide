/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */

import classNames from "classnames";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
/* eslint-disable react/prop-types */

const CommentList = [
  {
    index: 0,
    name: "TinaTea 緹",
    comment:
      "這本書實在太棒了！ 這本書實在太棒了！ 這本書實在太棒了！ 這本書實在太棒了！ 這本書實在太棒了！ 這本書實在太棒了！",
    time: "2025-01-01 12:00",
  },
  {
    index: 1,
    name: "柚子泥",
    comment: "希望大家都能喜歡這本書 （累)",
    time: "2025-01-01 12:05",
  },
  {
    index: 2,
    name: "小華",
    comment:
      "我好期待這本書的出版！ 我好期待這本書的出版！ 我好期待這本書的出版！",
    time: "2025-01-01 12:30",
  },
  {
    index: 3,
    name: "小華",
    comment: "我好期待這本書的出版！",
    time: "2025-01-01 13:10",
  },
  {
    index: 4,
    name: "小華",
    comment: "我好期待這本書的出版！",
    time: "2025-01-01 13:30",
  },
  {
    index: 5,
    name: "小華",
    comment: "我好期待這本書的出版！",
    time: "2025-01-01 14:00",
  },
  {
    index: 6,
    name: "小華",
    comment: "我好期待這本書的出版！",
    time: "2025-01-01 14:30",
  },
  {
    index: 7,
    name: "小華",
    comment: "我好期待這本書的出版！",
    time: "2025-01-01 15:00",
  },
];

export default function CommentsMobile({ className }) {
  const renderItems = () => {
    return CommentList.map((item) => (
      <div key={item.index} className=" w-full px-4 ">
        <div className="flex items-center">
          <div className="text-primary-base  font-semibold">{item.name}</div>
          <div className="text-xs text-gray-500 ml-1">{item.time}</div>
        </div>
        <div className="line-clamp-2 text-left text-sm">
          {item.comment}
        </div>
      </div>
    ));
  };

  return (
    <div
      className={classNames("md:hidden w-full py-2 border-b border-gray-100", className)}
    >
      <Carousel
        className="relative w-full"
        autoPlay
        infiniteLoop
        interval={4000}
        showThumbs={false}
        showStatus={false}
        showIndicators={false}
        renderArrowPrev={() => null}
        renderArrowNext={() => null}
      >
        {renderItems()}
      </Carousel>
    </div>
  );
}
