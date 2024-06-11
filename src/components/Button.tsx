import React from "react";
import { PrismicNextLink, PrismicNextLinkProps } from "@prismicio/next";
import clsx from "clsx";

const Button = ({ className, ...restProps }: PrismicNextLinkProps) => {
  return (
    <PrismicNextLink
      className={clsx(
        "block w-fit bg-cyan-700 hover:bg-cyan-800 transition-colors duration-200 ease-in-out py-3 px-12 rounded-full font-heading text-white font-bold text-base tracking-wide",
        className
      )}
      {...restProps}
    ></PrismicNextLink>
  );
};

export default Button;
