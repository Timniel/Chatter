import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { Post } from "../post/post";
import { Feed } from "./feed";
import { ScrollShadow } from "@nextui-org/react";
import { Filter } from "./filter";
import client from "../../services/client";
import { useNavigate } from "react-router-dom";
import { FeedSkeleton } from "./feedskeleton";

export const AppPage = () => {
  // State to keep track of the active tab
  const [sortedBlogs, setSortedBlogs] = useState([]);
  const [activeTab, setActiveTab] = useState("forYou");

  const [blogs, setBlogs] = useState(null);
  useEffect(() => {
    if (blogs && activeTab) {
      if (activeTab === "forYou") {
        setSortedBlogs(blogs);
      } else if (activeTab === "featured") {
        setSortedBlogs(
          [...blogs].sort((a, b) => b.likes.length - a.likes.length)
        );
      } else if (activeTab === "recent") {
        setSortedBlogs(
          [...blogs].sort((a, b) => new Date(b.created) - new Date(a.created))
        );
      }
    }
  }, [blogs, activeTab]);
  console.log(activeTab);
  const fetchBlogs = async () => {
    await client.autoCancellation(false);
    const resultList = await client.collection("blogs").getList(1, 50, {});

    setBlogs(resultList.items);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="h-full px-10 py-1 space-y-5">
      {" "}
      {/* <Post /> */}
      <div className="h-full space-y-2 font-bold shadow-sm border-slate-200">
        <div className="flex items-center justify-between w-full">
          <h2 className="py-2 text-3xl">Feeds</h2>
          <Filter setActiveTab={setActiveTab} activeTab={activeTab} />
        </div>
        <ScrollShadow
          className="w-full h-[92%] pb-10 space-y-5 [&::-webkit-scrollbar]:hidden max-md:[-ms-overflow-style:none] max-md:[scrollbar-width:none]"
          size={20}
        >
          {blogs ? (
            sortedBlogs.map((blog) => <Feed blog={blog} />)
          ) : (
            <FeedSkeleton />
          )}
        </ScrollShadow>
      </div>
    </div>
  );
};
