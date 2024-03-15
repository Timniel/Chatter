import { Link } from "react-router-dom";

import { Card, Divider } from "@nextui-org/react";
import { categories } from "../pages/post/post";

export const Activity = () => {
  return (
    <Card
      className=" min-h-[80dvh] !bg-none bg-transparent border-1  border-neutral-800 p-2  "
      radius="lg"
    >
      <div className="flex flex-col flex-grow">
        <p className="px-4 mt-4 mb-2 text-lg font-bold">Categories</p>
        <Divider className="my-2" />
        <nav className="pl-5 text-neutral-200">
          <ul>
            {" "}
            {categories.map((category) => (
              <li className="px-2 py-2 text-xs transition-colors ">
                <Link to={`/category/${category.value}`}>{category.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <nav className="px-4 py-2 "></nav>
    </Card>
  );
};
