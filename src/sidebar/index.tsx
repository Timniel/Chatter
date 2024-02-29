import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import CardProfile from "./profilecard";
import { Skills } from "./skills";

export const SideBar = () => {
  return (
    <div className="space-y-4 ">
      <CardProfile />
      <Skills />
    </div>
  );
};
