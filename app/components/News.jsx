/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { motion } from "framer-motion";
import classNames from "classnames";
import ReactHtmlParser from "react-html-parser";
import { useSearchParams } from "@remix-run/react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";

import newsData from "../utils/NewsData";
import { useState } from "react";

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

  const [expandedId, setExpandedId] = useState(null);

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
          <li key={news.id} className="border border-gray-400 p-4 rounded-lg" id={news.id}>
            <h3 className="text-xl font-semibold">{news.title}</h3>
            <p className="text-gray-500 text-sm">{news.date}</p>
            {expandedId === news.id ? (
              <>
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
                <div className="flex w-full justify-end">
                  <button
                    className="mt-2 text-primary-base"
                    onClick={() => setExpandedId(null)}
                  >
                    <FaAngleUp size={20} />
                  </button>
                </div>
              </>
            ) : (
              <div className="flex w-full justify-end">
                <button
                  className="mt-2 text-primary-base"
                  onClick={() => setExpandedId(news.id)}
                >
                  <FaAngleDown size={20} />
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
