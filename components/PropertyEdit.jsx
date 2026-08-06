"use client";
import React, { useEffect, useState } from "react";
import { fetchProperty } from "@/utils/requests";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Spinner from "./Spinner";
import PropertyEditSkeleton from "./PropertyEditSkeleton";

const glassInput =
  "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-white/30 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all duration-200 text-sm";
const glassLabel = "block text-white/60 text-sm font-medium mb-2";
const glassSection =
  "bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5 mb-5";

const amenitiesList = [
  ["amenity_wifi", "Wifi"],
  ["amenity_kitchen", "Full Kitchen"],
  ["amenity_washer_dryer", "Washer & Dryer"],
  ["amenity_free_parking", "Free Parking"],
  ["amenity_pool", "Swimming Pool"],
  ["amenity_hot_tub", "Hot Tub"],
  ["amenity_24_7_security", "24/7 Security"],
  ["amenity_wheelchair_accessible", "Wheelchair Accessible"],
  ["amenity_elevator_access", "Elevator Access"],
  ["amenity_dishwasher", "Dishwasher"],
  ["amenity_gym_fitness_center", "Gym/Fitness Center"],
  ["amenity_air_conditioning", "Air Conditioning"],
  ["amenity_balcony_patio", "Balcony/Patio"],
  ["amenity_smart_tv", "Smart TV"],
  ["amenity_coffee_maker", "Coffee Maker"],
];

