"use client";

import BookmarkButton from "@/components/BookmarkButton";
import ErrorBlock from "@/components/ErrorBlock";
import PageDetailLoading from "@/components/PageDetailLoading";
import PropertyCantectForm from "@/components/PropertyCantectForm";
import PropertyDetails from "@/components/PropertyDetails";
import PropertyHeaderImage from "@/components/PropertyHeaderImage";
import PropertyImage from "@/components/PropertyImage";
import ShareButton from "@/components/ShareButton";
import { fetchProperty } from "@/utils/requests";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";

const PropertyDetail = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    const fetchPropertyData = async () => {
      if (!id) {
        return setError({ message: "Failed to load id" });
      }

      try {
        const property = await fetchProperty(id);
        setProperty(property);
      } catch (error) {
        console.log(error);
        setError({ message: error });
      } finally {
        setLoading(false);
      }
    };

    if (property === null) {
      fetchPropertyData();
    }
  }, [id, property]);

  if (!property && !loading) {
    return (
      <h1 className="text-center text-2xl font-bold mt-10">
        Property not Found
      </h1>
    );
  }

  if (error) {
    return (
      <ErrorBlock message={error.message} title={"some thing bad happend !"} />
    );
  }

  return (
    <>
      {loading && <PageDetailLoading />}

      {!loading && property && (
        <>
          <PropertyHeaderImage image={property.images[0]} />

          {/* back button */}
          <section>
            <div className="container m-auto py-6 px-6">
              <Link
                href="/properties"
                className="text-blue-500 hover:text-blue-600 flex items-center"
              >
                <FaArrowLeft className="mr-2"></FaArrowLeft> Back to Properties
              </Link>
            </div>
          </section>

          {/* property info */}
          <section className="">
            <div className="container m-auto py-10 px-6">
              <div className="grid  grid-cols-1 md:grid-cols-[70%_29%] w-full gap-6 transition-all">
                <PropertyDetails property={property} />

                {/* <!-- Sidebar --> */}
                <aside className="space-y-4">
                  {/* bookmark button */}
                  <BookmarkButton property={property} />

                  {/* share button */}
                  <ShareButton property={property} />

                  {/* <!-- Contact Form --> */}
                  <PropertyCantectForm property={property} />
                </aside>
              </div>
            </div>
          </section>
          <PropertyImage images={property.images} />
        </>
      )}
    </>
  );
};

export default PropertyDetail;
