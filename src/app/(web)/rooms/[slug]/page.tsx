"use client";

import { getRoom } from "@/libs/api";
import useSWR from "swr";
import LoadingSpinner from "../../loading";
import HotelGallery from "@/components/HotelGallery/HotelGallery";
import { MdOutlineCleaningServices } from "react-icons/md";
import { LiaFireExtinguisherSolid } from "react-icons/lia";
import { AiOutlineMedicineBox } from "react-icons/ai";
import { GiSmokeBomb } from "react-icons/gi";
import BookRoomCta from "@/components/BookRoomCta/BookRoomCta";
import { useState } from "react";
import toast from "react-hot-toast";

const RoomDetails = (props: { params: { slug: string } }) => {
  const {
    params: { slug },
  } = props;

  // useState Hook
  const [checkinDate, setCheckinDate] = useState<Date | null>(null);
  const [checkoutDate, setCheckoutDate] = useState<Date | null>(null);
  const [adults, setAdults] = useState(1);
  const [noOfChildren, setNoOFChildren] = useState(0);

  // Fetching data
  const fetchRoom = async () => getRoom(slug);
  const { data: room, error, isLoading } = useSWR("/api/room", fetchRoom);
  // checking for error
  if (error) throw new Error("Cannot fetch data");
  //   // checking if there is no data
  if (typeof room === "undefined" && !isLoading)
    throw new Error("Cannot fetch data");

  // Returning loading if there is no data to be fetched
  if (!room) return <LoadingSpinner />;
  // function to calcMinCheckoutDate
  const calcMinCheckoutDate = () => {
    if (checkinDate) {
      const nextDay = new Date(checkinDate);
      nextDay.setDate(nextDay.getDate() + 1);
      return nextDay;
    }
    return null;
  };
  // function to Handle Book Room
  const handleBookNow = () => {
    if (!checkinDate || !checkoutDate)
      return toast.error("Please provide Checkin / checkout date");

    if (checkinDate > checkoutDate)
      return toast.error("Please choose a valid checkin Period");

    const numberOfDays = calcNoOfDays();

    const hotelRoomSlug = room.slug.current;

    // Integrate Stripe
  };

  const calcNoOfDays = () => {
    if (!checkinDate || !checkoutDate) return 0;
    const timeDiff = checkoutDate.getTime() - checkinDate.getTime();
    const noOfDays = Math.ceil(timeDiff / (24 * 60 * 60 * 1000));
    return noOfDays;
  };
  return (
    <>
      <div className="mt-4">
        <div>
          <h2 className="font-bold text-3xl mx-4">{room.name} Room</h2>
        </div>
        <HotelGallery photos={room.images} />
        <div className="container mx-auto mt-20">
          <div className="md:grid md:grid-cols-12 gap-10 px-3">
            <div className="md:col-span-8 md:w-full">
              <div>
                <h2 className="font-bold text-left text-lg md:text-2xl">
                  {room.name} {room.dimension}
                </h2>
                <div className="flex my-11">
                  {room.offeredAmenities.map((amenity, index) => (
                    <div
                      key={index}
                      className="md:w-44 w-fit text-center  px-2 md:px-0 h-20 md:h-40 mr-3 bg-gray-300 rounded-lg grid place-content-center "
                    >
                      <i className={`fa-solid ${amenity.icon} md:text-2xl`}></i>
                      <p className="text-xs md:text-base pt-3">
                        {amenity.amenity}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="mb-11 ">
                  <h2 className="font-bold text-3xl mb-2">DesCription</h2>
                  <p>{room.description}</p>
                </div>
                <div className="mb-11">
                  <h2 className="font-bold text-3xl mb-2">Offered Amenities</h2>
                  <div className="grid grid-cols-2">
                    {room.offeredAmenities.map((amenity, index) => (
                      <div
                        key={index}
                        className="flex items-center md:my-0 my-1"
                      >
                        <i
                          className={`fa-solid ${amenity.icon} md:text-2xl`}
                        ></i>
                        <p className="text-xs md:text-base pt-3 pl-3">
                          {amenity.amenity}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mb-11">
                  <h2 className="font-bold text-3xl mb-2 ">
                    Safety And Hygiene
                  </h2>
                  <div className="grid grid-cols-2">
                    <div className="flex items-center my-1 md:my-0">
                      <MdOutlineCleaningServices />
                      <p className="ml-2 md:text-base text-xs">Daily Cleanig</p>
                    </div>
                    <div className="flex items-center my-1 md:my-0">
                      <LiaFireExtinguisherSolid />
                      <p className="ml-2 md:text-base text-xs">
                        Fire Extinguisher
                      </p>
                    </div>
                    <div className="flex items-center my-1 md:my-0">
                      <AiOutlineMedicineBox />
                      <p className="ml-2 md:text-base text-xs">
                        Disinfections and Sterilizations
                      </p>
                    </div>
                    <div className="flex items-center my-1 md:my-0">
                      <GiSmokeBomb />
                      <p className="ml-2 md:text-base text-xs">
                        Smoke Detectors
                      </p>
                    </div>
                  </div>
                </div>
                <div className="shadow dark:shadow-white rounded-lg p-6">
                  <div className="items-center mb-4">
                    <p className="md:text-lg font-semibold">Customer Reviews</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Customres Reviews */}
                  </div>
                </div>
              </div>
            </div>
            <div className="md:col-span-4 rounded-xl shadow-lg dark:shadow dark:shadow-white sticky top-10 h-fit overflow-auto">
              <BookRoomCta
                price={room.price}
                discount={room.discount}
                specialNote={room.specialNote}
                checkinDate={checkinDate}
                setCheckinDate={setCheckinDate}
                checkoutDate={checkoutDate}
                setCheckoutDate={setCheckoutDate}
                calcMinCheckoutDate={calcMinCheckoutDate}
                adults={adults}
                noOfChildren={noOfChildren}
                setAdults={setAdults}
                setNoOfChildren={setNoOFChildren}
                isBooked={room.isBooked}
                handleBookNow={handleBookNow}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RoomDetails;
