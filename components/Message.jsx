"use client";
import { useState } from "react";
import { FaEnvelope, FaPhone, FaCalendarAlt, FaUser } from "react-icons/fa";
import { toast } from "react-toastify";

const Message = ({ message }) => {
  const [isRead, setIsRead] = useState(message.read);
  const [loading, setLoading] = useState(false);

  const handleReadClick = async (request) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/messages/${message._id}`, {
        method: "PUT",
      });

      if (res.status === 200) {
        const { read } = await res.json();
        setIsRead(read);
        console.log(read);
        toast.success(read ? "Marcked as read" : "Marked as New");
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="group border select-none border-slate-200 rounded-xl p-6 hover:shadow-lg hover:border-blue-200 transition-all duration-200">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-xl font-semibold text-slate-800">
            {message?.property.name}
          </h2>

          <p className="text-sm text-blue-600 font-medium mt-1">
            Property Inquiry
          </p>
        </div>

        {!isRead && (
          <span className="bg-green-200 animate-pulse text-green-900 text-xs font-semibold px-6 py-2 rounded-full">
            New
          </span>
        )}
      </div>

      <p className="text-slate-600 leading-relaxed">{message?.body}</p>

      <div className="grid md:grid-cols-2 gap-3 mt-6 text-sm">
        <div className="flex items-center gap-2 text-slate-600">
          <FaUser className="text-slate-400" />
          {message?.name}
        </div>

        <div className="flex items-center gap-2 text-slate-600">
          <FaEnvelope className="text-slate-400" />
          <a
            href="mailto:recipient@example.com"
            className="text-blue-600 hover:underline"
          >
            {message?.email}
          </a>
        </div>

        <div className="flex items-center gap-2 text-slate-600">
          <FaPhone className="text-slate-400" />
          <a href="tel:1234567890" className="text-blue-600 hover:underline">
            {message?.phone}
          </a>
        </div>

        <div className="flex items-center gap-2 text-slate-600">
          <FaCalendarAlt className="text-slate-400" />
          {new Date(message?.createdAt).toLocaleDateString("us", {
            second: "2-digit",
            minute: "2-digit",
            hour: "2-digit",
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })}
        </div>
      </div>

      <div className="flex justify-end gap-3 mt-8">
        <button
          onClick={handleReadClick}
          className={`px-5 py-2 rounded-lg ${loading ? "bg-slate-100 text-slate-700 hover:bg-slate-200 animate-pulse" : isRead ? "bg-green-100 text-green-700 hover:bg-green-200" : "bg-blue-100 text-blue-700 hover:bg-blue-200"} transition`}
        >
          {loading ? "loading ... " : isRead ? "Mark as new" : "Mark as read"}
        </button>

        <button className="px-5 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition">
          Delete
        </button>
      </div>
    </div>
  );
};

export default Message;
