import client from "../../services/client";
import { useEffect, useState } from "react";
import { ScrollShadow } from "@nextui-org/react";
import { Filter } from "../app/components/filter";
import { Feed } from "../../shared/components/feed";
import { useSelector } from "react-redux";
import { RootState } from "../../store/rootReducer";

export const Analytics = () => {
  const { userData } = useSelector((state: RootState) => state.auth);
  if (!userData) {
    return;
  }

  const [blogs, setBlogs] = useState([]);
  const [topPost, setTopPost] = useState(null);
  const [totals, setTotals] = useState({
    likes: 0,
    comments: 0,
    views: 0,
  });

  const fetchBlogs = async () => {
    client.autoCancellation(false);
    const records = await client.collection("blogs").getFullList({});
    setBlogs(records);
    const totalLikes = records.reduce(
      (acc, blog) => acc + blog.likes.length,
      0
    );
    const totalComments = records.reduce(
      (acc, blog) => acc + blog.comments.length,
      0
    );
    // const totalViews = records.reduce((acc, blog) => acc + blog.views, 0);

    setTopPost(
      records.reduce((maxBlog, blog) =>
        maxBlog.likes.length < blog.likes.length ? blog : maxBlog
      )
    );

    setTotals((prevTotals) => ({
      ...prevTotals,
      likes: totalLikes,
      comments: totalComments,
      views: 600,
    }));
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    blogs && (
      <div className="h-full px-10 py-1 space-y-5">
        <div className="h-full space-y-2 font-bold shadow-sm border-slate-200">
          <div className="flex items-center justify-between w-full">
            <h2 className="py-2 text-3xl">Analytics</h2>
          </div>
          <div>
            <h2 className="mb-2 text-2xl font-bold">Totals</h2>
            <ul>
              <li>Total posts: {blogs.length}</li>
              <li>Likes: {totals.likes}</li>
              <li>Comments: {totals.comments}</li>
              <li>Views: {totals.views}</li>
            </ul>
          </div>
          <ScrollShadow
            className="w-full h-[92%] pb-10 space-y-5 [&::-webkit-scrollbar]:hidden max-md:[-ms-overflow-style:none] max-md:[scrollbar-width:none]"
            size={20}
          >
            {topPost && (
              <div className="flex flex-col">
                <h2 className="mb-2 text-3xl font-bold">Top Post</h2>
                <Feed blog={topPost} />
              </div>
            )}
          </ScrollShadow>
        </div>
      </div>
    )
  );
};
