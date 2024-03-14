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
import MdEditor from "./MdEditor";

export const Post = () => {
  return (
    <Card
      className="p-2 min- h-[80dvh] flex flex-col  overflow-hidden !bg-none bg-transparent border-1 border-neutral-800 "
      radius="lg"
    >
      <CardHeader>
        <h2 className="text-2xl font-bold"> Publish new content</h2>
      </CardHeader>
      <Divider className="" />
      <CardBody className="w-full h-full overflow-hidden ">
        <div className="flex flex-col justify-between w-full h-full space-y-4 ">
          <Input
            type="text"
            label="Title"
            placeholder="Enter content title"
            size="sm"
            classNames={{
              inputWrapper:
                "bg-[#0a0a0a] focus-within:!bg-default-200/50 hover:!bg-default-200/50 ",
            }}
          />
          <div className="flex-1 overflow-hidden ">
            <Editor toolbar />
          </div>

          <div className="flex justify-end">
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
