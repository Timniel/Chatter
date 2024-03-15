import client from "../../services/client";
import { useEffect, useRef, useState } from "react";
import { Divider } from "@nextui-org/react";
import { Feed } from "../../shared/components/feed";
import { useSelector } from "react-redux";
import { RootState } from "../../store/rootReducer";
import { Blog } from "../../shared/interface";

export const Analytics = () => {
  const { userData } = useSelector((state: RootState) => state.auth);
  if (!userData) {
    return;
  }

  const [blogs, setBlogs] = useState<Blog[] | []>([]);
  const [topPost, setTopPost] = useState<Blog | null>(null);
  const [totals, setTotals] = useState({
    likes: 0,
    comments: 0,
    views: 0,
  });

  const fetchBlogs = async () => {
    client.autoCancellation(false);
    const records: Blog[] = await client.collection("blogs").getFullList({});
    setBlogs(records);
    const totalLikes = records.reduce(
      (acc, blog) => acc + blog.likes.length,
      0
    );
    const totalComments = records.reduce(
      (acc, blog) => acc + blog.comments.length,
      0
    );

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
  const isMounted = useRef(false);
  useEffect(() => {
    if (!isMounted.current) fetchBlogs();
  }, []);

  return (
    blogs && (
      <div className="h-[90%] sm:px-10 space-y-5">
        <div className="flex items-center justify-between w-full">
          <h2 className="text-3xl font-bold ">Analytics</h2>
        </div>
        <div className="h-full space-y-2 overflow-scroll shadow-sm border-slate-200">
          <div className="p-6 rounded-lg shadow-md">
            <ul className="space-y-2">
              <li className="flex items-center justify-between">
                <span>Total posts</span>
                <span>{blogs.length}</span>
              </li>
              <Divider my-4 />
              <li className="flex items-center justify-between">
                <span>Likes</span>
                <span>{totals.likes}</span>
              </li>{" "}
              <Divider my-4 />
              <li className="flex items-center justify-between">
                <span>Comments</span>
                <span>{totals.comments}</span>
              </li>{" "}
            </ul>
          </div>

          {topPost && (
            <div className="flex flex-col">
              <h2 className="my-4 text-2xl font-bold">Top Post</h2>
              <Feed blog={topPost} />
            </div>
          )}
        </div>
      </div>
    )
  );
};
