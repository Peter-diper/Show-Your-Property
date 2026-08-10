import { useGlobalStore } from "@/store/store";
import React, { useEffect, useState } from "react";

const MessageCount = ({}) => {
  const { unReadcount, setReadcount } = useGlobalStore();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUnreadMessages = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/messages/message-count");

        if (res.status === 200) {
          const data = await res.json();
          setReadcount(data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchUnreadMessages();
  }, [setReadcount]);

  return (
    unReadcount !== 0 && (
      <>
        <span
          className={`absolute -top-1 -right-1 w-4 h-4 flex items-center justify-center text-[10px] font-bold bg-white/5 border  border-red-500 scale-125 animate-ping rounded-full`}
        ></span>
        <span
          className={`absolute -top-1 -right-1 w-4 h-4 flex items-center justify-center text-[10px] font-bold size-4 overflow-hidden text-white ${loading ? "bg-gray-500 animate-pulse " : "bg-red-500"} rounded-full`}
        >
          {loading ? ".." : unReadcount}
        </span>
      </>
    )
  );
};
export default MessageCount;
