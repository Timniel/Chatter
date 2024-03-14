import { Outlet } from "react-router-dom";
import { TopBar } from "../topbar";
import { SideBar } from "../sidebar";
import { RightBar } from "../rightbar/rightbar";

export const AppLayout = () => {
  return (
    <div className="grid xl:grid-cols-4 grid-cols-6 px-5 gap-x-5  lg:gap-x-10 h-[100dvh] space-y-3">
      <div className="block xl:col-span-4 col-span-full h-[11dvh]">
        {" "}
        <TopBar />
      </div>
      <div className="h-[87dvh] row-span-4 max-xl:col-span-2 row-start-2 pl-5 max-lg:hidden ">
        {" "}
        <SideBar />
      </div>
      <div className="h-[87dvh] xl:col-span-2 lg:col-span-4 col-span-full  row-span-4 row-start-2 ">
        {" "}
        <Outlet />{" "}
      </div>
      <div className="h-[87dvh]  col-start-4 row-span-4 row-start-2 max-xl:hidden  ">
        <RightBar />
      </div>
    </div>
  );
};
