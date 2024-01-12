"use client";

import { FC } from "react";
import CountNumber from "../CountNumber/CountNumber";

type Props = {
  heading: React.ReactNode;
  imagesSection: React.ReactNode;
};
const ClientComponent: FC<Props> = (Props) => {
  const { heading, imagesSection } = Props;
  return (
    <>
      <section className="flex px-4 items-center gap-12 container mx-auto">
        <div className="py-10 h-full">
          {heading}
          <div className="flex items-center justify-between mt-12">
            <div className="flex gap-3 flex-col items-center justify-between">
              <p className="text-xs lg:text-xl text-center">Basic Room</p>
              <CountNumber duration={4000} endvalue={100} />
            </div>
            <div className="flex gap-3 flex-col items-center justify-between">
              <p className="text-xs lg:text-xl text-center">Luxury Room</p>
              <CountNumber duration={4000} endvalue={70} />
            </div>
            <div className="flex gap-3 flex-col items-center justify-between">
              <p className="text-xs lg:text-xl text-center">Suite</p>
              <CountNumber duration={4000} endvalue={50} />
            </div>
          </div>
        </div>
        {imagesSection}
      </section>
    </>
  );
};

export default ClientComponent;
