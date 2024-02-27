import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Image,
  Divider,
  Button,
} from "@nextui-org/react";

export default function CardProfile() {
  return (
    <Card
      className="py-0 pb-1 h-max !bg-none bg-transparent border-1 border-neutral-800 "
      radius="lg"
    >
      <CardHeader className="relative flex-col w-full px-0 pt-0 pb-0">
        {/* Inline styles to control sizing */}
        <div className="w-full overflow-hidden h-[7rem] max-h-[8rem] rounded-t-xl  bg-neutral-900">
          <div className="absolute z-50 bg-black"></div>
        </div>
        <div className="absolute top-[4rem] z-60">
          <Image
            alt="Card background"
            src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
            className="object-cover bg-black rounded-3xl  h-[6rem] border-3 border-neutral-500"
            isBlurred
          />
        </div>

        {/* <p className="font-bold uppercase text-tiny">Daily Mix</p>
        <small className="text-default-500">12 Tracks</small>
        <h4 className="font-bold text-large">Frontend Radio</h4> */}
      </CardHeader>

      <CardBody className="py-2 space-y-4 overflow-visible">
        {" "}
        <div className="flex justify-between px-2 text-center">
          <div className="flex flex-col text-center">
            <p>1,000</p>
            <p className="text-xs font-normal text-neutral-400">Followers</p>
          </div>
          <div className="flex flex-col ">
            <p>100</p>
            <p className="text-xs font-normal text-neutral-400">Following</p>
          </div>
        </div>
        <div className="text-center ">
          <h2 className="">John Doe</h2>
          <p className="text-xs font-light tracking-wider text-neutral-400">
            @johndoe
          </p>
        </div>
        <p className="px-4 text-xs font-normal text-center">
          I'm a writer, Motivational speaker, Ted Talker and a Bookseller.
        </p>{" "}
        <Divider className="my-4" />
        <Button color="default" variant="flat" className="">
          My Profile
        </Button>
      </CardBody>
    </Card>
  );
}
