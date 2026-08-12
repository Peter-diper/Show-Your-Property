import Properties from "@/components/Properties";
import PropertyCard from "@/components/PropertyCard";
import PropertySearchForm from "@/components/PropertySearchForm";
import { fetchProperties } from "@/utils/requests";

const PropertiesPage = async () => {
  return (
    <>
      <section className=" bg-gray-700 ">
        <div className="container-xl lg:container m-auto px-4 py-6">
          <PropertySearchForm />
        </div>
      </section>
      <Properties />
    </>
  );
};

export default PropertiesPage;
