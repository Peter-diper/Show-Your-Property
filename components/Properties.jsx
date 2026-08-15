"use client";
import { useState, useEffect } from "react";
import PropertyCardSkeleton from "./PropertyCardSkeleton";
import PropertyCard from "./PropertyCard";
import Pagination from "./Pagination";
import PaginationSkeleton from "./PaginationSkeleton";

const Properties = () => {
  const [loading, setLoading] = useState(false);
  const [properties, setProperties] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(3);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `/api/properties?pageSize=${pageSize}&page=${page}`,
        );

        if (!res.ok) {
          throw new Error("faild to fetch property");
        }
        const data = await res.json();
        setProperties(data.properties);
        setTotal(data.total);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, [page, pageSize]);

  const handleChange = (newPage) => {
    setPage(newPage);
  };

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
          <PaginationSkeleton />
        </div>
      </section>
    );
  }

  return (
    <section className="px-4 py-6 animate-soft-intro">
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
        <Pagination
          total={total}
          page={page}
          pageSize={pageSize}
          handleChage={handleChange}
        />
      </div>
    </section>
  );
};

export default Properties;
