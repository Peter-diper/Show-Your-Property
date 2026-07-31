export default function Loading() {
  return (
    <div className="min-h-[66vh] animate-pulse">
      {/* Hero */}
      <section className="bg-blue-700 py-20 mb-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
          <div className="w-full flex flex-col items-center">
            {/* Title */}
            <div className="h-14 sm:h-16 md:h-20 w-3/4 bg-blue-600 rounded-lg mb-5" />

            {/* Description */}
            <div className="h-6 w-1/2 bg-blue-600 rounded mb-6" />

            {/* Search */}
            <div className="mt-3 max-w-2xl w-full flex flex-col md:flex-row gap-4">
              <div className="h-12 bg-white/40 rounded-lg w-full md:w-3/5" />

              <div className="h-12 bg-white/40 rounded-lg w-full md:w-2/5" />

              <div className="h-12 bg-blue-500 rounded-lg w-full md:w-28" />
            </div>
          </div>
        </div>
      </section>

      {/* Renter / Owner cards */}
      <section>
        <div className="container-xl lg:container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
            {[1, 2].map((item) => (
              <div key={item} className="bg-gray-100 p-6 rounded-lg shadow-md">
                <div className="h-8 w-56 bg-gray-300 rounded mb-4" />

                <div className="space-y-2 mb-6">
                  <div className="h-4 w-full bg-gray-300 rounded" />
                  <div className="h-4 w-4/5 bg-gray-300 rounded" />
                </div>

                <div className="h-10 w-32 bg-gray-300 rounded-lg" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Properties */}
      <section className="px-4 py-6">
        <div className="container-xl lg:container mx-auto">
          {/* Heading */}
          <div className="flex justify-center mb-6">
            <div className="h-10 w-72 bg-gray-300 rounded" />
          </div>

          {/* Property cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((item) => (
              <div key={item} className="rounded-xl shadow-md overflow-hidden">
                {/* Image */}
                <div className="w-full h-75 bg-gray-300" />

                <div className="p-4">
                  {/* Category */}
                  <div className="h-4 w-32 bg-gray-300 rounded mb-3" />

                  {/* Title */}
                  <div className="h-7 w-4/5 bg-gray-300 rounded mb-6" />

                  {/* Price */}
                  <div className="absolute" />

                  {/* Details */}
                  <div className="flex justify-center gap-4 mb-5">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="h-5 w-16 bg-gray-300 rounded" />
                    ))}
                  </div>

                  {/* Payment */}
                  <div className="flex justify-center gap-4 mb-5">
                    {[1, 2].map((i) => (
                      <div key={i} className="h-4 w-20 bg-gray-300 rounded" />
                    ))}
                  </div>

                  <div className="border border-gray-200 mb-5" />

                  {/* Location + Button */}
                  <div className="flex justify-between items-center">
                    <div className="h-5 w-28 bg-gray-300 rounded" />

                    <div className="h-9 w-20 bg-gray-300 rounded-lg" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* View all button */}
      <section className="m-auto max-w-lg my-10 px-6">
        <div className="h-14 w-full bg-gray-300 rounded-xl" />
      </section>
    </div>
  );
}
