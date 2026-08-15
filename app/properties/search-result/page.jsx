"use client";
import { useEffect, useState } from "react";
import PropertyCard from "@/components/PropertyCard";
import PropertyCardSkeleton from "@/components/PropertyCardSkeleton";
import { useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import PropertySearchForm from "@/components/PropertySearchForm";

const SearchResultPage = () => {
  const [loading, setLoading] = useState(true);
  const [properties, setProperties] = useState([]);
  const loadingSkeletonCardCount = [1, 2, 3];

  const searchParams = useSearchParams();
  const location = searchParams.get("location");
  const propertyType = searchParams.get("propertyType");

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const res = await fetch(
          `/api/properties/search?location=${location}&propertyType=${propertyType}`,
        );
        if (res.status === 200) {
          const data = await res.json();
          setProperties(data);
        } else {
          console.log(res.statusText);
        }
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    fetchSearchResults();
  }, [location, propertyType]);

  return (
    <div className="min-h-screen animate-soft-intro bg-gradient-to-br from-gray-900 via-gray-950 to-black">
      {/* Search Bar */}
      <section className="bg-white/5 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <PropertySearchForm />
        </div>
      </section>

      {/* Results */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <h1 className="text-white font-semibold text-lg">Search Results</h1>
          <span
            className={`text-xs font-semibold px-3 py-1 rounded-full border
            ${
              loading
                ? "bg-white/5 border-white/10 text-white/30 animate-pulse"
                : "bg-blue-500/20 border-blue-500/30 text-blue-300"
            }`}
          >
            {loading ? "..." : `${properties.length} found`}
          </span>
          {!loading && (location || propertyType) && (
            <span className="text-white/30 text-xs">
              {[location, propertyType !== "All" && propertyType]
                .filter(Boolean)
                .join(" · ")}
            </span>
          )}
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {loadingSkeletonCardCount.map((id) => (
              <PropertyCardSkeleton key={id} />
            ))}
          </div>
        ) : properties.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="bg-white/5 border border-white/10 rounded-2xl px-10 py-10">
              <p className="text-white/30 text-sm mb-1">No properties found</p>
              <p className="text-white/20 text-xs">
                Try a different location or property type
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {properties.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default SearchResultPage;
