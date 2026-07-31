import React from "react";

const ProfileSkeleton = () => {
  return (
    <section className="bg-blue-50">
      <div className="container m-auto py-24">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <div className="h-9 w-48 bg-gray-200 rounded animate-pulse mb-4"></div>

          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/4 mx-20 mt-10">
              <div className="mb-4">
                <div className="h-32 w-32 md:h-48 md:w-48 rounded-full bg-gray-200 animate-pulse mx-auto md:mx-0"></div>
              </div>

              <div className="mb-4">
                <div className="h-5 w-16 bg-gray-200 rounded animate-pulse mb-2"></div>
                <div className="h-7 w-32 bg-gray-200 rounded animate-pulse"></div>
              </div>

              <div>
                <div className="h-5 w-16 bg-gray-200 rounded animate-pulse mb-2"></div>
                <div className="h-7 w-48 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>

            <div className="md:w-3/4 md:pl-4">
              <div className="h-7 w-40 bg-gray-200 rounded animate-pulse mb-4"></div>

              {[1, 2, 3].map((item) => (
                <div className="mb-10" key={item}>
                  <div className="h-32 w-full bg-gray-200 rounded-md animate-pulse"></div>

                  <div className="mt-2">
                    <div className="h-6 w-56 bg-gray-200 rounded animate-pulse mb-2"></div>
                    <div className="h-5 w-72 bg-gray-200 rounded animate-pulse"></div>
                  </div>

                  <div className="mt-2 flex gap-2">
                    <div className="h-10 w-16 bg-gray-200 rounded-md animate-pulse"></div>
                    <div className="h-10 w-20 bg-gray-200 rounded-md animate-pulse"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileSkeleton;
