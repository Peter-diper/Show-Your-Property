"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

import TypeSelector from "./PropertyTypeSelector";

const selectOptions = [
  "All",
  "Apartment",
  "Studio",
  "Condo",
  "House",
  "Cabin Or Cottage",
  "Loft",
  "Room",
  "Other",
];

const PropertySearchForm = () => {
  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("All");

  // inital the router
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (location === "" && propertyType === "All") {
      // redirect to all properties
      router.push("/properties");
    } else {
      // we set a query
      const query = `?location=${location}&propertyType=${propertyType}`;
      router.push(`/properties/search-result${query}`);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-3 mx-auto max-w-2xl w-full flex flex-col md:flex-row items-center"
    >
      <div className="w-full md:w-3/5 md:pr-2 mb-4 md:mb-0">
        <label htmlFor="location" className="sr-only">
          Location
        </label>
        <input
          type="text"
          id="location"
          placeholder="Enter Location (City, State, Zip, etc"
          className="w-full px-4 py-3 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring focus:ring-blue-500"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>
      <div className="w-full md:w-2/5 md:pl-2">
        <label htmlFor="property-type" className="sr-only">
          Property Type
        </label>
        <TypeSelector
          id="property-type"
          options={selectOptions}
          value={propertyType}
          onHandle={(e) => setPropertyType(e.target.value)}
        />
      </div>
      <button
        type="submit"
        className="md:ml-4 mt-4 md:mt-0 w-full md:w-auto px-6 py-3 rounded-lg bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-500"
      >
        Search
      </button>
    </form>
  );
};

export default PropertySearchForm;
