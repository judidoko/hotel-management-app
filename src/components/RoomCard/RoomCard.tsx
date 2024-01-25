import { FC } from "react";
import Image from "next/image";
import { Room } from "@/models/room";
import Link from "next/link";

type Props = {
  room: Room;
};

const RoomCard: FC<Props> = (Props) => {
  const {
    room: {
      coverImage,
      name,
      price,
      discount,
      type,
      description,
      slug,
      isBooked,
    },
  } = Props;
  return (
    <>
      <div className="rounded-xl w-72 mx-auto md:mx-0 overflow-hidden text-black">
        <div className="h-60 overflow-hidden">
          <Image
            src={coverImage.url}
            alt={name}
            width={250}
            height={250}
            className="img scale-animation"
            priority
          />
        </div>
        <div className="p-4 bg-white">
          <div className="flex justify-between text-xl font-semibold">
            <p>{name}</p>
            <p>
              <span>&#8358;</span>
              {price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </p>
          </div>
          <p className="pt-2 text-xs">{type} Room</p>
          <p className="pt-3 pb-6">{description.slice(0, 90)}...</p>
          <Link
            href={`/rooms/${slug.current}`}
            className="bg-primary inline-block text-center w-full py-4 rounded-xl text-white text-xl font-bold hover:-translate-x-2 hover:shadow-lg transition-all duration-500"
          >
            {isBooked ? "BOOKED" : "BOOK NOW"}
          </Link>
        </div>
      </div>
    </>
  );
};

export default RoomCard;
