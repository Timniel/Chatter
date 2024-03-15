import { Icon } from "@iconify/react/dist/iconify.js";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Input,
  Button,
} from "@nextui-org/react";
import { UserDropdown } from "./DropdownTrigger";
import { useNavigate, useLocation } from "react-router-dom";

export const TopBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Navbar maxWidth="full" className="py-3">
      <div className="grid w-full grid-cols-6 grid-rows-1 gap-4 xl:grid-cols-4">
        <NavbarBrand className="space-x-5 max-xl:col-span-1">
          <p className="text-4xl font-bold text-inherit"> C</p>
          {/* <Input
            type="text"
            placeholder="#   Explore"
            size="xs"
            variant="flat"
            className=" w-[15rem]"
          /> */}
        </NavbarBrand>
        <NavbarContent
          className="flex col-span-4 space-x-1 sm:space-x-5 xl:col-span-2"
          justify="center"
        >
          <NavbarItem isActive={location.pathname === "/app"}>
            <Link href="/app" aria-current="page">
              {/* Change icons based on the active tab */}
              <div
                className={`flex flex-col items-center space-y-1 ${
                  location.pathname === "/app" ? "text-white" : ""
                }`}
              >
                {location.pathname === "/app" ? (
                  <Icon icon="iconamoon:home-fill" className="text-3xl" />
                ) : (
                  <Icon
                    icon="iconamoon:home-duotone"
                    className="text-2xl text-neutral-500"
                  />
                )}
                <p
                  className={`text-xs max-sm:hidden  ${
                    location.pathname === "/app" ? "text-white" : ""
                  }`}
                >
                  Home
                </p>
              </div>
            </Link>
          </NavbarItem>
          <NavbarItem isActive={location.pathname === "/bookmarks"}>
            <Link href="/bookmarks">
              <div
                className={`flex flex-col items-center space-y-1 ${
                  location.pathname === "/bookmarks" ? "text-white" : ""
                }`}
              >
                {location.pathname === "/bookmarks" ? (
                  <Icon icon="tabler:bookmarks-filled" className="text-2xl" />
                ) : (
                  <Icon
                    icon="tabler:bookmarks"
                    className="text-2xl text-neutral-500"
                  />
                )}
                <p
                  className={`text-xs max-sm:hidden ${
                    location.pathname === "/bookmarks" ? "text-white" : ""
                  }`}
                >
                  Bookmarks
                </p>
              </div>
            </Link>
          </NavbarItem>
          {/* <NavbarItem>
            <Link color="foreground" href="/notifications">
              <div className="flex flex-col items-center space-y-1 ">
                <Icon
                  icon="carbon:notification"
                  className="text-2xl text-neutral-500"
                />
                <p className="text-xs max-sm:hidden ">Notifications</p>
              </div>
            </Link>
          </NavbarItem> */}
          <NavbarItem>
            {/* Change analytics icon based on the active tab */}
            <Link color="foreground" href="/analytics">
              <div
                className={`flex flex-col items-center space-y-1 ${
                  location.pathname === "/analytics" ? "text-white" : ""
                }`}
              >
                {location.pathname === "/analytics" ? (
                  <Icon
                    icon="material-symbols:analytics"
                    className="text-2xl"
                  />
                ) : (
                  <Icon
                    icon="material-symbols-light:analytics-outline"
                    className="text-2xl text-neutral-500"
                  />
                )}
                <p
                  className={`text-xs max-sm:hidden ${
                    location.pathname === "/analytics" ? "text-white" : ""
                  }`}
                >
                  Analytics
                </p>
              </div>
            </Link>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end" className="col-span-1 xl:col-start-4">
          <NavbarItem className="flex">
            <Button
              color="default"
              variant="flat"
              className="text-black bg-white"
              size="sm"
            >
              {" "}
              <Link href="/post" className="text-xs">
                Post <span className="max-sm:hidden"> a content</span>
              </Link>
            </Button>
            {/* <UserDropdown /> */}
          </NavbarItem>
        </NavbarContent>
      </div>
    </Navbar>
  );
};
