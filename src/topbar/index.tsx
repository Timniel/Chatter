import { Icon } from "@iconify/react/dist/iconify.js";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Input,
} from "@nextui-org/react";
import { UserDropdown } from "./DropdownTrigger";

export const TopBar = () => {
  return (
    <Navbar maxWidth="full" className="py-3">
      <div className="grid w-full grid-cols-4 grid-rows-1 gap-4">
        <NavbarBrand className="space-x-5">
          <p className="text-4xl font-bold text-inherit"> C</p>
          <Input
            type="text"
            placeholder="#   Explore"
            size="xs"
            variant="flat"
            className=" w-[15rem]"
          />
        </NavbarBrand>
        <NavbarContent
          className="hidden col-span-2 space-x-5 sm:flex"
          justify="center"
        >
          <NavbarItem>
            <Link color="foreground" href="#">
              <Icon
                icon="mingcute:home-4-fill"
                className="text-3xl text-neutral-100"
              />
            </Link>
          </NavbarItem>
          <NavbarItem isActive>
            <Link href="#" aria-current="page">
              {/* <Link color="foreground" href="#"> */}
              <Icon
                icon="heroicons-outline:chat"
                className="text-2xl text-neutral-500"
              />
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="#">
              {/* <Link color="foreground" href="#"> */}
              <Icon
                icon="carbon:notification"
                className="text-2xl text-neutral-500"
              />
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="#">
              {/* <Link color="foreground" href="#"> */}
              <Icon icon="ph:heart" className="text-2xl text-neutral-500" />
            </Link>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end" className="col-start-4">
          <NavbarItem className="hidden lg:flex">
            <UserDropdown />
          </NavbarItem>
          {/* <NavbarItem>
            <Button as={Link} color="primary" href="#" variant="flat">
              Sign Up
            </Button>
          </NavbarItem> */}
        </NavbarContent>
      </div>
    </Navbar>
  );
};

//  <header className="inset-x-0 z-50 h-20 border bg-neutral-500 border-slate-200">
//    <div className="container fixed flex items-center justify-between p-2 mx-auto">
//      <div className="w-1/6" /> {/* This div is acting as a spacer */}
//      <div className="flex-1 max-w-xl mx-auto">
//        {" "}
//        {/* Centered input with max-width */}
//        <Input
//          className="w-[65%] text-black"
//          icon={<Icon icon="mingcute:search-line" className="w-5 h-5" />}
//          placeholder="Search Chatter"
//        />
//      </div>
//      <div className="flex items-center space-x-2">
//        {" "}
//        {/* User profile section */}
//        <Link to="/notifications" className="block hover:text-gray-800">
//          <Icon icon="carbon:notification" className="w-6 h-6" />
//        </Link>
//        <Link
//          to="/settings"
//          className="flex items-center py-2 transition-colors duration-200 rounded-full hover:bg-gray-200"
//        >
//          <img
//            className="w-10 h-10 rounded-full"
//            src="https://dummyimage.com/500x400/000000/0011ff"
//            alt="User profile"
//          />
//        </Link>
//      </div>
//    </div>
//  </header>;
