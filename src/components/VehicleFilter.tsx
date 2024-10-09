'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

type VehicleType = {
  MakeId: number;
  MakeName: string;
};

export default function VehicleFilter() {
  const [vehicleTypes, setVehicleTypes] = useState<VehicleType[]>([]);
  const [selectedType, setSelectedType] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 2014 }, (_, i) =>
    (currentYear - i).toString()
  );

  useEffect(() => {
    fetch(
      "https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json"
    )
      .then((response) => response.json())
      .then((data) => setVehicleTypes(data.Results));
  }, []);

  const isNextDisabled = !selectedType || !selectedYear;

  return (
    <div className="flex flex-row w-full space-between justify-center items-center space-x-8 ">
      <Image className="flex" src={require("../assets/ferrari.jpeg")} alt="ferrari" width={916}></Image>
      <div className="border py-8 px-16 bg-white space-y-4 h-full">
        <h2 className="justify-center text-center text-4xl py-2 border-b border-red-700 font-bold text-red-700">Search Cars</h2>
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="block w-full p-2 border"
        >
          <option value="">Select Vehicle Type</option>
          {vehicleTypes.map((type) => (
            <option key={type.MakeId} value={type.MakeId}>
              {type.MakeName}
            </option>
          ))}
        </select>
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className="block w-full p-2 border"
        >
          <option value="">Select Model Year</option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
        <Link
          href={isNextDisabled ? "#" : `/result/${selectedType}/${selectedYear}`}
          className={`block w-full p-2 text-center text-white ${
            isNextDisabled
              ? "bg-gray-900 cursor-not-allowed"
              : "bg-red-700 hover:bg-red-500"
          }`}
        >
          Next
        </Link>
      </div>
    </div>
  );
}
