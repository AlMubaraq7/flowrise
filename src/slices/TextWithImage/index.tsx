"use client";
import { Content } from "@prismicio/client";
import {
  JSXMapSerializer,
  PrismicRichText,
  SliceComponentProps,
} from "@prismicio/react";
import Bounded from "@/components/Bounded";
import Heading from "@/components/Heading";
import { PrismicNextImage } from "@prismicio/next";
import clsx from "clsx";
import gsap from "gsap";
import ScrollTrigger from "gsap/src/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

/**
 * Props for `TextWithImage`.
 */
export type TextWithImageProps =
  SliceComponentProps<Content.TextWithImageSlice>;
const components: JSXMapSerializer = {
  heading2: ({ children }) => (
    <Heading as="h2" size="lg" className="">
      {children}
    </Heading>
  ),
  paragraph: ({ children }) => (
    <p className="font-body text-slate-600 mb-8">{children}</p>
  ),
};
/**
 * Component for "TextWithImage" Slices.
 */
const TextWithImage = ({ slice }: TextWithImageProps): JSX.Element => {
  const box = useRef(null);
  const image = useRef(null);
  const text = useRef(null);

  useGSAP(() => {
    gsap.from(image.current, {
      scrollTrigger: {
        trigger: box.current,
        start: "-75%",
        end: "20%",
        scrub: true,
      },
      scale: 0,
      x: slice.variation === "default" ? -100 : 100,
      ease: "rough",
    });
    gsap.from(text.current, {
      scrollTrigger: {
        trigger: box.current,
        start: "-75%",
        end: "30%",
        scrub: true,
      },
      scale: 0,
      x: slice.variation === "default" ? 100 : -100,
      ease: "rough",
    });
  });
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div
        className="grid gap-8 md:gap-24 md:grid-cols-2 place-items-center md:max-w-4xl mx-auto"
        ref={box}
      >
        <div ref={image} className={clsx(slice.variation === "imageRight" && "md:order-2")}>
          <PrismicNextImage
            field={slice.primary.image}
            className={clsx(
              "rounded-lg ",
            )}
          />
        </div>
        <div className="grid gap-4 place-items-center" ref={text}>
          <PrismicRichText
            field={slice.primary.heading}
            components={components}
          />
          <PrismicRichText field={slice.primary.body} components={components} />
        </div>
      </div>
    </Bounded>
  );
};

export default TextWithImage;
