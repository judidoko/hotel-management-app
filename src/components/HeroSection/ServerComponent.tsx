import Image from "next/image";

export const heading = (
  <>
    <h1 className="font-heading mb-4">
      Explore Our Superb Hotel;
      <br /> Most Relaxing Place
    </h1>
    <p className="text-[#4a4a4a] dark:text-[#ffffffea] mb-12 max-w-lg ">
      Enjoy Your Wonderful Holidays / Stay With a Great Luxury Experience!
    </p>
    <button className="btn-primary">Get Started</button>
  </>
);

export const imagesSection = (
  <>
    <div className="md:grid grid-cols-1 hidden gap-8 ">
      <div className="rounded-2xl overflow-hidden h-48">
        <Image
          src="/images/hotel-1.jpg"
          alt="Hotel-1"
          width={300}
          height={300}
          className="user-img scale-animation"
        />
      </div>
      <div className="grid grid-cols-2 gap-8 h-48">
        <div className="rounded-2xl overflow-hidden">
          <Image
            src="/images/hotel-2.jpg"
            alt="Hotel-2"
            width={300}
            height={300}
            className="user-img scale-animation"
          />
        </div>
        <div className="rounded-2xl overflow-hidden">
          <Image
            src="/images/hotel-3.jpg"
            alt="Hotel-3"
            width={300}
            height={300}
            className="user-img scale-animation"
          />
        </div>
      </div>
    </div>
  </>
);
