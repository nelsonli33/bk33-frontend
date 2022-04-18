import React from "react";
import dynamic from "next/dynamic";
import { ComponentType } from "react";
import { IconName } from "types/Icon";

type Props = {
  name: IconName;
  className?: string;
  outline?: boolean;
};

const DynamicHeroIcon = ({ name, className = "", outline = false }: Props) => {
  const Icon: ComponentType<{ className: string }> = outline
    ? dynamic(() => import("@heroicons/react/outline").then((mod) => mod[name]))
    : dynamic(() => import("@heroicons/react/solid").then((mod) => mod[name]));

  return <Icon className={className} aria-hidden={true} />;
};

export default DynamicHeroIcon;
