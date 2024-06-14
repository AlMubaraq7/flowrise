"use client";
import { Content } from "@prismicio/client";
import {
  JSXMapSerializer,
  PrismicRichText,
  SliceComponentProps,
} from "@prismicio/react";
import Bounded from "@/components/Bounded";
import Heading from "@/components/Heading";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/src/ScrollTrigger";
import gsap from "gsap";

/**
 * Props for `Features`.
 */
export type FeaturesProps = SliceComponentProps<Content.FeaturesSlice>;
const components: JSXMapSerializer = {
  heading2: ({ children }) => (
    <Heading as="h2" size="md" className="text-center mb-12">
      {children}
    </Heading>
  ),
  heading3: ({ children }) => (
    <Heading
      as="h3"
      size="sm"
      className="mb-3 font-medium sm:text-left text-center"
    >
      {children}
    </Heading>
  ),
  paragraph: ({ children }) => (
    <p className="text-base font-medium font-body text-slate-600 sm:text-left text-center">
      {children}
    </p>
  ),
};
const icons = {
  calendar: <CalendarIcon />,
  bargraph: <BarGraphIcon />,
  clover: <CloverIcon />,
  hourglass: <HourGlassIcon />,
};
/**
 * Component for "Features" Slices.
 */
const Features = ({ slice }: FeaturesProps): JSX.Element => {
  const features = useRef<(HTMLDivElement | null)[]>([]);
  const heading = useRef(null);
  const box = useRef(null);
  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.from(heading.current, {
      scrollTrigger: {
        trigger: box.current,
        start: "-45%",
        end: "50%",
      },
      scale: 0,
      y: 100,
      ease: "back.inOut",
    });
    features.current.forEach((item, index) => {
      gsap.from(item, {
        scrollTrigger: {
          trigger: box.current,
          start: "-20%",
          end: "50%",
        },
        opacity: 0,
        x: -100,
        delay: 0.4 * index,
        ease: "back.inOut",
      });
    });
  });
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div ref={box} className="grid grid-cols-1 gap-16">
        <div ref={heading}>
          <PrismicRichText
            field={slice.primary.heading}
            components={components}
          />
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 max-w-5xl gap-x-8 gap-y-12 mx-auto sm:place-items-start place-items-center">
          {slice.primary.feature_box.map(
            ({ icon, title, description }, index) => (
              <div
                key={index}
                className="max-w-sm grid sm:place-items-start place-items-center"
                ref={(el) => (features.current[index] = el)}
              >
                {icon && <div className="mb-5">{icons[icon]}</div>}
                <PrismicRichText field={title} components={components} />
                <PrismicRichText field={description} components={components} />
              </div>
            )
          )}
        </div>
      </div>
    </Bounded>
  );
};

export default Features;
function CalendarIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="none">
      <path
        stroke="#0891B2"
        strokeWidth="5"
        d="M6.7 40c0-12.6 0-18.9 3.9-22.8 3.9-3.9 10.2-3.9 22.7-3.9h13.4c12.5 0 18.8 0 22.7 4 4 3.8 4 10.1 4 22.7v6.7c0 12.5 0 18.8-4 22.7-3.9 4-10.2 4-22.7 4H33.3c-12.5 0-18.8 0-22.7-4-4-3.9-4-10.2-4-22.7V40z"
      ></path>
      <path
        stroke="#0891B2"
        strokeLinecap="round"
        strokeOpacity="0.5"
        strokeWidth="5"
        d="M23.3 13.3v-5m33.4 5v-5M8.3 30h63.4"
      ></path>
      <path
        fill="#0891B2"
        d="M60 56.7a3.3 3.3 0 11-6.7 0 3.3 3.3 0 016.7 0zm0-13.4a3.3 3.3 0 11-6.7 0 3.3 3.3 0 016.7 0zM43.3 56.7a3.3 3.3 0 11-6.6 0 3.3 3.3 0 016.6 0zm0-13.4a3.3 3.3 0 11-6.6 0 3.3 3.3 0 016.6 0zM26.7 56.7a3.3 3.3 0 11-6.7 0 3.3 3.3 0 016.7 0zm0-13.4a3.3 3.3 0 11-6.7 0 3.3 3.3 0 016.7 0z"
      ></path>
    </svg>
  );
}
function BarGraphIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="none">
      <g stroke="#0891B2" strokeWidth="5" clipPath="url(#a)">
        <path strokeLinecap="round" d="M73.3 73.3H6.7"></path>
        <path
          strokeOpacity="0.5"
          d="M70 73.3v-25a5 5 0 00-5-5H55a5 5 0 00-5 5v25"
        ></path>
        <path d="M50 73.3V16.7c0-4.7 0-7.1-1.5-8.6-1.4-1.4-3.8-1.4-8.5-1.4s-7 0-8.5 1.4C30 9.6 30 12 30 16.7v56.6"></path>
        <path
          strokeOpacity="0.5"
          d="M30 73.3V31.7a5 5 0 00-5-5H15a5 5 0 00-5 5v41.6"
        ></path>
      </g>
      <defs>
        <clipPath id="a">
          <rect width="80" height="80" fill="#fff" rx="16.6"></rect>
        </clipPath>
      </defs>
    </svg>
  );
}
function CloverIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="none">
      <g stroke="#0891B2" strokeWidth="5" clipPath="url(#a)">
        <path strokeOpacity="0.5" d="M26.7 26.7h26.6v26.6H26.7V26.7z"></path>
        <path d="M53.3 53.3h10a10 10 0 11-10 10v-10zm-26.6 0h-10a10 10 0 1010 10v-10zm26.6-26.6h10a10 10 0 10-10-10v10zm-26.6 0h-10a10 10 0 1110-10v10z"></path>
      </g>
      <defs>
        <clipPath id="a">
          <rect width="80" height="80" fill="#fff" rx="16.6"></rect>
        </clipPath>
      </defs>
    </svg>
  );
}
function HourGlassIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="none">
      <g stroke="#0891B2" strokeWidth="5" clipPath="url(#a)">
        <path d="M49.9 30.2L40 40l-9.9-9.8C20.4 20.6 15.5 15.8 17 11.6l.4-1c2-4 9-4 22.7-4 13.8 0 20.7 0 22.7 4l.4 1c1.4 4.2-3.5 9-13.2 18.6z"></path>
        <path
          strokeOpacity="0.5"
          d="M30.1 49.8L40 40l9.9 9.8c9.7 9.6 14.6 14.4 13.2 18.6l-.4 1c-2 4-9 4-22.7 4-13.8 0-20.7 0-22.7-4a7 7 0 01-.4-1c-1.4-4.2 3.5-9 13.2-18.6z"
        ></path>
      </g>
      <defs>
        <clipPath id="a">
          <rect width="80" height="80" fill="#fff" rx="16.6"></rect>
        </clipPath>
      </defs>
    </svg>
  );
}
