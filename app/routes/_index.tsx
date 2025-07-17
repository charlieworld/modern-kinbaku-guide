import { useState } from "react";
import { HiCursorClick } from "react-icons/hi";
import { motion } from "framer-motion";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import type { MetaFunction } from "@remix-run/node";
import { TbHandClick } from "react-icons/tb";

import Introduction from "~/components/Introduction";
import News from "~/components/News";
import Comments from "~/components/Comments";
import loadData from "~/utils/loadData";
import { formatNumber } from "~/utils/utils";
import CommentsMobile from "~/components/CommentsMobile";
import Progress from "~/components/Progress";

const TARGET = 100000;

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
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", duration: 1 }}
      >
        {title}
      </motion.h2>
    </div>
  );
}

/*
function ShareNow() {
  return (
    <button className="w-full  border border-gray-300 rounded-lg p-2 mb-6">
      分享
    </button>
  );
}*/

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function FollowNow() {
  return (
    <a
      className="w-full flex items-center justify-center font-bold text-primary-link border border-primary-link rounded-lg p-4"
      href="https://forms.gle/HgjDMGA8ADUwMSdQ6"
      target="_blank"
      rel="noreferrer"
    >
      <div>訂閱翻譯進度</div>
      <motion.div
        animate={{ scale: 1.2, rotate: -45 }}
        transition={{ type: "spring", duration: 4 }}
        className="ml-2"
      >
        <TbHandClick size={16} className=" text-primary-link" />
      </motion.div>
    </a>
  );
}

function DonateNow() {
  return (
    <div className="relative">
      <a
        href="https://forms.gle/AivfzyYaMsM9SngR7"
        target="_blank"
        rel="noreferrer"
        className="w-full block text-center bg-primary-base text-white rounded-lg p-4 "
      >
        立即贊助
      </a>
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

export const loader = async () => {
  const res = (await loadData()) || [];
  let count = res.filter((i) => !i.remark);
  const donner = count.length;

  count = count
    .map((i) => i.donateAmount)
    .reduce((a, b) => {
      return Number(a) + Number(b);
    }, 0);
  const totalAmount = Number(count);
  const data = res.map((item) => {
    const temp = { ...item };
    delete temp.donateAmount;
    delete temp.email;
    delete temp.remark;
    return temp;
  });
  return json({
    totalAmount,
    donner,
    data,
  });
};

export default function Index() {
  const loaderData = useLoaderData<typeof loader>();

  const tabs = [
    { label: "簡介", key: "introduction" },
    { label: "最新消息", key: "news" },
  ];

  function TabSection() {
    const [activeTab, setActiveTab] = useState("introduction");

    return (
      <div className="mb-4 w-full">
        <div className="flex border-b mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              className={`px-4 py-2 font-semibold w-1/2 ${
                activeTab === tab.key
                  ? "border-b-2 border-primary-base text-primary-base"
                  : "text-gray-400"
              }`}
              onClick={() => setActiveTab(tab.key)}
              type="button"
            >
              {tab.label}
            </button>
          ))}
        </div>
        {activeTab === "introduction" && <Introduction className="" />}
        {activeTab === "news" && <News className="" />}
      </div>
    );
  }

  return (
    <>
      <CommentsMobile className="" />
      <div className="px-4 md:px-10 w-full pb-10 max-w-5xl">
        <h1 className=" pt-2 mb-2 md:mb-8  font-bold text-2xl lg:text-4xl">
          青山夏樹《現代緊縛入門》翻譯出版經費募集中！！！
        </h1>
        <div className="md:flex md:justify-between">
          <div></div>
          <div className="md:w-2/3  flex flex-col">
            <div
              className=" w-full h-80 bg-contain bg-no-repeat bg-center flex flex-col-reverse"
              style={{ backgroundImage: 'url("/book_cover.jpg")' }}
            />
            <Progress
              className="hidden md:block"
              target={TARGET}
              value={loaderData.totalAmount / TARGET}
            />
          </div>

          <div className="mt-4 md:mt-0 md:w-1/3 md:pl-8 flex flex-col justify-between">
            <div>
              <Info
                subTitle="目前募集金額"
                title={`NT$ ${formatNumber(loaderData.totalAmount)}`}
              />
              <Info subTitle="贊助人次" title={`${loaderData.donner} 人`} />
              <Progress
                className="md:hidden"
                target={TARGET}
                value={loaderData.totalAmount / TARGET}
              />
            </div>
            <div>
              <DonateNow />
            </div>
          </div>
        </div>

        <div className="mt-8 flex">
          <div className="md:w-2/3 ">
            <TabSection />
          </div>
          <Comments className="w-1/3  hidden md:block" />
        </div>
      </div>
    </>
  );
}
