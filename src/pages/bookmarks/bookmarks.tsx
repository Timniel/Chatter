import client from "../../services/client";
import { useEffect, useRef, useState } from "react";
import { ScrollShadow } from "@nextui-org/react";
import { Feed } from "../../shared/components/feed";
import { useSelector } from "react-redux";
import { RootState } from "../../store/rootReducer";
import { FeedSkeleton } from "../../shared/components/feedskeleton";
import { Blog } from "../../shared/interface";

export const Bookmarks = () => {
  const { userData } = useSelector((state: RootState) => state.auth);
  if (!userData) {
    return;
  }

  const [blogs, setBlogs] = useState<Blog[] | []>([]);

  const fetchBlogs = async () => {
    client.autoCancellation(false);
    const records: Blog[] = await client.collection("blogs").getFullList({
      filter: `bookmarks~"${userData.id}"`,
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
    <div className="h-full py-1 space-y-5 sm:px-10">
      {/* <Post /> */}
      <div className="h-full space-y-2 font-bold shadow-sm border-slate-200">
        <div className="flex items-center justify-between w-full">
          <h2 className="py-2 text-3xl">Bookmarks</h2>
        </div>
        <ScrollShadow
          className="w-full h-[92%] pb-10 space-y-5 [&::-webkit-scrollbar]:hidden max-md:[-ms-overflow-style:none] max-md:[scrollbar-width:none]"
          size={20}
        >
          {blogs.length > 0 ? (
            blogs.map((blog) => <Feed key={blog.id} blog={blog} />)
          ) : (
            <FeedSkeleton />
          )}
        </ScrollShadow>
      </div>
    </div>
  );
};
