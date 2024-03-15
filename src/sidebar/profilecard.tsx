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

export default function CardProfile() {
  const { userData } = useSelector((state: RootState) => state.auth);
  if (!userData) {
    return;
  }
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
            src={`https://pocketbase-production-60f6.up.railway.app/api/files/users/${userData.id}/${userData.avatar}`}
            className="object-cover w-[6rem] bg-black rounded-3xl  h-[6rem] border-3 border-neutral-400"
            isBlurred
          />
        </div>

        {/* <p className="font-bold uppercase text-tiny">Daily Mix</p>
        <small className="text-default-500">12 Tracks</small>
        <h4 className="font-bold text-large">Frontend Radio</h4> */}
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
        <Button color="default" variant="flat" className="">
          <Link href="/myprofile" className="">
            My Profile{" "}
          </Link>
        </Button>
      </CardBody>
    </Card>
  );
}
