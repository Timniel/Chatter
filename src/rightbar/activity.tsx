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
      className=" min-h-[80dvh] !bg-none bg-transparent border-1  border-neutral-800 p-2  "
      radius="lg"
    >
      <div className="flex flex-col flex-grow">
        {/* <p className="px-4 mt-4 mb-2 text-lg font-bold">Overview</p>
        <Divider className="my-2" />
        <nav className="pl-5 text-neutral-200">
          <ul className="space-y-1">
            <li className="flex items-center px-2 py-2 text-xs transition-colors ">
              <Icon icon="fa-solid:bookmark" className="w-4 h-4 mr-2" />
              <Link to="/bookmarks">Bookmarks</Link>
            </li>
          
            <li className="flex items-center px-2 py-2 text-xs transition-colors ">
              <Icon icon="fa-solid:chart-line" className="w-4 h-4 mr-2" />
              <Link to="/analytics">Analytics</Link>
            </li>
          </ul>
        </nav> */}
        <p className="px-4 mt-4 mb-2 text-lg font-bold">
          Categories
          {/* <Icon icon="ph:trend-up" className="inline-block w-4 h-4 mr-2" /> */}
        </p>
        <Divider className="my-2" />
        <nav className="pl-5 text-neutral-200">
          <ul>
            <li className="px-2 py-2 text-xs transition-colors ">
              <Link to="/category/programming">Programming</Link>
            </li>
            <li className="px-2 py-2 text-xs transition-colors ">
              <Link to="/tags/data-science">Data Science</Link>
            </li>
            <li className="px-2 py-2 text-xs transition-colors ">
              <Link to="/tags/technology">Technology</Link>
            </li>
            <li className="px-2 py-2 text-xs transition-colors ">
              <Link to="/tags/machine-learning">Machine Learning</Link>
            </li>
            <li className="px-2 py-2 text-xs transition-colors ">
              <Link to="/tags/politics">Politics</Link>
            </li>
            <li className="px-2 py-2 text-xs text-blue-800 transition-colors ">
              <Link to="/tags/see-all">See All</Link>
            </li>
          </ul>
        </nav>
      </div>
      <nav className="px-4 py-2 "></nav>
    </Card>
  );
};
{
  /* <Card
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
        <span className="font-bold ">David Clinton</span> replied to your post.
        <span className=" text-tiny text-neutral-400"> 3 mins ago</span>
      </p>{" "}
    </p>{" "}
    <Divider className="my-4" />
    <p className="flex space-x-2 text-xs font-normal">
      <span className="rounded-full inline-flex mt-[0.4rem] h-[6px] w-[6px] dark:bg-neutral-500 ring-white  ring-opacity-25 ring-4"></span>{" "}
      <p>
        {" "}
        <span className="font-bold ">David Clinton</span> replied to your post.
        <span className=" text-tiny text-neutral-400"> 4 mins ago</span>
      </p>{" "}
    </p>{" "}
  </CardBody>
</Card>; */
}
