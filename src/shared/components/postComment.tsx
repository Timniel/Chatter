import { Icon } from "@iconify/react/dist/iconify.js";
import { Button, Input } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import client from "../../services/client";
import { useSelector } from "react-redux";
import { RootState } from "../../store/rootReducer";
import { Blog, Comments } from "../interface";

interface PostCommentProps {
  blog: Blog;
  setComments: (comments: Comment[]) => void;
  scrollToContent: () => void;
}

export const PostComment = ({
  blog,
  setComments,
  scrollToContent,
}: PostCommentProps) => {
  const { userData } = useSelector((state: RootState) => state.auth);
  if (!userData) {
    return;
  }
  const { register, handleSubmit } = useForm<Comments>();

  const comment = async (data: Comments) => {
    const updatedRecord = await client.collection("comments").create(data);
    await client
      .collection("blogs")
      .update(data.blogId, { "comments+": updatedRecord.id });
  };

  const onSubmit = async (data: Comments) => {
    if (data) {
      const submissionData: Comments = {
        ...data,
        blogId: blog.id,
        creatorName: userData.name,
        creatorUsername: userData.username,
        userId: userData.id,
        avatar: userData.avatar,
      };
      setComments((comments: Comments[]) => [...comments, submissionData]);

      setTimeout(() => {
        scrollToContent();
      }, 100);
      comment(submissionData);
    }
  };
  return (
    <form
      className="flex flex-col flex-1 w-full space-y-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input
        variant="flat"
        size="xs"
        {...register("comment")}
        type="text"
        placeholder="Write your comment"
        className=""
      />
      <div className="flex justify-between">
        <div>
          <Button
            color="default"
            variant="flat"
            className=""
            size="sm"
            startContent={
              <Icon
                icon="heroicons:photo-16-solid"
                className="text-lg text-neutral-100"
              />
            }
          >
            Photo
          </Button>{" "}
          <Button
            color="default"
            variant="flat"
            size="sm"
            className=""
            startContent={
              <Icon
                icon="heroicons:photo-16-solid"
                className="text-lg text-neutral-100"
              />
            }
          >
            Video
          </Button>
        </div>
        <Button
          type="submit"
          color="default"
          variant="flat"
          className="text-black bg-white"
          size="sm"
          onClick={() => handleSubmit(onSubmit)}
        >
          Post
        </Button>{" "}
      </div>
    </form>
  );
};
