import { HiCursorClick } from "react-icons/hi";
import { motion } from "framer-motion";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import type { MetaFunction } from "@remix-run/node";

import Introduction from "~/components/Introduction";
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
  let totalAmount = res
    .map((i) => i.donateAmount)
    .reduce((a, b) => {
      return a + b;
    }, 0);
  totalAmount = Number(totalAmount);
  const data = res.map((item) => {
    const temp = {...item}
    delete temp.donateAmount;
    delete temp.email;
    delete temp.remark;
    return temp;
  })
  return json({
    totalAmount,
    data,
  });
};

export default function Index() {
  const loaderData = useLoaderData<typeof loader>();

  return (
    <>
      <CommentsMobile className="" />
      <div className="px-4 md:px-10 w-full pb-10 max-w-5xl">
        <h1 className=" pt-2 mb-2 md:mb-8  font-bold text-2xl lg:text-4xl">
          青山夏樹《現代緊縛入門》翻譯出版經費募集中！！！
        </h1>
        <div className="md:flex md:justify-between">
          <div></div>
          <div
            className="md:w-2/3  flex flex-col"
          >
            <div
              className=" w-full h-80 bg-contain bg-no-repeat bg-center flex flex-col-reverse"
              style={{ backgroundImage: 'url("/book_cover.jpg")' }}
            />
            <Progress className="hidden md:block" target={TARGET} value={loaderData.totalAmount / TARGET} />
          </div>

          <div className="mt-4 md:mt-0 md:w-1/3 md:pl-8 flex flex-col justify-between">
            <div>
              <Info
                subTitle="目前募集金額"
                title={`NT$ ${formatNumber(loaderData.totalAmount)}`}
              />
              <Info
                subTitle="贊助人次"
                title={`${loaderData.data.length} 人`}
              />
              <Progress className="md:hidden" target={TARGET} value={loaderData.totalAmount / TARGET} />
            </div>
            <div>
              <DonateNow />
            </div>
          </div>
        </div>

        <div className="mt-8 flex">
          <Introduction className="md:w-2/3 " />
          <Comments className="w-1/3  hidden md:block" />
        </div>
      </div>
    </>
  );
}
