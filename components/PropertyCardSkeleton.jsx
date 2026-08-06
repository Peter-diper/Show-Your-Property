const PropertyCardSkeleton = () => {
  return (
    <div className="rounded-xl shadow-md relative animate-pulse">
      <div className="w-full h-73 bg-gray-300 rounded-t-xl" />

      <div className="p-4">
        <div className="text-left md:text-center lg:text-left mb-6">
          <div className="h-4 bg-gray-300 rounded w-1/4 mb-2" />
          <div className="h-6 bg-gray-300 rounded w-3/4" />
        </div>

        <div className="absolute top-2.5 right-2.5 bg-gray-300 px-4 py-2 rounded-lg w-24 h-8" />

        <div className="flex justify-center gap-4 mb-4">
          <div className="h-4 bg-gray-300 rounded w-16" />
          <div className="h-4 bg-gray-300 rounded w-16" />
          <div className="h-4 bg-gray-300 rounded w-16" />
        </div>

        <div className="flex justify-center gap-4 mb-4">
          <div className="h-4 bg-gray-300 rounded w-16" />
          <div className="h-4 bg-gray-300 rounded w-16" />
        </div>

        <div className="border border-gray-100 mb-5" />

        <div className="flex flex-col lg:flex-row justify-between mb-4">
          <div className="flex align-middle gap-2 mb-4 lg:mb-0">
            <div className="h-4 bg-gray-300 rounded w-24" />
          </div>
          <div className="h-9 bg-gray-300 rounded-lg w-20" />
        </div>
      </div>
    </div>
  );
};

export default PropertyCardSkeleton;
