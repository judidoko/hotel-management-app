"use client";

import { Children, Dispatch, FC, SetStateAction } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type Props = {
  checkinDate: Date | null;
  setCheckinDate: Dispatch<SetStateAction<Date | null>>;
  checkoutDate: Date | null;
  setCheckoutDate: Dispatch<SetStateAction<Date | null>>;
  setNoOfChildren: Dispatch<SetStateAction<number>>;
  setAdults: Dispatch<SetStateAction<number>>;
  calcMinCheckoutDate: () => Date | null;
  price: number;
  discount: number;
  specialNote: string;
  adults: number;
  noOfChildren: number;
  isBooked: boolean;
  handleBookNow: () => void;
};

const BookRoomCta: FC<Props> = (props) => {
  const {
    price,
    discount,
    specialNote,
    checkinDate,
    setCheckinDate,
    checkoutDate,
    setCheckoutDate,
    calcMinCheckoutDate,
    setAdults,
    setNoOfChildren,
    adults,
    noOfChildren,
    isBooked,
    handleBookNow,
  } = props;

  //   Calc discountedprice
  const discountedPrice = price - discount;

  // Function to calc the number of days
  const calcNoOfDays = () => {
    if (!checkinDate || !checkoutDate) return 0;
    const timeDiff = checkoutDate.getTime() - checkinDate.getTime();
    const noOfDays = Math.ceil(timeDiff / (24 * 60 * 60 * 1000));
    return noOfDays;
  };

  return (
    <>
      <div className="px-7 py-6">
        <h3>
          <span
            className={`${discount ? "text-gray-300" : ""} font-bold text-xl`}
          >
            <span>&#8358;</span>{" "}
            {price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
          </span>
          {discount ? (
            <span className="font-bold text-xl">
              | discount{" "}
              <span className=" text-red-600 line-through">
                {" "}
                <span>&#8358;</span>
                {discount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </span>
              <br />
              Now{" "}
              <span>
                <span>&#8358;</span>
                {discountedPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </span>
            </span>
          ) : (
            ""
          )}
        </h3>
        <div className="w-full border-b-2 border-b-secondary my-2" />
        <h4 className="my-8">{specialNote}</h4>
        <div className="flex">
          <div className="w-1/2 pr-2">
            <label
              htmlFor="check-in-date"
              className="block text-medium text-gray-900 dark:text-gray-400"
            >
              Check In date
            </label>
            <DatePicker
              selected={checkinDate}
              onChange={(date) => setCheckinDate(date)}
              dateFormat="dd/MM/yyyy"
              minDate={new Date()}
              id="check-in-date"
              className="w-full border text-black border-gray-300 rounnded-lg p-2.5 focus:ring-primary focus:border-primary "
            />
          </div>
          <div className="w-1/2 pl-2">
            <label
              htmlFor="check-out-date"
              className="block text-medium text-gray-900 dark:text-gray-400"
            >
              Check out date
            </label>
            <DatePicker
              selected={checkoutDate}
              onChange={(date) => setCheckoutDate(date)}
              dateFormat="dd/MM/yyyy"
              disabled={!checkinDate}
              minDate={calcMinCheckoutDate()}
              id="check-out-date"
              className="w-full border text-black border-gray-300 rounnded-lg p-2.5 focus:ring-primary focus:border-primary "
            />
          </div>
        </div>
        <div className="flex mt-4">
          <div className="w-1/2 pr-2">
            <label
              htmlFor="adults"
              className="block text-sm font-medium text-gray-900 dark:text-gray-400"
            >
              Adults
            </label>
            <input
              type="number"
              value={adults}
              id="adults"
              onChange={(e) => setAdults(+e.target.value)}
              min={1}
              max={5}
              className="w-full border border-gray-300 rounded-lg p-2.5"
            />
          </div>
          <div className="w-1/2 pl-2">
            <label
              htmlFor="children"
              className="block text-sm font-medium text-gray-900 dark:text-gray-400"
            >
              Children
            </label>
            <input
              type="number"
              value={noOfChildren}
              id="children"
              onChange={(e) => setNoOfChildren(+e.target.value)}
              min={0}
              max={4}
              className="w-full border border-gray-300 rounded-lg p-2.5"
            />
          </div>
        </div>
        <p className="my-3">
          You are booking for : {calcNoOfDays()}{" "}
          <span>{calcNoOfDays() > 1 ? "days" : "day"}</span>
        </p>
        {calcNoOfDays() > 0 ? (
          <p className="mt-3 font-bold">
            Total Price: <span>&#8358;</span>
            {calcNoOfDays() * discountedPrice}
          </p>
        ) : (
          <></>
        )}
        <button
          disabled={isBooked}
          onClick={handleBookNow}
          className="btn-primary w-full mt-6 disabled:bg-gray-500 disabled:cursor-not-allowed"
        >
          {isBooked ? "Booked" : "Book NOw"}
        </button>
      </div>
    </>
  );
};

export default BookRoomCta;
