import { FaEnvelope, FaPhone, FaCalendarAlt, FaUser } from "react-icons/fa";

const Message = ({ message }) => {
  console.log(message);
  return (
    <div className="group border border-slate-200 rounded-xl p-6 hover:shadow-lg hover:border-blue-200 transition-all duration-200">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-xl font-semibold text-slate-800">
            {message?.property.name}
          </h2>

          <p className="text-sm text-blue-600 font-medium mt-1">
            Property Inquiry
          </p>
        </div>

        <span className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">
          New
        </span>
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

      {/* Footer */}
      <div className="flex justify-end gap-3 mt-8">
        <button className="px-5 py-2 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 transition">
          Mark as Read
        </button>

        <button className="px-5 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition">
          Delete
        </button>
      </div>
    </div>
  );
};

export default Message;
