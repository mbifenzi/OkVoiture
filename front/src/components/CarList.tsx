"use client";
import React from "react";
import { NativeSelect, Input, Button } from "@mantine/core";
import { BiSearchAlt } from "react-icons/bi";
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

const CarListItem = () => {
  return (
    <div className="w-full h-56 bg-red-100 shadow-lg rounded-lg">
      
    </div>
  );
};

const CarList = () => {
  return (
    <div className="w-full flex flex-col gap-6">
      <SearchBar />
      <CarListItem />
    </div>
  );
};

export default CarList;
