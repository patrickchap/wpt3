import { type NextPage } from "next";
import Image, { type StaticImageData } from "next/image";
import rings from "/public/images/RINGS.svg";
import drink from "/public/images/CHAMPAGNE.svg";
import eat from "/public/images/CUTLERY.svg";
import party from "/public/images/MUSIC.svg";

export default function Events() {
  return (
    <main>
      <h1 className="mb-8 mt-8 text-center text-3xl font-bold text-primary">Welcome Party August 8th, 2024</h1>
      <div className="flex flex-col items-center">
        <div className="w-2/3 md:w-1/3 pb-10">
          <p className="pb-8 md:pb-4">We would like to invite you all to join us at Bar One.</p>
          <p className="pb-8 md:pb-4">Come celebrate with us and enjoy an evening of fun, food, and drinks!</p>
          <p className="pb-8 md:pb-4">Date: August 8th, 2024</p>
          <p className="pb-8 md:pb-4">Time: 5:00 PM - 10:00 PM</p>
          <p className="pb-8 md:pb-4">Location: Bar One, 1990 Olympic Vly Rd, Tahoe City, CA 96145</p>
          <p className="pb-8 md:pb-4">Dress Code: Dressy Casual</p>
        </div>
      </div>
      <h1 className="mb-8 mt-8 text-center text-3xl font-bold text-primary">Ceremony August 9th, 2024</h1>
      <Timeline />
    </main>
  );
}

import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";

const Icon: NextPage<{ src: StaticImageData; alt: string }> = ({
  src,
  alt,
}) => {
  return (
    <Image
      src={src}
      className="item-center img-darker"
      alt={`@${alt}'s icon`}
      width={60}
      height={60}
    />
  );
};
const Timeline = () => {
  return (
    <VerticalTimeline>
      <VerticalTimelineElement
        className="vertical-timeline-element--work"
        contentArrowStyle={{
          borderRight: "7px solid rgba(130, 194, 191, 0.1)",
        }}
        date="4:00 - 4:30 PM"
        iconStyle={{
          background: "#f7ebec",
          color: "#d69b9f",
          border: "2px solid #192841",
          boxShadow: "none",
        }}
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        icon={<Icon src={rings} alt={"ceremony"} />}
      >
        <h3 className="vertical-timeline-element-title color-secondary text-2xl">
          WE DO
        </h3>
        <h5 className="vertical-timeline-element-subtitle font-gray-500 pt-2">
          Ceremony
        </h5>
      </VerticalTimelineElement>
      <VerticalTimelineElement
        className="vertical-timeline-element--work"
        contentArrowStyle={{
          borderRight: "7px solid rgba(130, 194, 191, 0.1)",
        }}
        date="4:30 - 5:30 PM"
        iconStyle={{
          background: "#f7ebec",
          color: "#d69b9f",
          border: "2px solid #192841",
          boxShadow: "none",
        }}
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        icon={<Icon src={drink} alt={"drink"} />}
      >
        <h3 className="vertical-timeline-element-title color-secondary text-2xl">
          We Drink
        </h3>
        <h5 className="vertical-timeline-element-subtitle font-gray-500 pt-2">
          Cocktail Hour
        </h5>
      </VerticalTimelineElement>
      <VerticalTimelineElement
        className="vertical-timeline-element--work"
        contentArrowStyle={{
          borderRight: "7px solid rgba(130, 194, 191, 0.1)",
        }}
        date="5:50 - 7:45 PM"
        iconStyle={{
          background: "#f7ebec",
          color: "#d69b9f",
          border: "2px solid #192841",
          boxShadow: "none",
        }}
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        icon={<Icon src={eat} alt={"eat"} />}
      >
        <h3 className="vertical-timeline-element-title color-secondary text-2xl">
          WE EAT
        </h3>
        <h5 className="vertical-timeline-element-subtitle font-gray-500 pt-2">
          Dinner & Speeches
        </h5>
      </VerticalTimelineElement>
      <VerticalTimelineElement
        className="vertical-timeline-element--work"
        contentArrowStyle={{
          borderRight: "7px solid rgba(130, 194, 191, 0.1)",
        }}
        date="7:45 - 10:00 PM"
        iconStyle={{
          background: "#f7ebec",
          color: "#d69b9f",
          border: "2px solid #192841",
          boxShadow: "none",
        }}
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        icon={<Icon src={party} alt={"party"} />}
      >
        <h3 className="vertical-timeline-element-title color-secondary text-2xl">
          WE PARTY
        </h3>
        <h5 className="vertical-timeline-element-subtitle font-gray-500 pt-2">
          Drinks & Dancing
        </h5>
      </VerticalTimelineElement>
    </VerticalTimeline>
  );
};
