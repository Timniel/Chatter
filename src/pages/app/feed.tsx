import { Icon } from "@iconify/react/dist/iconify.js";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardHeader,
  Chip,
  Divider,
  Image,
  Input,
  User,
} from "@nextui-org/react";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { Like } from "./components/like";
import { Comment } from "./components/comment";
import { Bookmark } from "./components/bookmark";

export const Feed = ({ blog }) => {
  const navigate = useNavigate();

  return (
    <Card
      className="p-2  h-max !bg-none bg-transparent border-1 border-neutral-800 "
      radius="lg"
    >
      <CardBody className="w-full space-y-4 overflow-visible">
        <div className="flex items-center justify-between space-x-1">
          <User
            as="button"
            avatarProps={{
              isBordered: true,
              src: `https://pocketbase-production-60f6.up.railway.app/api/files/_pb_users_auth_/${blog.userId}/${blog.avatar}?token=`,
            }}
            className="transition-transform"
            description={`@${blog.creatorUsername}`}
            name={blog.creatorName}
          />{" "}
          <div className="flex items-center space-x-2">
            <Chip color="default" variant="dot" className="text-xs ">
              {moment(new Date(blog.created)).fromNow()}
            </Chip>
          </div>
        </div>
        <h2 className="text-3xl line-clamp-1">{blog.title}</h2>
        <p className="text-sm font-light text-neutral-100 ">
          <div className="content-text line-clamp-2">
            {(() => {
              const parsedContent = new DOMParser().parseFromString(
                blog.content,
                "text/html"
              );
              const images = parsedContent.getElementsByTagName("img");

              for (let i = 0; i < images.length; i++) {
                images[i].parentNode.removeChild(images[i]);
              }

              return parsedContent.documentElement.textContent.trim();
            })()}
          </div>
          <span
            className="text-blue-500 cursor-pointer "
            onClick={() => navigate(`/blog/${blog?.id}`, { state: blog })}
          >
            Read more
          </span>
        </p>

        <div className="h-40 overflow-hidden ">
          <Image
            className="w-full rounded-md o"
            src={`https://pocketbase-production-60f6.up.railway.app/api/files/4hxzmnerq40525y/${blog.id}/${blog.coverPhoto}?token=`}
            alt="User profile"
          />
        </div>
        <div className="flex justify-between ">
          <Chip
            variant="flat"
            className="self-end cursor-pointer "
            avatar={
              <Avatar
                name={blog.category}
                size="sm"
                getInitials={(name) => name.charAt(0).toUpperCase()}
              />
            }
            onClick={() => navigate(`/category/${blog?.category}`)}
          >
            {blog.category}
          </Chip>{" "}
          <div className="flex space-x-4 ">
            <Like blog={blog} />
            <div className="flex">
              <Comment blog={blog} comments={blog.comments.length} />
            </div>{" "}
            <Bookmark blog={blog} />
            {/* <div className="flex">
              <Icon
                className="w-10 h-6 font-bold"
                icon="material-symbols-light:analytics-outline"
              />{" "}
            </div>{" "} */}
          </div>{" "}
        </div>
      </CardBody>
    </Card>
  );
};
