import { useEffect, useRef, useState } from "react";

import { Feed } from "../../shared/components/feed";
import { ScrollShadow } from "@nextui-org/react";
import { Filter } from "./components/filter";
import client from "../../services/client";

import { FeedSkeleton } from "../../shared/components/feedskeleton";
import { Blog as BlogType } from "../../shared/interface";

export const AppPage = () => {
  // State to keep track of the active tab
  const [sortedBlogs, setSortedBlogs] = useState<BlogType[]>([]);
  const [activeTab, setActiveTab] = useState("forYou");

  const [blogs, setBlogs] = useState<BlogType[]>([]);
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
          [...blogs].sort(
            (a, b) =>
              new Date(b.created).getTime() - new Date(a.created).getTime()
          )
        );
      }
    }
  }, [blogs, activeTab]);

  const fetchBlogs = async () => {
    await client.autoCancellation(false);
    const resultList = await client
      .collection<BlogType>("blogs")
      .getList(1, 50, {});

    setBlogs(resultList.items);
  };
  const isMounted = useRef(false);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;

      fetchBlogs();
    }
  }, []);

  return (
    <div className="h-full py-1 space-y-5 sm:px-10">
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
          {sortedBlogs.length > 0 ? (
            sortedBlogs.map((blog) => <Feed blog={blog} />)
          ) : (
            <FeedSkeleton />
          )}
        </ScrollShadow>
      </div>
    </div>
  );
};
