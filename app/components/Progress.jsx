/* eslint-disable react/prop-types */
import { formatNumber } from "../utils/utils";

function ProgressBar({ value }) {
  return (
    <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
      <div
        className="bg-primary-base h-4 rounded-full"
        style={{ width: `${value * 100}%` }}
      ></div>
    </div>
  );
}

export default function Progress({ target, value, className}) {
  return (
    <div className={className}>
      <div className="text-gray-400 mb-1">
        <span>目標金額：</span>
        <span>{`$NTD ${formatNumber(target)}`}</span>
      </div>
      <ProgressBar value={value} />
    </div>
  );
}
