import { HiCursorClick } from "react-icons/hi";
import { motion } from "framer-motion";

import type { MetaFunction } from "@remix-run/node";

import Introduction from "~/components/Introduction";
import Comments from "~/components/Comments";

export const meta: MetaFunction = () => {
  return [
    { title: "青山夏樹《現代緊縛入門》翻譯出版" },
    { name: "description", content: "青山夏樹《現代緊縛入門》翻譯出版" },
  ];
};

interface InfoProps {
  subTitle: string;
  title: string;
}

function Info({ subTitle, title }: InfoProps) {
  return (
    <div className="mb-4 tracking-wider">
      <div className=" text- text-gray-400 mb-2">{subTitle}</div>
      <motion.h2
        className=" text-4xl"
        initial={{ scale: 0.5,opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", duration: 1 }}
      >
        {title}
      </motion.h2>
    </div>
  );
}

function ShareNow() {
  return (
    <button className="w-full  border border-gray-300 rounded-lg p-2 mb-6">
      分享
    </button>
  );
}

function DonateNow() {
  return (
    <div className="relative">
      <button className="w-full bg-primary-base text-white rounded-lg p-4 ">
        立即贊助
      </button>
      <motion.div
        animate={{ scale: 0.5 }}
        transition={{ type: "spring", duration: 1, repeat: Infinity }}
        className=" absolute top-3 right-10"
      >
        <HiCursorClick size={40} className=" text-white" />
      </motion.div>
    </div>
  );
}

export default function Index() {
  return (
    <div className="px-4 md:px-10 w-full pb-10 max-w-5xl">
      <h1 className=" pt-2 mb-2 md:mb-8  font-bold text-2xl lg:text-4xl">
        青山夏樹《現代緊縛入門》翻譯出版金費募集中！！！
      </h1>
      <div className="md:flex md:justify-between">
        <div
          className="md:w-2/3 h-56 md:h-96 bg-contain"
          style={{ backgroundImage: 'url("/cover.jpg")' }}
        />
        <div className="mt-4 md:mt-0 md:w-1/3 md:pl-8 flex flex-col justify-between">
          <div>
            <Info subTitle="目前募集金額" title="$NTD 30,000" />
            <Info subTitle="贊助人次" title="256" />
          </div>
          <div>
            <ShareNow />
            <DonateNow />
          </div>
        </div>
      </div>
      <div className="mt-8 flex">
        <Introduction className="md:w-2/3 " />
        <Comments className="w-1/3  hidden md:block" />
      </div>
    </div>
  );
}
