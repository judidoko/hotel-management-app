"use client";

import { getRooms } from "@/libs/api";
import { Room } from "@/models/room";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import useSWR from "swr";
import Search from "@/components/Search/Search";
import RoomCard from "@/components/RoomCard/RoomCard";

const Rooms = () => {
  const [roomTypeFilter, setRoomTypeFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const searchParams = useSearchParams();

  useEffect(() => {
    const searchQuery = searchParams.get("searchQuery");
    const roomType = searchParams.get("roomType");

    if (roomType) setRoomTypeFilter(roomType);
    if (searchQuery) setSearchQuery(searchQuery);
  }, [searchParams]);

  //  Async function to call function from libs folder(used to fetch room data from sanity)
  async function fetchData() {
    return getRooms();
  }
  //   destructing some properties
  const { data, error, isLoading } = useSWR("get/hotelRooms", fetchData);
  // checking for error
  if (error) throw new Error("Cannot fetch data");
  //   // checking if there is no data
  if (typeof data === "undefined" && !isLoading)
    throw new Error("Cannot fetch data");

  const filterRooms = (rooms: Room[]) => {
    return rooms.filter((room) => {
      // Apply room type filter
      if (
        roomTypeFilter &&
        roomTypeFilter.toLowerCase() !== "all" &&
        room.type.toLowerCase() !== roomTypeFilter.toLowerCase()
      ) {
        return false;
      }
      // Applying search Query filter
      if (
        searchQuery &&
        !room.name.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }
      return true;
    });
  };
  const filteredRooms = filterRooms(data || []);

  return (
    <>
      <div className="container mx-auto pt-10">
        <Search
          roomTypeFilter={roomTypeFilter}
          searchQuery={searchQuery}
          setRoomTypeFilter={setRoomTypeFilter}
          setSearchQuery={setSearchQuery}
        />
        <div className="flex mt-20 justify-between flex-wrap">
          {filteredRooms.map((room) => (
            <RoomCard key={room._id} room={room} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Rooms;
