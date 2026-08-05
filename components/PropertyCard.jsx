import Image from "next/image";
import Link from "next/link";
import {
  FaBed,
  FaBath,
  FaRulerCombined,
  FaMoneyBill,
  FaMapMarker,
} from "react-icons/fa";

const PropertyCard = ({ property }) => {
  const getRateDisplay = () => {
    const { rates } = property;
    if (rates?.monthly) {
      return `${rates.monthly.toLocaleString()}/mo`;
    } else if (rates?.weekly) {
      return `${rates.weekly.toLocaleString()}/wk`;
    } else if (rates?.nightly) {
      return `${rates.nightly.toLocaleString()}/night`;
    }
  };

  return (
    <div
      key={property._id}
      className="rounded-xl border bg-black/20  border-white/23 shadow-md relative"
    >
      <Image
        src={property.images[0]}
        alt=""
        className="w-full h-75 rounded-t-xl object-cover"
        sizes="100vw"
        width={0}
        height={0}
        priority
      />
      <div className="p-4">
        <div className="text-left md:text-center lg:text-left mb-6">
          <div className="text-white/70">{property.type}</div>
          <h3 className="text-xl text-white/90 font-bold">{property.name}</h3>
        </div>
        <h3 className="absolute top-2.5 right-2.5 bg-white px-4 py-2 rounded-lg text-gray-500 font-bold text-right md:text-center lg:text-right">
          ${getRateDisplay()}
        </h3>

        <div className="flex justify-center gap-4 text-gray-300 mb-4">
          <p>
            <i className="fa-solid fa-bed">
              {<FaBed className="inline mr-2" />}
            </i>{" "}
            {property.beds} <span className="md:hidden lg:inline">Beds</span>
          </p>
          <p>
            <i className="fa-solid fa-bath">
              {<FaBath className="inline mr-2" />}
            </i>{" "}
            {property.baths} <span className="md:hidden lg:inline">Baths</span>
          </p>
          <p>
            <i className="fa-solid fa-ruler-combined">
              {<FaRulerCombined className="inline mr-2" />}
            </i>
            {property.square_feet.toLocaleString()}{" "}
            <span className="md:hidden lg:inline">sqft</span>
          </p>
        </div>

        <div className="flex justify-center gap-4 text-green-400 text-sm mb-4">
          {property.rates?.nightly && (
            <p>
              <i className="fa-solid fa-money-bill">
                {<FaMoneyBill className="inline mr-2" />}
              </i>{" "}
              Nightly
            </p>
          )}

          {property.rates?.monthly && (
            <p>
              <i className="fa-solid fa-money-bill">
                {" "}
                {<FaMoneyBill className="inline mr-2" />}
              </i>{" "}
              Monthly
            </p>
          )}
          {property.rates?.weekly && (
            <p>
              <i className="fa-solid fa-money-bill">
                {" "}
                {<FaMoneyBill className="inline mr-2" />}
              </i>{" "}
              Weekly
            </p>
          )}
        </div>

        <div className="border border-gray-100 mb-5"></div>

        <div className="flex flex-col lg:flex-row justify-between mb-4">
          <div className="flex align-middle gap-2 mb-4 lg:mb-0">
            <FaMapMarker className="text-red-700 mt-1" />
            <span className="text-orange-700 "> {property.location.city} </span>
          </div>
          <Link
            href={`/properties/${property._id}`}
            className="h-9 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-center text-sm"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
