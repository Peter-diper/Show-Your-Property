import React from "react";

const ErrorBlock = ({ message, title }) => {
  return (
    <div className="h-screen text-center flex flex-col  ">
      <div className="m-auto max-w-140 bg-blue-300/40 p-10 py-[20vh] rounded-4xl ">
        <h2 className="text-3xl font-bold text-blue-400 text-shadow-lg text-shadow-blue-400/40 capitalize">
          {title}
        </h2>
        <p className="mt-5 text-2xl  text-gray-600 capitalize">{message}</p>
      </div>
    </div>
  );
};

export default ErrorBlock;
