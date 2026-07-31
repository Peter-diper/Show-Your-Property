import Image from "next/image";
const PropertyImage = ({ images }) => {
  return (
    <section className="bg-blue-50 p-4 ">
      <div className="container mx-auto transition-all duration-200">
        {images.length === 1 ? (
          <Image
            src={images[0]}
            alt=""
            className="object-cover h-100 mx-auto rounded-xl"
            width={1800}
            height={400}
            priority={true}
          />
        ) : (
          <div className="grid grid-cols-2  gap-4">
            {images?.map((image, index) => (
              <div
                key={index}
                className={`
                  ${images.length === 3 && index === 2 ? "col-span-2" : " col-span-1"}
                `}
              >
                <Image
                  src={image}
                  alt=""
                  className="object-cover h-100 w-full rounded -xl"
                  width={0}
                  height={0}
                  priority={true}
                  sizes="100vw"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default PropertyImage;
