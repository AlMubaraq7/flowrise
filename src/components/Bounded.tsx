import React from "react";
import clsx from "clsx";

type BoundedProps = {
  as?: React.ElementType;
  classname?: string;
  children: React.ReactNode;
};
const Bounded = ({
  as: Comp = "section",
  classname,
  children,
  ...restProps
}: BoundedProps) => {
  return (
    <Comp
      className={clsx("px-4 md:px-6 py-10 md:py-14 lg:py-16", classname)}
      {...restProps}
    >
      <div className="mx-auto w-full max-w-6xl">{children}</div>
    </Comp>
  );
};

export default Bounded;
