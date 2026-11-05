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
import { readDonations } from "~/utils/donations.server";
import { formatNumber } from "~/utils/utils";
import CommentsMobile from "~/components/CommentsMobile";
import Progress from "~/components/Progress";
import CarouselBanner from "~/components/CarouselBanner";

const TARGET = 100000;

const DEFAULT_TITLE = "出版！加油！";
const DEFAULT_DESCRIPTION =
  "我們正在進行青山夏樹老師寫作的《現代緊縛入門》中文翻譯專案！ 這本書籍是台灣第一本有關繩縛安全的書籍，而你的支持，將成為這項專案最重要的推動力！";
const WEBSITE = "https://contemporary-kinbaku-guide.site";
const META_IMAGE = `${import.meta.env.BASE_URL}cover_2.jpg`;

const DEFAULT_META = [
  { title: DEFAULT_TITLE },
  { name: "description", content: DEFAULT_DESCRIPTION },
  { property: "og:locale", content: "zh-TW" },
  { property: "og:type", content: "website" },
  { property: "og:title", content: DEFAULT_TITLE },
  { property: "og:description", content: DEFAULT_DESCRIPTION },
  { property: "og:image", content: META_IMAGE },
  { property: "og:image:width", content: 1200 },
  { property: "og:image:height", content: 630 },
  { property: "og:image:type", content: "image/jpeg" },
  { property: "og:url", content: WEBSITE },
  { property: "og:site_name", content: DEFAULT_TITLE },
  { property: "twitter:title", content: DEFAULT_TITLE },
  { property: "twitter:description", content: DEFAULT_DESCRIPTION },
  { property: "twitter:image", content: META_IMAGE },
  { property: "twitter:card", content: "summary_large_image" },
];

export const meta: MetaFunction = () => {
  return DEFAULT_META;
};

interface InfoProps {
  subTitle: string;
  title: string;
}

function Info({ subTitle, title }: InfoProps) {
  return (
    <div className="mb-4 tracking-wider">
      <div className=" text- text-primary-light mb-2">{subTitle}</div>
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

export const loader = () => {
  return json(readDonations());
};

export default function Index() {
  const loaderData = useLoaderData<typeof loader>();

  const tabs = [
    { label: "最新消息", key: "news" },
    { label: "簡介", key: "introduction" },
  ];

  function TabSection() {
    const [activeTab, setActiveTab] = useState("news");

    /*
    const [search] = useSearchParams();

    useEffect(() => {
      const news = search.get("news");
      if (news) {
        setActiveTab("news");
      } else {
        setActiveTab("introduction");
      }
    }, [search]);
    */

    return (
      <div className="mb-4 w-full">
        <div className="flex border-b mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              className={`px-4 py-2 font-semibold w-1/2 ${
                activeTab === tab.key
                  ? "border-b-2 border-primary-base text-primary-base"
                  : "text-primary-light"
              }`}
              onClick={() => setActiveTab(tab.key)}
              type="button"
            >
              {tab.label}
            </button>
          ))}
        </div>
        {activeTab === "news" && <News className="" />}
        {activeTab === "introduction" && <Introduction className="" />}
      </div>
    );
  }

  return (
    <>
      <CommentsMobile className="" />
      <div className="px-4 md:px-10 w-full pb-10 max-w-5xl">
        <h1 className=" pt-2 mb-2 md:mb-8  font-bold text-2xl lg:text-4xl">
          {DEFAULT_TITLE}
        </h1>
        <div className="md:flex md:justify-between">
          <div></div>
          <div className="md:w-2/3  flex flex-col">
            <CarouselBanner className="" />
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
              <FollowNow />
            </div>
          </div>
        </div>

        <div className="mt-8 flex">
          <div className="md:w-2/3 w-full">
            <TabSection />
          </div>
          <Comments className="w-1/3  hidden md:block" />
        </div>
      </div>
    </>
  );
}
