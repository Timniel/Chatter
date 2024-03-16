import {
  Avatar,
  Card,
  CardBody,
  Chip,
  Divider,
  Image,
  User,
} from "@nextui-org/react";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { Like } from "../../pages/app/components/like";
import { Comment } from "../../pages/app/components/comment";
import { Bookmark } from "../../pages/app/components/bookmark";
import { Blog } from "../interface";
import client from "../../services/client";
import { useEffect, useState } from "react";

interface FeedProps {
  blog: Blog;
}
export const Feed = ({ blog }: FeedProps) => {
  const [likes, setLikes] = useState(blog.likes || []);
  const [bookmarks, setBookmarks] = useState(blog.bookmarks || []);
  const navigate = useNavigate();
  const getFirstImageSrc = (html: string) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const images = doc.getElementsByTagName("img");

    for (let i = 0; i < images.length; i++) {
      const img = images[i];
      if (img && img.src) {
        return img.src;
      }
    }
    return null;
  };

  const imageSrc = getFirstImageSrc(blog.content);
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
      const url = `${client.baseUrl}api/files/_pb_users_auth_/${blog.userId}/${blog.avatar}?token=`;

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

    name: blog.creatorName,
    fallback: (
      <p className="text-lg font-bold text-white uppercase">
        {blog.creatorName.charAt(0)}
      </p>
    ),
    ...(avatarSrc && { src: avatarSrc }),
  };

  return (
    <Card className="w-full p-2 shadow-none h-max bg-neutral-900 " radius="lg">
      <CardBody className="w-full space-y-4 overflow-visible">
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
        <h2 className="text-3xl line-clamp-1">{blog.title}</h2>
        <p className="text-sm font-light text-neutral-100 ">
          <div className="content-text line-clamp-2">
            {(() => {
              const parsedContent = new DOMParser().parseFromString(
                blog.content,
                "text/html"
              );
              const elements = parsedContent.getElementsByTagName("img");

              for (let i = elements.length; i--; ) {
                const img = elements[i];
                if (img && img.parentNode) {
                  img.parentNode.removeChild(img);
                }
              }

              return (
                parsedContent &&
                parsedContent.documentElement.textContent &&
                parsedContent.documentElement.textContent.trim()
              );
            })()}
          </div>

          <span
            className="text-blue-500 cursor-pointer "
            onClick={() =>
              navigate(`/blog/${blog?.id}`, {
                state: { ...blog, likes, bookmarks },
              })
            }
          >
            Read more
          </span>
        </p>
        {imageSrc && (
          <div className="w-full h-40 overflow-hidden ">
            <Image
              className="object-fill w-[1000px] min-w-full rounded-md "
              src={imageSrc}
            />
          </div>
        )}{" "}
        <Divider className="my-4" />
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
            <p className="max-sm:max-w-[25dvw] capitalize truncate ">
              {" "}
              {blog.category
                .split("-")
                .map(
                  (category) =>
                    category.charAt(0).toUpperCase() + category.slice(1)
                )
                .join(" ")}
            </p>
          </Chip>{" "}
          <div className="flex space-x-4 ">
            <Like blog={blog} likes={likes} setLikes={setLikes} />
            <div className="flex">
              <Comment blog={blog} comments={blog.comments.length} />
            </div>{" "}
            <Bookmark
              blog={blog}
              setBookmarks={setBookmarks}
              bookmarks={bookmarks}
            />
          </div>{" "}
        </div>
      </CardBody>
    </Card>
  );
};
