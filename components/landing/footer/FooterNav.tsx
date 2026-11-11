import { LINK_CLASS } from "@/constants";
import { FooterNavProps } from "@/types/type";
import React from "react";

const FooterNav = ({ href, label }: FooterNavProps) => {
  return (
    <li>
      <a href={href} className={LINK_CLASS}>
        {label}
      </a>
    </li>
  );
};

export default FooterNav;
