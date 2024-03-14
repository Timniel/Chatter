import { Icon } from "@iconify/react/dist/iconify.js";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  Divider,
  Image,
  Input,
  User,
} from "@nextui-org/react";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { Like } from "./components/like";
import { Comment } from "./components/comment";
import { PostComment } from "./postComment";
import client from "../../services/client";

export const PostOverview = () => {
  const location = useLocation();

  const [blog, setBlog] = useState<Blog | null>(location.state);
  const [comments, setComments] = useState([]);

  const scrollableDivRef = useRef(null);
  const endOfDivRef = useRef(null); // This will be used as the scroll target
  const lastContentRef = useRef(null);

  const scrollToBottom = () => {
    endOfDivRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  };
  const scrollToContent = () => {
    lastContentRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  };
  const fetchReplies = async (blogId) => {
    try {
      console.log(blogId);
      const replies = await client.collection("comments").getFullList({
        filter: `blogId="${blogId}"`,
      });
      console.log(replies);
      setComments((comments) => [...comments, ...replies]);
      setTimeout(() => {
        scrollToContent();
      }, 100);
    } finally {
    }
  };

  useEffect(() => {
    fetchReplies(blog.id);
    console.log(comments);
  }, []);

  return (
    <Card
      className="p-2  h-full !bg-none bg-transparent border-none border-neutral-800  "
      radius="lg"
    >
      <CardHeader>
        <p className="text-2xl font-bold">{blog.title}</p>
      </CardHeader>
      <CardBody className="w-full space-y-4 h-72 overflow-scroll overflow-y-auto">
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
          <span
            className=""
            dangerouslySetInnerHTML={{ __html: blog.content }}
          ></span>{" "}
        </p>
        <div className="flex justify-between w-full">
          <Chip
            variant="flat"
            className="self-end "
            avatar={
              <Avatar
                name={blog.category}
                size="sm"
                getInitials={(name) => name.charAt(0).toUpperCase()}
              />
            }
          >
            {blog.category}
          </Chip>{" "}
          <div className="flex space-x-4 ">
            <Like blog={blog} />
            <div className="flex">
              <Comment blog={blog} />
            </div>
            <div className="flex">
              <Icon
                className="w-10 h-6 font-bold"
                icon="material-symbols-light:analytics-outline"
              />{" "}
            </div>{" "}
          </div>{" "}
        </div>
        <Divider className="my-4" />
        <div className=" w-full">
          {comments.length > 0 &&
            comments.map((comment) => (
              <div className="flex  w-full flex-col h-20 space-x-3 ">
                <div className="self-start ">
                  <User
                    as="button"
                    avatarProps={{
                      isBordered: true,
                      src: `https://pocketbase-production-60f6.up.railway.app/api/files/_pb_users_auth_/${blog.userId}/${blog.avatar}?token=`,
                    }}
                    className="transition-transform"
                    description={`@${comment.creatorUsername}`}
                    name={comment.creatorName}
                  />{" "}
                </div>{" "}
                <div className=" pl-10">
                  <p>{comment.comment}</p>
                </div>
              </div>
            ))}
        </div>
      </CardBody>{" "}
      <CardFooter className="flex flex-col w-full ">
        <div className="flex items-center w-full h-20 space-x-3 ">
          <div className="self-start ">
            <Image
              alt="Card background"
              src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
              className="object-cover bg-black rounded-full  h-[3rem] border-2 border-neutral-500 "
              isBlurred
            />
          </div>
          <PostComment blog={blog} />
        </div>
      </CardFooter>
    </Card>
  );
};
