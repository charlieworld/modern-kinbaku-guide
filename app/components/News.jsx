/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { motion } from "framer-motion";
import classNames from "classnames";
import ReactHtmlParser from "react-html-parser";
import { useSearchParams } from "@remix-run/react";

import newsData from "../utils/NewsData";

export default function News({ className }) {
  const [search] = useSearchParams();

  useEffect(() => {
    const news = search.get("news");
    if (news) {

      const target = document.getElementById(news);
      if (!target) return;
      target.scrollIntoView({ behavior: "smooth" });
    }
  }, [search]);

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
      <ul className="space-y-4">
        {newsData.map((news) => (
          <li key={news.id} className="border-b p-4" id={news.id}>
            <h3 className="text-xl font-semibold">{news.title}</h3>
            <p className="text-gray-500 text-sm">{news.date}</p>
            <div className="flex space-x-2 mt-4">
              {news.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={
                    news.title
                      ? `${news.title} - ${index + 1}`
                      : `News ${index + 1}`
                  }
                  className="w-1/2 object-contain rounded bg-slate-100"
                />
              ))}
            </div>
            <p className="mt-4">{ReactHtmlParser(news.content)}</p>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
