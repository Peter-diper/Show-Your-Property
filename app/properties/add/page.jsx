import PropertyAdd from "@/components/PropertyAdd";
import React from "react";

const AddPage = () => {
  return (
    <section className="bg-blue-50">
      <div className="container m-auto max-w-2xl py-24">
        <div className=" backdrop-blur-md px-6  py-8 mb-4  rounded-md border  m-4 md:m-0">
          <PropertyAdd />
        </div>
      </div>
    </section>
  );
};

export default AddPage;
