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

export const Post = () => {
  return (
    <Card
      className="p-2  h-max !bg-none bg-transparent border-1 border-neutral-800 "
      radius="lg"
    >
      <CardBody className="w-full space-y-4 overflow-visible">
        <div className="flex w-full space-x-3 ">
          <Image
            alt="Card background"
            src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
            className="object-cover bg-black rounded-full  h-[3rem] border-2 border-neutral-500"
            isBlurred
          />
          <div className="flex flex-col flex-1 w-full space-y-4">
            <Input
              variant="flat"
              size="sm"
              type="email"
              placeholder="Make a post about your work"
              className=""
            />{" "}
            {/* <Divider className="my-4" /> */}
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
                color="default"
                variant="flat"
                className="text-black bg-white"
                size="sm"
              >
                Publish
              </Button>{" "}
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};
