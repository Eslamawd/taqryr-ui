import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PhoneVideoPreview from "./PhoneVideoPreview";

const CreativeCarousel = ({ creatives }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % creatives.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + creatives.length) % creatives.length);
  };

  if (!creatives || creatives.length === 0) return null;

  const currentItem = creatives[currentIndex];

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <div className="relative w-full max-w-md h-80 md:h-96 flex items-center justify-center bg-black">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentItem.id}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="w-full h-full flex items-center justify-center"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={(e, { offset, velocity }) => {
              if (offset.x < -50 || velocity.x < -500) next();
              if (offset.x > 50 || velocity.x > 500) prev();
            }}
          >
            {currentItem.type === "VIDEO" ? (
              <PhoneVideoPreview videoUrl={currentItem.file_url} />
            ) : (
              <img
                src={currentItem.file_url}
                alt="Creative"
                className="object-contain w-full h-full"
              />
            )}
          </motion.div>
        </AnimatePresence>

        {/* أزرار السابق/التالي */}
        {creatives.length > 1 && (
          <>
            <span
              onClick={prev}
              className="absolute left-2 top-1/2 -translate-y-1/2 text-emerald-400 text-4xl font-bold"
            >
              ‹
            </span>
            <span
              onClick={next}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-emerald-400 text-4xl font-bold"
            >
              ›
            </span>
          </>
        )}
      </div>

      <p className="text-gray-300 mt-2">
        {currentIndex + 1} / {creatives.length}
      </p>
    </div>
  );
};

export default CreativeCarousel;
