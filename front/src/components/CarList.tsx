"use client";
import React from "react";
import { NativeSelect, Input, Modal, Group, Button } from "@mantine/core";
import { BiSearchAlt } from "react-icons/bi";
import { AiOutlineHeart } from "react-icons/ai";
import useSWR from "swr";
import Metadata from "@/context/Metadata.json";
import { TPostMetadata } from "@/global/types";
import Image from "next/image";
import Car from "@/assets/default_car.jpg";
import CarListItemModal from "@/modals/CarListItemModal";
const country = [
  "Casablanca",
  "Rabat",
  "Marrakesh",
  "Fez",
  "Tanger",
  "Agadir",
  "Meknes",
  "Oujda",
  "Kenitra",
  "Nador",
  "Safi",
  "Mohammedia",
  "El Jadida",
  "Essaouira",
  "Tetouan",
  "Ifrane",
  "Dakhla",
  "Berrechid",
  "Settat",
  "Khouribga",
  "Beni Mellal",
  "Azrou",
  "Taza",
  "Taroudant",
  "Larache",
];
const SearchBar = () => {
  return (
    <div className="w-full h-40 bg-white shadow-lg rounded-lg">
      <div className="flex justify-center flex-row items-center w-full h-full">
        <div className="flex">
          <Input
            icon={<BiSearchAlt />}
            placeholder="Search For a Car"
            size="lg"
            className="w-2/3"
          />
          <NativeSelect data={country} size="lg" withAsterisk />
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

const CarListItem = ({
  metadata,
  onClick,
}: {
  metadata: TPostMetadata;
  onClick: () => void;
}) => {
  const relativeTimeFormat = new Intl.RelativeTimeFormat("en", {
    numeric: "auto",
  });
  const createdAt = new Date(metadata.created_at);
  const currentTime = new Date();
  const timeDifference = currentTime.getTime() - createdAt.getTime();
  const timeDifferenceInSeconds = timeDifference / 1000;
  const timeDifferenceInMinutes = timeDifferenceInSeconds / 60;
  const timeDifferenceInHours = timeDifferenceInMinutes / 60;
  const timeDifferenceInDays = timeDifferenceInHours / 24;

  let timeDifferenceString;
  if (timeDifferenceInDays >= 1) {
    timeDifferenceString = relativeTimeFormat.format(
      -Math.round(timeDifferenceInDays),
      "day"
    );
  } else if (timeDifferenceInHours >= 1) {
    timeDifferenceString = relativeTimeFormat.format(
      -Math.round(timeDifferenceInHours),
      "hour"
    );
  } else if (timeDifferenceInMinutes >= 1) {
    timeDifferenceString = relativeTimeFormat.format(
      -Math.round(timeDifferenceInMinutes),
      "minute"
    );
  } else {
    timeDifferenceString = relativeTimeFormat.format(
      -Math.round(timeDifferenceInSeconds),
      "second"
    );
  }
  return (
    <div
      onClick={onClick}
      className="w-full h-56 bg-white shadow-md hover:shadow-xl hover:scale-[1.01] cursor-pointer duration-300 rounded-lg "
    >
      <div className="flex h-56 gap-8 w-full">
        <Image
          src={Car}
          width={200}
          height={200}
          alt={""}
          className="rounded-l-lg"
        />
        <div className="flex flex-col justify-between w-full ">
          <div className="w-full p-4">
            <div className="w-full flex justify-between ">
              <h1 className="text-2xl font-bold">{metadata.car_name}</h1>
              <AiOutlineHeart className="text-2xl hover:text-red-300 duration-300" />
            </div>
            <h3>{metadata.car_price}</h3>
          </div>
          <div className="px-4">
            <div className="mt-3 h-px bg-gray-200 w-5/6" />
            <h3 className="text-gray-400">{timeDifferenceString}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

const CarList = () => {
  const [showModal, setShowModal] = React.useState(false);
  return (
    <div className="w-full flex flex-col gap-6">
      <SearchBar />
      {Metadata.map((item) => {
        return (
          <CarListItem
            onClick={() => setShowModal(true)}
            key={item.id}
            metadata={item}
          />
        );
      })}
      {showModal && (
        <div>
          <CarListItemModal setShowModal={setShowModal} showModal={true} />
        </div>
      )}
    </div>
  );
};

export default CarList;
