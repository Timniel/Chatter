import { Outlet } from "react-router-dom";
import { TopBar } from "../topbar";
import { SideBar } from "../sidebar";
import { RightBar } from "../rightbar/rightbar";
import { useMotionTemplate, useMotionValue, motion } from "framer-motion";
import AuthCheckComponent from "../AuthCheckComponent/AuthCheckComponent";

export const AppLayout = () => {
  let mouseX = useMotionValue(0);
  let mouseY = useMotionValue(0);

  const handleMouseMove = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const { currentTarget, clientX, clientY } = event;
    if (currentTarget) {
      const { left, top } = currentTarget.getBoundingClientRect();
      mouseX.set(clientX - left);
      mouseY.set(clientY - top);
    }
  };

  return (
    <AuthCheckComponent>
      <div
        className="grid xl:grid-cols-4 group grid-cols-6 relative from-neutral-900 bg-gradient-to-br to-black sm:px-5 gap-x-5  lg:gap-x-10 h-[100dvh] space-y-3"
        onMouseMove={handleMouseMove}
      >
        <motion.div
          className="absolute z-50 transition duration-300 opacity-0 pointer-events-none max-md:hidden -inset-px rounded-3xl group-hover:opacity-100"
          style={{
            background: useMotionTemplate` radial-gradient( 100px circle at ${mouseX}px ${mouseY}px, rgba(255, 255, 255, 0.15), transparent 80% ) `,
          }}
        />
        <div className="block xl:col-span-4 col-span-full h-[11dvh]">
          {" "}
          <TopBar />
        </div>
        <div className="h-[87dvh] row-span-4 max-xl:col-span-2  row-start-2 pl-5 max-lg:hidden ">
          {" "}
          <SideBar />
        </div>
        <div className="h-[87dvh] max-sm:px-3 xl:col-span-2 lg:col-span-4 col-span-full  row-span-4 row-start-2 ">
          {" "}
          <Outlet />{" "}
        </div>
        <div className="h-[87dvh]  col-start-4 row-span-4 row-start-2 max-xl:hidden  ">
          <RightBar />
        </div>
      </div>
    </AuthCheckComponent>
  );
};
