import InfoBox from "./InfoBox";

const InfoBoxes = () => {
  return (
    <section className="animate-soft-intro">
      <div className="container-xl lg:container m-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
          <InfoBox
            title={"For Renters"}
            backgroundColor="color-gradient-box"
            buttonInfo={{
              href: "/properties",
              text: "For Renters",
              backgroundColor: "bg-white/10",
            }}
          >
            Find your dream rental property. Bookmark properties and contact
            owners.
          </InfoBox>

          <InfoBox
            title={"For Property Owners"}
            buttonInfo={{
              href: "/properties/add",
              text: "For Renters",
              backgroundColor: "bg-gray-500",
            }}
            backgroundColor="color-gradient-box-2 "
          >
            List your properties and reach potential tenants. Rent as an airbnb
            or long term.
          </InfoBox>
        </div>
      </div>
    </section>
  );
};

export default InfoBoxes;
