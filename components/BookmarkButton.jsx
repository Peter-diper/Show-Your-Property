"use client";

import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";

const BookmarkButton = ({ property }) => {
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const [isbookmarked, setIsBookmarked] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLoading(false);
      return;
    }
    const checkbookMark = async () => {
      try {
        const res = await fetch("/api/bookmarks/check", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ propertyId: property._id }),
        });

        if (res.status === 200) {
          const data = await res.json();
          setIsBookmarked(data.hasBookmark);
        }
      } catch (error) {
        console.log(error);
        toast.error("something went wrong!!");
      } finally {
        setLoading(false);
      }
    };
    checkbookMark();
  }, [property._id, userId]);

  const handleClick = async () => {
    if (!userId) {
      toast.error("User need to be logged in");
      return;
    }

    try {
      const res = await fetch("/api/bookmarks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ propertyId: property._id }),
      });

      if (res.status === 200) {
        const data = await res.json();
        setIsBookmarked(data.hasBookmark);
        toast.success(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong!!");
    }
  };

  if (loading) {
    return (
      <button className="bg-gray-500 hover:bg-gray-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center animate-pulse">
        Loading ...
      </button>
    );
  }

  return isbookmarked ? (
    <button
      onClick={handleClick}
      className="bg-red-500 hover:bg-red-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
    >
      <FaRegBookmark className="mr-2" />
      Remove Bookmark
    </button>
  ) : (
    <button
      onClick={handleClick}
      className="bg-blue-500 hover:bg-blue-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
    >
      <FaBookmark className="mr-2" /> Bookmark Property
    </button>
  );
};

export default BookmarkButton;
