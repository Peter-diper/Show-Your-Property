const PageDetailLoading = () => {
  return (
    <main className="min-h-[66vh] animate-pulse">
      {/* Hero Image */}
      <section>
        <div className="container-xl mx-auto">
          <div className="h-[20vh] lg:h-[40vh] w-full bg-gray-300 rounded-md" />
        </div>
      </section>

      {/* Back Button */}
      <section>
        <div className="container mx-auto py-6 px-6">
          <div className="h-5 w-40 bg-gray-300 rounded" />
        </div>
      </section>

      {/* Main Content */}
      <section className="bg-blue-50">
        <div className="container mx-auto py-10 px-6">
          <div className="grid grid-cols-1 md:grid-cols-[70%_29%] gap-6">
            {/* LEFT */}
            <main className="space-y-6">
              {/* Property Info */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="h-4 w-32 bg-gray-300 rounded mb-4" />

                <div className="h-8 w-2/3 bg-gray-300 rounded mb-6" />

                <div className="h-5 w-1/2 bg-gray-300 rounded mb-8" />

                <div className="h-10 w-full bg-gray-300 rounded mb-6" />

                <div className="flex flex-col md:flex-row justify-between gap-6">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="flex flex-col items-center gap-3 flex-1"
                    >
                      <div className="h-4 w-20 bg-gray-300 rounded" />
                      <div className="h-7 w-24 bg-gray-300 rounded" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="h-6 w-48 bg-gray-300 rounded mb-6" />

                <div className="flex justify-between mb-8">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-6 w-20 bg-gray-300 rounded" />
                  ))}
                </div>

                <div className="space-y-3">
                  <div className="h-4 w-full bg-gray-300 rounded" />
                  <div className="h-4 w-5/6 bg-gray-300 rounded" />
                  <div className="h-4 w-4/6 bg-gray-300 rounded" />
                </div>
              </div>

              {/* Amenities */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="h-6 w-32 bg-gray-300 rounded mb-6" />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Array.from({ length: 9 }).map((_, i) => (
                    <div key={i} className="h-5 w-32 bg-gray-300 rounded" />
                  ))}
                </div>
              </div>
            </main>

            {/* RIGHT SIDEBAR */}
            <aside className="space-y-4">
              {/* Bookmark */}
              <div className="h-12 w-full bg-gray-300 rounded-full" />

              {/* Share */}
              <div className="flex justify-center gap-3">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="h-10 w-10 rounded-full bg-gray-300" />
                ))}
              </div>

              {/* Contact Form */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="h-7 w-52 bg-gray-300 rounded mb-8" />

                <div className="space-y-5">
                  {[1, 2, 3].map((i) => (
                    <div key={i}>
                      <div className="h-4 w-20 bg-gray-300 rounded mb-2" />
                      <div className="h-10 w-full bg-gray-300 rounded" />
                    </div>
                  ))}

                  <div>
                    <div className="h-4 w-24 bg-gray-300 rounded mb-2" />
                    <div className="h-44 w-full bg-gray-300 rounded" />
                  </div>

                  <div className="h-11 w-full bg-gray-300 rounded-full" />
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="bg-blue-50 p-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 gap-4">
            <div className="h-72 bg-gray-300 rounded-xl" />

            <div className="h-72 bg-gray-300 rounded-xl" />

            <div className="col-span-2 h-96 bg-gray-300 rounded-xl" />
          </div>
        </div>
      </section>
    </main>
  );
};

export default PageDetailLoading;
