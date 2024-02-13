import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";

export const SideBar = () => {
  return (
    <aside className="fixed flex-col w-64 h-screen bg-white border-r border-slate-200">
      <div className="flex items-center justify-center p-4 text-2xl text-blue-800 ">
        Chatter
      </div>
      <div className="flex flex-col flex-grow pl-10">
        <p className="px-4 pl-10 mt-4 mb-2 text-sm">Overview</p>
        <nav className="text-gray-700 pl-14">
          <ul className="space-y-1">
            <li className="flex items-center px-2 py-2 text-xs transition-colors hover:bg-gray-700 hover:text-white">
              <Icon icon="fa-solid:rss" className="w-4 h-4 mr-2" />
              <Link to="/feed">Feed</Link>
            </li>
            <li className="flex items-center px-2 py-2 text-xs transition-colors hover:bg-gray-700 hover:text-white">
              <Icon icon="fa-solid:bookmark" className="w-4 h-4 mr-2" />
              <Link to="/bookmarks">Bookmarks</Link>
            </li>
            <li className="flex items-center px-2 py-2 text-xs transition-colors hover:bg-gray-700 hover:text-white">
              <Icon icon="fa-brands:teamspeak" className="w-4 h-4 mr-2" />
              <Link to="/team-blogs">Team Blogs</Link>
            </li>
            <li className="flex items-center px-2 py-2 text-xs transition-colors hover:bg-gray-700 hover:text-white">
              <Icon icon="fa-solid:pencil-alt" className="w-4 h-4 mr-2" />
              <Link to="/draft">Draft</Link>
            </li>
            <li className="flex items-center px-2 py-2 text-xs transition-colors hover:bg-gray-700 hover:text-white">
              <Icon icon="fa-solid:chart-line" className="w-4 h-4 mr-2" />
              <Link to="/analytics">Analytics</Link>
            </li>
          </ul>
        </nav>
        <p className="px-4 pl-10 mt-4 mb-2 text-sm">
          Trending Tags{" "}
          <Icon icon="ph:trend-up" className="inline-block w-4 h-4 mr-2" />
        </p>
        <nav className="text-gray-700 pl-14">
          <ul>
            <li className="px-2 py-2 text-xs transition-colors hover:bg-gray-700 hover:text-white">
              <Link to="/tags/programming">Programming</Link>
            </li>
            <li className="px-2 py-2 text-xs transition-colors hover:bg-gray-700 hover:text-white">
              <Link to="/tags/data-science">Data Science</Link>
            </li>
            <li className="px-2 py-2 text-xs transition-colors hover:bg-gray-700 hover:text-white">
              <Link to="/tags/technology">Technology</Link>
            </li>
            <li className="px-2 py-2 text-xs transition-colors hover:bg-gray-700 hover:text-white">
              <Link to="/tags/machine-learning">Machine Learning</Link>
            </li>
            <li className="px-2 py-2 text-xs transition-colors hover:bg-gray-700 hover:text-white">
              <Link to="/tags/politics">Politics</Link>
            </li>
            <li className="px-2 py-2 text-xs text-blue-800 transition-colors hover:bg-gray-700 hover:text-white">
              <Link to="/tags/see-all">See All</Link>
            </li>
          </ul>
        </nav>
        <p className="px-4 pl-10 mt-4 mb-2 text-sm">Personal</p>
        <nav className="text-gray-700 pl-14">
          <ul>
            <li className="flex items-center px-2 py-2 text-xs transition-colors hover:bg-gray-700 hover:text-white">
              <Icon icon="fa-solid:user" className="w-4 h-4 mr-2" />
              <Link to="/account">Account</Link>
            </li>

            <li className="flex items-center px-2 py-2 text-xs transition-colors hover:bg-gray-700 hover:text-white">
              <Icon icon="fa-solid:bell" className="w-4 h-4 mr-2" />
              <Link to="/notifications">Notifications</Link>
            </li>
            <Link
              to="/logout"
              className="pl-2 text-xs text-red-500 transition-colors hover:bg-gray-700 hover:text-white"
            >
              Log out
            </Link>
          </ul>
        </nav>
      </div>
      <nav className="px-4 py-2 "></nav>
    </aside>
  );
};
