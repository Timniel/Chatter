import { Card, Link } from "@nextui-org/react";

import Icon from "../ui/icon";

interface ActivityPropss {
  category: {
    label: string;
    value: string;
    description: string;
  };
}
export const Activity = ({ category }: ActivityPropss) => {
  return (
    <>
      <Link href={`/category/${category.value}`} className="w-full">
        <Card
          className="flex items-center w-full p-5 shadow-none cursor-pointer bg-neutral-900"
          radius="lg"
          isHoverable
        >
          <div className="flex justify-between w-full hover:text-white text-neutral-700">
            <div className="flex items-center w-full ">
              {" "}
              <div className="flex items-start gap-3 text-xs ">
                {" "}
                <Icon
                  icon="mdi:wrench"
                  className="w-10 h-10 p-2 text-white rounded-md shadow-xl bg-neutral-700 "
                />
              </div>
              <div className="flex flex-col ">
                <p className="px-2 py-2 text-sm text-white transition-colors ">
                  {category.label}
                </p>
              </div>
            </div>{" "}
            <Icon icon="ion:open-outline" className="text-4xl " />
          </div>
        </Card>
      </Link>
      {/* <Card
        className=" min-h-[80dvh]  border-neutral-800 p-2 shadow-none "
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
                  <Link to={`/category/${category.value}`}>
                    {category.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <nav className="px-4 py-2 "></nav>
      </Card> */}
    </>
  );
};
