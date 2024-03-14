import React, { useState, useEffect } from "react";
import PocketBase from "pocketbase";
import {
  Button,
  Chip,
  Image,
  Input,
  Skeleton,
  Spinner,
  User,
} from "@nextui-org/react";

import { Bars2Icon, XMarkIcon } from "@heroicons/react/20/solid";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store/rootReducer";
import client from "../services/client";

interface UserDatas {
  id: string;
  collectionId: string;
  collectionName: string;
  username: string;
  verified: boolean;
  emailVisibility: boolean;
  email: string;
  created: string;
  updated: string;
  name: string;
  avatar: string | File;
  rank: number;
  recent_games: string;
  level: string;
}

export const UserDetails = () => {
  const [editMode, setEditMode] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string>("");
  const [mobileBar, setMobileBar] = useState(false);
  const [isloading, setIsloading] = useState(false);
  const [blogs, setBlogs] = useState();
  const navigate = useNavigate();
  const { userData } = useSelector((state: RootState) => state.auth);
  if (!userData) {
    return;
  }
  const [profileData, setProfileData] = useState(userData);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (name === "avatar") {
      const file = files?.[0];
      if (file) {
        setProfileData((prevUser) => ({
          ...prevUser,
          [name]: file,
        }));
        setAvatarPreview(URL.createObjectURL(file));
      }
    } else {
      setProfileData((prevUser) => ({
        ...prevUser,
        [name]: e.target.value,
      }));
    }
  };

  const fetchBlogs = async () => {
    client.autoCancellation(false);
    const records = await client.collection("blogs").getFullList({
      filter: `userId="${userData.id}"`,
    });
    console.log(records);
    setBlogs(records);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsloading(true);
    e.preventDefault();

    const updatedRecord = await client
      .collection("users")
      .update(profileData.id, profileData);
    setProfileData(updatedRecord as UserDatas);
    setEditMode(false);

    setIsloading(false);
  };

  const logOut = () => {
    client.authStore.clear();
    navigate(`/login`);
  };
  return (
    <div className="p-5 items-center justify-center lg:px-[15rem] lg:items-center flex flex-col lg:flex-row h-full  lg:justify-between  gap-6">
      {mobileBar && (
        <div className="flex flex-col items-start self-start w-full h-full gap-5">
          <XMarkIcon
            className="text-white cursor-pointer h-7 sm:hidden "
            onClick={() => setMobileBar(false)}
          />
          <div className="flex justify-between w-full h-full px-5 ">
            <ul className="flex flex-col gap-3 text-gray-300 ">
              <li>
                <a
                  onClick={() => navigate("/get-started")}
                  className="cursor-pointer "
                >
                  Play
                </a>
              </li>
              <li>
                <a
                  onClick={() => navigate("/leaderboard")}
                  className="cursor-pointer "
                >
                  Leaderboard
                </a>
              </li>
              {/* <li>
                <a href="">Ranking</a>
              </li>
              <li>
                <a href="">News</a>
              </li> */}
            </ul>
            <div className="block">
              <p
                className="p-2 text-xs text-red-600 cursor-pointer border-1 border-amber-600"
                onClick={() => {
                  logOut();
                }}
              >
                Log Out
              </p>
            </div>
          </div>
        </div>
      )}
      {!mobileBar && (
        <>
          <div className="absolute top-[1rem] left-[1rem] ">
            <Bars2Icon
              className="text-white cursor-pointer h-7 sm:hidden"
              onClick={() => setMobileBar(true)}
            />
          </div>
          {!editMode ? (
            <div className="flex flex-col items-start gap-5">
              {!profileData ? (
                <Skeleton className="flex w-20 h-20 rounded-xl" />
              ) : (
                <>
                  {profileData.avatar ? (
                    <Image
                      className="w-20 h-20"
                      src={`https://wet-beach.pockethost.io/api/files/users/${profileData.id}/${profileData.avatar}`}
                    />
                  ) : (
                    <div className="flex items-center justify-center w-20 h-20 bg-white rounded-xl">
                      <p className="text-5xl font-bold uppercase ">
                        {profileData.name.charAt(0)}
                      </p>
                    </div>
                  )}
                </>
              )}
              {!profileData ? (
                <Skeleton className="flex rounded-xl sm:w-[14rem] h-8" />
              ) : (
                <div className="text-4xl font-bold text-white sm:text-6xl">
                  {profileData.name}
                </div>
              )}

              <div className="relative flex flex-col gap-4 px-10">
                <div className="flex flex-col gap-4">
                  <p className="text-sm font-bold ">
                    <span className="text-gray-600 mr-4 max-w-[5rem] min-w-[5rem] inline-block">
                      Username:
                    </span>
                    {!profileData ? (
                      <Skeleton className="inline-block w-20 h-4 rounded-xl" />
                    ) : (
                      <span className="max-w-[4rem] text-gray-400 mr-4 min-w-[4rem] inline-block">
                        {profileData.username}
                      </span>
                    )}
                  </p>
                  {/* <p className="text-sm font-bold">
                    <span className="text-gray-600 mr-4 max-w-[5rem] min-w-[5rem] inline-block">
                      Email:
                    </span>
                    {!profileData ? (
                      <Skeleton className=" rounded-xl w-[7.5rem] sm:w-40 h-4 inline-block" />
                    ) : (
                      <span className="max-w-[4rem] text-gray-400 min-w-[4rem] inline-block">
                        {profileData.email}
                      </span>
                    )}
                  </p> */}
                </div>
                <div className="flex gap-5 font-semibold">
                  <Button
                    type="submit"
                    className={`w-[5rem] rounded-none  ${
                      isloading ? "bg-neutral-950" : "bg-amber-600"
                    } `}
                    onClick={() => setEditMode(true)}
                  >
                    {!isloading ? `Edit` : <Spinner color="warning" />}
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit}>
              <div className="flex flex-col gap-2 w-[25rem] items-center px-10 sm:px-0">
                <div className="flex flex-col items-center justify-center gap-4">
                  <div className="flex gap-4 ">
                    <p className="flex gap-6 text-base font-bold">
                      <label htmlFor="avatar" className="w-[8rem] hidden ">
                        Profile Pic:
                      </label>
                    </p>
                    <div className="flex flex-col gap-2">
                      {avatarPreview ? (
                        <img
                          src={avatarPreview}
                          alt="Avatar Preview"
                          className="w-20 h-20"
                        />
                      ) : profileData.avatar ? (
                        <Image
                          src={`https://pocketbase-production-60f6.up.railway.app/api/files/users/${profileData.id}/${profileData.avatar}`}
                          alt="Avatar Preview"
                          className="w-20 h-20"
                        />
                      ) : (
                        <div className="flex items-center justify-center w-20 h-20 bg-neutral-600 rounded-xl">
                          <p className="text-5xl font-bold uppercase">
                            {profileData && profileData.name.charAt(0)}
                          </p>
                        </div>
                      )}

                      <input
                        type="file"
                        id="avatar"
                        name="avatar"
                        accept="image/*"
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <p className="flex gap-6 text-base font-bold ">
                    <label htmlFor="username" className="w-[8rem]">
                      Username:
                    </label>
                    <Input
                      type="text"
                      id="username"
                      size="sm"
                      name="username"
                      value={profileData.username}
                      className="w-[10rem]"
                      onChange={handleInputChange}
                    />
                  </p>
                </div>
                <div>
                  <p className="flex gap-6 text-base font-bold ">
                    <label htmlFor="name" className="w-[8rem]">
                      Name:
                    </label>
                    <Input
                      type="text"
                      id="name"
                      size="sm"
                      name="name"
                      value={profileData.name}
                      className="w-[10rem]"
                      onChange={handleInputChange}
                    />
                  </p>
                </div>
                <div className="self-end">
                  <Button
                    type="submit"
                    className={`w-[5rem] rounded-none  ${
                      isloading ? "bg-neutral-950" : "bg-amber-600"
                    } `}
                  >
                    {!isloading ? `Save` : <Spinner color="warning" />}
                  </Button>
                </div>
              </div>
            </form>
          )}
          <div className=" z-[60] ">
            <div className="sm:w-[80dvw] w-[80dvw] lg:w-[30rem]  max-h-[70dvh] z-50 bg-neutral-950 shadow-large shadow-white  flex flex-col flex-1 rounded-3xl py-10 px-[2rem] gap-3 items-center">
              <h2 className="text-2xl font-bold text-white">My blogs</h2>

              <div className="flex flex-col gap-4">
                {blogs &&
                  blogs.map((blog) => (
                    <div key={blog.id} className="flex flex-col gap-2">
                      <h2 className="text-xl font-bold text-white">
                        {blog.title}
                      </h2>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
