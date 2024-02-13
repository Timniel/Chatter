import React from "react";
import { Icon as Icons } from "@iconify/react";

export interface IconsProps {
  icon: string;
  className?: string;
  width?: string | number;
  rotate?: number;
  hFlip?: boolean;
  vFlip?: boolean;
  onClick?: () => void;
}

const Icon: React.FC<IconsProps> = ({
  icon,
  className,
  width,
  rotate,
  hFlip,
  vFlip,
  onClick,
}) => {
  return (
    <>
      <Icons
        width={width}
        rotate={rotate}
        hFlip={hFlip}
        icon={`${icon}`}
        className={className}
        vFlip={vFlip}
        onClick={onClick}
      />
    </>
  );
};

export default Icon;
