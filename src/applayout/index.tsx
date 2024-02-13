import { Outlet } from "react-router-dom";
import { TopBar } from "../topbar";
import { SideBar } from "../sidebar";

export const AppLayout = () => {
  return (
    <div className="flex flex-col min-h-screen ">
      <TopBar />
      <div className="flex flex-1 ">
        <SideBar />
        <main className="flex-1 p-6 mt-20 ml-64 overflow-y-auto bg-white">
          <Outlet /> {/* Child components will be rendered here */}
        </main>
      </div>
    </div>
  );
};
