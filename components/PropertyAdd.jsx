"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";

const glassInput =
  "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-white/30 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all duration-200 text-sm";
const glassLabel = "block text-white/60 text-sm font-medium mb-2";
const glassSection =
  "bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5 mb-5";

const amenities = [
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

const PropertyAdd = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData(e.target);
      const res = await fetch("/api/properties", {
        method: "POST",
        body: data,
      });

      if (res.status === 200) {
        const { propertyId: id } = await res.json();
        toast.success("Property Added!");
        router.push(`/properties/${id}`);
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-black py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white tracking-tight">
            Add Property
          </h2>
          <p className="text-white/40 text-sm mt-2">
            Fill in the details below to list your property
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Type */}
          <div className={glassSection}>
            <label htmlFor="type" className={glassLabel}>
              Property Type
            </label>
            <select id="type" name="type" className={glassInput} required>
              {[
                "Apartment",
                "Condo",
                "House",
                "Cabin Or Cottage",
                "Room",
                "Studio",
                "Other",
              ].map((typeOption) => (
                <option key={typeOption} value={typeOption} className="bg-gray-900">
                  {typeOption}
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
                />
              </div>
              <div>
                <label htmlFor="description" className={glassLabel}>
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  className={`${glassInput} resize-none`}
                  rows="4"
                  placeholder="Add an optional description..."
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
              />
              <input
                type="text"
                name="location.city"
                className={glassInput}
                placeholder="City"
                required
              />
              <input
                type="text"
                name="location.state"
                className={glassInput}
                placeholder="State"
                required
              />
              <input
                type="text"
                name="location.zipcode"
                className={glassInput}
                placeholder="Zipcode"
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
              {amenities.map(([id, label]) => (
                <label
                  key={id}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-xl border border-white/10 hover:bg-white/10 hover:border-white/20 cursor-pointer transition-all duration-150 group"
                >
                  <input
                    type="checkbox"
                    id={id}
                    name="amenities"
                    value={label}
                    className="accent-blue-500 w-3.5 h-3.5"
                  />
                  <span className="text-white/50 group-hover:text-white/80 text-xs transition-colors">
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
              />
              <input
                type="email"
                name="seller_info.email"
                className={glassInput}
                placeholder="Email Address"
                required
              />
              <input
                type="tel"
                name="seller_info.phone"
                className={glassInput}
                placeholder="Phone Number"
              />
            </div>
          </div>

          {/* Images */}
          <div className={glassSection}>
            <h3 className="text-white/80 font-semibold text-sm mb-4 uppercase tracking-wider">
              Images{" "}
              <span className="text-white/30 normal-case font-normal">
                (up to 4)
              </span>
            </h3>
            <input
              type="file"
              name="images"
              className="w-full text-white/50 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border file:border-white/20 file:bg-white/10 file:text-white/70 file:text-sm file:cursor-pointer hover:file:bg-white/20 file:transition-all file:duration-200 cursor-pointer"
              accept="image/*"
              multiple
              required
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-xl font-semibold text-white text-sm transition-all duration-200
              ${
                loading
                  ? "bg-white/10 border border-white/10 animate-pulse cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-500 border border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/20"
              }`}
          >
            {loading ? "Adding Property..." : "Add Property"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PropertyAdd;
