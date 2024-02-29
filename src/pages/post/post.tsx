import { Icon } from "@iconify/react/dist/iconify.js";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Image,
  Input,
} from "@nextui-org/react";
import Editor from "./editor";

export const Post = () => {
  return (
    <Card
      className="p-2 min-h-[80dvh] flex flex-col  overflow-hidden !bg-none bg-transparent border-1 border-neutral-800 "
      radius="lg"
    >
      <CardHeader>
        <h2 className="text-2xl font-bold"> Publish new content</h2>
      </CardHeader>
      <Divider className="" />
      <CardBody className="w-full h-full overflow-hidden ">
        {/* <Image
            alt="Card background"
            src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
            className="object-cover bg-black rounded-full  h-[3rem] border-2 border-neutral-500"
            isBlurred
          /> */}
        <div className="flex flex-col justify-between w-full h-full space-y-4 ">
          <Input
            type="text"
            label="Title"
            placeholder="Enter content title"
            size="sm"
            // className="bg-neutral-500"
          />
          <div className="flex-1 overflow-hidden ">
            <Editor toolbar />
          </div>

          {/* <Divider className="my-4" /> */}
          <div className="flex justify-end">
            <div>
              {/* <Button
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
                </Button> */}
            </div>
            <Button
              color="default"
              variant="flat"
              className="text-black bg-white"
              size="sm"
            >
              Publish
            </Button>{" "}
          </div>
        </div>
      </CardBody>
    </Card>
  );
};
