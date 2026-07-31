"use client";

import PropertyCard from "@/components/PropertyCard";

import PropertyCardSkeleton from "@/components/PropertyCardSkeleton";
import { useFetchSavedProperties } from "@/hooks/useBookmarksProperties";

const SavedProperties = () => {
  const { loading, properties } = useFetchSavedProperties();
  const skeletonCardArray = [1, 2, 3];

  if (loading) {
    return (
      <section className="px-4 py-6">
        <div className="container-xl lg:container m-auto px-4 py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {skeletonCardArray.map((skeletonId) => (
              <PropertyCardSkeleton key={skeletonId} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto px-4 py-6">
        {properties.length === 0 ? (
          <p>no saved bookmarks</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {properties.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default SavedProperties;
