"use client";
import { useRef, useState } from "react";
import { FaCheck, FaPaperPlane } from "react-icons/fa";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";

const PropertyCantectForm = ({ property }) => {
  const [loading, setLoading] = useState(false);
  const session = useSession();

  const isAthenticated = session.status === "authenticated";

  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [wasSibmited, setWasSibmited] = useState(false);
  const submitBtn = useRef();
  const timer = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAthenticated) {
      toast.info("Please Login First ");
      submitBtn.current.disabled = true;

      timer.current = setTimeout(() => {
        submitBtn.current.disabled = false;
      }, 1000);

      return;
    }
    setLoading(true);

    const data = {
      name,
      email,
      message,
      phone,
      recipient: property.owner,
      property: property._id,
    };

    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { ContentType: "aplication/json" },
        body: JSON.stringify(data),
      });

      if (res.status === 200) {
        const data = await res.json();
        toast.success(data.message);
        setWasSibmited(true);
      } else if (res.status === 400) {
        const data = await res.json();
        toast.warn(data.message);
      } else {
        console.log("something went wrong");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error: sent faild");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-bold mb-6">Contact Property Manager</h3>
      {wasSibmited ? (
        <p className="text-sx flex items-center  gap-2 justify-center text-green-500 ">
          <FaCheck className="mt-0.75" /> your message been sent!
        </p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Name:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="Enter your name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email:
            </label>
            <input
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Enter your email"
              requiredvalue={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="phone"
            >
              Phone:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="phone"
              type="text"
              placeholder="Enter your phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="message"
            >
              Message:
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 h-44 focus:outline-none focus:shadow-outline"
              id="message"
              placeholder="Enter your message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
          </div>
          <div>
            <button
              className={`${!loading ? "bg-blue-500 hover:bg-blue-600 " : "bg-gray-500 hover:bg-gray-600 animate-pulse "} duration-200 transition-all text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline flex items-center justify-center`}
              type="submit"
              ref={submitBtn}
            >
              {loading ? (
                <>Loading...</>
              ) : (
                <>
                  <FaPaperPlane className="mr-2" />
                  Send Message
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default PropertyCantectForm;
