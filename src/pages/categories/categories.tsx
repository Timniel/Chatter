import { useParams } from "react-router-dom";
import client from "../../services/client";
import { useEffect, useRef, useState } from "react";
import { ScrollShadow } from "@nextui-org/react";

import { Feed } from "../../shared/components/feed";
import { FeedSkeleton } from "../../shared/components/feedskeleton";
import { Blog } from "../../shared/interface";

export const Category = () => {
  const { category } = useParams();

  const [blogs, setBlogs] = useState<Blog[] | []>([]);
  const fetchBlogs = async () => {
    client.autoCancellation(false);
    const records: Blog[] = await client.collection("blogs").getFullList({
      filter: `category="${category}"`,
    });

    setBlogs(records);
  };

  const isMounted = useRef(false);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      fetchBlogs();
    }
  }, []);
  return (
    <div className="h-full px-10 py-1 space-y-5">
      {" "}
      {/* <Post /> */}
      <div className="h-full space-y-2 font-bold shadow-sm border-slate-200">
        <div className="flex items-center justify-between w-full">
          <h2 className="py-2 text-3xl">
            {category
              ?.split("-")
              .map(
                (category) =>
                  category.charAt(0).toUpperCase() + category.slice(1)
              )
              .join(" ")}
          </h2>
        </div>
        <ScrollShadow
          className="w-full h-[92%] pb-10 space-y-5 [&::-webkit-scrollbar]:hidden max-md:[-ms-overflow-style:none] max-md:[scrollbar-width:none]"
          size={20}
        >
          {blogs.length > 0 ? (
            blogs.map((blog) => <Feed blog={blog} />)
          ) : (
            <FeedSkeleton />
          )}
        </ScrollShadow>
      </div>
    </div>
  );
};
