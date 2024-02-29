import { Outlet } from "react-router-dom";
import { TopBar } from "../topbar";
import { SideBar } from "../sidebar";
import { RightBar } from "../rightbar/rightbar";

export const AppLayout = () => {
  return (
    <div className="grid grid-cols-4 px-5  gap-x-10 h-[100dvh] space-y-3">
      <div className="block col-span-4 h-[11dvh]">
        {" "}
        <TopBar />
      </div>
      <div className="h-[87dvh] row-span-4 row-start-2 pl-5 ">
        {" "}
        <SideBar />
      </div>
      <div className="h-[87dvh] col-span-2 row-span-4 row-start-2 ">
        {" "}
        <Outlet />{" "}
      </div>
      <div className="h-[87dvh]  col-start-4 row-span-4 row-start-2 ">
        <RightBar />
      </div>
    </div>
  );
};