const PropertyEdit = () => {
  const [fields, setFields] = useState({
    type: "",
    name: "",
    description: "",
    location: { street: "", city: "", state: "", zipcode: "" },
    beds: "",
    baths: "",
    square_feet: "",
    amenities: [],
    rates: { weekly: "", monthly: "", nightly: "" },
    seller_info: { name: "", email: "", phone: "" },
  });

  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { id } = useParams();

  useEffect(() => {
    const fetchPropertyData = async () => {
      try {
        const res = await fetchProperty(id);
        setFields(res);
        const defaultRates = res.rates;
        for (const rate of Object.keys(defaultRates)) {
          if (defaultRates[rate] === null) defaultRates[rate] = "";
        }
        setFields((prev) => ({ ...prev, rates: defaultRates }));
      } catch (error) {
        console.log(error);
        toast.error("something went wrong!!");
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchPropertyData();
  }, [id]);

  function handleChange(e) {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [outerValue, innerValue] = name.split(".");
      setFields((prev) => ({
        ...prev,
        [outerValue]: { ...prev[outerValue], [innerValue]: value },
      }));
      return;
    }
    setFields((prev) => ({ ...prev, [name]: value }));
  }

  function handleAmenitiesChange(e) {
    const { value, checked } = e.target;

    const updatedAmenities = [...fields.amenities];
    if (checked) {
      updatedAmenities.push(value);
    } else {
      updatedAmenities.splice(fields.amenities.indexOf(value), 1);
    }
    setFields((prev) => ({ ...prev, amenities: updatedAmenities }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    try {
      const res = await fetch(`/api/properties/${id}`, {
        method: "PUT",
        body: formData,
      });
      if (res.status === 200) {
        toast.success("Property updated!");
        router.push(`/properties/${id}`);
      } else if (res.status === 401) {
        toast.error("Permission denied");
      } else {
        toast.error("Something went wrong!");
      }
    } catch (error) {
      toast.error("Something went wrong!");
      console.log(error);
    }
  };

  if (loading) return <PropertyEditSkeleton />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-black py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white tracking-tight">
            Edit Property
          </h2>
          <p className="text-white/40 text-sm mt-2">
            Update your property details below
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Type */}
          <div className={glassSection}>
            <label className={glassLabel}>Property Type</label>
            <select
              name="type"
              className={glassInput}
              required
              value={fields.type}
              onChange={handleChange}
            >
              {[
                "Apartment",
                "Condo",
                "House",
                "Cabin Or Cottage",
                "Room",
                "Studio",
                "Other",
              ].map((v) => (
                <option key={v} value={v} className="bg-gray-900">
                  {v}
                </option>
              ))}
            </select>
          </div>

          {/* Basic Info */}
          <div className={glassSection}>
            <h3 className="text-white/80 font-semibold text-sm mb-4 uppercase tracking-wider">
              Basic Info
            </h3>
            <div className="space-y-4">
              <div>
                <label className={glassLabel}>Listing Name</label>
                <input
                  type="text"
                  name="name"
                  className={glassInput}
                  placeholder="eg. Beautiful Apartment In Miami"
                  required
                  value={fields.name}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className={glassLabel}>Description</label>
                <textarea
                  name="description"
                  className={`${glassInput} resize-none`}
                  rows="4"
                  placeholder="Add an optional description..."
                  value={fields.description}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          {/* Location */}
          <div className={glassSection}>
            <h3 className="text-white/80 font-semibold text-sm mb-4 uppercase tracking-wider">
              Location
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                name="location.street"
                className={glassInput}
                placeholder="Street"
                value={fields.location.street}
                onChange={handleChange}
              />
              <input
                type="text"
                name="location.city"
                className={glassInput}
                placeholder="City"
                required
                value={fields.location.city}
                onChange={handleChange}
              />
              <input
                type="text"
                name="location.state"
                className={glassInput}
                placeholder="State"
                required
                value={fields.location.state}
                onChange={handleChange}
              />
              <input
                type="text"
                name="location.zipcode"
                className={glassInput}
                placeholder="Zipcode"
                value={fields.location.zipcode}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Details */}
          <div className={glassSection}>
            <h3 className="text-white/80 font-semibold text-sm mb-4 uppercase tracking-wider">
              Property Details
            </h3>
            <div className="grid grid-cols-3 gap-3">
              {[
                ["beds", "Beds"],
                ["baths", "Baths"],
                ["square_feet", "Sq Ft"],
              ].map(([name, label]) => (
                <div key={name}>
                  <label className={glassLabel}>{label}</label>
                  <input
                    type="number"
                    name={name}
                    className={glassInput}
                    required
                    value={fields[name]}
                    onChange={handleChange}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Amenities */}
          <div className={glassSection}>
            <h3 className="text-white/80 font-semibold text-sm mb-4 uppercase tracking-wider">
              Amenities
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 select-none">
              {amenitiesList.map(([id, label]) => (
                <label
                  key={id}
                  className={`flex items-center gap-2.5 px-3 py-2 rounded-xl border cursor-pointer transition-all duration-150 group
                  ${
                    fields.amenities.includes(label)
                      ? "border-blue-500/50 bg-blue-500/10"
                      : "border-white/10 hover:bg-white/10 hover:border-white/20"
                  }`}
                >
                  <input
                    type="checkbox"
                    id={id}
                    name="amenities"
                    value={label}
                    className="accent-blue-500 w-3.5 h-3.5"
                    checked={fields.amenities.includes(label)}
                    onChange={handleAmenitiesChange}
                  />
                  <span
                    className={`text-xs transition-colors ${fields.amenities.includes(label) ? "text-blue-300" : "text-white/50 group-hover:text-white/80"}`}
                  >
                    {label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Rates */}
          <div className={glassSection}>
            <h3 className="text-white/80 font-semibold text-sm mb-4 uppercase tracking-wider">
              Rates{" "}
              <span className="text-white/30 normal-case font-normal">
                (leave blank if not applicable)
              </span>
            </h3>
            <div className="grid grid-cols-3 gap-3">
              {[
                ["rates.weekly", "Weekly"],
                ["rates.monthly", "Monthly"],
                ["rates.nightly", "Nightly"],
              ].map(([name, label]) => (
                <div key={name}>
                  <label className={glassLabel}>{label}</label>
                  <input
                    type="number"
                    name={name}
                    className={glassInput}
                    placeholder="0"
                    value={fields.rates[name.split(".")[1]]}
                    onChange={handleChange}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Seller Info */}
          <div className={glassSection}>
            <h3 className="text-white/80 font-semibold text-sm mb-4 uppercase tracking-wider">
              Seller Info
            </h3>
            <div className="space-y-3">
              <input
                type="text"
                name="seller_info.name"
                className={glassInput}
                placeholder="Full Name"
                value={fields.seller_info.name}
                onChange={handleChange}
              />
              <input
                type="email"
                name="seller_info.email"
                className={glassInput}
                placeholder="Email Address"
                required
                value={fields.seller_info.email}
                onChange={handleChange}
              />
              <input
                type="tel"
                name="seller_info.phone"
                className={glassInput}
                placeholder="Phone Number"
                value={fields.seller_info.phone}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 rounded-xl font-semibold text-white text-sm bg-blue-600 hover:bg-blue-500 border border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-200"
          >
            Update Property
          </button>
        </form>
      </div>
    </div>
  );
};

export default PropertyEdit;
