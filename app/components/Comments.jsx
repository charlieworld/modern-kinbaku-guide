import { useLoaderData } from "@remix-run/react";
import classNames from 'classnames'
  /* eslint-disable react/prop-types */

export default function Comments({ className }) {
  const loaderData = useLoaderData();
  const commentList = loaderData.data;
  return (
      <div className={classNames(' text-center pl-4  overflow-y-auto',className)}>
          <h3 className=" text-primary-base border-b border-primary-base pb-2">贊助者留言</h3>
      <div>
        {commentList.map((comment, index) => (
          <div key={index} className="border-b border-gray-200 py-2">
            <div className="flex justify-between mb-2 items-center">
              <div className="text-primary-base  font-semibold">{comment.name}</div>
              <div className="text-sm text-gray-500">{comment.createdAt}</div>
            </div>
            <div className="text-left text">{comment.comment}</div>
          </div>
        ))}
      </div>
      </div>
  )
}