import { Button, Textarea } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import client from "../../services/client";
import { useSelector } from "react-redux";
import { RootState } from "../../store/rootReducer";
import { Blog, Comments } from "../interface";

interface PostCommentProps {
  blog: Blog;
  setComments: React.Dispatch<React.SetStateAction<Comments[]>>;
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
      <Textarea
        variant="flat"
        minRows={1}
        {...register("comment")}
        type="text"
        placeholder="Write your comment"
        className=""
        endContent={
          <Button
            type="submit"
            color="default"
            variant="flat"
            className="text-black bg-white"
            size="sm"
          >
            Post
          </Button>
        }
      />
    </form>
  );
};
