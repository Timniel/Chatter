import { categories } from "../pages/post/post";
import { Activity } from "./activity";

export const RightBar = () => {
  return (
    <div className="flex flex-col h-[97%] space-y-4 ">
      <p className="mt-4 mb-2 text-xl font-bold ">Categories</p>
      <div className="flex-1 space-y-4 overflow-scroll [&::-webkit-scrollbar]:hidden max-md:[-ms-overflow-style:none] max-md:[scrollbar-width:none]">
        {categories.map((category) => (
          <Activity category={category} />
        ))}
      </div>
    </div>
  );
};
