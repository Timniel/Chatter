import { useParams } from "react-router-dom";
import client from "../../services/client";
import { useEffect, useState } from "react";
import { ScrollShadow } from "@nextui-org/react";
import { Filter } from "../app/filter";
import { Feed } from "../app/feed";
import { FeedSkeleton } from "../app/feedskeleton";

export const Category = () => {
  const { category } = useParams();
  console.log(category);
  const [blogs, setBlogs] = useState();
  const fetchBlogs = async () => {
    client.autoCancellation(false);
    const records = await client.collection("blogs").getFullList({
      filter: `category="${category}"`,
    });
    console.log(records);
    setBlogs(records);
  };
  console.log(blogs);
  useEffect(() => {
    fetchBlogs();
  }, []);
  return (
    <div className="h-full px-10 py-1 space-y-5">
      {" "}
      {/* <Post /> */}
      <div className="h-full space-y-2 font-bold shadow-sm border-slate-200">
        <div className="flex items-center justify-between w-full">
          <h2 className="py-2 text-3xl">{category}</h2>
          <Filter />
        </div>
        <ScrollShadow
          className="w-full h-[92%] pb-10 space-y-5 [&::-webkit-scrollbar]:hidden max-md:[-ms-overflow-style:none] max-md:[scrollbar-width:none]"
          size={20}
        >
          {blogs ? blogs.map((blog) => <Feed blog={blog} />) : <FeedSkeleton />}
        </ScrollShadow>
      </div>
    </div>
  );
};
