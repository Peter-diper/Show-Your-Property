import Image from "next/image";
import { Gallery, Item } from "react-photoswipe-gallery";
const PropertyImage = ({ images }) => {
  return (
    <Gallery>
      <section className=" p-4  ">
        <div className=" px-4 container mx-auto transition-all duration-200">
          {images.length === 1 ? (
            <Item
              caption={images[0]}
              original={images[0]}
              width={"1000"}
              height={"600"}
            >
              {({ open, ref }) => (
                <Image
                  ref={ref}
                  onClick={open}
                  src={images[0]}
                  alt=""
                  className="object-cover h-100 mx-auto rounded-xl"
                  width={1800}
                  height={400}
                  priority={true}
                />
              )}
            </Item>
          ) : (
            <div className="grid grid-cols-2  gap-4">
              {images?.map((image, index) => (
                <div
                  key={index}
                  className={`
                  ${images.length === 3 && index === 2 ? "col-span-2" : " col-span-1"}
                `}
                >
                  <Item
                    caption={image}
                    original={image}
                    width={"1200"}
                    height={"600"}
                  >
                    {({ open, ref }) => (
                      <Image
                        ref={ref}
                        onClick={open}
                        src={image}
                        alt=""
                        className="object-cover h-100 w-full rounded -xl"
                        width={0}
                        height={0}
                        priority={true}
                        sizes="100vw"
                      />
                    )}
                  </Item>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </Gallery>
  );
};

export default PropertyImage;
