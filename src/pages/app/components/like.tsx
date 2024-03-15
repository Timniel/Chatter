import { Icon } from "@iconify/react/dist/iconify.js";
import { useState } from "react";
import client from "../../../services/client";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/rootReducer";
import { Blog } from "../../../shared/interface";

interface LikeProps {
  blog: Blog;
}
export const Like = ({ blog }: LikeProps) => {
  const { userData } = useSelector((state: RootState) => state.auth);
  if (!userData) {
    return;
  }
  const [isLiked, setIsLiked] = useState(blog.likes.includes(userData.id));
  const [likes, setLikes] = useState(blog.likes || []);
  const addLike = async () => {
    try {
      const data = { "likes+": userData.id };

      await client.collection("blogs").update(blog.id, data);

      setIsLiked(true);
    } catch (error) {
      console.error("Error adding like:", error);
    }
  };

  const removeLike = async () => {
    try {
      const data = { "likes-": userData.id };

      await client.collection("blogs").update(blog.id, data);

      setIsLiked(false);
    } catch (error) {
      console.error("Error removing like:", error);
    }
  };

  const handleLikeClick = () => {
    setIsLiked((prevState) => !prevState);

    if (isLiked) {
      removeLike();
      setLikes((prevLikes) => {
        const updatedLikes = prevLikes.filter((like) => like !== userData.id);
        return updatedLikes;
      });
    } else {
      setTimeout(() => {
        setLikes((prevLikes) => {
          const updatedLikes = [...prevLikes, userData.id];
          addLike();
          return updatedLikes;
        });
      }, 0);
    }
  };

  return (
    <button className="flex" onClick={handleLikeClick}>
      <Icon
        className={`w-10 h-6 font-bold ${
          isLiked ? "text-red-500" : "text-neutral-400"
        }`}
        icon={isLiked ? "flat-color-icons:like" : "icon-park-outline:like"}
      />
      <p className="text-xs text-neutral-400">{likes.length}</p>
    </button>
  );
};
