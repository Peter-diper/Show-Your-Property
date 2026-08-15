"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import defaultProfile from "@/assets/images/profile.png";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import ProfileSkeleton from "@/components/profileLoadingPage";
import { FaEdit, FaTrash, FaMapMarkerAlt } from "react-icons/fa";

const ProfilePage = () => {
  const { data: session } = useSession();
  const userImage = session?.user?.image;
  const userName = session?.user?.name;
  const userEmail = session?.user?.email;

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletionLoading, setDeletionLoading] = useState(false);
  const [deletedProperty, setDeletedProperty] = useState(null);

  useEffect(() => {
    const retrieveUserProperties = async (userId) => {
      if (!userId) return;
      try {
        const res = await fetch(`/api/properties/user/${userId}`);
        if (res.status === 200) {
          const data = await res.json();
          setProperties(data);
        }
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };
    if (session?.user.id) retrieveUserProperties(session?.user.id);
  }, [session]);

  const handleDeleteProperty = async (propertyId) => {
    const confirm = window.confirm(
      "Are you sure about deleting this property?",
    );
    setDeletedProperty(propertyId);
    if (!propertyId || !confirm) return;
    setDeletionLoading(true);
    const res = await fetch(`/api/properties/${propertyId}`, {
      method: "DELETE",
    });
    try {
      if (res.status === 200) {
        setProperties(properties.filter((p) => p._id !== propertyId));
        toast.success("Property deleted");
      } else {
        toast.error("Property has not been deleted!");
      }
    } catch (error) {
    } finally {
      setDeletionLoading(false);
    }
  };

  if (loading) return <ProfileSkeleton />;

  return (
    <section className="min-h-screen animate-soft-intro bg-linear-to-br from-gray-900 via-gray-950 to-black py-12 px-4">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Profile Card */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-xl shadow-black/30">
          <h1 className="text-2xl font-bold text-white mb-6 tracking-tight">
            Your Profile
          </h1>
          <div className="flex md:justify-self-auto justify-self-center flex-col md:flex-row items-start gap-8">
            {/* Avatar + Info */}
            <div className="flex flex-col items-center  md:items-start gap-4 md:w-1/4">
              <div className="ring-2 ring-white/20 rounded-full p-1">
                <Image
                  className="md:h-28 md:w-28 w-50 rounded-full object-cover"
                  src={userImage || defaultProfile}
                  alt="User"
                  width={0}
                  height={0}
                  sizes="100"
                />
              </div>
              <div className="text-center md:text-left">
                <p className="text-white/40 text-xs uppercase tracking-wider mb-1">
                  Name
                </p>
                <p className="text-white font-semibold">{userName}</p>
              </div>
              <div className="text-center md:text-left">
                <p className="text-white/40 text-xs uppercase tracking-wider mb-1">
                  Email
                </p>
                <p className="text-white/70 text-sm">{userEmail}</p>
              </div>
            </div>

            {/* Listings */}
            <div className="md:w-3/4 w-full">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-white/80 font-semibold text-sm uppercase tracking-wider">
                  Your Listings
                </h2>
                <span className="bg-blue-500/20 text-blue-300 border border-blue-500/30 text-xs font-semibold px-3 py-1 rounded-full">
                  {properties.length} Properties
                </span>
              </div>

              {properties.length === 0 ? (
                <div className="text-center py-12 border border-white/10 rounded-xl">
                  <p className="text-white/30 text-sm">
                    No property listings yet
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {properties.map((property) => (
                    <div
                      key={property._id}
                      className="bg-white/5 border border-white/10 rounded-xl overflow-hidden flex flex-col sm:flex-row gap-4 p-4"
                    >
                      <Link
                        href={`/properties/${property._id}`}
                        className="shrink-0"
                      >
                        <Image
                          className="h-28 w-full sm:w-44 rounded-lg object-cover"
                          src={property.images[0]}
                          alt={property.name}
                          width={176}
                          height={112}
                          loading="eager"
                        />
                      </Link>
                      <div className="flex flex-col justify-between flex-1">
                        <div>
                          <p className="text-white font-semibold">
                            {property.name}
                          </p>
                          <p className="text-white/40 text-xs flex items-center gap-1 mt-1">
                            <FaMapMarkerAlt className="text-[10px]" />
                            {[
                              property.location.street,
                              property.location.city,
                              property.location.state,
                            ]
                              .filter(Boolean)
                              .join(", ")}
                          </p>
                        </div>
                        <div className="flex gap-2 mt-3">
                          <Link
                            href={`/properties/${property._id}/edit`}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600/80 hover:bg-blue-500 text-white text-xs font-medium transition-all duration-200"
                          >
                            <FaEdit className="text-[10px]" /> Edit
                          </Link>
                          <button
                            onClick={() => handleDeleteProperty(property._id)}
                            disabled={
                              deletionLoading &&
                              deletedProperty === property._id
                            }
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-white text-xs font-medium transition-all duration-200
                              ${
                                deletionLoading &&
                                deletedProperty === property._id
                                  ? "bg-gray-500/50 animate-pulse cursor-not-allowed"
                                  : "bg-red-500/80 hover:bg-red-500"
                              }`}
                          >
                            <FaTrash className="text-[10px]" />
                            {deletionLoading && deletedProperty === property._id
                              ? "Deleting..."
                              : "Delete"}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
