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
        toast.error("Error faild to load messages!");
      } finally {
        setLoading(false);
      }
    };
    fetchMessage();
  }, []);

  return (
    <section className="bg-slate-100 min-h-screen py-12">
      <div className="max-w-5xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
          <div className="border-b border-slate-200 px-8 py-6 flex md:items-center md:justify-between md:flex-row items-start gap-3 flex-col">
            <div>
              <h1 className="text-3xl font-bold text-slate-800">
                Property Messages
              </h1>
              <p className="text-slate-500 mt-1">
                Manage inquiries from potential tenants and buyers.
              </p>
            </div>

            <span className="bg-blue-100 text-blue-700 text-sm font-medium px-4 py-2 rounded-full">
              {messages.length} Messages
            </span>
          </div>

          <div className="p-6 space-y-5">
            {loading && [1, 2].map((load) => <MessageSkeleton key={load} />)}

            {!loading & (messages.length === 0) ? (
              <p className="text-center">You have no message</p>
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
