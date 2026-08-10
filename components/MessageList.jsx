"use client";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Message from "./Message";
import MessageSkeleton from "./MessageSkeleton";

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
        toast.error("Failed to load messages!");
      } finally {
        setLoading(false);
      }
    };
    fetchMessage();
  }, []);

  return (
    <section className="min-h-screen  bg-linear-to-br from-gray-900 via-gray-950 to-black py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="bg-white/4  backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl shadow-black/30 overflow-hidden">
          <div className="border-b border-white/10 px-8 py-6 flex md:items-center md:justify-between md:flex-row items-start gap-3 flex-col">
            <div>
              <h1 className="text-2xl font-bold text-white tracking-tight">
                Property Messages
              </h1>
              <p className="text-white/40 text-sm mt-1">
                Manage inquiries from potential tenants and buyers.
              </p>
            </div>

            <span className="bg-blue-500/20 text-blue-300 border border-blue-500/30 text-xs font-semibold px-4 py-2 rounded-full">
              {messages.length} Messages
            </span>
          </div>

          {/* Messages */}
          <div className="p-6 space-y-4 bg">
            {/* loading skeleton */}
            {loading && [1, 2].map((load) => <MessageSkeleton key={load} />)}

            {!loading && messages.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-white/30 text-sm">No messages yet</p>
              </div>
            ) : (
              messages.map((message) => (
                <Message message={message} key={message._id} />
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MessageList;
