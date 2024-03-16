import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Input,
  Select,
  SelectItem,
  Spinner,
} from "@nextui-org/react";
import Editor from "./editor";

import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { RootState } from "../../store/rootReducer";
import { useState } from "react";
import client from "../../services/client";
import { Blog } from "../../shared/interface";
import { useNavigate } from "react-router-dom";

export const categories = [
  {
    label: "Technology",
    value: "technology",
    description:
      "The latest in software development and technological innovation",
  },
  {
    label: "Personal Development",
    value: "personal-development",
    description: "Strategies for self-improvement and personal growth",
  },
  {
    label: "Culture",
    value: "culture",
    description: "Dive into art, music, literature, and more",
  },
  {
    label: "Business",
    value: "business",
    description: "Latest trends and insights in entrepreneurship and startups",
  },
  {
    label: "Education",
    value: "education",
    description: "Explore resources for online learning and personal growth",
  },
  {
    label: "News and Politics",
    value: "news-politics",
    description: "Stay up to date on current events and political developments",
  },
  {
    label: "Health and Fitness",
    value: "health-fitness",
    description: "Advice for staying healthy and active",
  },
  {
    label: "Travel",
    value: "travel",
    description:
      "Discover new places and experiences through the eyes of our users",
  },
  {
    label: "Food",
    value: "food",
    description: "Explore recipes and culinary tips from around the world",
  },
  {
    label: "Sports",
    value: "sports",
    description: "Get the latest sports news and updates",
  },
];

export const Post = () => {
  const { userData } = useSelector((state: RootState) => state.auth);
  if (!userData) {
    return;
  }
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, setValue } = useForm<Blog>();
  const navigate = useNavigate();
  const onSubmit = async (data: Blog) => {
    if (data) {
      setIsLoading(true);
      const submissionData = {
        ...data,
        creatorName: userData.name,
        creatorUsername: userData.username,
        userId: userData.id,
        avatar: userData.avatar,
      };

      createBlog(submissionData);
    }
  };

  const dataURLtoFile = (dataUrl: string, filename: string) => {
    const arr = dataUrl.split(",");
    const mimeMatch = arr[0].match(/:(.*?);/);
    const mime = mimeMatch ? mimeMatch[1] : ""; // default mime type to an empty string if no match is found
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  };

  const createBlog = async (data: Blog) => {
    // Extract images from Quill editor content
    let content = data.content;
    let imageFilesToUpload: { file: File; imgElement: HTMLImageElement }[] = [];
    let parser = new DOMParser();
    let doc = parser.parseFromString(content, "text/html");
    let images = doc.querySelectorAll("img");
    images.forEach((img, index) => {
      if (img.src.startsWith("data:")) {
        // Convert the Data URL to a File object
        const fileName = `image_${Date.now()}_${index}.png`;
        const file = dataURLtoFile(img.src, fileName);
        imageFilesToUpload.push({ file, imgElement: img });
        // Temporarily set src to a placeholder
        img.src = "about:blank";
      }
    });

    // Create a FormData object
    const formData = new FormData();

    formData.append("userId", data.userId);
    formData.append("title", data.title);
    formData.append("category", data.category);
    formData.append("avatar", data.avatar);
    formData.append("creatorName", data.creatorName);
    formData.append("creatorUsername", data.creatorUsername);
    formData.append("avatar", data.avatar);

    // Resize the images and upload them
    for (const { file } of imageFilesToUpload) {
      formData.append("files", file, file.name);
    }

    // Create a new blog in PocketBase
    let record: Blog;
    try {
      record = await client.collection("blogs").create(formData);
    } catch (error) {
      setIsLoading(false);
      return error;
    }

    // Update the image src attributes in the Quill content

    images = doc.querySelectorAll('img[src="about:blank"]');
    images.forEach((img, index) => {
      if (index < imageFilesToUpload.length) {
        // Construct the URL with the record ID and file name
        const newSrc = `${client.baseUrl}api/files/blogs/${record.id}/${record.files[index]}`;
        img.src = newSrc;

        // Create an anchor element to make the image clickable and open in a new tab
        const anchor = doc.createElement("a");
        anchor.href = newSrc;
        anchor.target = "_blank";
        anchor.rel = "noopener noreferrer";
        anchor.appendChild(img.cloneNode(true));

        // Replace the original image with the anchor element
        img.replaceWith(anchor);

        // Add inline styles to the new image element
        const newImg = anchor.querySelector("img");
        if (newImg) {
          newImg.style.width = "100%";
          newImg.style.objectFit = "cover";
        }
      }
    });

    // Update the blog with the new Quill content in PocketBase
    try {
      const updatedBlogData = {
        content: doc.body.innerHTML, // Update with the latest HTML content
      };
      const update = await client
        .collection("blogs")
        .update(record.id, updatedBlogData);
      setIsLoading(false);
      navigate(`/blog/${update?.id}`, { state: update });
      return update;
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <Card
      className="p-2 min- h-[96%] flex flex-col  overflow-hidden !bg-none bg-transparent border-1 border-neutral-800 "
      radius="lg"
    >
      <CardHeader>
        <h2 className="text-2xl font-bold"> Publish new content</h2>
      </CardHeader>
      <Divider className="" />
      <CardBody className="w-full h-full overflow-hidden ">
        <form
          className="flex flex-col justify-between w-full h-full space-y-4 "
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input
            type="text"
            label="Title"
            placeholder="Enter title"
            size="md"
            {...register("title")}
            classNames={{
              inputWrapper:
                "bg-neutral-900 focus-within:!bg-default-200/50 hover:!bg-default-200/50 ",
            }}
          />
          <Select
            label="Select a category"
            {...register("category")}
            classNames={{
              trigger: "bg-neutral-900 text-white",
              popoverContent: "bg-neutral-900 text-white  ",
            }}
          >
            {categories.map((category) => (
              <SelectItem key={category.value} value={category.value}>
                {category.label}
              </SelectItem>
            ))}
          </Select>

          <div className="flex-1 overflow-hidden ">
            <Editor setValue={setValue} register={register} />
          </div>

          <div className="flex justify-end">
            <Button
              type="submit"
              color="default"
              variant="flat"
              className="text-black bg-white"
              size="sm"
            >
              {isLoading ? <Spinner color="default" /> : "Publish"}
            </Button>{" "}
          </div>
        </form>
      </CardBody>
    </Card>
  );
};
