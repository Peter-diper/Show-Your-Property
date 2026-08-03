"use client";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const MessageList = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const res = await fetch("/api/messages");

        if (res.status === 200) {
          const messageData = await res.json();
          setMessages(messageData);
        }
      } catch (error) {
        console.log(error);
        toast.error("Error faild to load messages!");
      } finally {
        setLoading(false);
      }
    };
    fetchMessage();
  }, []);

  return <div>MessagesProperty</div>;
};

export default MessageList;
