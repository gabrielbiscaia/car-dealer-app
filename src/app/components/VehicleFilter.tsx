'use client';

import { useState, useEffect } from "react";
import Link from "next/link";

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
    <div className="space-y-4 ">
      <h2 className="justify-center text-center text-2xl font-bold">Vehicle Filter</h2>
      <select
        value={selectedType}
        onChange={(e) => setSelectedType(e.target.value)}
        className="block w-full p-2 border rounded"
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
        className="block w-full p-2 border rounded"
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
        className={`block w-full p-2 text-center rounded ${
          isNextDisabled
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-black text-white hover:bg-gray-600"
        }`}
      >
        Next
      </Link>
    </div>
  );
}
