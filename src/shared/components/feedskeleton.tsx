import { Card, CardBody } from "@nextui-org/react";

export const FeedSkeleton = () => {
  return (
    <>
      <Card className="p-2 shadow-none h-max " radius="lg">
        <CardBody className="w-full space-y-4 overflow-visible animate-pulse">
          <div className="flex justify-between ">
            <div className="flex space-x-1">
              <div className="rounded-full w-14 h-14 bg-neutral-700" />
              <div className="flex flex-col items-start mt-2 space-y-2">
                {" "}
                <div className="w-32 h-3 rounded bg-neutral-700" />
                <div className="w-20 h-3 rounded bg-neutral-700" />
              </div>
            </div>
            <div className="w-20 rounded-full h-7 bg-neutral-700" />
          </div>
          <div className="space-y-2 ">
            {" "}
            <div className="w-[80%] h-2 rounded bg-neutral-700" />
            <div className="w-[90%] h-2 rounded bg-neutral-700" />
            <div className="w-[100%] h-2 rounded bg-neutral-700" />
          </div>

          <div className="w-full h-48 rounded-lg bg-neutral-700" />
          <div className="flex items-center justify-between ">
            <div className="relative flex items-center w-20 pl-1 rounded-full h-7 bg-neutral-700">
              {" "}
              <div className="w-5 h-5 rounded-full bg-neutral-600" />
            </div>
            <div className="flex space-x-4">
              {" "}
              <div className="w-5 h-5 rounded-full bg-neutral-600" />
              <div className="w-5 h-5 rounded-full bg-neutral-600" />
              <div className="w-5 h-5 rounded-full bg-neutral-600" />
            </div>
          </div>
        </CardBody>
      </Card>{" "}
      <Card className="p-2 shadow-none h-max " radius="lg">
        <CardBody className="w-full space-y-4 overflow-visible animate-pulse">
          <div className="flex justify-between ">
            <div className="flex space-x-1">
              <div className="rounded-full w-14 h-14 bg-neutral-700" />
              <div className="flex flex-col items-start mt-2 space-y-2">
                {" "}
                <div className="w-32 h-3 rounded bg-neutral-700" />
                <div className="w-20 h-3 rounded bg-neutral-700" />
              </div>
            </div>
            <div className="w-20 rounded-full h-7 bg-neutral-700" />
          </div>
          <div className="space-y-2 ">
            {" "}
            <div className="w-[80%] h-2 rounded bg-neutral-700" />
            <div className="w-[90%] h-2 rounded bg-neutral-700" />
            <div className="w-[100%] h-2 rounded bg-neutral-700" />
          </div>

          <div className="w-full h-48 rounded-lg bg-neutral-700" />
          <div className="flex items-center justify-between ">
            <div className="relative flex items-center w-20 pl-1 rounded-full h-7 bg-neutral-700">
              {" "}
              <div className="w-5 h-5 rounded-full bg-neutral-600" />
            </div>
            <div className="flex space-x-4">
              {" "}
              <div className="w-5 h-5 rounded-full bg-neutral-600" />
              <div className="w-5 h-5 rounded-full bg-neutral-600" />
              <div className="w-5 h-5 rounded-full bg-neutral-600" />
            </div>
          </div>
        </CardBody>
      </Card>
    </>
  );
};
