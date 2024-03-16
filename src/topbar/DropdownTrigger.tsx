import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  User,
  Image,
} from "@nextui-org/react";
import { useSelector } from "react-redux";
import { RootState } from "../store/rootReducer";
import client from "../services/client";
import { useNavigate } from "react-router-dom";

export const UserDropdown = () => {
  const { userData } = useSelector((state: RootState) => state.auth);
  if (!userData) {
    return;
  }
  const navigate = useNavigate();
  const logOut = () => {
    client.authStore.clear();
    navigate(`/signin`);
  };
  console.log(userData.name.charAt(0));
  return (
    <div className="flex items-center h-full gap-4">
      <Dropdown
        placement="bottom-start"
        classNames={{
          content: "bg-neutral-900  text-white hover:text-white   ",
        }}
      >
        <DropdownTrigger className="">
          <div className="w-10 h-10 rounded-full ">
            {userData.avatar ? (
              <Image
                className="object-cover w-10 h-10 "
                src={`${client.baseUrl}api/files/users/${userData.id}/${userData.avatar}`}
              />
            ) : (
              <div className="flex items-center justify-center w-10 h-10 bg-white rounded-full">
                <p className="text-lg font-bold text-black uppercase">
                  {userData.name.charAt(0)}
                </p>
              </div>
            )}
          </div>
        </DropdownTrigger>
        <DropdownMenu aria-label="User Actions" variant="flat">
          <DropdownItem key="profile" className="gap-2 h-14">
            <p className="font-bold">Signed in as</p>
            <p className="font-bold">@{userData.username}</p>
          </DropdownItem>
          <DropdownItem key="profile" onClick={() => navigate("/myprofile")}>
            My Profile
          </DropdownItem>
          {/* <DropdownItem key="settings">My Settings</DropdownItem> */}
          {/* <DropdownItem key="team_settings">Team Settings</DropdownItem>
          <DropdownItem key="analytics">Analytics</DropdownItem>
          <DropdownItem key="system">System</DropdownItem>
          <DropdownItem key="configurations">Configurations</DropdownItem>
          <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem> */}
          <DropdownItem key="logout" color="danger" onClick={() => logOut()}>
            Log Out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};
