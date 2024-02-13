import { Icon } from "@iconify/react/dist/iconify.js";
import { Link } from "react-router-dom";
import { Input } from "../ui/input";

export const TopBar = () => {
  return (
    <header className="fixed inset-x-0 z-50 h-20 ml-64 bg-white border border-slate-200">
      <div className="container flex items-center justify-between p-2 mx-auto">
        <div className="w-1/6" /> {/* This div is acting as a spacer */}
        <div className="flex-1 max-w-xl mx-auto">
          {" "}
          {/* Centered input with max-width */}
          <Input
            className="w-[65%] text-black"
            icon={<Icon icon="mingcute:search-line" className="w-5 h-5" />}
            placeholder="Search Chatter"
          />
        </div>
        <div className="flex items-center space-x-2">
          {" "}
          {/* User profile section */}
          <Link to="/notifications" className="block hover:text-gray-800">
            <Icon icon="carbon:notification" className="w-6 h-6" />
          </Link>
          <Link
            to="/settings"
            className="flex items-center py-2 transition-colors duration-200 rounded-full hover:bg-gray-200"
          >
            <img
              className="w-10 h-10 rounded-full"
              src="https://dummyimage.com/600x400/000000/0011ff"
              alt="User profile"
            />
          </Link>
        </div>
      </div>
    </header>
  );
};
