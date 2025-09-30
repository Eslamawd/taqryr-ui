import {
  FaSnapchatGhost,
  FaFacebook,
  FaGoogle,
  FaTiktok,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";
import { FaCheck } from "react-icons/fa6"; // ✅ أيقونة الصح
import { Label } from "../ui/Label";

export default function PlatformPickerCreate({ value = [], onChange }) {
  const platforms = [
    {
      id: "snap",
      name: "Snapchat",
      status: true,
      icon: <FaSnapchatGhost className="text-yellow-400 text-3xl w-16 h-16" />,
    },
    {
      id: "meta",
      name: "Facebook",

      status: false,
      icon: <FaFacebook className="text-blue-500 text-3xl w-16 h-16" />,
    },
    {
      id: "google",
      name: "Google",
      status: false,
      icon: <FaGoogle className="text-red-500 text-3xl w-16 h-16" />,
    },
    {
      id: "tiktok",
      name: "TikTok",
      status: false,
      icon: (
        <FaTiktok className="text-black dark:text-white text-3xl w-16 h-16" />
      ),
    },
    {
      id: "instagram",
      name: "Instagram",
      status: false,
      icon: <FaInstagram className="text-pink-500 text-3xl w-16 h-16" />,
    },
    {
      id: "youtube",
      name: "Youtube",
      status: false,
      icon: <FaYoutube className="text-red-500 text-3xl w-16 h-16" />,
    },
  ];

  const togglePlatform = (id) => {
    if (value.includes(id)) {
      onChange(value.filter((p) => p !== id));
    } else {
      onChange([...value, id]);
    }
  };

  return (
    <div className="w-full">
      <Label>المنصة</Label>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mt-2">
        {platforms.map((p) => {
          const selected = value.includes(p.id);
          return (
            <span
              key={p.id}
              type="button"
              disabled={p.status ? false : true}
              onClick={() => p.status && togglePlatform(p.id)}
              className={`
                relative flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all duration-300 transform shadow-md
                ${p.status ? "" : "cursor-not-allowed"}
                ${
                  selected
                    ? "border-blue-500 bg-blue-900 scale-105"
                    : "border-gray-600 bg-gray-900 hover:border-blue-400 hover:bg-gray-800 hover:scale-105"
                }
              `}
            >
              {/* علامة الصح فوق على اليمين */}
              {selected && (
                <span className="absolute top-2 right-2 bg-gray-700 rounded-full p-1">
                  <FaCheck className="text-white text-xs" />
                </span>
              )}

              {p.icon}
              <span className="mt-2 text-sm font-medium text-white">
                {p.name}
              </span>
            </span>
          );
        })}
      </div>
    </div>
  );
}
