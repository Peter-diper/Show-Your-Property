import { useGlobalStore } from "@/store/store";
import React, { useEffect, useState } from "react";

const MessageCount = () => {
  const { unReadcount, setReadcount } = useGlobalStore();

  const [unreadMessages, setUnreadMessages] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUnreadMessages = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/messages/message-count");

        if (res.status === 200) {
          const data = await res.json();
          console.log(unReadcount);
          setReadcount(data);
          console.log(unReadcount);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchUnreadMessages();
  }, []);

  return (
    unreadMessages !== 0 && (
      <span
        className={`absolute -top-1 -right-1 w-4 h-4 flex items-center justify-center text-[10px] font-bold text-white ${loading ? "bg-gray-500 animate-pulse " : "bg-red-500"} rounded-full`}
      >
        {loading ? ".." : unReadcount}
      </span>
    )
  );
};
export default MessageCount;
