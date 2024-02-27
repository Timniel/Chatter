import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import {
  Card,
  CardHeader,
  CardBody,
  Image,
  Divider,
  Button,
} from "@nextui-org/react";

export const Activity = () => {
  return (
    <Card
      className=" min-h-[80dvh] !bg-none bg-transparent border-1  border-neutral-800 p-2"
      radius="lg"
    >
      <CardHeader className="relative flex-col w-full py-2 ">
        <h4 className="self-start text-xl font-bold">Recent Activity</h4>
      </CardHeader>
      <Divider className="my-2" />
      <CardBody className="py-2 space-y-4 overflow-visible">
        {" "}
        <p className="flex items-start space-x-2 text-xs font-normal">
          <span className="rounded-full inline-flex mt-1 h-[6px] w-[6px] dark:bg-red-400 ring-white  ring-opacity-25 ring-4"></span>{" "}
          <span className="font-bold ">David Clinton</span> like your post.
          <span className=" text-tiny text-neutral-400"> 2 mins ago</span>
        </p>{" "}
        <Divider className="my-4" />
        <p className="flex space-x-2 text-xs font-normal">
          <span className="rounded-full inline-flex mt-[0.4rem] h-[6px] w-[6px] dark:bg-neutral-500 ring-white  ring-opacity-25 ring-4"></span>{" "}
          <p>
            {" "}
            <span className="font-bold ">David Clinton</span> replied to your
            post.
            <span className=" text-tiny text-neutral-400"> 3 mins ago</span>
          </p>{" "}
        </p>{" "}
        <Divider className="my-4" />
        <p className="flex space-x-2 text-xs font-normal">
          <span className="rounded-full inline-flex mt-[0.4rem] h-[6px] w-[6px] dark:bg-neutral-500 ring-white  ring-opacity-25 ring-4"></span>{" "}
          <p>
            {" "}
            <span className="font-bold ">David Clinton</span> replied to your
            post.
            <span className=" text-tiny text-neutral-400"> 4 mins ago</span>
          </p>{" "}
        </p>{" "}
      </CardBody>
    </Card>
  );
};
