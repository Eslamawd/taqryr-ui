import {
  FaSnapchatGhost,
  FaFacebook,
  FaGoogle,
  FaTiktok,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";
import { Label } from "../ui/Label";

export default function PlatformPicker({ value, onChange }) {
  const platforms = [
    {
      id: "snap",
      name: "Snapchat",
      icon: <FaSnapchatGhost className="text-yellow-400 text-3xl w-16 h-16" />,
    },
    {
      id: "meta",
      name: "Meta",
      icon: <FaFacebook className="text-blue-500 text-3xl w-16 h-16" />,
    },
    {
      id: "google",
      name: "Google",
      icon: <FaGoogle className="text-red-500 text-3xl w-16 h-16" />,
    },
    {
      id: "tiktok",
      name: "TikTok",
      icon: (
        <FaTiktok className="text-black dark:text-white text-3xl w-16 h-16" />
      ),
    },
    {
      id: "instagram",
      name: "Instagram",
      icon: <FaInstagram className="text-pink-500 text-3xl w-16 h-16" />,
    },
    {
      id: "youtube",
      name: "Youtube",
      icon: <FaYoutube className="text-red-500 text-3xl w-16 h-16" />,
    },
  ];

  return (
    <div className="w-full">
      <Label>المنصة</Label>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mt-2">
        {platforms.map((p) => (
          <span
            key={p.id}
            onClick={() => onChange(p.id)}
            className={`
             relative flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all duration-300 transform shadow-md
              ${
                value === p.id
                  ? "border-blue-500 bg-blue-900 scale-105"
                  : "border-gray-600 bg-gray-900 hover:border-blue-400 hover:bg-gray-800 hover:scale-105"
              }
            `}
          >
            {p.icon}
            <span className="mt-2 text-sm font-medium text-white">
              {p.name}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
