import { Icon } from "@iconify/react/dist/iconify.js";
import { useState } from "react";
import client from "../../../services/client";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/rootReducer";

export const Bookmark = ({ blog }) => {
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
      console.log("data");
      const data = { "bookmarks+": userData.id };
      console.log(data);
      const updateBookmark = await client
        .collection("blogs")
        .update(blog.id, data);
      console.log(updateBookmark);
      setIsBookmarkd(true);
    } catch (error) {
      console.error("Error adding bookmark:", error);
    }
  };

  const removeBookmark = async () => {
    try {
      console.log("data");
      const data = { "bookmarks-": userData.id };
      console.log(data);
      const updateBookmark = await client
        .collection("blogs")
        .update(blog.id, data);
      console.log(updateBookmark);
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
  console.log(bookmarks);
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
