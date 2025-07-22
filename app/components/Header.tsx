import { TbHandClick } from "react-icons/tb";

import { motion } from "framer-motion";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function FollowNowButton() {
  return (
    <div className="flex items-center justify-center rounded px-2 py-2">
      <a
        className="flex items-center font-bold text-primary-link text-sm md:text-base"
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
    </div>
  );
}

export default function Header() {
  return (
    <header className=" fixed w-full left-0 top-0 flex flex-col items-center z-10">
      <div className="flex justify-end pl-4 md:px-10 py-2 pt md:py-6 w-full ">
        <div className=" hidden">青山夏樹《現代緊縛入門》翻譯出版</div>
      </div>
    </header>
  );
}
