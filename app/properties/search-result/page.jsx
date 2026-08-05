"use client";
import { useEffect, useState } from "react";
import PropertyCard from "@/components/PropertyCard";
import PropertyCardSkeleton from "@/components/PropertyCardSkeleton";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import { useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import PropertySearchForm from "@/components/PropertySearchForm";

const SearchResultPage = () => {
  const [loading, setLoading] = useState(true);
  const [properties, setProperties] = useState([]);
  const loadingSkeletonCardCount = [1, 2];

  const searchParams = useSearchParams();
  const location = searchParams.get("location");
  const propertyType = searchParams.get("propertyType");

  // getting data

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
        toast.error(`something went wrong,`);
      } finally {
        setLoading(false);
      }
    };
    fetchSearchResults();
  }, [location, propertyType]);

  if (loading) {
    return (
      <>
        <section className=" bg-gray-700 ">
          <div className="container-xl lg:container m-auto px-4 py-6">
            <PropertySearchForm />
          </div>
        </section>
        <section className="px-4 py-6">
          <h1 className="text-2xl font-medium">
            Property Search Results:{" "}
            <span className="inline-block text-gray-300 text-lg animate-pulse">
              (0)
            </span>
          </h1>
          <div className="container-xl lg:container m-auto px-4 py-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {loadingSkeletonCardCount.map((skeletonId) => (
                <PropertyCardSkeleton key={skeletonId} />
              ))}
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <section className=" bg-gray-700 ">
        <div className="container-xl lg:container m-auto px-4 py-6">
          <PropertySearchForm />
        </div>
      </section>
      <section className="px-4 py-6">
        <h1 className="text-2xl font-medium">
          Property Search Results:{" "}
          <span className="inline-block text-gray-800 text-lg animate-pulse">
            ({properties.length})
          </span>
        </h1>
        <div className="container-xl lg:container m-auto px-4 py-6">
          {properties.length === 0 ? (
            <p className="bg-gray-200 rounded-full p-4">no property found !</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {properties.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};
export default SearchResultPage;
