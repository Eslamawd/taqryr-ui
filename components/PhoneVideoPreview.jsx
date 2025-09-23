import React from "react";

const PhoneVideoPreview = ({ videoUrl }) => {
  return (
    <div className="flex justify-center items-center p-4">
      <div className="relative w-[320px] h-[540px] border-[16px] border-black rounded-[36px] bg-black overflow-hidden">
        {/* notch */}
        <div className="absolute top-[-12px] left-1/2 transform -translate-x-1/2 w-[60px] h-[5px] bg-gray-700 rounded-lg"></div>

        {/* screen */}
        <div className="w-full h-full bg-black rounded-[20px] overflow-hidden">
          <video
            src={videoUrl}
            controls
            autoPlay
            loop
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default PhoneVideoPreview;
