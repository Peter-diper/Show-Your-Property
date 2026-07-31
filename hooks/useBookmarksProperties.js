"use client";
import { useEffect, useState } from "react";
const useBookmarksProperties = () => {
  const [loading, setLoading] = useState(true);
  const [properties, setProperties] = useState([]);
  useEffect(() => {
    const fetchSavedProperties = async () => {
      try {
        const res = await fetch("/api/bookmarks");
        if (res.status === 200) {
          const data = await res.json();
          setProperties(data);
        } else {
          toast.error("could not fetch property");
          console.log(res.statusText);
        }
      } catch (error) {
        console.log(error);
        toast.error("could not fetch property");
      } finally {
        setLoading(false);
      }
    };

    fetchSavedProperties();
  }, []);

  return { loading, properties };
};
export { useBookmarksProperties as useFetchSavedProperties };
