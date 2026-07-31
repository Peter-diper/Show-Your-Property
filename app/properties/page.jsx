import PropertiesLoadingSkleton from "@/components/PropertiesLoadingSkleton";
import PropertyCard from "@/components/PropertyCard";
import PropertySearchForm from "@/components/PropertySearchForm";
import { fetchProperties } from "@/utils/requests";

const PropertiesPage = async () => {
  const properties = await fetchProperties();
  const sortedProperties = [...properties].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
  );
  return (
    <>
      <section className=" bg-blue-700 ">
        <div className="container-xl lg:container m-auto px-4 py-6">
          <PropertySearchForm />
        </div>
      </section>
      <section className="px-4 py-6">
        <div className="container-xl lg:container m-auto px-4 py-6">
          {sortedProperties.length === 0 ? (
            <p>not properties found</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {sortedProperties.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default PropertiesPage;
