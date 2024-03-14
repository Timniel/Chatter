import { Icon } from "@iconify/react/dist/iconify.js";
import { useState } from "react";
import client from "../../../services/client";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/rootReducer";
import { Blog } from "../../../shared/interface";

interface BookmarkProps {
  blog: Blog;
}
export const Bookmark = ({ blog }: BookmarkProps) => {
  const { userData } = useSelector((state: RootState) => state.auth);
  if (!userData) {
    return;
  }
  const [isBookmarkd, setIsBookmarkd] = useState(
    blog.bookmarks.includes(userData.id)
  );
  const [bookmarks, setBookmarks] = useState(blog.bookmarks || []);
  const addBookmark = async () => {
    try {
      const data = { "bookmarks+": userData.id };

      await client.collection("blogs").update(blog.id, data);

      setIsBookmarkd(true);
    } catch (error) {
      console.error("Error adding bookmark:", error);
    }
  };

  const removeBookmark = async () => {
    try {
      const data = { "bookmarks-": userData.id };

      await client.collection("blogs").update(blog.id, data);

      setIsBookmarkd(false);
    } catch (error) {
      console.error("Error removing bookmark:", error);
    }
  };

  const handleBookmarkClick = () => {
    setIsBookmarkd((prevState) => !prevState);

    if (isBookmarkd) {
      removeBookmark();
      setBookmarks((prevBookmarks) => {
        const updatedBookmarks = prevBookmarks.filter(
          (bookmark) => bookmark !== userData.id
        );
        return updatedBookmarks;
      });
    } else {
      setTimeout(() => {
        setBookmarks((prevBookmarks) => {
          const updatedBookmarks = [...prevBookmarks, userData.id];
          addBookmark();
          return updatedBookmarks;
        });
      }, 0);
    }
  };

  return (
    <button className="flex" onClick={handleBookmarkClick}>
      <Icon
        className={`w-10 h-6 font-bold ${
          isBookmarkd ? "" : "text-neutral-400"
        }`}
        icon={
          isBookmarkd ? "lets-icons:bookmark-fill" : "lets-icons:bookmark-light"
        }
      />
      <p className="text-xs text-neutral-400">{bookmarks.length}</p>
    </button>
  );
};
