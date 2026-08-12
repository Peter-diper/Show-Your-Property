"use client";
import { useState, useEffect } from "react";
import PropertyCardSkeleton from "./PropertyCardSkeleton";
import PropertyCard from "./PropertyCard";

const Properties = () => {
  const [loading, setLoading] = useState(true);
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await fetch(`/api/properties`);

        if (!res.ok) {
          throw new Error("faild to fetch property");
        }
        const data = await res.json();
        setProperties(data.properties);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, []);
  if (loading) {
    return (
      <section className="px-4 py-6">
        <div className="container-xl lg:container m-auto px-4 py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* defualt page size set here! */}
            {[1, 2, 3].map((id) => (
              <PropertyCardSkeleton key={id} />
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
          <p>not properties found</p>
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

export default Properties;
