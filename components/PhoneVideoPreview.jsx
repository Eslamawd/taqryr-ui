import React from "react";
import { FaBatteryThreeQuarters } from "react-icons/fa6";
import { FiShare2 } from "react-icons/fi";

const PhoneVideoPreview = ({ videoUrl, brandName, headline }) => {
  return (
    <div className="flex justify-center items-center p-4">
      <div className="relative w-[320px] h-[600px] border-[12px] border-black rounded-[40px] bg-black overflow-hidden shadow-2xl">
        {/* notch (dynamic island style) */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-[120px] h-[28px] bg-black rounded-2xl z-20"></div>

        {/* status bar */}
        <div className="absolute top-4 w-full flex justify-between px-6 text-white text-xs font-medium z-20">
          <div>9:41</div>
          <div className="flex items-center gap-2">
            <span>
              <FaBatteryThreeQuarters className="w-5 h-5" />
            </span>
          </div>
        </div>

        {/* screen */}
        <div className="w-full h-full bg-black rounded-[28px] overflow-hidden relative">
          <video
            src={videoUrl}
            autoPlay
            controls
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />

          {/* brand + share */}
          <div className="absolute top-9 left-0 right-0 flex justify-between items-center px-4 text-white z-20">
            <span className="-mr-3 text-x  font-800 font-extrabold">
              {brandName ? brandName : ""}· إعلان
            </span>
          </div>
          {/* brand + share */}
          <div className="absolute top-14 left-0 right-0 flex justify-between items-center px-4 text-white z-20">
            <span className="-mr-3 text-sm ">
              {headline ? headline : ""}· إعلان
            </span>
          </div>

          {/* CTA */}
        </div>
      </div>
    </div>
  );
};

export default PhoneVideoPreview;
