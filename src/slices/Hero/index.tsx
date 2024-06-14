"use client";
import { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import {
  JSXMapSerializer,
  PrismicRichText,
  SliceComponentProps,
} from "@prismicio/react";
import Bounded from "@/components/Bounded";
import Button from "@/components/Button";
import Heading from "@/components/Heading";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/src/ScrollTrigger";
/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>;

const Hero = ({ slice }: HeroProps): JSX.Element => {
  const heading = useRef(null);
  const body = useRef(null);
  const button = useRef(null);
  const image = useRef(null);
  const box = useRef(null);
  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);
      if (slice.variation === "default") {
        gsap
          .timeline()
          .from(heading.current, {
            scale: 0,
            opacity: 0,
            y: 100,
            ease: "back.out",
          })
          .from(body.current, {
            scale: 0,
            opacity: 0,
            y: 100,
            ease: "power1.inOut",
          })
          .from(button.current, {
            scale: 0,
            opacity: 0,
            y: 100,
          })
          .from(image.current, {
            scrollTrigger: {
              trigger: box.current,
              start: "25% center",
              end: "75% 75%",
              scrub: true,
            },
            scale: 0,
            opacity: 0,
            ease: "power1.out",
          });
      }
    },
    { revertOnUpdate: true }
  );

  /**
   * Component for "Hero" Slices.
   */

  const components: JSXMapSerializer = {
    heading1: ({ children }) => (
      <Heading
        as="h1"
        size="xl"
        className="mb-4 md:mb-8 mt-12 first:mt-0 last:mb-0"
      >
        {children}
      </Heading>
    ),
    paragraph: ({ children }) => (
      <p
        className=" text-2xl font-body font-normal leading-10 text-slate-600 text-balance mb-4 md:mb-8 max-w-md"
        ref={body}
      >
        {children}
      </p>
    ),
  };
  return (
    <>
      {slice.variation === "default" && (
        <Bounded
          data-slice-type={slice.slice_type}
          data-slice-variation={slice.variation}
        >
          <div
            className="grid grid-cols-1 place-items-center text-center"
            ref={box}
          >
            <div ref={heading} className="mb-4">
              <PrismicRichText
                field={slice.primary.heading}
                components={components}
              />
            </div>
            <PrismicRichText
              field={slice.primary.body}
              components={components}
            />
            <div ref={button}>
              <Button
                field={slice.primary.button_link}
                className="mb-8 md:mb-10"
              >
                {slice.primary.button_text}
              </Button>
            </div>
            <div ref={image}>
              <PrismicNextImage
                field={slice.primary.image}
                className="drop-shadow-xl max-w-4xl w-full"
              />
            </div>
          </div>
        </Bounded>
      )}

      {slice.variation === "horizontal" && (
        <Bounded
          data-slice-type={slice.slice_type}
          data-slice-variation={slice.variation}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 place-items-center ">
            <div className="grid grid-rows-[1fr,auto,auto] h-fit">
              <PrismicRichText
                field={slice.primary.heading}
                components={components}
              />
              <PrismicRichText
                field={slice.primary.body}
                components={components}
              />
              <Button
                field={slice.primary.button_link}
                className="mb-8 md:mb-10"
              >
                {slice.primary.button_text}
              </Button>
            </div>
            <PrismicNextImage
              field={slice.primary.image}
              className="drop-shadow-xl max-w-4xl w-full"
            />
          </div>
        </Bounded>
      )}
    </>
  );
};
export default Hero;
