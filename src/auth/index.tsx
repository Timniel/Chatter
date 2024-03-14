import { Outlet, useLocation, useNavigate } from "react-router-dom";
import sign from "../assets/images/sign.png";
import client from "../services/client";

export const AuthLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location.pathname);
  return (
    <div className=" h-[100dvh] w-[100dvw] flex">
      <img
        src={sign}
        className="object-fill xl:w-[40%] w-[20%] h-full max-md:hidden"
      />
      <div className="xl:w-[60%] w-full xl:px-[10rem] h-full flex-col flex justify-center">
        <div className="w-[70%] flex flex-col justify-center self-center my-5 space-y-3">
          <div className="flex self-center justify-between w-full ">
            <button
              className="text-sm font-semibold uppercase"
              type="button"
              onClick={() => navigate("/signup")}
            >
              <p
                className={`${
                  location.pathname !== "/signup" && "text-slate-600"
                }`}
              >
                Register
              </p>
            </button>
            <button
              className="text-sm font-semibold uppercase"
              type="button"
              onClick={() => navigate("/signin")}
            >
              <p
                className={`${
                  location.pathname !== "/signin" && "text-slate-600"
                }`}
              >
                Log in
              </p>
            </button>
          </div>
          <div className="flex w-full h-2 bg-blue-200 rounded-full">
            <div
              className={`w-1/2 h-full text-xs text-center text-white ${
                location.pathname === "/signup" ? "bg-blue-600" : "bg-blue-200 "
              } rounded-full `}
            ></div>
            <div
              className={`w-1/2 h-full text-xs text-center text-white ${
                location.pathname === "/signin" ? "bg-blue-600" : "bg-blue-200 "
              } rounded-full `}
            ></div>
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  );
};
