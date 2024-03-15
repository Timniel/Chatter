import { Icon } from "@iconify/react/dist/iconify.js";
import { useNavigate } from "react-router-dom";
import { Blog } from "../../../shared/interface";

interface CommentProps {
  blog: Blog;
  comments: number;
}
export const Comment = ({ blog, comments }: CommentProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex">
      {" "}
      <button>
        <Icon
          className="w-10 h-6 font-bold"
          icon="fluent:chat-multiple-24-regular"
          onClick={() => navigate(`/blog/${blog?.id}`, { state: blog })}
        />{" "}
      </button>
      <p className="text-xs text-neutral-400">{comments}</p>
    </div>
  );
};
