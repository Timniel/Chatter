import { Button, Link } from "@nextui-org/react";

export const ProfileButton = () => {
  return (
    <Button variant="flat" className="">
      <Link href="/myprofile" className="">
        My Profile
      </Link>
    </Button>
  );
};
