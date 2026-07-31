"use client";

const Spinner = () => {
  return (
    <div className="absolute left-[50%] top-[50%] ">
      <div className="w-12 h-12 rounded-full absolute border-2 border-solid border-gray-200"></div>

      <div className="w-12 h-12 rounded-full animate-spin absolute border-2 border-solid border-blue-500 border-t-transparent shadow-md "></div>
    </div>
  );
};

export default Spinner;
