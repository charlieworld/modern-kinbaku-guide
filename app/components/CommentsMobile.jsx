/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
import { useLoaderData } from "@remix-run/react";
import classNames from "classnames";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
/* eslint-disable react/prop-types */

export default function CommentsMobile({ className }) {
  const loaderData = useLoaderData();
  const commentList = loaderData.data;
  const renderItems = () => {
    return commentList.map((item) => (
      <div key={item.createdAt} className=" w-full px-4 ">
        <div className="flex items-center">
          <div className="text-primary-base  font-semibold">{item.name}</div>
          <div className="text-xs text-primary-light ml-1">{item.createdAt}</div>
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
