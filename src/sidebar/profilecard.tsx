import {
  Card,
  CardHeader,
  CardBody,
  Image,
  Divider,
  Button,
  Link,
} from "@nextui-org/react";
import { useSelector } from "react-redux";
import { RootState } from "../store/rootReducer";
import client from "../services/client";

export default function CardProfile() {
  const { userData } = useSelector((state: RootState) => state.auth);
  if (!userData) {
    return;
  }
  return (
    <Card className="py-0 pb-1 shadow-none h-max b bg-neutral-900" radius="lg">
      <CardHeader className="relative flex-col w-full px-0 pt-0 pb-0">
        {/* Inline styles to control sizing */}
        <div className="w-full overflow-hidden h-[7rem] max-h-[8rem] rounded-t-xl  bg-neutral-900"></div>
        <Divider my-4 />
        <div className="absolute top-[4rem] z-60">
          {userData.avatar ? (
            <Image
              className="object-cover w-[6rem] bg-black rounded-3xl  h-[6rem] border-3 border-neutral-400"
              src={`${client.baseUrl}api/files/users/${userData.id}/${userData.avatar}`}
            />
          ) : (
            <div className="flex items-center justify-center wobject-cover w-[6rem]   h-[6rem] border-3 border-neutral-400 bg-white rounded-full">
              <p className="text-5xl font-bold text-black uppercase">
                {userData.name.charAt(0)}
              </p>
            </div>
          )}
        </div>
      </CardHeader>

      <CardBody className="py-2 space-y-4 overflow-visible">
        {" "}
        <div className="mt-12 text-center ">
          <h2 className="">{userData.name}</h2>
          <p className="text-xs font-light tracking-wider text-neutral-400">
            @{userData.username}
          </p>
        </div>
        <p className="px-4 text-xs font-normal text-center">{userData.bio}</p>{" "}
        <Divider className="my-4" />{" "}
        <Button variant="flat" className="">
          <Link href="/myprofile" className="">
            My Profile{" "}
          </Link>
        </Button>
      </CardBody>
    </Card>
  );
}
