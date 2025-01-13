import { FaHeart } from "react-icons/fa";

export default function Footer() {
  return (
    <footer
      className={` w-full py-4 px-4 bg-primary-base text-white text-center text-sm md:text-base`}
    >
      <div>2025 Made by</div>
      <div>
        <span >青山夏樹老師『現代緊縛入門』出版小組 </span>
      </div>
      <div className="flex items-center justify-center"><span className="mr-2">with </span><FaHeart className="text-primary-link" /></div>
    </footer>
  );
}
