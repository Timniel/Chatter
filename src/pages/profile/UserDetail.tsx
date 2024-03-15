import React, { useState } from "react";

import {
  Button,
  Image,
  Input,
  Skeleton,
  Spinner,
  Textarea,
} from "@nextui-org/react";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/rootReducer";
import client from "../../services/client";
import { refreshAuthData } from "../../auth/authSlice";
import { AppDispatch } from "../../store";

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

  const [isloading, setIsloading] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  // const navigate = useNavigate();
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
    dispatch(refreshAuthData());
  };

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

  // const logOut = () => {
  //   client.authStore.clear();
  //   navigate(`/login`);
  // };
  return (
    <div className="flex flex-col justify-center h-full gap-6 p-5 max-lg:items-center">
      <>
        {!editMode ? (
          <div className="flex flex-col items-start gap-5">
            {!profileData ? (
              <Skeleton className="flex w-20 h-20 rounded-xl" />
            ) : (
              <>
                {profileData.avatar ? (
                  <Image
                    className="w-40 h-40"
                    src={`${client.baseUrl}api/files/users/${profileData.id}/${profileData.avatar}`}
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
                  <span className="text-gray-200 mr-4 max-w-[5rem] min-w-[5rem] inline-block">
                    Username:
                  </span>
                  {!profileData ? (
                    <Skeleton className="inline-block w-20 h-4 rounded-xl" />
                  ) : (
                    <span className=" max-w-20 text-gray-300 mr-4 min-w-[4rem] inline-block">
                      {profileData.username}
                    </span>
                  )}
                </p>
                <p className="text-sm font-bold">
                  <span className="text-gray-200 mr-4 max-w-[5rem] min-w-[5rem] inline-block">
                    Bio:
                  </span>
                  {!profileData ? (
                    <Skeleton className=" rounded-xl w-[7.5rem] sm:w-40 h-4 inline-block" />
                  ) : (
                    <span className=" text-gray-300 min-w-[4rem] inline-block">
                      {profileData.bio}
                    </span>
                  )}
                </p>
                <p className="text-sm font-bold">
                  <span className="text-gray-200 mr-4 max-w-[5rem] min-w-[5rem] inline-block">
                    Email:
                  </span>
                  {!profileData ? (
                    <Skeleton className=" rounded-xl w-[7.5rem] sm:w-40 h-4 inline-block" />
                  ) : (
                    <span className=" text-gray-300 min-w-[4rem] inline-block">
                      {profileData.email}
                    </span>
                  )}
                </p>
              </div>
              <div className="flex gap-5 font-semibold">
                <Button
                  type="submit"
                  color="default"
                  variant="flat"
                  className={` rounded-md  ${
                    isloading ? "bg-neutral-950" : "bg-white text-black"
                  } `}
                  onClick={() => setEditMode(true)}
                >
                  {!isloading ? `Edit` : <Spinner />}
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <form onSubmit={handleFormSubmit}>
            <div className="flex flex-col items-center w-full gap-2 px-2 sm:px-0">
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
                        src={`${client.baseUrl}api/files/users/${profileData.id}/${profileData.avatar}`}
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
              </div>{" "}
              <div>
                <p className="flex gap-6 text-base font-bold ">
                  <label htmlFor="name" className="w-[8rem]">
                    bio:
                  </label>
                  <Textarea
                    type="text"
                    id="bio"
                    size="sm"
                    name="bio"
                    value={profileData.bio}
                    className="w-[10rem]"
                    onChange={handleInputChange}
                  />
                </p>
              </div>
              <div className="self-end">
                <Button
                  type="submit"
                  color="default"
                  variant="flat"
                  className={` ${
                    isloading ? "bg-neutral-950" : "bg-white text-black"
                  } `}
                >
                  {!isloading ? `Save` : <Spinner color="warning" />}
                </Button>
              </div>
            </div>
          </form>
        )}
      </>
    </div>
  );
};
