"use client";

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
    (currentYear - i).toString(),
  );

  useEffect(() => {
    fetch(
      "https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json",
    )
      .then((response) => response.json())
      .then((data) => setVehicleTypes(data.Results));
  }, []);

  const isSearchDisabled = !selectedType || !selectedYear;

  return (
    <div className="flex flex-row w-full h-full space-x-4">
      <div className="relative w-2/3">
        <Image
          src={require("../assets/ferrari.jpeg")}
          alt="ferrari"
          objectFit="fill"
          height={800}
        />
      </div>
      <div className="flex flex-col w-1/3 bg-white justify-center">
        <div className="px-8 py-12 space-y-4">
          <h2 className="text-center text-4xl py-2 border-b border-red-700 font-bold text-red-700">
            Search Cars
          </h2>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="block w-full p-2 border"
          >
            <option value="">Select Vehicle Make</option>
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
            href={
              isSearchDisabled ? "#" : `/result/${selectedType}/${selectedYear}`
            }
            className={`block w-full p-2 text-center text-white ${
              isSearchDisabled
                ? "bg-gray-900 cursor-not-allowed"
                : "bg-red-700 hover:bg-red-500"
            }`}
          >
            {isSearchDisabled ? "Fill both fields" : "Search"}
          </Link>
        </div>
      </div>
    </div>
  );
}
