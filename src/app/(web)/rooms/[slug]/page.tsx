"use client";

import { getRoom } from "@/libs/api";
import useSWR from "swr";
import LoadingSpinner from "../../loading";
import HotelGallery from "@/components/HotelGallery/HotelGallery";

const RoomDetails = (props: { params: { slug: string } }) => {
  const {
    params: { slug },
  } = props;

  const fetchRoom = async () => getRoom(slug);
  const { data: room, error, isLoading } = useSWR("/api/room", fetchRoom);
  // checking for error
  if (error) throw new Error("Cannot fetch data");
  //   // checking if there is no data
  if (typeof room === "undefined" && !isLoading)
    throw new Error("Cannot fetch data");

  // Returning loading if there is no data to be fetched
  if (!room) return <LoadingSpinner />;

  return (
    <>
      <div>
        <HotelGallery photos={room.images} />
      </div>
    </>
  );
};

export default RoomDetails;
