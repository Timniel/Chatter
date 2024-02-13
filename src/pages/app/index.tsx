import { useState } from "react";
import { Icon } from "@iconify/react";

export const AppPage = () => {
  // State to keep track of the active tab
  const [activeTab, setActiveTab] = useState("forYou");

  return (
    <div className=" p-10 px-[5rem] mx-[2rem] space-y-5 border shadow-sm border-slate-200">
      <div className="flex items-center justify-between w-full">
        <div className="space-y-3">
          <h3 className="text-3xl uppercase">Feed</h3>
          <p className="text-gray-500">Explore different content you’d love</p>
        </div>
        <button className="flex items-center h-10 gap-2 px-3 py-2 text-white bg-blue-800 rounded-md ">
          <Icon className="font-bold" icon="pepicons-pop:pen" />
          <span className="text-xs font-medium">Post a content</span>
        </button>
      </div>
      <div>
        <div className="flex items-center justify-between px-20 border rounded-lg shadow-sm h-14 border-slate-200">
          <button
            className={`h-full ${
              activeTab === "forYou" ? "border-b-4 border-blue-800" : ""
            }`}
            onClick={() => setActiveTab("forYou")}
          >
            <p>For you</p>
          </button>
          <button
            className={`h-full  ${
              activeTab === "featured" ? "border-b-4 border-blue-800" : ""
            }`}
            onClick={() => setActiveTab("featured")}
          >
            <p>Featured</p>
          </button>
          <button
            className={`h-full  ${
              activeTab === "recent" ? "border-b-4 border-blue-800" : ""
            }`}
            onClick={() => setActiveTab("recent")}
          >
            <p>Recent</p>
          </button>
        </div>
        <div className="flex flex-col p-10 pr-[14rem] space-y-4 overflow-y-scroll border rounded-lg shadow-sm border-slate-200">
          <div>
            <div className="flex space-x-3">
              {" "}
              <img
                className="w-24 h-24 rounded-full"
                src="https://dummyimage.com/600x400/000000/0011ff"
                alt="User profile"
              />
              <div className="flex flex-col justify-between py-5">
                <p className="text-xl font-medium">Grace Ikpang</p>
                <p className="text-sm font-light text-gray-700">
                  Product designer. May 25th, 2023
                </p>
              </div>
            </div>
          </div>
          <div className="space-y-1 ">
            <h2 className="text-3xl ">Starting out as a Product designer</h2>
            <div className="space-x-1 ">
              <Icon className="inline font-bold" icon="codicon:book" />{" "}
              <p className="inline text-sm font-extralight text-slate-700">
                10 mins read
              </p>
            </div>
          </div>
          <p className="text-sm font-light text-gray-600">
            Embarking on a journey as a product designer can be an exhilarating
            and fulfilling experience. As a profession that bridges the realms
            of art, technology, and problem-solving, product design offers an
            opportunity to shape the way people interact with the world around
            them.
          </p>
          <img
            className="w-full h-64 rounded-sm"
            src="https://dummyimage.com/600x400/000000/0011ff"
            alt="User profile"
          />
          <div className="flex justify-between">
            <div className="flex">
              <Icon
                className="w-10 h-6 font-bold"
                icon="fluent:chat-multiple-24-regular"
              />{" "}
              <p className="font-thin text-slate-700">200</p>
            </div>
            <div className="flex">
              <Icon
                className="w-10 h-6 font-bold"
                icon="icon-park-outline:like"
              />{" "}
              <p className="font-thin text-slate-700">120</p>
            </div>
            <div className="flex">
              <Icon
                className="w-10 h-6 font-bold"
                icon="material-symbols-light:analytics-outline"
              />{" "}
              <p className="font-thin text-slate-700">2980 veiws</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
