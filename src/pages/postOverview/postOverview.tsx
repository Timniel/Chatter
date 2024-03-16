import {
  Avatar,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  Divider,
  Image,
  User,
} from "@nextui-org/react";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Like } from "../app/components/like";
import { Comment } from "../app/components/comment";
import { PostComment } from "../../shared/components/postComment";
import client from "../../services/client";
import { Bookmark } from "../app/components/bookmark";
import { Blog, Comments as CommentType } from "../../shared/interface";

export const PostOverview = () => {
  const location = useLocation();
  const { blogId } = useParams();
  const [blog, setBlog] = useState<Blog | null>(location.state);
  const [comments, setComments] = useState<CommentType[]>([]);
  const [likes, setLikes] = useState(blog?.likes || []);
  const [bookmarks, setBookmarks] = useState(blog?.bookmarks || []);
  const endOfDivRef = useRef(null);
  const lastContentRef = useRef<HTMLDivElement>(null);

  const scrollToContent = () => {
    lastContentRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  };
  const fetchReplies = async (blogId: string) => {
    try {
      const replies: CommentType[] = await client
        .collection("comments")
        .getFullList({
          filter: `blogId="${blogId}"`,
        });

      setComments((comments) => [...comments, ...replies]);
    } finally {
    }
  };
  const fetchBlog = async () => {
    try {
      const blog: Blog = await client
        .collection("blogs")
        .getOne(blogId as string, {});
      setBlog(blog);
      setLikes(blog?.likes);
      setBookmarks(blog?.bookmarks);
      fetchReplies(blog.id);
    } finally {
    }
  };
  const isMounted = useRef(false);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      if (blog) {
        fetchReplies(blog.id);
      } else {
        fetchBlog();
      }
    }
  }, []);
  const [avatarSrc, setAvatarSrc] = useState<string | null>(null);

  const checkImageExists = async (url: string) => {
    const response = await fetch(url, {
      method: "HEAD",
      mode: "cors",
    });

    return response.status >= 200 && response.status < 300;
  };

  useEffect(() => {
    const checkIfImageExists = async () => {
      const url = `${client.baseUrl}api/files/_pb_users_auth_/${blog?.userId}/${blog?.avatar}?token=`;

      if (typeof client.baseUrl !== "undefined") {
        const imageExists = await checkImageExists(url);

        if (imageExists) {
          setAvatarSrc(`${url}`);
        }
      }
    };

    checkIfImageExists();
  }, []);
  const avatarProps = {
    isBordered: true,

    name: blog?.creatorName,
    fallback: (
      <p className="text-lg font-bold text-white uppercase">
        {blog?.creatorName.charAt(0)}
      </p>
    ),
    ...(avatarSrc && { src: avatarSrc }),
  };
  return (
    blog && (
      <Card
        className="p-2 sm:px-10 h-full !bg-none bg-transparent shadow-none border-none border-neutral-800  "
        radius="lg"
      >
        <CardHeader>
          <p className="text-2xl font-bold">{blog.title}</p>
        </CardHeader>
        <CardBody className="w-full space-y-4 overflow-scroll overflow-y-auto h-72 [&::-webkit-scrollbar]:hidden max-md:[-ms-overflow-style:none] max-md:[scrollbar-width:none]">
          <div className="flex items-center justify-between space-x-1">
            <User
              as="button"
              avatarProps={avatarProps}
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

          <p className="text-sm font-light text-neutral-100 ">
            <span
              className=""
              dangerouslySetInnerHTML={{ __html: blog.content }}
            ></span>{" "}
          </p>
          <div className="flex justify-between w-full">
            <Chip
              variant="flat"
              className="self-end truncate max-sm:max-w-full "
              avatar={
                <Avatar
                  name={blog.category}
                  size="sm"
                  getInitials={(name) => name.charAt(0).toUpperCase()}
                />
              }
            >
              <p className="truncate ">{blog.category}</p>
            </Chip>{" "}
            <div className="flex space-x-4 ">
              <Like blog={blog} likes={likes} setLikes={setLikes} />
              <div className="flex">
                <Comment
                  blog={blog}
                  comments={comments.length || blog.comments.length}
                />
              </div>{" "}
              <Bookmark
                blog={blog}
                setBookmarks={setBookmarks}
                bookmarks={bookmarks}
              />
            </div>{" "}
          </div>
          <Divider className="my-4" />
          <div className="w-full ">
            {comments.length > 0 &&
              comments.map((comment, index) => (
                <div
                  className="flex flex-col w-full h-20 space-x-3 "
                  ref={index === comments.length - 1 ? lastContentRef : null}
                >
                  <div className="self-start ">
                    <User
                      as="button"
                      avatarProps={{
                        isBordered: true,
                        src: `${client.baseUrl}api/files/_pb_users_auth_/${blog.userId}/${blog.avatar}?token=`,
                      }}
                      className="transition-transform"
                      description={`@${comment.creatorUsername}`}
                      name={comment.creatorName}
                    />{" "}
                  </div>{" "}
                  <div className="pl-10 ">
                    <p>{comment.comment}</p>
                  </div>
                </div>
              ))}
            <div ref={endOfDivRef} className="mt-3"></div>
          </div>
        </CardBody>{" "}
        <CardFooter className="flex flex-col w-full shadow-none ">
          <div className="flex items-center w-full h-20 space-x-3 ">
            <Image
              alt="Card background"
              src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
              className="object-cover rounded-full  h-[3rem] border-2 border-neutral-500 "
            />

            <PostComment
              blog={blog}
              setComments={setComments}
              scrollToContent={scrollToContent}
            />
          </div>
        </CardFooter>
      </Card>
    )
  );
};
