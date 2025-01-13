
import classNames from 'classnames'
  /* eslint-disable react/prop-types */


const CommentList = [
  {
    name: 'TinaTea 緹',
    comment: '這本書實在太棒了！',
    time: '2025-01-01 12:00'
  },
  {
    name: '柚子泥',
    comment: '希望大家都能喜歡這本書',
    time: '2025-01-01 12:00'
  },
  {
    name: '小華',
    comment: '我好期待這本書的出版！',
    time: '2025-01-01 12:00'
  },
  {
    name: '小華',
    comment: '我好期待這本書的出版！',
    time: '2025-01-01 12:00'
  },
  {
    name: '小華',
    comment: '我好期待這本書的出版！',
    time: '2025-01-01 12:00'
  },
  {
    name: '小華',
    comment: '我好期待這本書的出版！',
    time: '2025-01-01 12:00'
  },
  {
    name: '小華',
    comment: '我好期待這本書的出版！',
    time: '2025-01-01 12:00'
  },
  {
    name: '小華',
    comment: '我好期待這本書的出版！',
    time: '2025-01-01 12:00'
  }
];

export default function Comments({ className }) {
  return (
      <div className={classNames(' text-center pl-4 max-h-96 overflow-y-auto',className)}>
          <h3 className=" text-primary-base border-b border-primary-base pb-2">贊助者留言</h3>
      <div>
        {CommentList.map((comment, index) => (
          <div key={index} className="border-b border-gray-200 py-2">
            <div className="flex justify-between mb-2">
              <div className="text-primary-base  font-semibold">{comment.name}</div>
              <div className="text-sm text-gray-500">{comment.time}</div>
            </div>
            <div className="text-left text-lg">{comment.comment}</div>
          </div>
        ))}
      </div>
      </div>
  )
}