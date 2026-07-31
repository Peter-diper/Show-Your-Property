import Image from "next/image";
import React from "react";

const PropertyHeaderImage = ({ image }) => {
  return (
    <section>
      <div className="container-xl m-auto">
        <div className="grid grid-cols-1">
          <Image
            src={image}
            alt=""
            className="object-cover transition-all lg:h-[40vh] h-[20vh] w-full"
            sizes="100vw"
            width={0}
            height={0}
            loading="eager"
          />
        </div>
      </div>
    </section>
  );
};

export default PropertyHeaderImage;
