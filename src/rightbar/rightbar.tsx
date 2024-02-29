import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import { Activity } from "./activity";

export const RightBar = () => {
  return (
    <div className="h-full space-y-4">
      <Activity />
    </div>
  );
};
