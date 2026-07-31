import React from "react";
import PropertyCardSkeleton from "./PropertyCardSkeleton";

const PropertiesLoadingSkleton = ({ properties }) => {
  return (
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {properties.map((skeletonId) => (
            <PropertyCardSkeleton key={skeletonId} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PropertiesLoadingSkleton;
