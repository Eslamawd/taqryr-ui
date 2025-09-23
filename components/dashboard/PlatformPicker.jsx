import {
  FaSnapchatGhost,
  FaFacebook,
  FaGoogle,
  FaTiktok,
  FaInstagram,
} from "react-icons/fa";
import { Label } from "../ui/Label";

export default function PlatformPicker({ value, onChange }) {
  const platforms = [
    {
      id: "snap",
      name: "Snapchat",
      icon: <FaSnapchatGhost className="text-yellow-400 text-2xl" />,
    },
    {
      id: "meta",
      name: "Meta",
      icon: <FaFacebook className="text-blue-500 text-2xl" />,
    },
    {
      id: "google",
      name: "Google",
      icon: <FaGoogle className="text-red-500 text-2xl" />,
    },
    {
      id: "tiktok",
      name: "TikTok",
      icon: <FaTiktok className="text-black dark:text-white text-2xl" />,
    },
    {
      id: "instagram",
      name: "Instagram",
      icon: <FaInstagram className="text-pink-500 text-2xl" />,
    },
  ];

  return (
    <div>
      <Label>المنصة</Label>
      <div className="grid md:grid-cols-7 grid-cols-4 gap-3 mt-2">
        {platforms.map((p) => (
          <span
            key={p.id}
            type="button"
            onClick={() => onChange(p.id)}
            className={`flex flex-col items-center cursor-pointer justify-center p-4 rounded-lg border-2 transition
              ${
                value === p.id
                  ? "border-blue-500 bg-gray-800"
                  : "border-gray-600 bg-gray-900"
              }
            `}
          >
            {p.icon}
            <span className="mt-1 text-sm">{p.name}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
