import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

const images = [
  {
    id: 1,
    src: `${import.meta.env.BASE_URL}cover_2.jpg`,
    link: "https://drive.google.com/file/d/1uhQEbTXWYwEdbejNm1CFwxyAaR4eKORv/view?usp=drivesdk",
  },
  {
    id: 2,
    src: `${import.meta.env.BASE_URL}cover_1.png`,
    link: null,
  },
];

interface CarouselBannerProps {
  className?: string;
}

export default function CarouselBanner({
  className = "",
}: CarouselBannerProps) {
  const [current, setCurrent] = useState(0);
  const [currentTransitioning, setCurrentTransitioning] = useState(false);

  const next = useCallback(() => {
    if (images.length <= 1) return;
    if (currentTransitioning) return;
    setCurrentTransitioning(true);
    setCurrent((prev) => (prev + 1) % images.length);
    setTimeout(() => setCurrentTransitioning(false), 500);
  }, [currentTransitioning]);

  useEffect(() => {
    const interval = setInterval(() => {
      next();
    }, 15000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [next]);

  function prev() {
    if (images.length <= 1) return;
    if (currentTransitioning) return;
    setCurrentTransitioning(true);
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
    setTimeout(() => setCurrentTransitioning(false), 500);
  }

  return (
    <div
      className={`relative w-full mt-4  h-96 md:h-[35rem] mb-4 overflow-hidden ${className}`}
    >
      <AnimatePresence initial={false}>
        {images[current].link ? (
          <motion.a
            key={images[current].id}
            href={images[current].link}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="block w-full h-full"
          >
            <img
              src={images[current].src}
              alt={`banner-${current}`}
              className="w-full h-full object-contain rounded-lg"
            />
          </motion.a>
        ) : (
          <motion.img
            key={images[current].id}
            src={images[current].src}
            alt={`banner-${current}`}
            className="w-full h-full object-contain rounded-lg"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
          />
        )}
      </AnimatePresence>
      {images.length > 1 && (
        <>
          <button
            className="absolute top-1/2 left-0 transform -translate-y-1/2  text-primary-base"
            onClick={prev}
            aria-label="Previous"
            type="button"
          >
            <FaAngleLeft size={24} />
          </button>
          <button
            className="absolute top-1/2 right-0 transform -translate-y-1/2  text-primary-base"
            onClick={next}
            aria-label="Next"
            type="button"
          >
            <FaAngleRight size={24} />
          </button>
        </>
      )}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-2 ">
        {images.map((_, idx) => (
          <span
            key={idx}
            className={`block w-2 h-2 rounded-full ${
              idx === current ? "bg-primary-base" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
