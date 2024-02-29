import { Icon } from "@iconify/react/dist/iconify.js";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Chip,
  Divider,
  Image,
  Input,
  User,
} from "@nextui-org/react";

export const Feed = () => {
  return (
    <Card
      className="p-2  h-max !bg-none bg-transparent border-1 border-neutral-800 "
      radius="lg"
    >
      <CardBody className="w-full space-y-4 overflow-visible">
        <div className="flex items-center justify-between space-x-1">
          <User
            as="button"
            avatarProps={{
              isBordered: true,
              src: "https://i.pravatar.cc/150",
            }}
            className="transition-transform"
            description="@tonyreichert"
            name="Tony Reichert"
          />{" "}
          <Chip color="default" variant="dot" className="text-xs ">
            1 hr ago
          </Chip>
        </div>
        <h2 className="text-3xl line-clamp-1">
          Starting out as a Product designer
        </h2>
        <p className="text-sm font-light text-neutral-100 ">
          <span className=" line-clamp-2">
            Embarking on a journey as a product designer can be an exhilarating
            and fulfilling experience. As a profession that bridges the realms
            of art, technology, and problem-solving, product design offers an
            opportunity to shape the way people interact with the world around
            them.
          </span>{" "}
          <span className="text-blue-500 ">Read more</span>
        </p>

        <div className="h-40 overflow-hidden ">
          <Image
            className="w-full rounded-sm o"
            src="https://e1.pxfuel.com/desktop-wallpaper/402/584/desktop-wallpaper-om-jai-shri-ram-beautiful-lord-rama-beautiful-jai-shree-ram.jpg"
            alt="User profile"
            // width="100%"
            // height="100%"
          />
        </div>
        <div className="flex space-x-4 ">
          <div className="flex">
            <Icon className="w-10 h-6 font-bold" icon="flat-color-icons:like" />{" "}
            <p className="text-xs text-neutral-400">120</p>
          </div>
          <div className="flex">
            <Icon
              className="w-10 h-6 font-bold"
              icon="fluent:chat-multiple-24-regular"
            />{" "}
            <p className="text-xs text-neutral-400">200</p>
          </div>

          <div className="flex">
            <Icon
              className="w-10 h-6 font-bold"
              icon="material-symbols-light:analytics-outline"
            />{" "}
            <p className="text-xs text-neutral-400">2980 veiws</p>
          </div>
        </div>
        <Divider className="my-4" />
        <div className="flex items-center w-full space-x-3 ">
          <div className="self-start ">
            <Image
              alt="Card background"
              src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
              className="object-cover bg-black rounded-full  h-[3rem] border-2 border-neutral-500 "
              isBlurred
            />
          </div>
          <div className="flex flex-col flex-1 w-full space-y-4">
            <Input
              variant="flat"
              size="xs"
              type="email"
              placeholder="Write your comment"
              //   endContent={
              //     <Icon
              //       icon="heroicons:photo-16-solid"
              //       className="text-lg text-neutral-400"
              //     />
              //   }
              className=""
            />{" "}
            {/* <div className="flex justify-between">
              <div>
                <Button
                  color="default"
                  variant="flat"
                  className=""
                  size="sm"
                  startContent={
                    <Icon
                      icon="heroicons:photo-16-solid"
                      className="text-lg text-neutral-100"
                    />
                  }
                >
                  Photo
                </Button>{" "}
                <Button
                  color="default"
                  variant="flat"
                  size="sm"
                  className=""
                  startContent={
                    <Icon
                      icon="heroicons:photo-16-solid"
                      className="text-lg text-neutral-100"
                    />
                  }
                >
                  Video
                </Button>
              </div>
              <Button
                color="default"
                variant="flat"
                className="text-black bg-white"
                size="sm"
              >
                Post
              </Button>{" "}
            </div> */}
          </div>
        </div>
      </CardBody>
    </Card>
  );
};
