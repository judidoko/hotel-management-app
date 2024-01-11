import Image from "next/image";

const HeroSection = () => {
  return (
    <>
      <section className="flex px-4 items-center gap-12 container mx-auto">
        <div className="py-10 h-full">
          <h1 className="font-heading mb-4">
            Explore Our Superb Hotel;
            <br /> Most Relaxing Place
          </h1>
          <p className="text-[#4a4a4a] dark:text-[#ffffffea] mb-12 max-w-lg ">
            Enjoy Your Wonderful Holidays / Stay With a Great Luxury Experience!
          </p>
          <button className="btn-primary">Get Started</button>
          <div className="flex items-center justify-between mt-12">
            <div className="flex gap-3 flex-col items-center justify-between">
              <p className="text-xs lg:text-xl text-center">Basic Room</p>
              <p className="md:font-bold font-medium text-lg xl:text-5xl">
                +20
              </p>
            </div>
            <div className="flex gap-3 flex-col items-center justify-between">
              <p className="text-xs lg:text-xl text-center">Luxury Room</p>
              <p className="md:font-bold font-medium text-lg xl:text-5xl">
                +20
              </p>
            </div>
            <div className="flex gap-3 flex-col items-center justify-between">
              <p className="text-xs lg:text-xl text-center">Suite</p>
              <p className="md:font-bold font-medium text-lg xl:text-5xl">
                +20
              </p>
            </div>
          </div>
        </div>
        <div className="md:grid grid-cols-1 hidden gap-8 ">
          <div className="rounded-2xl overflow-hidden h-48">
            <Image
              src=""
              alt=""
              width={300}
              height={300}
              className="user-img scale-animation"
            />
          </div>
          <div className="grid grid-cols-2 gap-8 h-48">
            <div className="rounded-2xl overflow-hidden">
              <Image
                src=""
                alt=""
                width={300}
                height={300}
                className="user-img scale-animation"
              />
            </div>
            <div className="rounded-2xl overflow-hidden">
              <Image
                src=""
                alt=""
                width={300}
                height={300}
                className="user-img scale-animation"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
