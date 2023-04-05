"use client";
import React, { use, useEffect } from "react";
import { NativeSelect, Input, Modal, Group, Button } from "@mantine/core";
import { BiSearchAlt } from "react-icons/bi";
import { AiOutlineHeart } from "react-icons/ai";
import useSWR from "swr";
import Metadata from "@/context/Metadata.json";
import { TPostMetadata } from "@/global/types";
import { Image } from "@mantine/core";
import Car from "@/assets/default_car.jpg";
import CarListItemModal from "@/modals/CarListItemModal";
import axios from "axios";
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
  const [postMetadata, setPostMetadata] =
    React.useState<TPostMetadata>(metadata);
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

  let carImageLink = metadata.car_image[0].split("./");
  console.log("carImageLink", carImageLink[1]);

  return (
    <div
      onClick={onClick}
      className="w-full h-56 bg-white shadow-md hover:shadow-xl hover:scale-[1.01] cursor-pointer duration-300 rounded-lg "
    >
      <div className="flex w-full h-full">
        <Image
          src={`http://localhost:3000/${carImageLink[1]}`}
          alt="car"
          height={224}
          className="w-1/2 h-full rounded-l-lg"
          radius={3}
        />
        <div className="flex gap-8 w-full h-full justify-around">
          <div className="w-full h-full flex flex-col">
            <div className="flex justify-between w-full p-2 border-b-2 border-gray-200">
              <h1 className="text-2xl font-bold">{metadata.car_name}</h1>
              <AiOutlineHeart className="text-2xl hover:text-red-300 duration-300" />
            </div>
            <div className="h-full flex flex-col justify-between">
              <h3 className="text-gray-400 p-2">{metadata.car_description}</h3>
              <div className="flex justify-between p-2">
                <h3>{metadata.car_price}</h3>
                <h3 className="text-gray-400">{timeDifferenceString}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CarList = () => {
  const [showModal, setShowModal] = React.useState(false);
  const [posts, setPosts] = React.useState<any>([]);

  const fetchPosts = async () => {
    try {
      const res = await axios
        .get("http://localhost:3000/post/all")
        .then((res) => {
          // console.log(res.data);
          setPosts(res.data);
          console.log(posts.car_image);
        });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);
  return (
    <div className="w-full flex flex-col gap-6">
      <SearchBar />
      <div className="w-full flex flex-col gap-6">
        {posts.map((post: any) => (
          <CarListItem
            key={post.id}
            metadata={post}
            onClick={() => setShowModal(true)}
          />
        ))}
        {showModal && (
          <div>
            <CarListItemModal setShowModal={setShowModal} showModal={true} />
          </div>
        )}
      </div>
    </div>
  );
};

export default CarList;
